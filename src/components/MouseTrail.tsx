import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const TRAIL_LENGTH = 12; // Reduced back to 12 for performance
const CURSOR_SIZE = {
  default: 25,
  hover: 40,
  down: 20
};

const MouseTrail = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  // Use performant GSAP quickTo setters
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const trailXTo = useRef<gsap.QuickToFunc[]>([]);
  const trailYTo = useRef<gsap.QuickToFunc[]>([]);

  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Initialize GSAP quickSetters
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main cursor setters
      if (cursorRef.current) {
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      }

      // Trail setters
      trailRefs.current.forEach((el, i) => {
        if (el) {
          trailXTo.current[i] = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3", delay: i * 0.01 });
          trailYTo.current[i] = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3", delay: i * 0.01 });
        }
      });
    }, [trailContainerRef, cursorRef]);

    return () => ctx.revert();
  }, []);

  // Event Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Move main cursor
      xTo.current?.(clientX);
      yTo.current?.(clientY);

      // Move trail
      trailXTo.current.forEach((func) => func(clientX));
      trailYTo.current.forEach((func) => func(clientY));
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
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Visual State Animations
  useEffect(() => {
    if (!cursorRef.current) return;

    if (isMouseDown) {
      gsap.to(cursorRef.current, {
        width: CURSOR_SIZE.down,
        height: CURSOR_SIZE.down,
        borderWidth: 3,
        duration: 0.2,
        ease: "power2.out"
      });
    } else if (isHovering) {
      gsap.to(cursorRef.current, {
        width: CURSOR_SIZE.hover,
        height: CURSOR_SIZE.hover,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderColor: '#D4AF37',
        borderWidth: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    } else {
      gsap.to(cursorRef.current, {
        width: CURSOR_SIZE.default,
        height: CURSOR_SIZE.default,
        backgroundColor: 'transparent',
        borderColor: '#D4AF37',
        borderWidth: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovering, isMouseDown]);

  return (
    <>
      {/* Trail Elements */}
      <div ref={trailContainerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 overflow-hidden">
        {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              if (el) trailRefs.current[i] = el;
            }}
            className="absolute rounded-full bg-gold/40"
            style={{
              width: 12 - (i * 0.8), // Tapering size
              height: 12 - (i * 0.8),
              opacity: 0.6 - (i * 0.04), // Fading opacity
              top: 0,
              left: 0,
              transform: 'translate(-50%, -50%)',
              // Note: GSAP quickTo sets x/y which corresponds to transform: translate().
              // To center on mouse, we set top:0 left:0 and simple allow translate to move it.
              // But we want the visual center to be at x,y.
              // So we can use margin to offset or transform translate -50% -50% AND x/y. 
              // GSAP overwrites transform. So better to set xPercent/yPercent once.
            }}
          />
        ))}
      </div>

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-gold"
        style={{
          transform: 'translate(-100px, -100px)', // Initial position off-screen via transform
        }}
      >
        <div ref={cursorInnerRef} className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </>
  );
};

// Add initial alignment effect separate
const MouseTrailWrapper = () => {
  // We wrap to ensure internal refs are handled cleanly
  return <MouseTrail />;
};

export default MouseTrail;
