// Types for Text-To-Speech Application

// API Related Types
export interface AudioGenerationRequest {
  text: string;
  voice?: string;
  speed?: number;
  pitch?: number;
  format?: 'mp3' | 'wav' | 'ogg';
}

export interface AudioGenerationResponse {
  success: boolean;
  message?: string;
  audioUrl?: string;
  duration?: number;
  format?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}

// Component Props Types
export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export interface AudioPlayerProps {
  audioUrl: string | null;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  autoPlay?: boolean;
}

export interface SubmitButtonProps {
  onClick: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
}

// Form Types
export interface TextToSpeechFormData {
  text: string;
  voice?: VoiceOption;
  settings?: AudioSettings;
}

export interface VoiceOption {
  id: string;
  name: string;
  language: string;
  gender: 'male' | 'female' | 'neutral';
  preview?: string;
}

export interface AudioSettings {
  speed: number; // 0.5 to 2.0
  pitch: number; // -20 to 20
  volume: number; // 0 to 1
  format: AudioFormat;
}

export type AudioFormat = 'mp3' | 'wav' | 'ogg' | 'flac';

// State Types
export interface AppState {
  inputText: string;
  audioUrl: string | null;
  isLoading: boolean;
  error: string | null;
  selectedVoice: VoiceOption | null;
  audioSettings: AudioSettings;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

// Event Handler Types
export type TextChangeHandler = (value: string) => void;
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
export type AudioEventHandler = () => void;
export type VoiceSelectHandler = (voice: VoiceOption) => void;
export type SettingsChangeHandler = (settings: Partial<AudioSettings>) => void;

// Utility Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  code?: string;
}

// Constants
export const AUDIO_FORMATS = ['mp3', 'wav', 'ogg', 'flac'] as const;
export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  speed: 1.0,
  pitch: 0,
  volume: 1.0,
  format: 'mp3'
};

// Type Guards
export const isAudioGenerationResponse = (response: any): response is AudioGenerationResponse => {
  return typeof response === 'object' && 
         response !== null && 
         typeof response.success === 'boolean';
};

export const isApiError = (error: any): error is ApiError => {
  return typeof error === 'object' && 
         error !== null && 
         error.success === false && 
         typeof error.message === 'string';
};

// Voice-related types for future enhancements
export interface VoiceProvider {
  id: string;
  name: string;
  voices: VoiceOption[];
  isAvailable: boolean;
}

export interface SpeechSynthesisConfig {
  provider: string;
  apiKey?: string;
  region?: string;
  model?: string;
}

// File handling types
export interface AudioFile {
  blob: Blob;
  url: string;
  name: string;
  size: number;
  type: string;
  duration?: number;
}

export interface DownloadOptions {
  filename: string;
  format: AudioFormat;
  quality?: 'low' | 'medium' | 'high';
}

// History and favorites types
export interface AudioHistoryItem {
  id: string;
  text: string;
  audioUrl: string;
  voice: VoiceOption;
  settings: AudioSettings;
  createdAt: Date;
  duration?: number;
}

export interface FavoriteText {
  id: string;
  text: string;
  label?: string;
  createdAt: Date;
}

// Settings and preferences
export interface UserPreferences {
  defaultVoice: VoiceOption | null;
  defaultSettings: AudioSettings;
  autoPlay: boolean;
  saveHistory: boolean;
  theme: 'light' | 'dark' | 'system';
}

// Axios response wrapper
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

// React component generic types
export type ComponentProps<T = {}> = T & {
  className?: string;
  children?: React.ReactNode;
};

// Hook return types
export interface UseAudioPlayer {
  audioUrl: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

export interface UseTextToSpeech {
  generateAudio: (text: string, options?: Partial<AudioGenerationRequest>) => Promise<string>;
  isGenerating: boolean;
  error: string | null;
  clearError: () => void;
}
