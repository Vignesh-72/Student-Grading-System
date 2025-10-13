import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './ScrollFloat.css';

const ScrollFloat = ({ children }) => {
  const containerRef = useRef(null);

  // This logic is for string-based animations, let's simplify for components
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el, // Animate the whole container
      {
        opacity: 0,
        y: 50, // Animate from 50px below
      },
      {
        duration: 3.5,
        opacity: 1,
        y: 0,
        ease: 'expo.out',
      }
    );
  }, []);

  return (
    // The ref is on the main div, and it renders the children directly
    <div ref={containerRef} className="scroll-float">
      {children}
    </div>
  );
};

export default ScrollFloat;