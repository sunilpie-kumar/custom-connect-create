
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, Video, Phone, MessageCircle } from 'lucide-react';

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
  },
  {
    id: 3,
    service: 'Car Customization Planning',
    provider: 'AutoCustom Pro',
    date: 'Dec 12, 2025',
    time: '3:00 PM - 4:30 PM',
    type: 'In Person',
    status: 'confirmed',
    location: 'Downtown Garage',
    price: '$200',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 4,
    service: 'Business Strategy Session',
    provider: 'Anita Reddy',
    date: 'Dec 15, 2025',
    time: '1:00 PM - 2:00 PM',
    type: 'Video Call',
    status: 'confirmed',
    location: 'Online',
    price: '$300',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&q=80'
  }
];

const BookingsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
            <p className="text-slate-600 mt-2">Manage your upcoming and past appointments</p>
          </div>
          <Button onClick={onBack} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-6">
          {bookingsData.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
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
                        {booking.type === 'Video Call' ? (
                          <Button size="sm">
                            <Video className="h-4 w-4 mr-1" />
                            Join Call
                          </Button>
                        ) : (
                          <Button size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call Provider
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
