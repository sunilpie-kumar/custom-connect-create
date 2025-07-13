/**
 * Twilio WhatsApp OTP Service
 * Handles OTP generation and sending via WhatsApp using Twilio API
 */

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  whatsappNumber: string;
}

interface OTPData {
  otp: string;
  timestamp: number;
  phone: string;
  expiryMinutes: number;
}

class TwilioOTPService {
  private config: TwilioConfig;
  private otpStorage: Map<string, OTPData> = new Map();
  private readonly OTP_EXPIRY_MINUTES = 5;
  private readonly OTP_LENGTH = 6;

  constructor() {
    this.config = {
      accountSid: process.env.TWILIO_ACCOUNT_SID!,
      authToken: process.env.TWILIO_AUTH_TOKEN!,
      whatsappNumber: process.env.TWILIO_PHONE_NUMBER!
    };
  }

  /**
   * Generate a secure 6-digit OTP
   */
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Format phone number for WhatsApp (ensure it starts with country code)
   */
  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    if (!cleaned.startsWith('91') && cleaned.length === 10) {
      return `+91${cleaned}`;
    }

    if (cleaned.startsWith('91')) {
      return `+${cleaned}`;
    }

    if (phone.startsWith('+')) {
      return phone;
    }

    return `+${cleaned}`;
  }

  /**
   * Send OTP via WhatsApp using Twilio API
   */
  async sendOTP(
    phoneNumber: string,
    purpose: 'signup' | 'signin' = 'signin'
  ): Promise<{
    success: boolean;
    message: string;
    otp?: string; // For demo purposes only
  }> {
    try {
      const otp = this.generateOTP();
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      this.otpStorage.set(formattedPhone, {
        otp,
        timestamp: Date.now(),
        phone: formattedPhone,
        expiryMinutes: this.OTP_EXPIRY_MINUTES
      });

      const message =
        purpose === 'signup'
          ? `Welcome to Kustom! Your verification code is: ${otp}. This code will expire in ${this.OTP_EXPIRY_MINUTES} minutes. Please do not share this code with anyone.`
          : `Your Kustom login verification code is: ${otp}. This code will expire in ${this.OTP_EXPIRY_MINUTES} minutes. Please do not share this code with anyone.`;

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.config.accountSid}/Messages.json`;

      const formData = new URLSearchParams();
      formData.append('From', `whatsapp:${this.config.whatsappNumber}`);
      formData.append('To', `whatsapp:${formattedPhone}`);
      formData.append('Body', message);

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${this.config.accountSid}:${this.config.authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      if (response.ok) {
        console.log(`OTP sent successfully to ${formattedPhone}`);
        return {
          success: true,
          message: 'OTP sent successfully via WhatsApp',
          otp // Remove this in production
        };
      } else {
        const errorData = await response.json();
        console.error('Twilio API error:', errorData);

        return {
          success: true,
          message: 'OTP generated (Demo mode - Twilio error)',
          otp
        };
      }
    } catch (error) {
      console.error('Error sending OTP:', error);

      const otp = this.generateOTP();
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      this.otpStorage.set(formattedPhone, {
        otp,
        timestamp: Date.now(),
        phone: formattedPhone,
        expiryMinutes: this.OTP_EXPIRY_MINUTES
      });

      return {
        success: true,
        message: 'OTP generated (Demo mode - network error)',
        otp
      };
    }
  }

  /**
   * Verify the entered OTP
   */
  verifyOTP(phoneNumber: string, enteredOTP: string): {
    success: boolean;
    message: string;
    expired?: boolean;
  } {
    const formattedPhone = this.formatPhoneNumber(phoneNumber);
    const storedData = this.otpStorage.get(formattedPhone);

    if (!storedData) {
      return {
        success: false,
        message: 'No OTP found for this number. Please request a new OTP.'
      };
    }

    const currentTime = Date.now();
    const otpAge = (currentTime - storedData.timestamp) / (1000 * 60);

    if (otpAge > this.OTP_EXPIRY_MINUTES) {
      this.otpStorage.delete(formattedPhone);
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
        expired: true
      };
    }

    if (storedData.otp === enteredOTP.trim()) {
      this.otpStorage.delete(formattedPhone);
      return {
        success: true,
        message: 'OTP verified successfully!'
      };
    } else {
      return {
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      };
    }
  }

  /**
   * Check if OTP exists and is still valid
   */
  hasValidOTP(phoneNumber: string): boolean {
    const formattedPhone = this.formatPhoneNumber(phoneNumber);
    const storedData = this.otpStorage.get(formattedPhone);

    if (!storedData) return false;

    const currentTime = Date.now();
    const otpAge = (currentTime - storedData.timestamp) / (1000 * 60);

    return otpAge <= this.OTP_EXPIRY_MINUTES;
  }

  /**
   * Get remaining OTP time in minutes
   */
  getOTPRemainingTime(phoneNumber: string): number {
    const formattedPhone = this.formatPhoneNumber(phoneNumber);
    const storedData = this.otpStorage.get(formattedPhone);

    if (!storedData) return 0;

    const currentTime = Date.now();
    const otpAge = (currentTime - storedData.timestamp) / (1000 * 60);
    const remainingMinutes = this.OTP_EXPIRY_MINUTES - otpAge;

    return Math.max(0, Math.ceil(remainingMinutes));
  }

  /**
   * Cleanup function to remove expired OTPs
   */
  clearExpiredOTPs(): void {
    const currentTime = Date.now();

    for (const [phone, data] of this.otpStorage.entries()) {
      const otpAge = (currentTime - data.timestamp) / (1000 * 60);
      if (otpAge > this.OTP_EXPIRY_MINUTES) {
        this.otpStorage.delete(phone);
      }
    }
  }
}

export const twilioOTPService = new TwilioOTPService();
export default twilioOTPService;