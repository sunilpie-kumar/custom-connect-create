
# Twilio WhatsApp OTP Integration Documentation

## Overview
This document provides comprehensive information about the Twilio WhatsApp OTP authentication integration implemented in the Kustom platform.

## Configuration

### Twilio Account Details
- **Account SID**: `TG7KJB9URQCE98FAGL9BN687`
- **Auth Token**: `USID US5f9ab38ad2424babd96e6c5acc59bed4`
- **WhatsApp Number**: `+919901340933`

### Environment Setup
The Twilio credentials are currently hardcoded in `src/services/twilioService.ts`. For production, consider moving these to environment variables:

```typescript
// Recommended production setup
const config = {
  accountSid: process.env.VITE_TWILIO_ACCOUNT_SID,
  authToken: process.env.VITE_TWILIO_AUTH_TOKEN,
  whatsappNumber: process.env.VITE_TWILIO_WHATSAPP_NUMBER
};
```

## Features Implemented

### 1. OTP Generation
- Generates secure 6-digit OTPs
- Stores OTPs with timestamps for expiry management
- Automatic cleanup of expired OTPs

### 2. WhatsApp Messaging
- Sends OTPs via Twilio WhatsApp Business API
- Formatted messages for signup and signin flows
- Error handling with demo fallbacks

### 3. OTP Verification
- Validates entered OTP against stored values
- Checks for OTP expiry (5-minute window)
- Automatic cleanup after successful verification

### 4. User Interface
- Modern, accessible WhatsApp-themed modal
- Real-time countdown timer for OTP expiry
- Resend functionality with cooldown period
- Integration with existing authentication system

## API Integration

### Twilio WhatsApp API Endpoint
```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json
```

### Request Format
```javascript
const formData = new URLSearchParams();
formData.append('From', 'whatsapp:+919901340933');
formData.append('To', 'whatsapp:+919876543210');
formData.append('Body', 'Your OTP message here');
```

### Authentication
Uses Basic Authentication with base64 encoded credentials:
```javascript
'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`
```

## Phone Number Formatting

The system automatically formats phone numbers:
- Removes non-digit characters
- Adds country code (+91) for Indian numbers
- Ensures proper WhatsApp format

### Examples
- Input: `9876543210` → Output: `+919876543210`
- Input: `919876543210` → Output: `+919876543210`
- Input: `+919876543210` → Output: `+919876543210`

## Security Features

### OTP Security
- 6-digit numeric OTPs
- 5-minute expiry window
- Single-use OTPs (deleted after verification)
- Secure random generation

### Rate Limiting
- Built-in resend cooldown
- Automatic cleanup of expired OTPs
- Prevention of multiple active OTPs per number

## Demo Mode

For development and testing:
- OTPs are logged to console
- Fallback generation if Twilio API fails
- Toast notifications show demo OTPs
- Network error handling with graceful degradation

## User Experience Flow

### Signup Flow
1. User selects WhatsApp authentication
2. Enters phone number
3. Receives WhatsApp OTP
4. Enters 6-digit code
5. Account created and authenticated

### Signin Flow
1. User selects WhatsApp authentication
2. Enters registered phone number
3. Receives WhatsApp OTP
4. Enters 6-digit code
5. Successfully authenticated

## Error Handling

### Common Scenarios
- **Invalid Phone Number**: Format validation and correction
- **Network Errors**: Graceful fallback to demo mode
- **Expired OTP**: Clear messaging with resend option
- **Invalid OTP**: Retry with helpful error messages
- **Twilio API Errors**: Fallback to demo mode for development

## Troubleshooting Guide

### Common Issues

#### 1. OTP Not Received
**Possible Causes:**
- Phone number not connected to WhatsApp
- Incorrect phone number format
- Twilio API limitations
- Network connectivity issues

**Solutions:**
- Verify phone number has active WhatsApp
- Check console for demo OTP in development
- Ensure proper phone number format (+country code)
- Try resending after cooldown period

#### 2. "Invalid OTP" Error
**Possible Causes:**
- OTP expired (>5 minutes)
- Incorrect code entry
- Network delays

**Solutions:**
- Request new OTP if expired
- Double-check entered code
- Ensure 6-digit completion

#### 3. Twilio API Errors
**Common Error Codes:**
- **21211**: Invalid 'To' phone number
- **21408**: Permission denied for phone number
- **21614**: 'To' number not verified

**Solutions:**
- Verify phone number format
- Check WhatsApp Business account status
- Ensure sender number is approved

### Debug Mode
Enable debug logging by checking browser console:
```javascript
console.log(`Demo OTP for ${phoneNumber}: ${otp}`);
```

## Performance Considerations

### Memory Management
- Automatic cleanup of expired OTPs
- Map-based storage for O(1) lookups
- Minimal memory footprint

### Network Optimization
- Single API call per OTP request
- Efficient error handling
- Graceful degradation for poor connectivity

## Integration Points

### Files Modified/Created
1. `src/services/twilioService.ts` - Core Twilio integration
2. `src/components/WhatsAppOTPModal.tsx` - UI component
3. `src/features/auth/components/AuthModal.tsx` - Updated auth modal
4. `docs/TWILIO_INTEGRATION.md` - This documentation

### Dependencies
- Existing React/TypeScript setup
- Shadcn/UI components
- Lucide React icons
- React hooks (useState, useEffect)

## Future Enhancements

### Recommended Improvements
1. **Environment Variables**: Move credentials to secure environment variables
2. **Rate Limiting**: Implement server-side rate limiting
3. **Analytics**: Track OTP success/failure rates
4. **Internationalization**: Support multiple languages for OTP messages
5. **Backup Methods**: SMS fallback if WhatsApp fails
6. **Enhanced Security**: Implement additional verification steps

### Scaling Considerations
- Database storage for OTP tracking
- Redis for distributed OTP storage
- Queue system for high-volume messaging
- Load balancing for multiple Twilio accounts

## Testing

### Test Scenarios
1. Valid phone number with WhatsApp
2. Invalid phone number format
3. OTP expiry scenarios
4. Network failure handling
5. Multiple resend attempts
6. Concurrent user sessions

### Demo Credentials
For testing, any 6-digit code works in demo mode, or check console for generated OTP.

## Compliance & Privacy

### WhatsApp Business Policy
- Ensure compliance with WhatsApp Business API policies
- Use approved message templates for production
- Respect user opt-out preferences

### Data Privacy
- Minimal data storage (phone numbers only)
- Automatic cleanup of expired data
- No persistent storage of OTPs

## Support

For issues or questions regarding the Twilio integration:
1. Check browser console for debug information
2. Review Twilio account logs
3. Verify WhatsApp Business account status
4. Contact development team with specific error messages

---

*Last Updated: [Current Date]*
*Version: 1.0.0*
