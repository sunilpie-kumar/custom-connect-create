
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern customized living room with contemporary furniture and elegant lighting design",
    category: "House Decor"
  },
  {
    src: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
    alt: "Professional custom automobile modification and detailing services",
    category: "Automobile"
  },
  {
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
    alt: "Handcrafted personalized gifts and custom engravings for special occasions",
    category: "Gifts"
  },
  {
    src: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80",
    alt: "Custom fashion design and tailoring services for women's clothing",
    category: "Women Wear"
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    alt: "Professional construction and architectural design services",
    category: "Construction"
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    alt: "Technology consulting and digital transformation services",
    category: "More Services"
  }
];

const HeroSection = () => {
  const [api, setApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    const autoSlide = setInterval(() => {
      api.scrollNext();
    }, 5000);

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });

    return () => clearInterval(autoSlide);
  }, [api]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('categories-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(99,102,241)_1px,_transparent_0)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm">
                <span className="text-sm font-medium text-blue-600">✨ India's #1 Customization Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">
                  Kustom
                </span>
              </h1>
              
              <div className="space-y-3">
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
                  Kustomize your life
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Connect with verified businesses across home decor, automobiles, gifts, fashion, and construction. 
                  Get personalized solutions through seamless virtual consultations.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/services')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Browse and find services from verified providers"
              >
                Find Services
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/b2b')}
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Register as a service provider and join our platform"
              >
                Join as Provider
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Verified Providers</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div className="text-3xl font-bold text-orange-500 mb-1">10k+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-1">4.8★</div>
                <div className="text-sm text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[700px] animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-orange-200/50 rounded-3xl transform rotate-2 blur-sm"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-3xl transform -rotate-1 blur-sm"></div>
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500 border border-white/50">
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
                      <div className="relative overflow-hidden rounded-2xl">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-110"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <h3 className="font-semibold text-gray-800 mb-1">{image.category}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div 
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate('/services')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/services')}
                aria-label="Book virtual consultation instantly"
              >
                <div className="text-sm font-semibold mb-1">Virtual Consultation</div>
                <div className="text-xs opacity-90">Book instantly →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={scrollToNext}
        aria-label="Scroll to categories section"
      >
        <ArrowDown className="w-6 h-6 text-gray-600" />
      </button>
    </section>
  );
};

export default HeroSection;
