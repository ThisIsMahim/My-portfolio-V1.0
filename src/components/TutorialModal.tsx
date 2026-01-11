import { useEffect, useState } from 'react';

interface TutorialModalProps {
  onClose: () => void;
  forceOpen?: boolean;
}

const TutorialModal = ({ onClose, forceOpen = false }: TutorialModalProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = [
    "Full Stack Developer",
    "Designer",
    "Photographer",
    "Digital Marketer",
    "Videographer"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 1000); // Change every 0.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (forceOpen) return;
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {
      onClose();
    }
  }, [onClose, forceOpen]);

  const handleClose = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="relative bg-black/30 border border-gold/50 rounded-lg p-8 max-w-md mx-4 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gold/70 hover:text-gold transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-gold space-y-4">
          <h2 className="text-2xl font-light mb-4 text-center border-b border-gold/20 pb-2">
            Hi, I'm Mahim.<br />
            A <span className="font-medium text-white">{roles[currentRoleIndex]}</span><br />
            Welcome to My Portfolio
          </h2>

          {isMobile ? (
            <p className="text-gold/80 leading-relaxed text-center">
              Click on the left/right indicators to explore different aspects of my work:
              <br /><br />
              <span className="block p-2 bg-gold/5 rounded hover:bg-gold/10 transition-colors">
                • Coder: View my coding projects
              </span>
              <span className="block p-2 mt-2 bg-gold/5 rounded hover:bg-gold/10 transition-colors">
                • Photographer: Browse my photography gallery
              </span>
            </p>
          ) : (
            <p className="text-gold/80 leading-relaxed text-center">
              Hover over different sides of the screen to explore different aspects of my work:
              <br /><br />
              <span className="block p-2 bg-gold/5 rounded hover:bg-gold/10 transition-colors">
                • Left side: View my coding projects
              </span>
              <span className="block p-2 mt-2 bg-gold/5 rounded hover:bg-gold/10 transition-colors">
                • Right side: Browse my photography gallery
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialModal; 