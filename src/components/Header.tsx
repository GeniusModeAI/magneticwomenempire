import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { scrollToCheckout } from '../utils/scroll';

const Header = () => {
  const { content } = useContent();
  return (
    <header className="relative bg-gradient-to-r from-[#0E0B0B] to-[#360A2C] text-white overflow-hidden">
      {/* Sparkle overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-8 left-12 text-[#D4AF37]">
          <Sparkles size={16} />
        </div>
        <div className="absolute top-16 right-20 text-[#D4AF37]">
          <Sparkles size={12} />
        </div>
        <div className="absolute bottom-12 left-32 text-[#D4AF37]">
          <Sparkles size={14} />
        </div>
        <div className="absolute bottom-8 right-16 text-[#D4AF37]">
          <Sparkles size={18} />
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Crown className="text-[#D4AF37] mr-3" size={32} />
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wider">
              {content.header.title}
            </h1>
          </div>
          
          <div className="w-32 h-px bg-[#D4AF37] mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl mb-8 text-[#FDF8F3] leading-relaxed font-light">
            {content.header.subtitle}
          </p>
          
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#D4AF37] leading-tight">
            {content.header.description}
          </h2>
          
          <p className="text-lg mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Discover the proven system empowering accomplished women to create the extraordinary relationships they desire — on their terms.
          </p>
          
          <button 
            onClick={scrollToCheckout}
            className="group bg-[#360A2C] hover:bg-[#4A1539] text-white px-12 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]"
          >
            <span className="flex items-center">
              🔑 <span className="ml-2">{content.header.ctaText}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;