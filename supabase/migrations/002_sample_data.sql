
-- Insert sample service providers (you'll need to create user accounts first)
-- This is just an example - in production, users would sign up and create their provider profiles

-- First, let's insert some sample data that matches the mock data structure
-- Note: In a real app, these would be created through the signup process

INSERT INTO public.service_providers (
  user_id, business_name, category, description, price_range, location, image_url, rating, review_count, verified
) VALUES 
  (
    uuid_generate_v4(),
    'Elite Interior Design',
    'House Decor',
    'Transform your space with modern, elegant interior designs tailored to your lifestyle.',
    '₹15,000/room',
    'Mumbai, Maharashtra',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80',
    4.9,
    127,
    true
  ),
  (
    uuid_generate_v4(),
    'AutoCraft Modifications',
    'Automobile',
    'Professional car modifications and customization services with premium quality parts.',
    '₹25,000+',
    'Delhi, NCR',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=400&q=80',
    4.8,
    89,
    true
  ),
  (
    uuid_generate_v4(),
    'Personalized Gifts Co.',
    'Gifts',
    'Create memorable personalized gifts for your loved ones with our custom crafting services.',
    '₹500+',
    'Bangalore, Karnataka',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
    4.7,
    156,
    true
  ),
  (
    uuid_generate_v4(),
    'Fashion Forward',
    'Women Wear',
    'Custom tailored women''s clothing and fashion consulting for the modern woman.',
    '₹3,000+',
    'Ahmedabad, Gujarat',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
    4.9,
    203,
    true
  ),
  (
    uuid_generate_v4(),
    'BuildCraft Construction',
    'Construction',
    'Complete construction and renovation services with modern architectural solutions.',
    '₹500/sq.ft',
    'Pune, Maharashtra',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80',
    4.6,
    78,
    true
  ),
  (
    uuid_generate_v4(),
    'TechSolutions Pro',
    'Technology',
    'Custom software development and IT consulting services for businesses of all sizes.',
    '₹50,000+',
    'Hyderabad, Telangana',
    'https://images.unsplash.com/photo-1488590528505-98d5aba04b?auto=format&fit=crop&w=400&q=80',
    4.8,
    134,
    true
  );
