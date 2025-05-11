import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileSection from '../components/ProfileSection';
import MouseTrail from '../components/MouseTrail';
import { AnimatedBackground } from '../components/AnimatedBackground';
import TutorialModal from '../components/TutorialModal';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AnimatedBackground>
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-gold text-2xl animate-pulse">MM</div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <MouseTrail />
      <div className="min-h-screen">
        
        <Navbar />
        
        <main className="relative">
          <ProfileSection />
        </main>
        {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      </div>
    </AnimatedBackground>
  );
};

export default Index;
