import { useEffect, useState } from 'react';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal = ({ onClose }: TutorialModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-black/30 border border-gold/50 rounded-lg p-8 max-w-md mx-4 backdrop-blur-md">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gold/70 hover:text-gold transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-gold space-y-4">
          <h2 className="text-2xl font-light mb-4">Welcome to My Portfolio</h2>
          
          {isMobile ? (
            <p className="text-gold/80">
              Click on the left/right indicators to explore different aspects of my work:
              <br /><br />
              • Left: View my coding projects
              <br />
              • Right: Browse my photography gallery
            </p>
          ) : (
            <p className="text-gold/80">
              Hover over different sides of the screen to explore different aspects of my work:
              <br /><br />
              • Left side: View my coding projects
              <br />
              • Right side: Browse my photography gallery
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialModal; 