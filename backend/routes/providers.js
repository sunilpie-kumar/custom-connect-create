const express = require('express');
const { body, validationResult } = require('express-validator');
const Provider = require('../models/Provider');

const router = express.Router();

// Validation middleware
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
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL')
];

// @route   POST /api/v1/providers
// @desc    Register a new provider
// @access  Public
router.post('/', validateProvider, async (req, res) => {
  try {
    // Check for validation errors
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
      description,
      website
    } = req.body;

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: 'Provider with this email already exists'
      });
    }

    // Create new provider
    const provider = new Provider({
      name,
      email,
      phone,
      company_name,
      service_type,
      experience_years: parseInt(experience_years),
      location,
      description,
      website: website || undefined
    });

    await provider.save();

    res.status(201).json({
      success: true,
      message: 'Provider registered successfully',
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
    console.error('Error registering provider:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Provider with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error occurred while registering provider'
    });
  }
});

// @route   GET /api/v1/providers
// @desc    Get all providers with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      service_type, 
      location, 
      status = 'approved',
      search 
    } = req.query;

    // Build filter object
    const filter = {};
    if (service_type) filter.service_type = service_type;
    if (location) filter.location = new RegExp(location, 'i');
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { company_name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get providers with pagination
    const providers = await Provider.find(filter)
      .select('-__v')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Provider.countDocuments(filter);

    res.json({
      success: true,
      data: providers,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / parseInt(limit)),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching providers'
    });
  }
});

// @route   GET /api/v1/providers/:id
// @desc    Get a specific provider by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).select('-__v');
    
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    res.json({
      success: true,
      data: provider
    });

  } catch (error) {
    console.error('Error fetching provider:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid provider ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching provider'
    });
  }
});

// @route   PUT /api/v1/providers/:id
// @desc    Update a provider
// @access  Private (Admin)
router.put('/:id', validateProvider, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    res.json({
      success: true,
      message: 'Provider updated successfully',
      data: provider
    });

  } catch (error) {
    console.error('Error updating provider:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid provider ID'
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Provider with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error occurred while updating provider'
    });
  }
});

// @route   PATCH /api/v1/providers/:id/status
// @desc    Update provider status
// @access  Private (Admin)
router.patch('/:id/status', [
  body('status')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Status must be pending, approved, or rejected')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        updated_at: Date.now()
      },
      { new: true }
    ).select('-__v');

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    res.json({
      success: true,
      message: 'Provider status updated successfully',
      data: provider
    });

  } catch (error) {
    console.error('Error updating provider status:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid provider ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error occurred while updating provider status'
    });
  }
});

// @route   DELETE /api/v1/providers/:id
// @desc    Delete a provider
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    res.json({
      success: true,
      message: 'Provider deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting provider:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid provider ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error occurred while deleting provider'
    });
  }
});

module.exports = router;

