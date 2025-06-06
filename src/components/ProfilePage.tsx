import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  Edit3, 
  Camera,
  Heart,
  MessageCircle,
  Clock,
  Award,
  Video,
  Send
} from 'lucide-react';
import { useState } from 'react';

const userProfile = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: 'January 2024',
  rating: 4.8,
  totalBookings: 12,
  favoriteServices: 3,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  bio: 'I love discovering unique service providers and creating beautiful spaces. Always looking for the next creative project!'
};

const bookingsData = [
  {
    id: 1,
    service: 'Interior Design Consultation',
    provider: 'Sarah Johnson',
    date: 'Dec 8, 2025',
    time: '2:00 PM - 3:00 PM',
    type: 'Video Call',
    status: 'confirmed',
    location: 'Online',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    service: 'Custom Gift Consultation',
    provider: 'Mike Wilson',
    date: 'Dec 10, 2025',
    time: '10:00 AM - 11:00 AM',
    type: 'In Person',
    status: 'pending',
    location: 'Arts District Studio',
    price: '$80',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=100&q=80'
  }
];

const conversationsData = [
  {
    id: 1,
    provider: 'Sarah Johnson',
    service: 'Interior Design',
    lastMessage: 'I\'ve prepared some initial sketches for your living room. Would you like to schedule a call to discuss them?',
    timestamp: '2 hours ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6be4d1e?auto=format&fit=crop&w=50&q=80'
  },
  {
    id: 2,
    provider: 'Mike Wilson',
    service: 'Custom Gifts',
    lastMessage: 'Perfect! I\'ll start working on the personalized photo album. Expected completion is next week.',
    timestamp: '1 day ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Completed consultation',
    provider: 'Sarah Johnson',
    service: 'Interior Design Consultation',
    date: '2 days ago'
  },
  {
    id: 2,
    action: 'Left a review',
    provider: 'Mike Wilson',
    service: 'Custom Gift Creation',
    date: '1 week ago'
  },
  {
    id: 3,
    action: 'Booked service',
    provider: 'AutoCustom Pro',
    service: 'Car Customization',
    date: '2 weeks ago'
  },
  {
    id: 4,
    action: 'Added to favorites',
    provider: 'Anita Reddy',
    service: 'Business Strategy',
    date: '3 weeks ago'
  }
];

const ProfilePage = ({ onBack }: { onBack: () => void }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-600 mt-2">Manage your account and preferences</p>
          </div>
          <Button onClick={onBack} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{userProfile.name}</h2>
              <p className="text-slate-600 mb-4">{userProfile.email}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.totalBookings}</div>
                  <div className="text-xs text-slate-600">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{userProfile.rating}</div>
                  <div className="text-xs text-slate-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{userProfile.favoriteServices}</div>
                  <div className="text-xs text-slate-600">Favorites</div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userProfile.name} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userProfile.email} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={userProfile.phone} />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={userProfile.location} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={userProfile.bio} />
                    </div>
                    <Button className="w-full">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      My Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookingsData.map((booking) => (
                        <div key={booking.id} className="flex items-center space-x-4 p-4 bg-white/80 rounded-lg">
                          <img 
                            src={booking.image} 
                            alt={booking.service}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-slate-900">{booking.service}</h3>
                              <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{booking.provider}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-slate-600">
                                <div className="flex items-center space-x-1">
                                  {booking.type === 'Video Call' ? (
                                    <Video className="h-4 w-4" />
                                  ) : (
                                    <MapPin className="h-4 w-4" />
                                  )}
                                  <span>{booking.location}</span>
                                </div>
                                <span className="font-semibold text-slate-900">{booking.price}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                                <Button size="sm">
                                  {booking.type === 'Video Call' ? 'Join Call' : 'Call Provider'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {conversationsData.map((conversation) => (
                        <div key={conversation.id} className="p-4 bg-white/80 rounded-lg">
                          <div className="flex items-center space-x-3 mb-3">
                            <img 
                              src={conversation.avatar} 
                              alt={conversation.provider}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 truncate">{conversation.provider}</h3>
                                {conversation.unread > 0 && (
                                  <Badge className="bg-blue-600">{conversation.unread}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 truncate">{conversation.service}</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">{conversation.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500">{conversation.timestamp}</p>
                            <Button size="sm" variant="outline">
                              Reply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-white/80 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white/80 rounded-lg">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Award className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              <span className="font-medium">{activity.action}</span> with {activity.provider}
                            </p>
                            <p className="text-sm text-slate-600">{activity.service}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
