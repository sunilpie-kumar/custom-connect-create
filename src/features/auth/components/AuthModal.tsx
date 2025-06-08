
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    console.log('Sending OTP to:', formData.phone);
    setStep('otp');
  };

  const handleOTPSubmit = async () => {
    // Simulate OTP verification
    console.log('Verifying OTP:', otp);
    if (otp === '123456') { // Mock OTP for demo
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(formData));
      onAuthenticated();
      onClose();
      resetForm();
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  const resetForm = () => {
    setStep('form');
    setFormData({ email: '', name: '', phone: '' });
    setOtp('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'form' 
              ? (isSignUp ? 'Sign Up' : 'Sign In')
              : 'Enter OTP'
            }
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>

            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              Send OTP
            </Button>

            <div className="text-center text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the 6-digit OTP sent to {formData.phone}
            </p>
            
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

            <Button 
              onClick={handleOTPSubmit} 
              className="w-full"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>

            <button
              type="button"
              onClick={() => setStep('form')}
              className="w-full text-sm text-gray-600 hover:text-gray-800"
            >
              Back to form
            </button>

            <p className="text-xs text-gray-500 text-center">
              Demo: Use OTP "123456" to login
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
