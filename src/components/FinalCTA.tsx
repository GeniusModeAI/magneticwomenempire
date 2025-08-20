import React from 'react';
import { Sparkles } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { scrollToCheckout } from '../utils/scroll';

const FinalCTA = () => {
  const { content } = useContent();
  return (
    <section className="relative py-24 bg-gradient-to-r from-[#0E0B0B] via-[#360A2C] to-[#0E0B0B] text-white overflow-hidden">
      {/* Sparkle overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-12 left-16 text-[#D4AF37]">
          <Sparkles size={20} />
        </div>
        <div className="absolute top-20 right-24 text-[#D4AF37]">
          <Sparkles size={16} />
        </div>
        <div className="absolute bottom-16 left-28 text-[#D4AF37]">
          <Sparkles size={18} />
        </div>
        <div className="absolute bottom-12 right-20 text-[#D4AF37]">
          <Sparkles size={22} />
        </div>
        <div className="absolute top-32 left-1/2 text-[#D4AF37]">
          <Sparkles size={14} />
        </div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl text-[#FDF8F3] mb-8 leading-tight">
            {content.finalCTA.title}
          </h2>
          
          <p className="text-2xl md:text-3xl text-[#D4AF37] mb-12 font-light leading-relaxed">
            {content.finalCTA.subtitle}
          </p>
          
          {/* SamCart Checkout Integration */}
          <div id="samcart-checkout" className="mb-8">
            <sc-checkout 
              product="magnetic-women-empire-main" 
              subdomain="animamundi" 
              coupon=""
            ></sc-checkout>
          </div>
          
          <button className="group bg-gradient-to-r from-[#D4AF37] to-[#E97EA5] hover:from-[#E97EA5] hover:to-[#D4AF37] text-[#0E0B0B] px-16 py-6 rounded-xl text-xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl border-2 border-[#D4AF37]/50 hover:border-white/50">
            <span className="flex items-center">
              ✨ <span className="ml-3">{content.finalCTA.ctaText}</span>
            </span>
          </button>
          
          <p className="text-sm text-gray-300 mt-8 font-light tracking-wider">
            {content.finalCTA.footerText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;