import { useState, useRef, useEffect } from 'react';
import SquigglyLine from './SquigglyLine';

const coderImage = '/assets/coder-profile.webp';
const photographerImage = '/assets/photographer-profile.webp';
const defaultImage = '/assets/default-profile.webp';

const ProfileSection = () => {
  const [hoverState, setHoverState] = useState<'none' | 'coder' | 'photographer'>('none');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    default: false,
    coder: false,
    photographer: false
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);

  // Check if all images are loaded
  const allImagesLoaded = Object.values(imagesLoaded).every(loaded => loaded);

  // Preload images
  useEffect(() => {
    const loadImage = (src: string, key: keyof typeof imagesLoaded) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [key]: true
        }));
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        // Still mark as loaded to prevent infinite loading state
        setImagesLoaded(prev => ({
          ...prev,
          [key]: true
        }));
      };
    };

    loadImage(defaultImage, 'default');
    loadImage(coderImage, 'coder');
    loadImage(photographerImage, 'photographer');
  }, []);

  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation handlers
  const navigateToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/projects';
  };

  const navigateToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/gallery';
  };

  // Coder keywords with positions
  const coderKeywords = [
    { text: 'Programmer', x: -150, y: -100 },
    { text: 'Frontend Developer', x: -180, y: 50 },
    { text: 'React.js', x: -120, y: 150 },
    { text: 'Tailwind CSS', x: -200, y: 200 },
  ];

  // Photographer keywords with positions
  const photographerKeywords = [
    { text: 'Photographer', x: 150, y: -100 },
    { text: 'Designer', x: 180, y: 50 },
    { text: 'Creative', x: 120, y: 150 },
  ];

  // Handler for mouse movement inside the container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Determine which side the mouse is on
    if (x < width / 2) {
      setHoverState('coder');
    } else {
      setHoverState('photographer');
    }
    
    // Update mouse position for squiggly lines
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoverState('none');
    }
  };

  // Handle mobile indicator clicks
  const handleIndicatorClick = (type: 'coder' | 'photographer') => {
    if (!isMobile) return;
    
    setHoverState(prevState => prevState === type ? 'none' : type);
  };

  if (!allImagesLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-screen flex items-center justify-center overflow-hidden pt-32 animate-fade-in"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradients based on hover state */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          hoverState === 'coder' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 25% 50%, rgba(20, 20, 50, 0.3), transparent 70%)'
        }}
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          hoverState === 'photographer' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(50, 30, 20, 0.3), transparent 70%)'
        }}
      />

      {/* Profile image container */}
      <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] overflow-none rounded-2xl shadow-2xl z-10">
        {/* Default image */}
        <img
          src={defaultImage}
          alt="Mahim Masrafi"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            hoverState === 'none' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Coder image */}
        <img
          src={coderImage}
          alt="Mahim Masrafi - Coder"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            hoverState === 'coder' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Photographer image */}
        <img
          src={photographerImage}
          alt="Mahim Masrafi - Photographer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            hoverState === 'photographer' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black  bg-opacity-5 rounded-2xl -z-10 backdrop-blur-lg"></div>
        
        {/* Left/Right indicators */}
        <div 
          className={`absolute md:top-1/4 md:-left-32 -top-12 text-white text-opacity-70 font-bold text-2xl transition-opacity duration-500 z-20 ${
            hoverState === 'coder' ? 'opacity-100' : 'opacity-50'
          } ${isMobile ? 'cursor-pointer' : ''}`}
          onClick={() => handleIndicatorClick('coder')}
        >
          Coder
        </div>
        <div 
          className={`absolute md:top-1/4 right-0 -top-12 md:-right-44 text-white text-opacity-70 font-bold text-2xl transition-opacity duration-500 z-20 ${
            hoverState === 'photographer' ? 'opacity-100' : 'opacity-50'
          } ${isMobile ? 'cursor-pointer' : ''}`}
          onClick={() => handleIndicatorClick('photographer')}
        >
          Photographer
        </div>
      </div>

      {/* Keywords container */}
      <div ref={keywordsRef} className="absolute inset-0 pointer-events-none">
        {/* Coder keywords with squiggly lines */}
        {hoverState === 'coder' && coderKeywords.map((keyword, index) => (
          <div 
            key={`coder-${index}`}
            className="absolute animate-fade-in z-20"
            style={{ 
              left: `calc(50% + ${keyword.x}px)`, 
              top: `calc(50% + ${keyword.y}px)`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="text-gold font-light text-sm md:text-base whitespace-nowrap">
              {keyword.text}
            </div>
            <SquigglyLine 
              startX={0} 
              startY={0} 
              endX={-keyword.x / 3} 
              endY={-keyword.y / 3} 
              delay={index * 0.1}
            />
          </div>
        ))}

        {/* Photographer keywords with squiggly lines */}
        {hoverState === 'photographer' && photographerKeywords.map((keyword, index) => (
          <div 
            key={`photo-${index}`}
            className="absolute animate-fade-in z-20"
            style={{ 
              left: `calc(50% + ${keyword.x}px)`, 
              top: `calc(50% + ${keyword.y}px)`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="text-gold font-light text-sm md:text-base whitespace-nowrap">
              {keyword.text}
            </div>
            <SquigglyLine 
              startX={0} 
              startY={0} 
              endX={-keyword.x / 3} 
              endY={-keyword.y / 3} 
              delay={index * 0.1}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - Only visible on desktop and when hovering on respective sides */}
      <div 
        className={`hidden md:flex absolute left-0 inset-y-0 w-1/4 items-center justify-start pl-8 z-20 transition-opacity duration-300 ${
          hoverState === 'coder' ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={navigateToProjects}
      >
        <div className="cursor-pointer group transform transition-transform duration-300 hover:scale-110">
          <div className="relative w-12 h-20 bg-gold bg-opacity-5 rounded-full border border-gold border-opacity-20 flex items-center justify-center overflow-hidden group-hover:border-opacity-50 group-hover:bg-opacity-10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-gold to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <span className="text-gold text-2xl transform group-hover:scale-110 transition-transform duration-300">←</span>
          </div>
          <span className="absolute left-20 top-1/2 -translate-y-1/2 text-gold opacity-0 group-hover:opacity-100 transition-all duration-300">
            Projects
          </span>
        </div>
      </div>

      <div 
        className={`hidden md:flex absolute right-0 inset-y-0 w-1/4 items-center justify-end pr-8 z-20 transition-opacity duration-300 ${
          hoverState === 'photographer' ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={navigateToGallery}
      >
        <div className="cursor-pointer group transform transition-transform duration-300 hover:scale-110">
          <div className="relative w-12 h-20 bg-gold bg-opacity-5 rounded-full border border-gold border-opacity-20 flex items-center justify-center overflow-hidden group-hover:border-opacity-50 group-hover:bg-opacity-10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-l from-gold to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <span className="text-gold text-2xl transform group-hover:scale-110 transition-transform duration-300">→</span>
          </div>
          <span className="absolute right-20 top-1/2 -translate-y-1/2 text-gold opacity-0 group-hover:opacity-100 transition-all duration-300">
            Gallery
          </span>
        </div>
      </div>

      {/* Mobile Navigation - Only visible on mobile devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-black bg-opacity-50 backdrop-blur-sm z-40">
        <button 
          onClick={navigateToProjects}
          className="px-6 py-2 text-gold border border-gold rounded-full hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
        >
          Projects
        </button>
        <button 
          onClick={navigateToGallery}
          className="px-6 py-2 text-gold border border-gold rounded-full hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
        >
          Gallery
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
