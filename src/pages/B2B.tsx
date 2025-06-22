
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, TrendingUp, Shield, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessForm from '@/features/business/components/BusinessForm';
import BusinessHistory from '@/components/BusinessHistory';

const B2B = () => {
  const [activeTab, setActiveTab] = useState('form');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Enhanced Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-gray-50 border-gray-200 rounded-xl px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Go back to home page"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Button>
              
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Trusted Platform</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                  <Award className="h-4 w-4 text-green-600" />
                  <span>Verified Providers</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
                  <span className="text-sm font-semibold text-blue-700">🚀 Join 500+ Verified Providers</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">
                    Kustom
                  </span>{' '}
                  Business
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Join our platform and connect with thousands of customers looking for your services. 
                  Start growing your business today with our trusted marketplace.
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-gray-600 font-medium">Active Customers</div>
                  <div className="text-sm text-gray-500 mt-1">Searching for services daily</div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-gray-600 font-medium">Business Growth</div>
                  <div className="text-sm text-gray-500 mt-1">Average increase in bookings</div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-4">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
                  <div className="text-gray-600 font-medium">Provider Rating</div>
                  <div className="text-sm text-gray-500 mt-1">Average satisfaction score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-14 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm rounded-2xl p-1">
                <TabsTrigger 
                  value="form" 
                  className="text-lg py-3 px-6 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  Registration
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="text-lg py-3 px-6 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="form" className="mt-0">
              <BusinessForm />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <BusinessHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default B2B;
