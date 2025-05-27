
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Start Your
            <br />
            Custom Project?
          </h2>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join our community today and connect with verified professionals who will bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/b2b')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Join as Provider
            </Button>
          </div>
          
          <div className="pt-8 text-white/80">
            <p className="text-sm">🔒 Secure • ✓ Verified Providers • 💬 24/7 Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
