import React from 'react';
import { Star, Crown, Zap } from 'lucide-react';

const reasons = [
  {
    icon: Crown,
    title: "Luxury Meets Science",
    description: "Elegant design meets proven, neuroscience-backed results."
  },
  {
    icon: Star,
    title: "Feminine Without Losing Your Edge",
    description: "You keep your success and attract love."
  },
  {
    icon: Zap,
    title: "Results Without the Hustle",
    description: "Many clients see shifts within weeks."
  }
];

const WhyWomenLove = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E0B0B] mb-8">
            Why Women Love the <span className="text-[#D4AF37]">Magnetic Woman Empire</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {reasons.map((reason, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#360A2C] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="text-white" size={28} />
                  </div>
                </div>
                
                <h3 className="font-serif text-2xl text-[#0E0B0B] mb-4">
                  {reason.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWomenLove;