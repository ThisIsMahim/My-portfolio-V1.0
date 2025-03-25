import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TrailSegment {
  ref: React.RefObject<HTMLDivElement>;
}

const TRAIL_LENGTH = 8; // Reduced from 12 to 8
const TRAIL_DELAY = 0.08; // Increased from 0.05 to 0.08
const CURSOR_SIZE = {
  default: 25,
  hover: 40,
  down: 20
};

const MouseTrail = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<TrailSegment[]>([]);
  const mousePosition = useRef({ x: -100, y: -100 });
  const movementTimeout = useRef<NodeJS.Timeout>();
  const animationFrameId = useRef<number>();
  const lastUpdateTime = useRef(0);

  // Initialize trail segments
  useEffect(() => {
    trailRefs.current = Array(TRAIL_LENGTH)
      .fill(null)
      .map(() => ({ ref: React.createRef<HTMLDivElement>() }));

    return () => {
      trailRefs.current = [];
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      
      const x = e.clientX + scrollX;
      const y = e.clientY + scrollY;
      
      mousePosition.current = { x, y };

      // Throttle cursor updates
      const now = Date.now();
      if (now - lastUpdateTime.current > 16) { // ~60fps
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2, // Reduced from 0.8
            ease: "power2.out"
          });
        }
        lastUpdateTime.current = now;
      }

      setIsMoving(true);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }

      movementTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 100); // Reduced from 300
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable')
      );

      if (isHoverable !== isHovering) { // Only update if state actually changes
        setIsHovering(isHoverable);
        
        gsap.to(cursorRef.current, {
          width: isHoverable ? CURSOR_SIZE.hover : CURSOR_SIZE.default,
          height: isHoverable ? CURSOR_SIZE.hover : CURSOR_SIZE.default,
          backgroundColor: isHoverable ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
          borderColor: '#D4AF37',
          duration: 0.2, // Reduced from 0.3
          ease: "power2.out"
        });
      }
    };

    const handleScroll = () => {
      if (cursorRef.current) {
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        
        gsap.to(cursorRef.current, {
          x: mousePosition.current.x - scrollX,
          y: mousePosition.current.y - scrollY,
          duration: 0.2, // Reduced from 0.8
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
    };
  }, [isHovering]); // Added isHovering to dependencies

  // Handle mouse down/up events
  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
      gsap.to(cursorRef.current, {
        width: CURSOR_SIZE.down,
        height: CURSOR_SIZE.down,
        borderWidth: '3px',
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      gsap.to(cursorRef.current, {
        width: isHovering ? CURSOR_SIZE.hover : CURSOR_SIZE.default,
        height: isHovering ? CURSOR_SIZE.hover : CURSOR_SIZE.default,
        borderWidth: '2px',
        duration: 0.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHovering]);

  // Update trail segments
  useEffect(() => {
    let lastTrailUpdate = 0;
    
    const updateTrail = () => {
      const now = Date.now();
      if (now - lastTrailUpdate < 16) return; // Limit to ~60fps
      
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      trailRefs.current.forEach((segment, index) => {
        if (!segment.ref.current) return;

        const delay = (index + 1) * TRAIL_DELAY;
        const progress = 1 - index / TRAIL_LENGTH;

        gsap.to(segment.ref.current, {
          x: mousePosition.current.x - scrollX,
          y: mousePosition.current.y - scrollY,
          duration: 0.2, // Reduced from 0.3
          delay,
          opacity: (isMoving || isMouseDown) ? progress * 0.4 : 0, // Reduced opacity
          scale: isMouseDown ? 1.1 - progress * 0.3 : 1 - progress * 0.2, // Reduced scale effect
          ease: "power2.out"
        });
      });
      
      lastTrailUpdate = now;
    };

    const animateTrail = () => {
      updateTrail();
      if (isMoving || isMouseDown) {
        animationFrameId.current = requestAnimationFrame(animateTrail);
      }
    };

    if (isMoving || isMouseDown) {
      animateTrail();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMoving, isMouseDown]);

  return (
    <>
      {trailRefs.current.map((segment, index) => (
        <div
          key={index}
          ref={segment.ref}
          className="fixed w-2 h-2 rounded-full bg-gold pointer-events-none z-40 opacity-0"
          style={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(212, 175, 55, 0.3)'
          }}
        />
      ))}

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: CURSOR_SIZE.default,
          height: CURSOR_SIZE.default,
          transform: 'translate(-50%, -50%)',
          border: '2px solid #D4AF37',
          borderRadius: '50%',
          willChange: 'transform, width, height'
        }}
      >
        <div 
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </>
  );
};

export default MouseTrail;
