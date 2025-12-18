
export enum AdPlatform {
  FACEBOOK = 'Facebook/Instagram',
  GOOGLE = 'Google Search',
  LINKEDIN = 'LinkedIn',
  TIKTOK = 'TikTok',
  TWITTER = 'X (Twitter)'
}

export enum AdTone {
  PROFESSIONAL = 'Professional',
  BOLD = 'Bold & Energetic',
  PLAYFUL = 'Playful & Witty',
  EMPATHETIC = 'Empathetic',
  URGENT = 'Urgent/Scarcity'
}

export interface AdCopy {
  id: string;
  platform: AdPlatform;
  headline: string;
  primaryText: string;
  callToAction: string;
  persuasivePhrase: string;
}

export interface GenerationConfig {
  productName: string;
  targetAudience: string;
  tone: AdTone;
  platform: AdPlatform;
  benefits: string;
}
