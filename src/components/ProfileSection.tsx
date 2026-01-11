import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SquigglyLine from './SquigglyLine';

const coderImage = '/assets/coder-profile.webp';
const photographerImage = '/assets/photographer-profile.webp';
const defaultImage = '/assets/default-profile.webp';

const ProfileSection = () => {
  const [hoverState, setHoverState] = useState<'none' | 'coder' | 'photographer'>('none');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [clickedStates, setClickedStates] = useState({
    coder: false,
    photographer: false
  });
  const [imagesLoaded, setImagesLoaded] = useState({
    default: false,
    coder: false,
    photographer: false
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);

  // Check if all images are loaded
  const allImagesLoaded = Object.values(imagesLoaded).every(loaded => loaded);

  // Handle mobile indicator clicks
  const handleIndicatorClick = (type: 'coder' | 'photographer') => {
    if (!isMobile) return;

    setHoverState(prevState => prevState === type ? 'none' : type);

    // Track that this indicator has been clicked
    setClickedStates(prev => ({
      ...prev,
      [type]: true
    }));
  };

  // Hide hint when both indicators have been clicked
  useEffect(() => {
    if (clickedStates.coder && clickedStates.photographer) {
      setShowHint(false);
    }
  }, [clickedStates]);

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

  // Use the current positions as mobile
  const coderKeywordsMobile = [
    { text: 'Programmer', x: -140, y: -100 },
    { text: 'Frontend Developer', x: -180, y: 50 },
    { text: 'React.js', x: -120, y: 150 },
    { text: 'Tailwind CSS', x: -200, y: 200 },
    { text: 'Web Designer', x: 150, y: -100 },
    { text: 'UI/UX Developer', x: -180, y: -10 },
    { text: 'TypeScript', x: 120, y: 0 },
    { text: 'Three.js', x: 200, y: 50 },
    { text: 'Node.js', x: 150, y: 100 },
    { text: 'GSAP', x: 180, y: 150 },
  ];
  const photographerKeywordsMobile = [
    { text: 'Photographer', x: 110, y: -100 },
    { text: 'Designer', x: 130, y: -50 },
    { text: 'Creative', x: 120, y: 0 },
    { text: 'Visual Artist', x: -110, y: -100 },
    { text: 'Photo Editor', x: -150, y: -50 },
    { text: 'Digital Artist', x: -150, y: 0 },
    { text: 'Videographer', x: 150, y: 50 },
    { text: 'Video Editor', x: -150, y: 50 },
  ];

  // For desktop, spread out by multiplying x/y by 2.2
  const spreadFactor = 1.2;
  const coderKeywordsDesktop = coderKeywordsMobile.map(k => ({
    ...k,
    x: k.x * spreadFactor,
    y: k.y * spreadFactor
  }));
  const photographerKeywordsDesktop = photographerKeywordsMobile.map(k => ({
    ...k,
    x: k.x * spreadFactor,
    y: k.y * spreadFactor
  }));

  // Choose the correct set based on isMobile
  const coderKeywords = isMobile ? coderKeywordsMobile : coderKeywordsDesktop;
  const photographerKeywords = isMobile ? photographerKeywordsMobile : photographerKeywordsDesktop;

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
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${hoverState === 'coder' ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          background: 'radial-gradient(circle at 25% 50%, rgba(20, 20, 50, 0.3), transparent 70%)'
        }}
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${hoverState === 'photographer' ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(50, 30, 20, 0.3), transparent 70%)'
        }}
      />

      {/* Profile image container */}
      <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] 2xl:w-[500px] 2xl:h-[600px]  overflow-none rounded-2xl z-10">
        {/* Default image */}
        <img
          src={defaultImage}
          alt="Mahim Masrafi"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoverState === 'none' ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Coder image */}
        <img
          src={coderImage}
          alt="Mahim Masrafi - Coder"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoverState === 'coder' ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Photographer image */}
        <img
          src={photographerImage}
          alt="Mahim Masrafi - Photographer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoverState === 'photographer' ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black  bg-opacity-5 rounded-2xl -z-10 backdrop-blur-lg"></div>


        {/* Left/Right indicators with enhanced mobile styling */}
        <motion.div
          className={`absolute md:top-1/4 md:-left-32 -top-16 left-0 text-white font-bold text-2xl z-20 cursor-pointer 
            ${hoverState === 'coder' ? 'opacity-100 text-gold shadow-gold/50' : 'opacity-70'}
            ${isMobile ? 'backdrop-blur-sm bg-black/30 px-4 py-2 rounded-xl border border-gold/30' : ''}`}
          onClick={() => handleIndicatorClick('coder')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isMobile && hoverState !== 'coder' && !(clickedStates.coder && clickedStates.photographer) ? {
            scale: [1, 1.05, 1],
            borderColor: ['rgba(212,175,55,0.3)', 'rgba(212,175,55,1)', 'rgba(212,175,55,0.3)'],
            boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 15px rgba(212,175,55,0.5)', '0 0 0 rgba(212,175,55,0)']
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="relative flex items-center gap-2">
            {isMobile && hoverState !== 'coder' && !(clickedStates.coder && clickedStates.photographer) && (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
            )}
            Coder  
          </span>
        </motion.div>

        <motion.div
          className={`absolute md:top-1/4 md:-right-44 -top-16 right-0 text-white font-bold text-2xl z-20 cursor-pointer
            ${hoverState === 'photographer' ? 'opacity-100 text-gold shadow-gold/50' : 'opacity-70'}
            ${isMobile ? 'backdrop-blur-sm bg-black/30 px-4 py-2 rounded-xl border border-gold/30' : ''}`}
          onClick={() => handleIndicatorClick('photographer')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isMobile && hoverState !== 'photographer' && !(clickedStates.coder && clickedStates.photographer) ? {
            scale: [1, 1.05, 1],
            borderColor: ['rgba(212,175,55,0.3)', 'rgba(212,175,55,1)', 'rgba(212,175,55,0.3)'],
            boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 15px rgba(212,175,55,0.5)', '0 0 0 rgba(212,175,55,0)']
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 // Stagger the animation slightly
          }}
        >
          <span className="relative flex items-center gap-2">
            {isMobile && hoverState !== 'photographer' && !(clickedStates.coder && clickedStates.photographer) && (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
            )}
            Photographer
          </span>
        </motion.div>
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

      {/* Navigation text and overlay - Only visible on desktop and when hovering on respective sides */}
      <button
        className={`hidden md:block absolute hover:cursor-pointer hoverable left-0 inset-y-0 w-1/4 z-20 transition-all duration-300 
          ${hoverState === 'coder' ? 'opacity-100' : 'opacity-0'}`}
        onClick={navigateToProjects}
      >
        <div className="relative h-full w-full group">
          {/* Golden gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Large default arrow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            <span className="text-gold/30 text-[8rem] font-thin transform -translate-x-4">←</span>
          </div>

          {/* Projects text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gold text-6xl font-light tracking-widest">
              PROJECTS
            </span>
          </div>
        </div>
      </button>

      <button
        className={`hidden md:block absolute hover:cursor-pointer hoverable right-0 inset-y-0 w-1/4 z-20 transition-all duration-300 
          ${hoverState === 'photographer' ? 'opacity-100' : 'opacity-0'} `}
        onClick={navigateToGallery}
      >
        <div className="relative h-full w-full group">
          {/* Golden gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Large default arrow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            <span className="text-gold/30 text-[8rem] font-thin transform translate-x-4">→</span>
          </div>

          {/* Gallery text */}
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 transform rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gold text-6xl font-light tracking-widest">
              GALLERY
            </span>
          </div>
        </div>
      </button>

      {/* Mobile Navigation - Only visible on mobile devices */}
      <div className="md:hidden fixed bottom-8 left-0 right-0 flex justify-center gap-6 z-40 px-4">
        <motion.button
          onClick={navigateToProjects}
          className={`px-8 py-3 rounded-full font-bold tracking-wider backdrop-blur-md transition-colors duration-300 border border-gold ${hoverState === 'coder'
            ? 'bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.6)]'
            : 'bg-black/60 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
            }`}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: hoverState === 'coder' ? 1.05 : 1,
            boxShadow: hoverState === 'coder'
              ? "0 0 25px rgba(212,175,55,0.6)"
              : [
                "0 0 0px rgba(212,175,55,0)",
                "0 0 15px rgba(212,175,55,0.3)",
                "0 0 0px rgba(212,175,55,0)",
              ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: { duration: 0.3 }
          }}
        >
          Projects
        </motion.button>

        <motion.button
          onClick={navigateToGallery}
          className={`px-8 py-3 rounded-full font-bold tracking-wider backdrop-blur-md transition-colors duration-300 border border-gold ${hoverState === 'photographer'
            ? 'bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.6)]'
            : 'bg-black/60 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
            }`}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: hoverState === 'photographer' ? 1.05 : 1,
            boxShadow: hoverState === 'photographer'
              ? "0 0 25px rgba(212,175,55,0.6)"
              : [
                "0 0 0px rgba(212,175,55,0)",
                "0 0 15px rgba(212,175,55,0.3)",
                "0 0 0px rgba(212,175,55,0)",
              ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            },
            scale: { duration: 0.3 }
          }}
        >
          Gallery
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileSection;
