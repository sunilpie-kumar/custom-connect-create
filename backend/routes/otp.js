const express = require("express");
const { body, validationResult } = require("express-validator");
const twilio = require("twilio");

const router = express.Router();

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (!accountSid || !authToken || !serviceSid) {
  console.error("Missing Twilio configuration. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_VERIFY_SERVICE_SID in your environment variables.");
}

const client = twilio(accountSid, authToken);

// Validation middleware for phone number
const validatePhoneNumber = [
  body("phoneNumber")
    .trim()
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage("Phone number must be in E.164 format (e.g., +1234567890)")
];

// Validation middleware for OTP verification
const validateOTPVerification = [
  body("phoneNumber")
    .trim()
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage("Phone number must be in E.164 format (e.g., +1234567890)"),
  body("code")
    .trim()
    .isLength({ min: 4, max: 6 })
    .isNumeric()
    .withMessage("OTP code must be 4-6 digits")
];

// @route   POST /api/v1/otp/send
// @desc    Send OTP to phone number
// @access  Public
router.post("/send", validatePhoneNumber, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { phoneNumber } = req.body;

    // Check if Twilio is properly configured
    if (!accountSid || !authToken || !serviceSid) {
      return res.status(500).json({
        success: false,
        message: "Twilio service is not properly configured"
      });
    }

    // Send OTP using Twilio Verify
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications
      .create({
        to: phoneNumber,
        channel: "whatsapp"
      });

    res.json({
      success: true,
      message: "OTP sent successfully",
      data: {
        sid: verification.sid,
        status: verification.status,
        to: verification.to,
        channel: verification.channel,
        valid: verification.valid
      }
    });

  } catch (error) {
    console.error("Error sending OTP:", error);

    // Handle Twilio specific errors
    if (error.code) {
      let message = "Failed to send OTP";
      
      switch (error.code) {
        case 20003:
          message = "Authentication failed - invalid Twilio credentials";
          break;
        case 21211:
          message = "Invalid phone number format";
          break;
        case 21608:
          message = "Phone number is not a valid mobile number";
          break;
        case 21614:
          message = "Phone number is not a mobile number";
          break;
        case 60200:
          message = "Invalid verification service configuration";
          break;
        case 60202:
          message = "Max send attempts reached for this phone number";
          break;
        default:
          message = error.message || "Failed to send OTP";
      }

      return res.status(400).json({
        success: false,
        message: message,
        error_code: error.code
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error occurred while sending OTP"
    });
  }
});

// @route   POST /api/v1/otp/verify
// @desc    Verify OTP code
// @access  Public
router.post("/verify", validateOTPVerification, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { phoneNumber, code } = req.body;

    // Check if Twilio is properly configured
    if (!accountSid || !authToken || !serviceSid) {
      return res.status(500).json({
        success: false,
        message: "Twilio service is not properly configured"
      });
    }

    // Verify OTP using Twilio Verify
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks
      .create({
        to: phoneNumber,
        code: code
      });

    if (verificationCheck.status === "approved") {
      res.json({
        success: true,
        message: "OTP verified successfully",
        data: {
          sid: verificationCheck.sid,
          status: verificationCheck.status,
          to: verificationCheck.to,
          channel: verificationCheck.channel,
          valid: verificationCheck.valid
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid or expired OTP code",
        data: {
          status: verificationCheck.status,
          valid: verificationCheck.valid
        }
      });
    }

  } catch (error) {
    console.error("Error verifying OTP:", error);

    // Handle Twilio specific errors
    if (error.code) {
      let message = "Failed to verify OTP";
      
      switch (error.code) {
        case 20003:
          message = "Authentication failed - invalid Twilio credentials";
          break;
        case 20404:
          message = "Invalid verification code or phone number";
          break;
        case 60200:
          message = "Invalid verification service configuration";
          break;
        case 60202:
          message = "Max verification attempts reached";
          break;
        default:
          message = error.message || "Failed to verify OTP";
      }

      return res.status(400).json({
        success: false,
        message: message,
        error_code: error.code
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error occurred while verifying OTP"
    });
  }
});

// @route   GET /api/v1/otp/status
// @desc    Check Twilio service status
// @access  Public
router.get("/status", (req, res) => {
  const isConfigured = !!(accountSid && authToken && serviceSid);
  
  res.json({
    success: true,
    data: {
      configured: isConfigured,
      account_sid: accountSid ? `${accountSid.substring(0, 8)}...` : null,
      service_sid: serviceSid ? `${serviceSid.substring(0, 8)}...` : null,
      message: isConfigured 
        ? "Twilio service is properly configured" 
        : "Twilio service requires configuration"
    }
  });
});

module.exports = router;

