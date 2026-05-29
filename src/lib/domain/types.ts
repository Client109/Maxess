// Extended types for API integrations
import { z } from 'zod';

// Existing types (keeping them)
export const FanSchema = z.object({
  fan_id: z.string(),
  name: z.string(),
  xp_total: z.number(),
  superfan_score: z.number().optional(),  // 0–100 normalized engagement score
  current_tier: z.enum(['General', 'Loyal', 'Superfan', 'Elite']),
  streak_days: z.number(),
  rank: z.number(),
  percentile: z.number(),
  top_artist: z.string(),
  top_team: z.string().optional(),        // sports mode label
  top_venue: z.string(),
  events_attended: z.number(),
  xp_breakdown: z.record(z.number()),
  city: z.string(),
  member_since: z.string(),
  avatar_initials: z.string(),
  // New API integration fields
  spotify_id: z.string().optional(),
  apple_music_id: z.string().optional(),
  discord_id: z.string().optional(),
  lastfm_username: z.string().optional(),
  auth0_user_id: z.string().optional(),
  location: z.object({
    city: z.string(),
    region: z.string().optional(),
    country: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  connected_accounts: z.array(z.string()).default([])
});

export type Fan = z.infer<typeof FanSchema>;

// Spotify API Types
export const SpotifyArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  external_urls: z.object({
    spotify: z.string()
  }),
  followers: z.object({
    total: z.number()
  }).optional(),
  genres: z.array(z.string()).default([]),
  images: z.array(z.object({
    url: z.string(),
    height: z.number(),
    width: z.number()
  })).default([])
});

export const SpotifyTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artists: z.array(SpotifyArtistSchema),
  external_urls: z.object({
    spotify: z.string()
  }),
  preview_url: z.string().nullable(),
  duration_ms: z.number()
});

export const SpotifyTopItemsSchema = z.object({
  items: z.array(z.union([SpotifyArtistSchema, SpotifyTrackSchema])),
  total: z.number(),
  limit: z.number(),
  offset: z.number()
});

export const SpotifyUserProfileSchema = z.object({
  id: z.string(),
  display_name: z.string().nullable(),
  email: z.string().optional(),
  followers: z.object({
    total: z.number()
  }),
  images: z.array(z.object({
    url: z.string(),
    height: z.number().nullable(),
    width: z.number().nullable()
  })).default([])
});

export type SpotifyArtist = z.infer<typeof SpotifyArtistSchema>;
export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>;
export type SpotifyTopItems = z.infer<typeof SpotifyTopItemsSchema>;
export type SpotifyUserProfile = z.infer<typeof SpotifyUserProfileSchema>;

// Apple Music Types
export const AppleMusicArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  genre: z.string(),
  play_count: z.number()
});

export const AppleMusicListeningHistorySchema = z.object({
  artist_id: z.string(),
  artist_name: z.string(),
  play_count: z.number(),
  last_played: z.string()
});

export const AppleMusicUserSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  subscription_type: z.enum(['individual', 'family', 'student']),
  top_artists: z.array(AppleMusicArtistSchema),
  listening_history: z.array(AppleMusicListeningHistorySchema)
});

export type AppleMusicArtist = z.infer<typeof AppleMusicArtistSchema>;
export type AppleMusicListeningHistory = z.infer<typeof AppleMusicListeningHistorySchema>;
export type AppleMusicUser = z.infer<typeof AppleMusicUserSchema>;

// Hot List Types
export const HotListArtistSchema = z.object({
  artist_id: z.string(),
  name: z.string(),
  genre: z.string(),
  xp_per_play: z.number(),
  xp_multiplier: z.number(),
  is_featured: z.boolean(),
  bonus_tiers: z.array(z.object({
    plays_required: z.number(),
    bonus_xp: z.number()
  })),
  rotation_label: z.string()
});

export const HotListProgressSchema = z.object({
  artist_id: z.string(),
  user_play_count: z.number(),
  xp_earned: z.number(),
  current_bonus_tier: z.number(),
  next_bonus_at: z.number().nullable()
});

export type HotListArtist = z.infer<typeof HotListArtistSchema>;
export type HotListProgress = z.infer<typeof HotListProgressSchema>;

// Ticketmaster API Types
export const TicketmasterVenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.object({
    name: z.string()
  }),
  state: z.object({
    name: z.string(),
    stateCode: z.string()
  }).optional(),
  country: z.object({
    name: z.string(),
    countryCode: z.string()
  }),
  location: z.object({
    latitude: z.string(),
    longitude: z.string()
  }).optional(),
  capacity: z.number().optional(),
  url: z.string().optional()
});

