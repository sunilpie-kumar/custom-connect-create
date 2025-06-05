import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Search, 
  Clock, 
  Home,
  Gift,
  Car,
  Building,
  Briefcase,
  Shirt,
  TrendingUp,
  UserPlus,
  Shield,
  ArrowRight
} from 'lucide-react';
import BookingsPage from '@/components/BookingsPage';
import MessagesPage from '@/components/MessagesPage';
import ProfilePage from '@/components/ProfilePage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'bookings' | 'messages' | 'profile'>('dashboard');

  // Sample data for search suggestions
  const searchData = [
    // Categories
    { type: 'category', value: 'house-interior', label: 'House Interior', icon: Home },
    { type: 'category', value: 'gifts-customisation', label: 'Gifts Customisation', icon: Gift },
    { type: 'category', value: 'automotive', label: 'Automotive', icon: Car },
    { type: 'category', value: 'house-construction', label: 'House Construction', icon: Building },
    { type: 'category', value: 'business-services', label: 'Business Services', icon: Briefcase },
    { type: 'category', value: 'women-wear-customisation', label: 'Women Wear Customisation', icon: Shirt },
    
    // Service Providers
    { type: 'provider', value: 'sarah-johnson', label: 'Sarah Johnson - Elite Interior Design', category: 'house-interior' },
    { type: 'provider', value: 'rajesh-kumar', label: 'Rajesh Kumar - AutoCraft Modifications', category: 'automotive' },
    { type: 'provider', value: 'priya-sharma', label: 'Priya Sharma - Personalized Gifts Co.', category: 'gifts-customisation' },
    { type: 'provider', value: 'meera-patel', label: 'Meera Patel - Fashion Forward', category: 'women-wear-customisation' },
    { type: 'provider', value: 'vikram-singh', label: 'Vikram Singh - BuildCraft Construction', category: 'house-construction' },
    { type: 'provider', value: 'anita-reddy', label: 'Anita Reddy - TechSolutions Pro', category: 'business-services' },
  ];

  const quickActions = [
    { 
      icon: Search, 
      label: 'Find Services', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      hoverBg: 'hover:bg-blue-100',
      action: () => setOpen(true)
    },
    { 
      icon: Calendar, 
      label: 'My Bookings', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      hoverBg: 'hover:bg-emerald-100',
      action: () => setCurrentView('bookings')
    },
    { 
      icon: MessageCircle, 
      label: 'Messages', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50', 
      hoverBg: 'hover:bg-purple-100',
      action: () => setCurrentView('messages')
    },
    { 
      icon: User, 
      label: 'Profile', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50', 
      hoverBg: 'hover:bg-orange-100',
      action: () => setCurrentView('profile')
    }
  ];

  const serviceCategories = [
    { 
      icon: Home, 
      label: 'House Interior', 
      count: '120+ providers', 
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      category: 'house-interior',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80',
      description: 'Transform your space with expert interior designers'
    },
    { 
      icon: Gift, 
      label: 'Gifts Customisation', 
      count: '85+ providers', 
      color: 'text-green-600', 
      bg: 'bg-green-100',
      category: 'gifts-customisation',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=600&q=80',
      description: 'Create unique personalized gifts for every occasion'
    },
    { 
      icon: Car, 
      label: 'Automotive', 
      count: '45+ providers', 
      color: 'text-red-600', 
      bg: 'bg-red-100',
      category: 'automotive',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80',
      description: 'Custom car modifications and detailing services'
    },
    { 
      icon: Building, 
      label: 'House Construction', 
      count: '95+ providers', 
      color: 'text-pink-600', 
      bg: 'bg-pink-100',
      category: 'house-construction',
      image: 'https://images.unsplash.com/photo-1541889677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
      description: 'Build your dream home with trusted contractors'
    },
    { 
      icon: Briefcase, 
      label: 'Business Services', 
      count: '60+ providers', 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-100',
      category: 'business-services',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80',
      description: 'Professional services to grow your business'
    },
    { 
      icon: Shirt, 
      label: 'Women Wear Customisation', 
      count: '75+ providers', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100',
      category: 'women-wear-customisation',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
      description: 'Custom fashion designs and tailoring services'
    }
  ];

  const upcomingAppointments = [
    {
      service: 'Interior Design Consultation',
      provider: 'Sarah Johnson',
      date: 'Today, 2:00 PM',
      status: 'confirmed'
    },
    {
      service: 'Custom Gift Creation',
      provider: 'Mike Wilson',
      date: 'Tomorrow, 10:00 AM',
      status: 'pending'
    },
    {
      service: 'Car Customization',
      provider: 'AutoCustom Pro',
      date: 'Dec 8, 3:00 PM',
      status: 'confirmed'
    }
  ];

  const newProviders = [
    {
      name: 'Elena Rodriguez',
      service: 'Interior Design',
      location: 'Downtown',
      rating: 'New',
      experience: '8+ years',
      specialties: ['Modern Design', 'Space Planning'],
      joinedDate: '2 days ago',
      verified: true
    },
    {
      name: 'CustomCraft Solutions',
      service: 'Gift Customization',
      location: 'Arts District',
      rating: 'New',
      experience: '5+ years',
      specialties: ['Personalized Gifts', 'Custom Engravings'],
      joinedDate: '1 week ago',
      verified: true
    },
    {
      name: 'BuildRight Construction',
      service: 'House Construction',
      location: 'Suburban Area',
      rating: 'New',
      experience: '10+ years',
      specialties: ['Modern Homes', 'Eco-Friendly Building'],
      joinedDate: '3 days ago',
      verified: false
    }
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/services?category=${category}`);
  };

  const handleQuickAction = (action: () => void) => {
    action();
  };

  const handleSearchSelect = (item: any) => {
    setOpen(false);
    if (item.type === 'category') {
      navigate(`/services?category=${item.value}`);
    } else if (item.type === 'provider') {
      navigate(`/services?category=${item.category}&provider=${item.value}`);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Show different views based on currentView state
  if (currentView === 'bookings') {
    return <BookingsPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'messages') {
    return <MessagesPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'profile') {
    return <ProfilePage onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Welcome back, John!
              </h1>
              <p className="text-slate-600 mt-1">Discover trusted service providers in your area</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex-1 lg:flex-none">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-slate-600">Services Booked</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex-1 lg:flex-none">
                <div className="text-2xl font-bold text-emerald-600">3</div>
                <div className="text-sm text-slate-600">Active Requests</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex-1 lg:flex-none">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-slate-600">Your Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleQuickAction(action.action)}
                      className={`h-20 sm:h-24 flex flex-col items-center justify-center space-y-2 border-0 ${action.bg} ${action.hoverBg} transition-all duration-200 hover:scale-105 hover:shadow-md`}
                    >
                      <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.color}`} />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 text-center">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Categories - Updated to List Form with Image Cards */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-800">Browse Service Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceCategories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryClick(category.category)}
                      className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                    >
                      <div className="flex items-center">
                        {/* Image Section */}
                        <div className="relative w-32 h-24 flex-shrink-0">
                          <img 
                            src={category.image} 
                            alt={category.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                          <div className={`absolute top-3 left-3 p-2 ${category.bg} rounded-lg`}>
                            <category.icon className={`h-4 w-4 ${category.color}`} />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 text-lg mb-1">{category.label}</h3>
                              <p className="text-sm text-slate-600 mb-2">{category.description}</p>
                              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                {category.count}
                              </span>
                            </div>
                            <div className="flex items-center text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                              <ArrowRight className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-xl text-slate-800">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start p-4 bg-white/80 rounded-xl">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate">{appointment.service}</h4>
                          <p className="text-sm text-slate-600 mt-1 truncate">{appointment.provider}</p>
                          <p className="text-sm text-slate-500 mt-1">{appointment.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2 ${
                          appointment.status === 'confirmed' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      {index < upcomingAppointments.length - 1 && <Separator className="mt-4 bg-slate-200" />}
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
                  View All Appointments
                </Button>
              </CardContent>
            </Card>

            {/* New Providers */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-xl text-slate-800">
                  <UserPlus className="h-5 w-5 text-green-600" />
                  <span>New Providers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newProviders.map((provider, index) => (
                    <div key={index} className="p-4 border-0 rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate">{provider.name}</h4>
                          {provider.verified && (
                            <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{provider.joinedDate}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2 truncate">{provider.service} • {provider.location}</p>
                      <p className="text-xs text-slate-500 mb-3">{provider.experience} experience</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {provider.specialties.map((specialty, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                          {provider.rating}
                        </span>
                        <Button variant="outline" size="sm" className="text-xs">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
                  Explore All New Providers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Search Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for services or providers..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            {searchData.filter(item => item.type === 'category').map((item) => (
              <CommandItem key={item.value} onSelect={() => handleSearchSelect(item)}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Service Providers">
            {searchData.filter(item => item.type === 'provider').map((item) => (
              <CommandItem key={item.value} onSelect={() => handleSearchSelect(item)}>
                <User className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Dashboard;
