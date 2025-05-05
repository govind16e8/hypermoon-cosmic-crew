
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoadmapStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'current' | 'upcoming';
}

const RoadmapSection: React.FC = () => {
  const { authState } = useAuth();
  
  const roadmapSteps: RoadmapStep[] = [
    {
      id: 'participation',
      phase: 'Phase 1',
      title: 'Participation Opens',
      description: 'Community building and early adopters join the mission.',
      icon: '🚀',
      status: 'current'
    },
    {
      id: 'token',
      phase: 'Phase 2',
      title: 'Token Launch',
      description: 'HyperMoon token officially launches on mainnet.',
      icon: '🧩',
      status: 'upcoming'
    },
    {
      id: 'tge',
      phase: 'Phase 3',
      title: 'TGE',
      description: 'Token Generation Event and initial exchange listings.',
      icon: '📈',
      status: 'upcoming'
    },
    {
      id: 'distribution',
      phase: 'Phase 4',
      title: 'Airdrop Distribution',
      description: 'All eligible participants receive their token allocation.',
      icon: '💸',
      status: 'upcoming'
    },
    {
      id: 'staking',
      phase: 'Phase 5',
      title: 'Staking & Rewards',
      description: 'Staking mechanisms and community rewards program starts.',
      icon: '💰',
      status: 'upcoming'
    },
    {
      id: 'dao',
      phase: 'Phase 6',
      title: 'Full DAO Governance',
      description: 'Community governance model fully operational.',
      icon: '🧠',
      status: 'upcoming'
    }
  ];

  return (
    <section className="py-24 bg-cosmic-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-orbitron">
            Our Cosmic Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The journey to building HyperMoon's community and ecosystem
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line connecting timeline items */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cosmic-purple/80 via-cosmic-purple/50 to-cosmic-purple/10"></div>
          
          {roadmapSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex items-center mb-16 last:mb-0 relative ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content box */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className={`${
                  step.status === 'completed' 
                    ? 'text-cosmic-purple' 
                    : step.status === 'current' 
                      ? 'text-cosmic-pink animate-pulse' 
                      : 'text-gray-500'
                } mb-1 font-semibold`}>
                  {step.phase}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              
              {/* Center icon/marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl z-10 border-4 ${
                  step.status === 'completed' 
                    ? 'bg-cosmic-purple border-cosmic-purple' 
                    : step.status === 'current' 
                      ? 'bg-cosmic-pink border-cosmic-pink animate-pulse' 
                      : 'bg-cosmic-dark border-gray-700'
                }`}>
                  {step.icon}
                </div>
                
                {/* You are here indicator */}
                {step.status === 'current' && authState.user && (
                  <div className="mt-2 px-3 py-1 bg-cosmic-pink text-white text-xs rounded-full animate-bounce">
                    You are here
                  </div>
                )}
              </div>
              
              {/* Empty space for the opposite side */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cosmic-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cosmic-pink/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default RoadmapSection;
