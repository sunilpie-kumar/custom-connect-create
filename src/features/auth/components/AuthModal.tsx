
import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { apiService } from '@/services/apiService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

interface AuthResponse {
  qrCode?: string;
  manualCode?: string;
  token?: string;
  user?: any;
  message?: string;
}

interface AuthData {
  token: string;
  user: any;
}

const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending OTP to:', form.phone);
    setStep('otp');
  };

  const handleOTPSubmit = async () => {
    setError('');
    try {
      const response = await apiService.auth.verifyOTP(phone, otp);
      if (response.success && response.data) {
        const authData = response.data as AuthData;
        localStorage.setItem('token', authData.token || '');
        localStorage.setItem('user', JSON.stringify(authData.user || {}));
        onAuthenticated();
        onClose();
        resetForm();
      }
    } catch (err) {
      setError('Invalid OTP. Use 123456 for demo.');
    }
  };

  const resetForm = () => {
    setStep('form');
    setPhone('');
    setOtp('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/auth/register`, form);
      setQrCode(res.data.qrCode || null);
      setManualCode(res.data.manualCode || '');
      setStep('otp');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/auth/verify-otp`, {
        phone: form.phone,
        otp,
      });
      setToken(res.data.token || null);
      alert('Login successful!');
      onAuthenticated();
      onClose();
      resetForm();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Invalid OTP');
    }
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone (+1234567890)"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
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
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
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
            <h2>Scan QR and Enter OTP</h2>
            {qrCode && <img src={qrCode} alt="QR Code" />}

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
              onClick={handleVerify}
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
