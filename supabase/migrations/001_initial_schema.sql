
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR NOT NULL,
    phone VARCHAR UNIQUE,
    full_name VARCHAR NOT NULL,
    avatar_url VARCHAR,
    user_type VARCHAR CHECK (user_type IN ('customer', 'provider')) DEFAULT 'customer',
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service providers table
CREATE TABLE public.service_providers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    business_name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    description TEXT,
    price_range VARCHAR,
    location VARCHAR,
    image_url VARCHAR,
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat conversations table
CREATE TABLE public.conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_profiles_phone ON public.profiles(phone);
CREATE INDEX idx_service_providers_category ON public.service_providers(category);
CREATE INDEX idx_service_providers_location ON public.service_providers(location);
CREATE INDEX idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX idx_bookings_provider_id ON public.bookings(provider_id);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_conversations_customer_id ON public.conversations(customer_id);
CREATE INDEX idx_conversations_provider_id ON public.conversations(provider_id);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Service providers policies
CREATE POLICY "Anyone can view service providers" ON public.service_providers FOR SELECT USING (true);
CREATE POLICY "Providers can manage own services" ON public.service_providers FOR ALL USING (auth.uid() = user_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (
    auth.uid() = customer_id OR 
    auth.uid() IN (SELECT user_id FROM service_providers WHERE id = provider_id)
);
CREATE POLICY "Customers can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE USING (
    auth.uid() = customer_id OR 
    auth.uid() IN (SELECT user_id FROM service_providers WHERE id = provider_id)
);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (
    auth.uid() = customer_id OR 
    auth.uid() IN (SELECT user_id FROM service_providers WHERE id = provider_id)
);
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (
    auth.uid() = customer_id
);

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON public.messages FOR SELECT USING (
    conversation_id IN (
        SELECT id FROM conversations 
        WHERE customer_id = auth.uid() OR 
        provider_id IN (SELECT id FROM service_providers WHERE user_id = auth.uid())
    )
);
CREATE POLICY "Users can send messages in own conversations" ON public.messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    conversation_id IN (
        SELECT id FROM conversations 
        WHERE customer_id = auth.uid() OR 
        provider_id IN (SELECT id FROM service_providers WHERE user_id = auth.uid())
    )
);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Customers can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = customer_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_providers_updated_at BEFORE UPDATE ON public.service_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
