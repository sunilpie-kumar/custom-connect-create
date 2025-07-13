const express = require('express');
const { body, validationResult } = require('express-validator');
const Provider = require('../models/Provider');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Validation middleware (reuse from providers.js)
const validateProvider = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be between 1-100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Phone number is required'),
  body('company_name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Company name is required and must be between 1-200 characters'),
  body('service_type')
    .isIn(['House Decor', 'Automobile', 'Gifts', 'Women Wear', 'Construction', 'Technology', 'Other Services'])
    .withMessage('Please select a valid service type'),
  body('experience_years')
    .isInt({ min: 0, max: 100 })
    .withMessage('Experience years must be a number between 0-100'),
  body('location')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location is required and must be between 1-100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Description is required and must be between 1-2000 characters'),
];

// @route   POST /api/v1/business/register
// @desc    Register a new business (same as provider)
// @access  Public
router.post('/register', validateProvider, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      company_name,
      service_type,
      experience_years,
      location,
      description
    } = req.body;

    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: 'Provider with this email already exists'
      });
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const provider = new Provider({
      name,
      email,
      phone,
      company_name,
      service_type,
      experience_years: parseInt(experience_years),
      location,
      description,
      emailVerificationToken,
      emailVerificationExpires
    });

    await provider.save();

    // Send verification email
    const verifyUrl = `${process.env.FRONTEND_URL 
      // || 'http://localhost:3000'

    }/verify-email?token=${emailVerificationToken}&email=${encodeURIComponent(email)}`;
    const subject = 'Verify your email address';
    const html = `<p>Hi ${name},</p>
      <p>Thank you for registering your business. Please verify your email address by clicking the link below:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>`;
    try {
      await sendEmail({ to: email, subject, html });
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      // Optionally, you could delete the provider if email fails
      // await Provider.deleteOne({ _id: provider._id });
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Business registered successfully. Please check your email to verify your account.',
      data: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        company_name: provider.company_name,
        service_type: provider.service_type,
        status: provider.status,
        created_at: provider.created_at
      }
    });
  } catch (error) {
    console.error('Error registering business:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Provider with this email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error occurred while registering business'
    });
  }
});

// @route   GET /api/v1/business/verify-email
// @desc    Verify provider email
// @access  Public
router.get('/verify-email', async (req, res) => {
  const { token, email } = req.query;
  if (!token || !email) {
    return res.status(400).json({
      success: false,
      message: 'Invalid verification link.'
    });
  }
  try {
    const provider = await Provider.findOne({
      email,
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });
    if (!provider) {
      return res.status(400).json({
        success: false,
        message: 'Verification link is invalid or has expired.'
      });
    }
    provider.emailVerified = true;
    provider.emailVerificationToken = undefined;
    provider.emailVerificationExpires = undefined;
    await provider.save();
    res.json({
      success: true,
      message: 'Email verified successfully.'
    });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while verifying email.'
    });
  }
});

module.exports = router; 