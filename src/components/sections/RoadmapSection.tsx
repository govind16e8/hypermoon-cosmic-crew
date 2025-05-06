
import React, { useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';

interface RoadmapItem {
  step: number;
  title: string;
  emoji: string;
  description: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    step: 1,
    title: "Launch",
    emoji: "🚀",
    description: "HyperMoon token goes live. Let's start this journey!"
  },
  {
    step: 2,
    title: "Grow",
    emoji: "🌱",
    description: "Building community, rewarding holders, and moon missions."
  },
  {
    step: 3,
    title: "Meme Takeover",
    emoji: "👽",
    description: "HyperMoon goes viral! Community-driven success!"
  }
];

const RoadmapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      
      // Only check when section is in view
      if (scrollY >= sectionTop - window.innerHeight && scrollY <= sectionTop + sectionHeight) {
        itemRefs.current.forEach((item, index) => {
          if (!item) return;
          
          const itemTop = item.offsetTop + sectionTop;
          const triggerPoint = itemTop - window.innerHeight * 0.8;
          
          if (scrollY >= triggerPoint) {
            item.classList.add('opacity-100');
            item.classList.remove('opacity-0', 'translate-y-8');
          } else {
            item.classList.remove('opacity-100');
            item.classList.add('opacity-0', 'translate-y-8');
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-cosmic-dark relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-orbitron inline-flex items-center justify-center">
            <Rocket className="mr-4 h-10 w-10 text-cosmic-purple" />
            Our Mission to the Moon
          </h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-cosmic-purple transform -translate-x-1/2"></div>
          
          {roadmapItems.map((item, index) => (
            <div
              key={item.step}
              ref={el => itemRefs.current[index] = el}
              className={`relative flex ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } gap-8 mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Circle on timeline */}
              <div className="absolute left-1/2 top-0 w-8 h-8 bg-cosmic-purple rounded-full transform -translate-x-1/2 z-10 flex items-center justify-center">
                <span className="text-white font-bold">{item.step}</span>
              </div>
              
              {/* Content box */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                <div className="bg-gradient-to-br from-cosmic-dark to-cosmic-deep-purple p-6 rounded-lg shadow-lg border border-cosmic-purple hover:shadow-cosmic-purple/30 transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{item.emoji}</span>
                    <h3 className="text-2xl font-bold text-white font-orbitron">{item.title}</h3>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
              
              {/* Empty div for spacing on the other side */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
