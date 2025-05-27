import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
    alt: "Beautiful customized living room interior",
    category: "House Decor"
  },
  {
    src: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80",
    alt: "Custom automobile modification",
    category: "Automobile"
  },
  {
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    alt: "Personalized gifts and crafts",
    category: "Gifts"
  },
  {
    src: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    alt: "Custom fashion and women wear",
    category: "Women Wear"
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    alt: "Construction and architectural services",
    category: "Construction"
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    alt: "Technology and other services",
    category: "More Services"
  }
];

const HeroSection = () => {
  const [api, setApi] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    const autoSlide = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(autoSlide);
  }, [api]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  Kustom
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
                Kustomize your life
              </p>
              <p className="text-xl text-gray-600 max-w-2xl">
                Connect with verified businesses across home decor, automobiles, gifts, fashion, and construction. 
                Get personalized solutions through seamless virtual consultations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Services
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/b2b')}
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Join as Provider
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Verified Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">10k+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-orange-200 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <Carousel
                setApi={setApi}
                className="w-full h-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {heroImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500">
                <div className="text-sm font-semibold text-gray-700">Virtual Consultation</div>
                <div className="text-xs text-gray-500">Book instantly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default HeroSection;
