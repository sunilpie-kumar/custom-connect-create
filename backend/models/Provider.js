const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  company_name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  service_type: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['House Decor', 'Automobile', 'Gifts', 'Women Wear', 'Construction', 'Technology', 'Other Services']
  },
  experience_years: {
    type: Number,
    required: [true, 'Experience years is required'],
    min: [0, 'Experience years cannot be negative'],
    max: [100, 'Experience years cannot exceed 100']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Business description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  images: [{
    type: String // URLs to uploaded images
  }],
  videos: [{
    type: String // URLs to uploaded videos
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field before saving
providerSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Create indexes for better query performance
providerSchema.index({ email: 1 });
providerSchema.index({ service_type: 1 });
providerSchema.index({ location: 1 });
providerSchema.index({ status: 1 });
providerSchema.index({ created_at: -1 });

module.exports = mongoose.model('Provider', providerSchema);