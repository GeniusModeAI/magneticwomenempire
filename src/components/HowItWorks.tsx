import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const steps = [
  {
    number: "01",
    title: "Choose the Transformation You Want Most",
    description: "Whether it's unlocking devotion, finding love, restoring radiance, or perfecting your online profile — start with the door that calls to you most."
  },
  {
    number: "02", 
    title: "Start With the Right Program for You",
    description: "Begin with one app or explore the whole Magnetic Woman Empire for a layered transformation. Each program works alone or together."
  },
  {
    number: "03",
    title: "Experience Your Own Love Breakthrough",
    description: "Your magnetic power awakens. Your nervous system shifts. Extraordinary men notice — and the right one steps forward."
  }
];

const HowItWorks = () => {
  const { content } = useContent();

  return (
    <section className="py-20 bg-[#FDF8F3]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E0B0B] mb-8">
            {content.howItWorks.title} <span className="text-[#D4AF37] font-script text-5xl">{content.howItWorks.titleScript}</span>
          </h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {content.howItWorks.steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#360A2C] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-serif text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  
                  {index < content.howItWorks.steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="text-[#D4AF37] mx-auto" size={24} />
                    </div>
                  )}
                </div>
                
                <h3 className="font-serif text-2xl text-[#0E0B0B] mb-4 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;