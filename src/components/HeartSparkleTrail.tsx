import React, { useEffect, useState, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  rotate: number;
}

const SYMBOLS = ['💖', '✨', '🌸', '❤️', '⭐', '🎀'];
const COLORS = ['#F472B6', '#FBBF24', '#C084FC', '#FB7185', '#E879F9'];

export const HeartSparkleTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const particleIdRef = useRef<number>(0);

  const addParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    // Throttle to 30ms for buttery smooth performance
    if (now - lastTimeRef.current < 30) return;
    lastTimeRef.current = now;

    const id = particleIdRef.current++;
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = Math.floor(Math.random() * 8) + 12; // 12px to 20px
    const rotate = Math.floor(Math.random() * 40) - 20;

    const newParticle: Particle = {
      id,
      x,
      y,
      symbol,
      color,
      size,
      rotate
    };

    setParticles((prev) => [...prev.slice(-24), newParticle]);

    // Cleanup after animation completes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 900);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      addParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none pointer-events-none animate-float-fade"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            color: p.color,
            transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
            textShadow: `0 0 10px ${p.color}`
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};
