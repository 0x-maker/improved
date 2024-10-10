"use client";

import React, { useState } from 'react';
import { Info, Target, Key, Copyright, ChevronLeft, ChevronRight } from 'lucide-react';
import Window from './Window';

interface AboutWindowProps {
  onClose: () => void;
  isActive: boolean;
  onFocus: () => void;
}

const AboutWindow: React.FC<AboutWindowProps> = ({ onClose, isActive, onFocus }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Verity OS",
      content: "Revolutionizing Truth in Blockchain Interactions",
      image: "https://example.com/verity-os-logo.png", // Replace with actual image URL
      icon: <Info size={24} />
    },
    {
      title: "Our Mission",
      content: "Built with a commitment to the highest standards of security and usability, Verity OS is an omni-chain operating system that redefines how individuals and institutions interact with blockchain technology.",
      icon: <Target size={24} />
    },
    {
      title: "Key Features",
      content: "Secure wallet integrations, advanced cross-chain compatibility, and a focus on user empowerment, enabling our users to confidently navigate the complexities of decentralized ecosystems.",
      icon: <Key size={24} />
    },
    {
      title: "Copyright",
      content: "All rights reserved. This website and its contents are the property of Verity OS and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use is strictly prohibited.",
      icon: <Copyright size={24} />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Window title="About Verity OS" onClose={onClose} isActive={isActive} onFocus={onFocus} iconUrl={''}>
      <div className="flex flex-col h-full bg-gray-900 text-white">
        <div className="flex-grow p-8 overflow-auto">
          <h2 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
          <p className="text-lg mb-4">{slides[currentSlide].content}</p>
          {slides[currentSlide].image && (
            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="max-w-full h-auto mb-4" />
          )}
        </div>
        <div className="flex justify-center items-center p-4">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <button onClick={prevSlide} className="p-1 rounded-full hover:bg-white/20 transition-colors">
              <ChevronLeft size={20} />
            </button>
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`p-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white/30' : 'hover:bg-white/20'
                }`}
              >
                {slide.icon}
              </button>
            ))}
            <button onClick={nextSlide} className="p-1 rounded-full hover:bg-white/20 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default AboutWindow;