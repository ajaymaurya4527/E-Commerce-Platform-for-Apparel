import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 p-1.5 rounded-lg">
                <ShoppingCart className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                MAURYA<span className="text-orange-600">SHOP</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Elevating your everyday style with curated collections that blend comfort, quality, and modern trends. Founded by Sitaram Maurya.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Men's Apparel</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Women's Collection</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Sale & Offers</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Stay in the Loop</h4>
            <p className="text-sm text-gray-400">Subscribe to get special offers and style updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-orange-600 transition-colors"
              />
              <button className="absolute right-2 top-1.5 bg-orange-600 p-1.5 rounded-md hover:bg-orange-700 transition-colors">
                <ArrowRight size={18} className="text-white" />
              </button>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <Phone size={14} className="text-orange-600" /> +91 9021337316
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <Mail size={14} className="text-orange-600" /> ajaymaurya1725@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-900 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>© {currentYear} MauryaShop.com. All rights reserved.</p>
          <p>Designed & Developed by <span className="text-white">Maurya Ajay Munnalal</span></p>
          
          {/* Payment Icons Placeholder */}
          <div className="flex gap-3 opacity-50 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;