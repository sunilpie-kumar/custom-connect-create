import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceCard from '@/components/ServiceCard';
import RealAuthModal from '@/components/RealAuthModal';
import ChatModal from '@/components/ChatModal';
import BookingModal from '@/components/BookingModal';
import { ArrowLeft, Search, Filter, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, ServiceProvider } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const mockProviders = [
  {
    id: '1',
    name: 'Sarah Johnson',
    businessName: 'Elite Interior Design',
    category: 'House Decor',
    rating: 4.9,
    reviewCount: 127,
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80',
    description: 'Transform your space with modern, elegant interior designs tailored to your lifestyle.',
    price: '₹15,000/room',
    verified: true
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    businessName: 'AutoCraft Modifications',
    category: 'Automobile',
    rating: 4.8,
    reviewCount: 89,
    location: 'Delhi, NCR',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=400&q=80',
    description: 'Professional car modifications and customization services with premium quality parts.',
    price: '₹25,000+',
    verified: true
  },
  {
    id: '3',
    name: 'Priya Sharma',
    businessName: 'Personalized Gifts Co.',
    category: 'Gifts',
    rating: 4.7,
    reviewCount: 156,
    location: 'Bangalore, Karnataka',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
    description: 'Create memorable personalized gifts for your loved ones with our custom crafting services.',
    price: '₹500+',
    verified: true
  },
  {
    id: '4',
    name: 'Meera Patel',
    businessName: 'Fashion Forward',
    category: 'Women Wear',
    rating: 4.9,
    reviewCount: 203,
    location: 'Ahmedabad, Gujarat',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
    description: 'Custom tailored women\'s clothing and fashion consulting for the modern woman.',
    price: '₹3,000+',
    verified: true
  },
  {
    id: '5',
    name: 'Vikram Singh',
    businessName: 'BuildCraft Construction',
    category: 'Construction',
    rating: 4.6,
    reviewCount: 78,
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80',
    description: 'Complete construction and renovation services with modern architectural solutions.',
    price: '₹500/sq.ft',
    verified: true
  },
  {
    id: '6',
    name: 'Anita Reddy',
    businessName: 'TechSolutions Pro',
    category: 'Technology',
    rating: 4.8,
    reviewCount: 134,
    location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
    description: 'Custom software development and IT consulting services for businesses of all sizes.',
    price: '₹50,000+',
    verified: true
  },
  {
    id: '7',
    name: 'Rohit Gupta',
    businessName: 'Modern Spaces',
    category: 'House Decor',
    rating: 4.7,
    reviewCount: 91,
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80',
    description: 'Minimalist interior design solutions that blend functionality with aesthetic appeal.',
    price: '₹12,000/room',
    verified: true
  },
  {
    id: '8',
    name: 'Kavya Nair',
    businessName: 'Artisan Gifts',
    category: 'Gifts',
    rating: 4.9,
    reviewCount: 167,
    location: 'Kochi, Kerala',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
    description: 'Handcrafted personalized gifts and custom art pieces for special occasions.',
    price: '₹800+',
    verified: true
  }
];

const categories = ['All', 'House Decor', 'Automobile', 'Gifts', 'Women Wear', 'Construction', 'Technology'];

const Services = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `);

      if (error) throw error;

      // If no data from Supabase, use mock data
      if (!data || data.length === 0) {
        setProviders(mockProviders as any);
        setFilteredProviders(mockProviders as any);
      } else {
        setProviders(data);
        setFilteredProviders(data);
      }
    } catch (error: any) {
      console.error('Error fetching providers:', error);
      // Fallback to mock data
      setProviders(mockProviders as any);
      setFilteredProviders(mockProviders as any);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProviders(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProviders(searchTerm, category);
  };

  const filterProviders = (term: string, category: string) => {
    let filtered = providers;
    
    if (category !== 'All') {
      filtered = filtered.filter(provider => provider.category === category);
    }
    
    if (term) {
      filtered = filtered.filter(provider => 
        provider.business_name.toLowerCase().includes(term.toLowerCase()) ||
        provider.category.toLowerCase().includes(term.toLowerCase()) ||
        (provider.profiles?.full_name || '').toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredProviders(filtered);
  };

  const handleChatClick = (provider: ServiceProvider) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedProvider(provider);
    setShowChatModal(true);
  };

  const handleCallClick = (provider: ServiceProvider) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAuthenticated = () => {
    toast({
      title: "Welcome!",
      description: "You're now signed in and can access all features.",
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome, {profile?.full_name || user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h1>
            <p className="text-gray-600">Connect with verified professionals across various categories</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search services, businesses, or categories..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 py-3"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProviders.length} service{filteredProviders.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Service providers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProviders.map((provider) => (
            <ServiceCard 
              key={provider.id} 
              provider={provider}
              onChatClick={handleChatClick}
              onCallClick={handleCallClick}
            />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No services found</div>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <RealAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
      
      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        provider={selectedProvider}
      />
      
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        provider={selectedProvider}
      />
    </div>
  );
};

export default Services;
