
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              CustomConnect
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Connecting you with verified customization experts across all categories. 
              Your vision, their expertise.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">House Decor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automobile</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gifts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women Wear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Construction</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Providers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Join as Provider</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Provider Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CustomConnect. All rights reserved. Built with ❤️ for creators and seekers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
