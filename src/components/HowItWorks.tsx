
import { Card } from '@/components/ui/card';

const steps = [
  {
    step: "01",
    title: "Browse & Discover",
    description: "Explore verified providers in your category of interest. View portfolios, read reviews, and compare services.",
    icon: "🔍"
  },
  {
    step: "02", 
    title: "Connect & Chat",
    description: "Message providers directly to discuss your requirements. Share ideas and get personalized recommendations.",
    icon: "💬"
  },
  {
    step: "03",
    title: "Schedule & Meet",
    description: "Book virtual consultations at your convenience. Meet face-to-face online to finalize your custom project.",
    icon: "📅"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your custom project started is simple. Follow these three easy steps 
            to connect with the perfect provider for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-blue-200"></div>
          
          {steps.map((step, index) => (
            <Card key={step.step} className="relative p-8 text-center group hover:shadow-xl transition-all duration-300 rounded-2xl border-2 hover:border-blue-200">
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
