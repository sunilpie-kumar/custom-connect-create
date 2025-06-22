
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { MessageCircle, Timer, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import twilioOTPService from '@/services/twilioService';

interface WhatsAppOTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  mode?: 'signup' | 'signin';
}

const WhatsAppOTPModal = ({ 
  isOpen, 
  onClose, 
  onAuthenticated, 
  mode = 'signin' 
}: WhatsAppOTPModalProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const { toast } = useToast();

  // Timer for OTP expiry
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (step === 'otp' && remainingTime > 0) {
      interval = setInterval(() => {
        const newRemainingTime = twilioOTPService.getOTPRemainingTime(phoneNumber);
        setRemainingTime(newRemainingTime);
        
        if (newRemainingTime === 0) {
          setCanResend(true);
          toast({
            title: "OTP Expired",
            description: "Your OTP has expired. Please request a new one.",
            variant: "destructive"
          });
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, remainingTime, phoneNumber, toast]);

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await twilioOTPService.sendOTP(phoneNumber, mode);
      
      if (result.success) {
        setStep('otp');
        setRemainingTime(5); // 5 minutes
        setCanResend(false);
        
        toast({
          title: "OTP Sent!",
          description: `Verification code sent to your WhatsApp: ${phoneNumber}`,
        });

        // For demo - show OTP in console
        if (result.otp) {
          console.log(`Demo OTP for ${phoneNumber}: ${result.otp}`);
          toast({
            title: "Demo Mode",
            description: `Demo OTP: ${result.otp} (Check console)`,
            variant: "default"
          });
        }
      } else {
        toast({
          title: "Failed to Send OTP",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Complete OTP Required",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = twilioOTPService.verifyOTP(phoneNumber, otp);
      
      if (result.success) {
        // Store user data (simple demo implementation)
        const userData = {
          phone: phoneNumber,
          authenticated: true,
          timestamp: Date.now()
        };
        
        localStorage.setItem('whatsapp_auth_token', 'verified_' + Date.now());
        localStorage.setItem('whatsapp_user', JSON.stringify(userData));
        
        toast({
          title: "Success!",
          description: "You have been successfully verified via WhatsApp",
        });
        
        onAuthenticated();
        handleClose();
      } else {
        toast({
          title: "Verification Failed",
          description: result.message,
          variant: "destructive"
        });
        
        if (result.expired) {
          setCanResend(true);
          setRemainingTime(0);
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    setOtp('');
    
    try {
      const result = await twilioOTPService.sendOTP(phoneNumber, mode);
      
      if (result.success) {
        setRemainingTime(5);
        setCanResend(false);
        
        toast({
          title: "OTP Resent!",
          description: "New verification code sent to your WhatsApp",
        });

        // For demo
        if (result.otp) {
          console.log(`Demo OTP for ${phoneNumber}: ${result.otp}`);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    setRemainingTime(0);
    setCanResend(true);
    onClose();
  };

  const formatTime = (minutes: number): string => {
    if (minutes <= 0) return '0:00';
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            WhatsApp Verification
          </DialogTitle>
        </DialogHeader>

        {step === 'phone' ? (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600 mb-4">
              {mode === 'signup' 
                ? 'Create your account with WhatsApp verification'
                : 'Sign in using WhatsApp verification'
              }
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-phone">WhatsApp Phone Number</Label>
              <Input
                id="whatsapp-phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center text-lg"
              />
              <p className="text-xs text-gray-500 text-center">
                Make sure this number is connected to WhatsApp
              </p>
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={isLoading || !phoneNumber.trim()}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send OTP via WhatsApp
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Enter the 6-digit code sent to
              </p>
              <p className="font-medium text-green-600">{phoneNumber}</p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {remainingTime > 0 && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Timer className="h-4 w-4" />
                <span>Expires in: {formatTime(remainingTime)}</span>
              </div>
            )}

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <div className="text-center space-y-2">
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                disabled={!canResend || isLoading}
                className="text-sm"
              >
                {canResend ? 'Resend OTP' : `Resend in ${formatTime(remainingTime)}`}
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setStep('phone')}
                className="text-sm text-gray-600"
              >
                Change Phone Number
              </Button>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-600 text-center">
                <strong>Demo Mode:</strong> Use any 6-digit code or check console for demo OTP
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppOTPModal;
