import React from 'react';
import { Key, Heart, Moon, MessageCircle, Edit3 } from 'lucide-react';
import { scrollToCheckout } from '../utils/scroll';
import { useContent } from '../contexts/ContentContext';

const tools = [
  {
    title: "LAW OF DEVOTION",
    subtitle: "Unlock Your Irresistible Feminine Power",
    description: "Principles to inspire deep, lifelong commitment from the right man.",
    icon: Heart,
    color: "text-[#E97EA5]"
  },
  {
    title: "MAGNETIC WOMAN LAUNCHPAD",
    subtitle: "Find the Love You Desire in 90 Days",
    description: "A 4-step process to effortlessly attract high-quality men without the apps.",
    icon: Key,
    color: "text-[#D4AF37]"
  },
  {
    title: "THERA SLEEP",
    subtitle: "Restore Radiance While You Sleep",
    description: "Overnight nervous system reset, turning stress into feminine magnetism.",
    icon: Moon,
    color: "text-[#095248]"
  },
  {
    title: "MAGNETIC COMMUNICATION COACH",
    subtitle: "AI Wisdom for Authentic Connection",
    description: "An AI-powered guide to help you master captivating conversations and deep connection.",
    icon: MessageCircle,
    color: "text-[#360A2C]"
  },
  {
    title: "SOULMATE MAGNET PROFILE",
    subtitle: "Write the Perfect Love Attraction Bio",
    description: "Position yourself online to attract your forever partner — while filtering out the wrong men.",
    icon: Edit3,
    color: "text-[#E97EA5]"
  }
];

const EmpireTools = () => {
  const { content } = useContent();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E0B0B] mb-6">
            {content.empireTools.title} <span className="text-[#D4AF37]">{content.empireTools.subtitle}</span> Tools
          </h2>
          <div className="w-32 h-px bg-[#D4AF37] mx-auto mb-8"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.empireTools.tools.map((tool, index) => (
            <div 
              key={index} 
              className="group bg-[#FDF8F3] p-8 rounded-xl border border-gray-100 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <div className="text-center">
                                <div className="mb-6">
                  {React.createElement(tools[index].icon, {
                    className: `${tools[index].color} mx-auto mb-4`,
                    size: 48
                  })}
                </div>
              
                <h3 className="font-serif text-xl font-bold text-[#0E0B0B] mb-2 tracking-wide">
                  {tool.title}
                </h3>
                
                <h4 className="text-[#D4AF37] font-medium mb-4 text-lg">
                  {tool.subtitle}
                </h4>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <button 
                  onClick={scrollToCheckout}
                  className="w-full bg-[#360A2C] hover:bg-[#4A1539] text-white py-3 px-6 rounded-lg transition-all duration-300 group-hover:scale-105 border border-[#D4AF37]/30 hover:border-[#D4AF37]"
                >
                  <span className="flex items-center justify-center">
                    🗝️ <span className="ml-2">{tool.buttonText}</span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpireTools;