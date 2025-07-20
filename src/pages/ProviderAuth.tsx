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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Main Card */}
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Provider Access</CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your phone number to continue
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Phone Input Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-center text-lg"
                />
              </div>

              <Button 
                onClick={checkProviderExists}
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold"
              >
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
            </div>

            {/* User Status Messages */}
            {userExists === false && (
              <div className="space-y-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
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
                  className="w-full"
                  variant="default"
                >
                  Create New Provider Account
                </Button>
              </div>
            )}

            {userExists === true && providerData && (
              <div className="space-y-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
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
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                We'll send a verification code to confirm your identity
              </p>
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