export const TicketmasterAttractionSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  url: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
  })).default([]),
  classifications: z.array(z.object({
    primary: z.boolean(),
    segment: z.object({
      id: z.string(),
      name: z.string()
    }),
    genre: z.object({
      id: z.string(),
      name: z.string()
    }),
    subGenre: z.object({
      id: z.string(),
      name: z.string()
    }).optional()
  })).default([])
});

export const TicketmasterEventSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  url: z.string().optional(),
  dates: z.object({
    start: z.object({
      localDate: z.string(),
      localTime: z.string().optional(),
      dateTime: z.string().optional()
    }),
    status: z.object({
      code: z.string()
    })
  }),
  classifications: z.array(z.object({
    primary: z.boolean(),
    segment: z.object({
      id: z.string(),
      name: z.string()
    }),
    genre: z.object({
      id: z.string(),
      name: z.string()
    }),
    subGenre: z.object({
      id: z.string(),
      name: z.string()
    }).optional()
  })).default([]),
  _embedded: z.object({
    venues: z.array(TicketmasterVenueSchema),
    attractions: z.array(TicketmasterAttractionSchema).optional()
  }),
  images: z.array(z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
  })).default([]),
  priceRanges: z.array(z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string()
  })).optional()
});

export const TicketmasterEventsResponseSchema = z.object({
  _embedded: z.object({
    events: z.array(TicketmasterEventSchema)
  }),
  page: z.object({
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    number: z.number()
  })
});

export type TicketmasterEvent = z.infer<typeof TicketmasterEventSchema>;
export type TicketmasterVenue = z.infer<typeof TicketmasterVenueSchema>;
export type TicketmasterAttraction = z.infer<typeof TicketmasterAttractionSchema>;
export type TicketmasterEventsResponse = z.infer<typeof TicketmasterEventsResponseSchema>;

// Discord API Types
export const DiscordUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  display_name: z.string().nullable().optional(),
  avatar: z.string().nullable(),
  bot: z.boolean().optional(),
  system: z.boolean().optional(),
  mfa_enabled: z.boolean().optional(),
  verified: z.boolean().optional(),
  email: z.string().nullable().optional()
});

export const DiscordGuildSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  owner: z.boolean(),
  permissions: z.string(),
  features: z.array(z.string())
});

export type DiscordUser = z.infer<typeof DiscordUserSchema>;
export type DiscordGuild = z.infer<typeof DiscordGuildSchema>;

// Last.fm API Types
export const LastFmArtistSchema = z.object({
  name: z.string(),
  playcount: z.string(),
  url: z.string(),
  image: z.array(z.object({
    '#text': z.string(),
    size: z.string()
  })).default([]),
  '@attr': z.object({
    rank: z.string()
  }).optional()
});

export const LastFmTrackSchema = z.object({
  name: z.string(),
  artist: z.object({
    name: z.string(),
    url: z.string()
  }),
  playcount: z.string(),
  url: z.string(),
  image: z.array(z.object({
    '#text': z.string(),
    size: z.string()
  })).default([]),
  '@attr': z.object({
    rank: z.string()
  }).optional()
});

export const LastFmUserSchema = z.object({
  name: z.string(),
  realname: z.string(),
  url: z.string(),
  image: z.array(z.object({
    '#text': z.string(),
    size: z.string()
  })).default([]),
  country: z.string(),
  age: z.string().optional(),
  gender: z.string().optional(),
  subscriber: z.string(),
  playcount: z.string(),
  artist_count: z.string().optional(),
  track_count: z.string().optional(),
  album_count: z.string().optional()
});

export type LastFmArtist = z.infer<typeof LastFmArtistSchema>;
export type LastFmTrack = z.infer<typeof LastFmTrackSchema>;
export type LastFmUser = z.infer<typeof LastFmUserSchema>;

// Enhanced Event Schema (combining multiple sources)
export const EnhancedEventSchema = z.object({
  event_id: z.string(),
  source: z.enum(['ticketmaster', 'seatgeek', 'eventbrite', 'mock']),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  category: z.enum(['music', 'sports', 'theater', 'comedy', 'other']),
  genre: z.string().optional(),
  date: z.string(),
  time: z.string().optional(),
  venue: z.object({
    id: z.string(),
    name: z.string(),
    address: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    country: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    capacity: z.number().optional()
  }),
  artists: z.array(z.object({
    id: z.string(),
    name: z.string(),
    genre: z.string().optional()
  })).default([]),
  access_type: z.enum(['GENERAL', 'PRESALE', 'VIP', 'MEMBER']),
  status: z.enum(['active', 'upcoming', 'limited', 'sold_out', 'cancelled']),
  featured: z.boolean().default(false),
  images: z.array(z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
  })).default([]),
  price_range: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string()
  }).optional(),
  external_url: z.string().optional(),
  distance_km: z.number().optional(), // calculated based on user location
  relevance_score: z.number().default(0) // calculated based on user preferences
});

