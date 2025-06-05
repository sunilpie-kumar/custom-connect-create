
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search, Send, Paperclip, User } from 'lucide-react';
import { useState } from 'react';

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
  },
  {
    id: 3,
    provider: 'AutoCustom Pro',
    service: 'Car Modification',
    lastMessage: 'We have all the parts ready for your car modification. When would be a good time to bring your vehicle in?',
    timestamp: '2 days ago',
    unread: 1,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80'
  },
  {
    id: 4,
    provider: 'Anita Reddy',
    service: 'Business Consulting',
    lastMessage: 'Thank you for the productive session today. I\'ve sent over the action items we discussed.',
    timestamp: '3 days ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80'
  }
];

const currentConversation = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    message: 'Hi John! I hope you\'re doing well. I wanted to follow up on our interior design consultation.',
    timestamp: '10:30 AM',
    isProvider: true
  },
  {
    id: 2,
    sender: 'You',
    message: 'Hi Sarah! Yes, I\'m excited to see what ideas you have for the living room.',
    timestamp: '10:32 AM',
    isProvider: false
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    message: 'Great! I\'ve been working on some concepts based on your preferences. I have a modern minimalist approach and a cozy traditional style option.',
    timestamp: '10:35 AM',
    isProvider: true
  },
  {
    id: 4,
    sender: 'Sarah Johnson',
    message: 'I\'ve prepared some initial sketches for your living room. Would you like to schedule a call to discuss them?',
    timestamp: '10:37 AM',
    isProvider: true
  }
];

const MessagesPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedConversation, setSelectedConversation] = useState(conversationsData[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
            <p className="text-slate-600 mt-2">Chat with your service providers</p>
          </div>
          <Button onClick={onBack} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {conversationsData.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedConversation.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
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
                        <p className="text-xs text-slate-500 mt-1 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-slate-400 mt-1">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm h-full flex flex-col">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedConversation.avatar} 
                    alt={selectedConversation.provider}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedConversation.provider}</h3>
                    <p className="text-sm text-slate-600">{selectedConversation.service}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-4">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  {currentConversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isProvider ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isProvider 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isProvider ? 'text-slate-500' : 'text-blue-100'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-2 border-t pt-4">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
