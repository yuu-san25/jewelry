export interface Product {
  id: string;
  name: string;
  category: 'bridal' | 'gold' | 'diamond' | 'silver';
  description: string;
  image: string;
  weightTolas: number;
  karat: 22 | 24 | 21 | 18;
  priceEstimate?: number; // Estimated in PKR
  details: string[];
}

export interface LiveGoldRates {
  gold24k: number; // Price per Tola in PKR
  gold22k: number;
  gold21k: number;
  gold18k: number;
  silver: number;  // Price per Tola in PKR
  lastUpdated: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatarLetter: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: 'bridal_consult' | 'custom_design' | 'gold_buy_sell' | 'valuation';
  notes?: string;
}
