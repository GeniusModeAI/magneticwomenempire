import React from 'react';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { content } = useContent();
  return (
    <section className="py-20 bg-[#FDF8F3]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h3 className="font-serif text-3xl md:text-4xl text-[#0E0B0B] mb-8">
              {content.about.title}
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {content.about.description1}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.about.description2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;