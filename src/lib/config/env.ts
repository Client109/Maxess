// Environment configuration for API keys and settings
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

// Server-side environment variables (keep sensitive keys here)
export const serverConfig = {
  spotify: {
    clientId: env.SPOTIFY_CLIENT_ID || '',
    clientSecret: env.SPOTIFY_CLIENT_SECRET || '',
    redirectUri: env.SPOTIFY_REDIRECT_URI || ''
  },
  ticketmaster: {
    apiKey: env.TICKETMASTER_API_KEY || '',
    baseUrl: 'https://app.ticketmaster.com/discovery/v2'
  },
  discord: {
    botToken: env.DISCORD_BOT_TOKEN || '',
    clientId: env.DISCORD_CLIENT_ID || '',
    clientSecret: env.DISCORD_CLIENT_SECRET || ''
  },
  lastfm: {
    apiKey: env.LASTFM_API_KEY || '',
    apiSecret: env.LASTFM_API_SECRET || '',
    baseUrl: 'https://ws.audioscrobbler.com/2.0'
  },
  auth0: {
    domain: env.AUTH0_DOMAIN || '',
    clientId: env.AUTH0_CLIENT_ID || '',
    clientSecret: env.AUTH0_CLIENT_SECRET || ''
  },
  supabase: {
    url: env.SUPABASE_URL || '',
    anonKey: env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  applePass: {
    passTypeId: env.APPLE_PASS_TYPE_ID || '',
    teamId: env.APPLE_TEAM_ID || '',
    certP12Base64: env.APPLE_PASS_CERT_P12_BASE64 || '',
    certPassword: env.APPLE_PASS_CERT_PASSWORD || '',
    organizationName: env.APPLE_PASS_ORGANIZATION_NAME || 'Maxxes'
  },
  resend: {
    apiKey: env.RESEND_API_KEY || '',
    fromEmail: env.RESEND_FROM_EMAIL || 'Maxess <onboarding@resend.dev>'
  }
};

// Public environment variables (safe for client-side)
export const publicConfig = {
  app: {
    url: publicEnv.PUBLIC_APP_URL || 'http://localhost:5173',
    name: 'Maxxess'
  },
  spotify: {
    clientId: publicEnv.PUBLIC_SPOTIFY_CLIENT_ID || serverConfig.spotify.clientId
  },
  auth0: {
    domain: publicEnv.PUBLIC_AUTH0_DOMAIN || serverConfig.auth0.domain,
    clientId: publicEnv.PUBLIC_AUTH0_CLIENT_ID || serverConfig.auth0.clientId
  }
};

// API rate limits and configuration
export const apiLimits = {
  spotify: {
    requestsPerHour: 1000, // per user
    baseUrl: 'https://api.spotify.com/v1'
  },
  ticketmaster: {
    requestsPerDay: 5000,
    requestsPerSecond: 5,
    baseUrl: 'https://app.ticketmaster.com/discovery/v2'
  },
  discord: {
    requestsPerSecond: 50,
    baseUrl: 'https://discord.com/api/v10'
  },
  lastfm: {
    requestsPerSecond: 5,
    baseUrl: 'https://ws.audioscrobbler.com/2.0'
  },
  nominatim: {
    requestsPerSecond: 1,
    baseUrl: 'https://nominatim.openstreetmap.org'
  }
};