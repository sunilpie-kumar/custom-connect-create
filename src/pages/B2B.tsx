
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BusinessForm from '@/components/BusinessForm';
import BusinessHistory from '@/components/BusinessHistory';

const B2B = () => {
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Kustom</span> Business
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our platform and connect with customers looking for your services
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form" className="text-lg py-3">Business Registration</TabsTrigger>
              <TabsTrigger value="history" className="text-lg py-3">Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form">
              <BusinessForm />
            </TabsContent>
            
            <TabsContent value="history">
              <BusinessHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default B2B;
