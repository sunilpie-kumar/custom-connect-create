
import { Card } from '@/components/ui/card';

const categories = [
  {
    title: "House Decor",
    description: "Interior designers, furniture makers, and home stylists",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Automobile",
    description: "Custom car shops, detailing services, and modifications",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=400&q=80",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Gifts",
    description: "Personalized gifts, custom crafts, and unique creations",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Women Wear",
    description: "Fashion designers, tailors, and custom clothing makers",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Construction",
    description: "Architects, contractors, and construction specialists",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
    color: "from-gray-600 to-gray-700"
  },
  {
    title: "More Services",
    description: "Discover other customization categories",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    color: "from-green-500 to-teal-500"
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From home transformation to automotive customization, find verified professionals 
            in every category to bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.title}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{category.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
