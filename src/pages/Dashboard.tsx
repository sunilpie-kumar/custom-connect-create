
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Search, 
  Clock, 
  Star,
  Home,
  Wrench,
  Car,
  Heart,
  Briefcase,
  Palette
} from 'lucide-react';

const Dashboard = () => {
  const quickActions = [
    { icon: Search, label: 'Find Services', color: 'text-blue-600' },
    { icon: Calendar, label: 'My Bookings', color: 'text-green-600' },
    { icon: MessageCircle, label: 'Messages', color: 'text-purple-600' },
    { icon: User, label: 'Profile', color: 'text-orange-600' }
  ];

  const serviceCategories = [
    { icon: Home, label: 'Home Services', count: '120+ services' },
    { icon: Wrench, label: 'Repair & Maintenance', count: '85+ services' },
    { icon: Car, label: 'Automotive', count: '45+ services' },
    { icon: Heart, label: 'Health & Wellness', count: '95+ services' },
    { icon: Briefcase, label: 'Business Services', count: '60+ services' },
    { icon: Palette, label: 'Creative Services', count: '75+ services' }
  ];

  const upcomingAppointments = [
    {
      service: 'House Cleaning',
      provider: 'Sarah Johnson',
      date: 'Today, 2:00 PM',
      status: 'confirmed'
    },
    {
      service: 'Plumbing Repair',
      provider: 'Mike Wilson',
      date: 'Tomorrow, 10:00 AM',
      status: 'pending'
    },
    {
      service: 'Car Wash',
      provider: 'AutoClean Pro',
      date: 'Dec 8, 3:00 PM',
      status: 'confirmed'
    }
  ];

  const recentActivity = [
    'House cleaning service completed - Rated 5 stars',
    'New message from Mike Wilson (Plumber)',
    'Booking confirmed for Car Wash service',
    'Profile updated successfully'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
              <p className="text-gray-600">Here's what's happening with your services</p>
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-500">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-gray-500">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
                    >
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                      <span className="text-sm font-medium">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Browse Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceCategories.map((category, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <category.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.label}</h3>
                          <p className="text-sm text-gray-500">{category.count}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.service}</h4>
                          <p className="text-sm text-gray-600">{appointment.provider}</p>
                          <p className="text-sm text-gray-500">{appointment.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      {index < upcomingAppointments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Appointments
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Recommended for You</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-gray-900">Deep House Cleaning</h4>
                    <p className="text-sm text-gray-600">Professional deep cleaning service</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-green-600">$120-180</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">4.9</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-gray-900">Lawn Maintenance</h4>
                    <p className="text-sm text-gray-600">Regular lawn care and maintenance</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-green-600">$80-120</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">4.7</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Explore More Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
