
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, FileText, CheckCircle, XCircle } from 'lucide-react';

// Mock data for demonstration
const upcomingAppointments = [
  {
    id: 1,
    customer: 'John Doe',
    type: 'video',
    date: '2025-05-28',
    time: '10:00 AM',
    service: 'Kitchen Renovation Consultation'
  },
  {
    id: 2,
    customer: 'Sarah Smith',
    type: 'in-person',
    date: '2025-05-29',
    time: '2:00 PM',
    service: 'Living Room Design'
  }
];

const previousOrders = [
  {
    id: 1,
    customer: 'Mike Johnson',
    service: 'Bedroom Interior Design',
    date: '2025-05-20',
    amount: '$2,500',
    status: 'completed'
  },
  {
    id: 2,
    customer: 'Emily Davis',
    service: 'Home Office Setup',
    date: '2025-05-15',
    amount: '$1,800',
    status: 'completed'
  }
];

const quotations = [
  {
    id: 1,
    customer: 'Robert Wilson',
    service: 'Full House Renovation',
    date: '2025-05-25',
    amount: '$15,000',
    status: 'pending'
  },
  {
    id: 2,
    customer: 'Lisa Brown',
    service: 'Bathroom Remodel',
    date: '2025-05-22',
    amount: '$5,200',
    status: 'accepted'
  }
];

const BusinessHistory = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Business Dashboard</CardTitle>
          <CardDescription>
            Manage your appointments, orders, and business activities
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {appointment.type === 'video' ? (
                        <Video className="h-6 w-6 text-blue-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-green-500" />
                      )}
                      <div>
                        <h3 className="font-semibold">{appointment.customer}</h3>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant={appointment.type === 'video' ? 'default' : 'secondary'}>
                      {appointment.type === 'video' ? 'Video Call' : 'In Person'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="font-semibold">{order.customer}</h3>
                        <p className="text-sm text-gray-600">{order.service}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{order.amount}</p>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quotations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotations.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{quote.customer}</h3>
                        <p className="text-sm text-gray-600">{quote.service}</p>
                        <p className="text-sm text-gray-500">{quote.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{quote.amount}</p>
                      <Badge variant={quote.status === 'accepted' ? 'default' : 'secondary'}>
                        {quote.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">24</div>
                <p className="text-sm text-gray-600">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">$12,450</div>
                <p className="text-sm text-gray-600">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">7</div>
                <p className="text-sm text-gray-600">Awaiting response</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessHistory;
