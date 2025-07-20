import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import WhatsAppOTPModal from '@/components/WhatsAppOTPModal';

const ProviderAuth = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [providerData, setProviderData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkProviderExists = async () => {
    if (!phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if provider exists by phone
      const response = await fetch(`/api/v1/providers/check-phone?phone=${encodeURIComponent(phone)}`);
      const data = await response.json();
      
      if (data.success) {
        if (data.exists) {
          setUserExists(true);
          setProviderData(data.provider);
          setShowOTP(true);
        } else {
          setUserExists(false);
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to verify phone number. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSuccess = () => {
    setShowOTP(false);
    toast({
      title: "Login Successful",
      description: "Welcome back! Redirecting to your dashboard...",
    });
    
    // Store provider session data
    localStorage.setItem('provider', JSON.stringify(providerData));
    
    // Redirect to provider dashboard
    setTimeout(() => {
      navigate('/provider-dashboard');
    }, 1000);
  };

  const startSignUp = () => {
    // Navigate to provider registration with phone pre-filled
    navigate('/provider-signup', { state: { phone } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-800 hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl relative overflow-hidden">
          {/* Card Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-20 blur-sm"></div>
          <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-lg"></div>
          
          <CardHeader className="text-center space-y-4 relative z-10">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Provider Access
              </CardTitle>
              <CardDescription className="text-base mt-2 text-gray-600">
                Enter your phone number to continue
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 relative z-10">
            {/* Phone Input Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-center text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              <Button 
                onClick={checkProviderExists}
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : "Continue"}
              </Button>
            </div>

            {/* User Status Messages */}
            {userExists === false && (
              <div className="space-y-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border-2 border-amber-200 dark:border-amber-800 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-amber-100 dark:bg-amber-900 rounded-full">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      Account not found
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      No provider account exists with this phone number.
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={startSignUp}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Create New Provider Account
                </Button>
              </div>
            )}

            {userExists === true && providerData && (
              <div className="space-y-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-2 border-green-200 dark:border-green-800 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Account Found
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Welcome back, {providerData.name}! Please verify with OTP.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="text-center pt-4 border-t border-gradient-to-r from-blue-200 to-purple-200">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <p className="text-xs">
                  We'll send a verification code to confirm your identity
                </p>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OTP Modal */}
        {showOTP && (
          <WhatsAppOTPModal
            isOpen={showOTP}
            onClose={() => setShowOTP(false)}
            onAuthenticated={handleOTPSuccess}
            mode="signin"
          />
        )}
      </div>
    </div>
  );
};

export default ProviderAuth;