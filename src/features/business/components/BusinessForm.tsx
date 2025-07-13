import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileVideo, Image, CheckCircle, AlertCircle, Star, Shield, Clock } from 'lucide-react';
import { apiCall, apiEndpoints } from '@/api';
import { apiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const categories = [
  'House Decor',
  'Automobile', 
  'Gifts',
  'Women Wear',
  'Construction',
  'Technology',
  'Other Services'
];

const BusinessForm = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    service_type: '',
    experience_years: '',
    location: '',
    description: '',
    gst_number: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValid = file.size <= 10 * 1024 * 1024; // 10MB limit
      if (!isValid) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
      }
      return isValid;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'company_name', 'service_type', 'experience_years', 'location'];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace('_', ' ')} is required`);
        }
      }

      // Submit provider registration using new API service
      const response = await apiService.business.register(formData, uploadedFiles);

      if (response.success) {
        console.log('Provider registered successfully:', response);
        setSubmitStatus('success');
        
        // Show success toast
        toast({
          title: "Registration Successful!",
          description: "Your provider application has been submitted and is under review. We'll contact you within 24-48 hours.",
          duration: 5000,
        });
        
        // Reset form after delay
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company_name: '',
            service_type: '',
            experience_years: '',
            location: '',
            description: '',
            gst_number: ''
          });
          setUploadedFiles([]);
        }, 2000);
      } else {
        throw new Error(response.message || 'Registration failed');
      }

    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus('error');
      
      // Handle API error response
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors && Array.isArray(errorData.errors)) {
            setErrorMessage(errorData.errors.map((err: any) => err.msg).join(', '));
          } else {
            setErrorMessage(errorData.message || error.message);
          }
        } catch {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (submitStatus === 'success') {
    return (
      <Card className="w-full max-w-4xl mx-auto border-0 shadow-2xl bg-white">
        <CardContent className="pt-12 pb-12">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-800" fill="currentColor" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Registration Successful!
              </h2>
              <div className="max-w-md mx-auto space-y-3">
                <p className="text-lg text-gray-700 font-medium">
                  Welcome to the Kustom Provider Network!
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Thank you for registering as a provider. Your application is now under review. 
                  Our team will contact you within 24-48 hours with the next steps.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>Review time: 24-48 hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4" />
                <span>Verification in progress</span>
              </div>
            </div>
            
            <Button 
              onClick={() => setSubmitStatus('idle')}
              className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Register Another Provider
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-2xl bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 py-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
              Join Kustom Provider Network
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Welcome! Fill out the details below to join our platform and start connecting with thousands of customers looking for your services.
            </CardDescription>
          </div>
          
          {/* Benefits Preview */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-sm">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span className="text-sm font-medium text-gray-700">Verified Badge</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Trusted Platform</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Quick Setup</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {submitStatus === 'error' && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 shadow-sm">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Registration Error</h4>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself and your contact details.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Your Full Name 
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                  aria-describedby="name-description"
                />
                <p id="name-description" className="text-xs text-gray-500">
                  This will be displayed on your public profile
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Email Address 
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                  aria-describedby="email-description"
                />
                <p id="email-description" className="text-xs text-gray-500">
                  We'll send important updates to this email
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Phone Number 
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                  aria-describedby="phone-description"
                />
                <p id="phone-description" className="text-xs text-gray-500">
                  Customers will use this to contact you
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Location/City 
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter your city/location"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                  aria-describedby="location-description"
                />
                <p id="location-description" className="text-xs text-gray-500">
                  This helps customers find local services
                </p>
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Information</h3>
              <p className="text-gray-600">Details about your business and services.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="company_name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Company/Business Name 
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Enter your business name"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                  aria-describedby="company_name-description"
                />
                <p id="company_name-description" className="text-xs text-gray-500">
                  This will be displayed on your public profile
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="service_type" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Service Category 
                  <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.service_type} onValueChange={(value) => handleInputChange('service_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="experience_years" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Years of Experience 
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="experience_years"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experience_years}
                  onChange={(e) => handleInputChange('experience_years', e.target.value)}
                  placeholder="Enter years of experience"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                  aria-describedby="experience_years-description"
                />
                <p id="experience_years-description" className="text-xs text-gray-500">
                  This helps customers find the right provider
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="gst_number" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  GST Number (Optional)
                </Label>
                <Input
                  id="gst_number"
                  value={formData.gst_number}
                  onChange={(e) => handleInputChange('gst_number', e.target.value)}
                  placeholder="Enter your GST number"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Business Description Section */}
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Description</h3>
              <p className="text-gray-600">Tell us about your business, services you provide, and what makes you unique.</p>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Business Description 
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Tell us about your business, services you provide, and what makes you unique..."
                rows={5}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none"
                required
                aria-describedby="description-description"
              />
              <p id="description-description" className="text-xs text-gray-500">
                Minimum 50 characters. This will be shown to potential customers.
              </p>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Portfolio & Media</h3>
              <p className="text-gray-600">Showcase your work with images and videos (optional but recommended).</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
              <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <div className="space-y-2 mb-6">
                <p className="text-lg font-medium text-gray-700">
                  Upload images or videos showcasing your work
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Supports: JPG, PNG, MP4, MOV (Max 10MB per file)
                </p>
              </div>
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button type="button" variant="outline" className="px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300">
                  Choose Files
                </Button>
              </Label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-3">
                      {file.type.startsWith('image/') ? (
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Image className="h-5 w-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FileVideo className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="w-full h-8 text-xs hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                'Register as Provider'
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;
