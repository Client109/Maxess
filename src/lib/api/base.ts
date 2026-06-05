// Base API client with common functionality
import type { ApiResponse } from '../domain/types.js';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class RateLimitError extends ApiError {
  constructor(
    message: string,
    public resetAt: Date,
    public remaining: number = 0
  ) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
  }
}

export class BaseApiClient {
  protected baseUrl: string;
  protected headers: Record<string, string>;
  private requestQueue: Map<string, Promise<Response>> = new Map();

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Maxxess/1.0.0',
      ...defaultHeaders
    };
  }

  protected async makeRequest(
    endpoint: string,
    options: RequestInit = {},
    cacheKey?: string
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Simple request deduplication
    if (cacheKey && this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey)!;
    }

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers
      }
    };

    const requestPromise = fetch(url, requestOptions);

    if (cacheKey) {
      this.requestQueue.set(cacheKey, requestPromise);
    }

    try {
      const response = await requestPromise;
      if (!response.ok) await this.handleErrorResponse(response);
      return response;
    } finally {
      if (cacheKey) this.requestQueue.delete(cacheKey);
    }
  }

  protected async handleErrorResponse(response: Response): Promise<never> {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    // Handle rate limiting
    if (response.status === 429) {
      const resetHeader = response.headers.get('X-RateLimit-Reset') || 
                         response.headers.get('Retry-After');
      const resetAt = resetHeader 
        ? new Date(parseInt(resetHeader) * 1000)
        : new Date(Date.now() + 60000); // Default to 1 minute

      const remaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0');
      
      throw new RateLimitError(
        errorData.message || 'Rate limit exceeded',
        resetAt,
        remaining
      );
    }

    throw new ApiError(
      errorData.message || 'API request failed',
      response.status,
      errorData.code,
      errorData
    );
  }

  protected buildQuery(params: Record<string, unknown>): string {
    const filteredParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, String(value)]);
    
    return new URLSearchParams(filteredParams).toString();
  }

  protected async get<T>(
    endpoint: string,
    params: Record<string, unknown> = {},
    cacheKey?: string
  ): Promise<ApiResponse<T>> {
    const query = this.buildQuery(params);
    const fullEndpoint = query ? `${endpoint}?${query}` : endpoint;

    try {
      const response = await this.makeRequest(fullEndpoint, { method: 'GET' }, cacheKey);
      const data = await response.json();

      return {
        success: true,
        data: data as T,
        meta: {
          timestamp: new Date().toISOString(),
          rate_limit: this.extractRateLimitInfo(response)
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async post<T>(
    endpoint: string,
    body: unknown,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.makeRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      const data = await response.json();

      return {
        success: true,
        data: data as T,
        meta: {
          timestamp: new Date().toISOString(),
          rate_limit: this.extractRateLimitInfo(response)
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private extractRateLimitInfo(response: Response) {
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const resetAt = response.headers.get('X-RateLimit-Reset');

    if (remaining && resetAt) {
      return {
        remaining: parseInt(remaining),
        reset_at: new Date(parseInt(resetAt) * 1000).toISOString()
      };
    }
    return undefined;
  }

  private handleError<T>(error: unknown): ApiResponse<T> {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          details: error.details
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      };
    }

    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'UNKNOWN_ERROR'
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }
}

// Rate limiting utilities
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  canMakeRequest(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const requests = this.requests.get(key)!;
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    this.requests.set(key, validRequests);
    
    return validRequests.length < limit;
  }

  recordRequest(key: string): void {
    const now = Date.now();
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    this.requests.get(key)!.push(now);
  }

  getWaitTime(key: string, limit: number, windowMs: number): number {
    if (!this.requests.has(key)) {
      return 0;
    }
    
    const requests = this.requests.get(key)!;
    if (requests.length < limit) {
      return 0;
    }
    
    const oldestRequest = Math.min(...requests);
    const waitTime = (oldestRequest + windowMs) - Date.now();
    return Math.max(0, waitTime);
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();

// Caching utilities
export class SimpleCache {
  private cache: Map<string, { data: unknown; expiry: number }> = new Map();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instance
export const apiCache = new SimpleCache();

// Periodic cleanup
if (typeof window !== 'undefined') {
  setInterval(() => apiCache.cleanup(), 5 * 60 * 1000); // Cleanup every 5 minutes
}