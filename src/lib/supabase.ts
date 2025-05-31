
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  email: string
  phone?: string
  full_name: string
  avatar_url?: string
  user_type: 'customer' | 'provider'
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface ServiceProvider {
  id: string
  user_id: string
  business_name: string
  category: string
  description?: string
  price_range?: string
  location?: string
  image_url?: string
  rating: number
  review_count: number
  verified: boolean
  created_at: string
  updated_at: string
  profiles?: Profile
}

export interface Booking {
  id: string
  customer_id: string
  provider_id: string
  booking_date: string
  booking_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  customer_id: string
  provider_id: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  created_at: string
}
