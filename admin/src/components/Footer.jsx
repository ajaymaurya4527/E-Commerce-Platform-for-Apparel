import React from 'react';
import { Heart, LifeBuoy, BookOpen, ShieldCheck, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-gray-100 bg-white/60 px-8 py-6 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        
        {/* Left Side: Copyright & Brand */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="flex items-center text-sm font-medium text-gray-500">
            © {currentYear} 
            <span className="mx-1.5 font-bold text-gray-900">MauryaShop</span> 
            Admin. Made with <Heart size={14} className="mx-1 fill-red-500 text-red-500" /> in India.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
              Systems Operational
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <a 
            href="#docs" 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-orange-600"
          >
            <BookOpen size={16} />
            Documentation
          </a>
          <a 
            href="#support" 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-orange-600"
          >
            <LifeBuoy size={16} />
            Support
          </a>
          <a 
            href="#privacy" 
            className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-orange-600"
          >
            <ShieldCheck size={16} />
            Security
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-900"
          >
            <Github size={16} />
            v2.4.0
          </a>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-transparent via-orange-100 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;