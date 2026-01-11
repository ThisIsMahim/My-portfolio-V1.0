import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProfileSection from '../components/ProfileSection';
import TutorialModal from '../components/TutorialModal';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem('hasSeenTutorial');
  });

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-gold text-2xl animate-pulse">MM</div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      <Navbar />

      <main className="relative">
        <ProfileSection />
      </main>

      {/* Help Button */}
      <button
        onClick={() => setShowTutorial(true)}
        className="fixed bottom-6 right-2 md:right-6 z-40 w-12 h-12 rounded-full border border-gold/50 bg-black/50 backdrop-blur-sm text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        aria-label="Show Tutorial"
      >
        <span className="text-xl font-bold">?</span>
      </button>

      {showTutorial && (
        <TutorialModal
          onClose={() => setShowTutorial(false)}
          forceOpen={true} // Add this prop, though we rely on state mostly, the modal internal check needs this to not auto-close if localstorage is set
        />
      )}
    </motion.div>
  );
};

export default Index;
