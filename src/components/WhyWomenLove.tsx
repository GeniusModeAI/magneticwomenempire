import React from 'react';
import { Star, Crown, Zap } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

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
  const { content } = useContent();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E0B0B] mb-8">
            {content.whyWomenLove.title} <span className="text-[#D4AF37]">{content.whyWomenLove.subtitle}</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {content.whyWomenLove.reasons.map((reason, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#360A2C] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <reasons[index].icon className="text-white" size={28} />
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