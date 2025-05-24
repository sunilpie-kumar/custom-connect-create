
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
