import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TrailSegment {
  ref: React.RefObject<HTMLDivElement>;
}

const TRAIL_LENGTH = 12; // Number of trail segments
const TRAIL_DELAY = 0.05; // Delay between each trail segment
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
      // Use clientX/Y for viewport-relative coordinates and add scroll position
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      
      const x = e.clientX + scrollX;
      const y = e.clientY + scrollY;
      
      mousePosition.current = { x, y };

      // Update cursor position with fixed positioning
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX, // Use clientX for viewport-relative positioning
          y: e.clientY, // Use clientY for viewport-relative positioning
          duration: 0.8,
          ease: "power2.out"
        });
      }

      setIsMoving(true);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }

      movementTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 300);
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

      setIsHovering(isHoverable);
      
      if (isHoverable) {
        gsap.to(cursorRef.current, {
          width: CURSOR_SIZE.hover,
          height: CURSOR_SIZE.hover,
          backgroundColor: 'rgba(212, 175, 55, 0.2)',
          borderColor: '#D4AF37',
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(cursorRef.current, {
          width: CURSOR_SIZE.default,
          height: CURSOR_SIZE.default,
          backgroundColor: 'transparent',
          borderColor: '#D4AF37',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleScroll = () => {
      if (cursorRef.current) {
        // Update cursor position on scroll
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        
        gsap.to(cursorRef.current, {
          x: mousePosition.current.x - scrollX,
          y: mousePosition.current.y - scrollY,
          duration: 0.8,
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
  }, []);

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
    const updateTrail = () => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      trailRefs.current.forEach((segment, index) => {
        if (!segment.ref.current) return;

        const delay = (index + 1) * TRAIL_DELAY;
        const progress = 1 - index / TRAIL_LENGTH;

        gsap.to(segment.ref.current, {
          x: mousePosition.current.x - scrollX,
          y: mousePosition.current.y - scrollY,
          duration: 0.3,
          delay,
          opacity: (isMoving || isMouseDown) ? progress * 0.6 : 0,
          scale: isMouseDown ? 1.2 - progress * 0.4 : 1 - progress * 0.3,
          ease: "power2.out",
          boxShadow: (isMoving || isMouseDown) 
            ? `0 0 ${10 * progress}px rgba(212, 175, 55, ${0.3 * progress})`
            : 'none'
        });
      });
    };

    const animateTrail = () => {
      updateTrail();
      if (isMoving || isMouseDown) {
        animationFrameId.current = requestAnimationFrame(animateTrail);
      } else if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };

    animateTrail();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMoving, isMouseDown]);

  return (
    <>
      {/* Trail segments */}
      {trailRefs.current.map((segment, index) => (
        <div
          key={index}
          ref={segment.ref}
          className="fixed w-3 h-3 rounded-full bg-gold pointer-events-none z-40"
          style={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(212, 175, 55, 0.3)'
          }}
        />
      ))}

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: CURSOR_SIZE.default,
          height: CURSOR_SIZE.default,
          transform: 'translate(-50%, -50%)',
          border: '2px solid #D4AF37',
          borderRadius: '50%',
          transition: 'width 0.2s, height 0.2s',
          willChange: 'transform'
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
