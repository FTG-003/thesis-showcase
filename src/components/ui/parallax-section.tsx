import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection = ({ children, speed = 0.5, className = '' }: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      return undefined;
    }

    let animationFrameId = 0;
    const updatePosition = () => {
      animationFrameId = 0;
      if (!containerRef.current || !innerRef.current) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const rate = window.scrollY * -speed;
        innerRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    const handleScroll = () => {
      if (animationFrameId) {
        return;
      }
      animationFrameId = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      <div
        ref={innerRef}
        style={{
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};
