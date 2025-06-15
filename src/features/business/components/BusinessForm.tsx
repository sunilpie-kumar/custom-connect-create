
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileVideo, Image, CheckCircle, AlertCircle } from 'lucide-react';
import { apiCall, apiEndpoints } from '@/api';
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
    website: '',
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
    setUploadedFiles(prev => [...prev, ...files]);
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

      // Submit provider registration
      const response = await apiCall(
        apiEndpoints.providers.register,
        'POST',
        formData
      );

      if (response.success) {
        console.log('Provider registered successfully:', response);
        setSubmitStatus('success');
        
        // Show success toast
        toast({
          title: "Registration Successful!",
          description: "Your provider application has been submitted and is under review. We'll contact you within 24-48 hours.",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company_name: '',
          service_type: '',
          experience_years: '',
          location: '',
          description: '',
          website: '',
          gst_number: ''
        });
        setUploadedFiles([]);
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
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-green-700">Registration Successful!</h2>
            <p className="text-gray-600">
              Thank you for registering as a provider. Your application is now under review. 
              We'll contact you within 24-48 hours with the next steps.
            </p>
            <Button 
              onClick={() => setSubmitStatus('idle')}
              className="mt-4"
            >
              Register Another Provider
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Register as a Service Provider</CardTitle>
        <CardDescription className="text-center">
          Welcome! Please fill out the details below to join our platform and start connecting with customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Company/Business Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                placeholder="Enter your business name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service_type">Service Category *</Label>
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

            <div className="space-y-2">
              <Label htmlFor="experience_years">Years of Experience *</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                max="50"
                value={formData.experience_years}
                onChange={(e) => handleInputChange('experience_years', e.target.value)}
                placeholder="Enter years of experience"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/City *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter your city/location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gst_number">GST Number (Optional)</Label>
              <Input
                id="gst_number"
                value={formData.gst_number}
                onChange={(e) => handleInputChange('gst_number', e.target.value)}
                placeholder="Enter your GST number"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="Enter your website URL"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell us about your business, services you provide, and what makes you unique..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Upload Images/Videos (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Upload images or videos showcasing your work and business
              </p>
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button type="button" variant="outline">
                  Choose Files
                </Button>
              </Label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative border rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('image/') ? (
                        <Image className="h-6 w-6 text-blue-500" />
                      ) : (
                        <FileVideo className="h-6 w-6 text-green-500" />
                      )}
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="mt-2 w-full"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register as Provider'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;