export type EnhancedEvent = z.infer<typeof EnhancedEventSchema>;

// Geolocation Types
export const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  formatted_address: z.string().optional()
});

export type Location = z.infer<typeof LocationSchema>;

// API Response wrapper
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    details: z.unknown().optional()
  }).optional(),
  meta: z.object({
    timestamp: z.string(),
    request_id: z.string().optional(),
    rate_limit: z.object({
      remaining: z.number(),
      reset_at: z.string()
    }).optional()
  }).optional()
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    request_id?: string;
    rate_limit?: {
      remaining: number;
      reset_at: string;
    };
  };
};

// Existing schemas (keep original Event, LeaderboardEntry, etc.)
export const EventSchema = z.object({
  event_id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  category: z.enum(['music', 'sports', 'comedy', 'festival']),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  city: z.string(),
  access_type: z.enum(['GAME ACCESS', 'VENUE ACCESS', 'PRESALE ACCESS', 'MUSIC ACCESS', 'SPORTS ACCESS']),
  status: z.enum(['active', 'upcoming', 'limited', 'sold_out']),
  featured: z.boolean(),
  image_color: z.string(),
  metadata: z.string().optional(),
  // Display helpers
  presale_info: z.string().optional(),       // e.g. "Presale opens in 18h"
  location_display: z.string().optional(),   // e.g. "Inglewood, CA"
  date_display: z.string().optional(),       // e.g. "Sat, Jun 8"
  status_label: z.string().optional(),       // exact badge text: "Starts in 18h", "You're in"
  // New fields for redesigned events page
  genre_tag: z.string().optional(),          // e.g. "HIP-HOP", "POP", "R&B"
  heat_score: z.number().optional(),         // 0-100 popularity/demand score
  match_percentage: z.number().optional(),   // 0-100 taste match based on listening history
  sale_status: z.string().optional(),        // e.g. "On Sale", "Selling Fast", "Available", "Limited"
  // Section flags
  trending: z.boolean().optional(),
  near_you: z.boolean().optional(),
  upcoming_for_you: z.boolean().optional()
});

export type Event = z.infer<typeof EventSchema>;

export const LeaderboardEntrySchema = z.object({
  rank: z.number(),
  name: z.string(),
  score: z.number(),
  delta: z.number(),
  is_me: z.boolean(),
  city: z.string(),
  time_period: z.string()
});

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const ChallengeTaskSchema = z.object({
  task_id: z.string(),
  description: z.string(),
  is_complete: z.boolean()
});

export const ChallengeSchema = z.object({
  challenge_id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  reward_name: z.string(),
  tasks: z.array(ChallengeTaskSchema),
  progress_fraction: z.number(),
  is_limited: z.boolean(),
  thumbnail_image: z.string().optional(),
  expires_in: z.string()
});

export type Challenge = z.infer<typeof ChallengeSchema>;
export type ChallengeTask = z.infer<typeof ChallengeTaskSchema>;

export const PassSchema = z.object({
  pass_id: z.string(),
  name: z.string(),
  venue: z.string(),
  date: z.string(),
  status: z.enum(['active', 'starts_soon', 'waiting']),
  pass_type: z.enum(['elite', 'diamond', 'general']),
  xp_tier_required: z.number(),
  icon_color: z.string(),
  metadata: z.string().optional()
});

export type Pass = z.infer<typeof PassSchema>;

export const FriendActivitySchema = z.object({
  name: z.string(),
  avatar_initials: z.string(),
  activity_label: z.string(),
  delta: z.number(),
  delta_type: z.enum(['up', 'down', 'neutral'])
});

export type FriendActivity = z.infer<typeof FriendActivitySchema>;

export const TierSchema = z.object({
  name: z.enum(['General', 'Loyal', 'Superfan', 'Elite']),
  xp_threshold: z.number(),
  perks: z.array(z.string()),
  color_hex: z.string()
});

export type Tier = z.infer<typeof TierSchema>;

export const RecentActivitySchema = z.object({
  activity_id: z.string(),
  description: z.string(),
  xp_amount: z.number(),
  timestamp: z.string(),
  source_icon: z.string()
});

export type RecentActivity = z.infer<typeof RecentActivitySchema>;

export const NotificationSchema = z.object({
  id: z.string(),
  type: z.enum(['event', 'social', 'reward', 'tier', 'system']),
  title: z.string(),
  body: z.string(),
  icon: z.string(),
  time: z.string(),
  read: z.boolean(),
  action_url: z.string().optional(),
});

export type Notification = z.infer<typeof NotificationSchema>;