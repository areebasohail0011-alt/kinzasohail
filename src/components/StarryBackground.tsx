import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  twinkleSpeed: number;
  color: string;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const starCount = Math.floor((width * height) / 7000);
    const starColors = ['#ffffff', '#fbcfe8', '#e9d5ff', '#fef08a', '#c7d2fe'];
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.5,
          alpha: Math.random() * 0.7 + 0.2,
          maxAlpha: Math.random() * 0.6 + 0.4,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }
    };

    initStars();

    // Shooting star simulation
    let shootingStar: { x: number; y: number; length: number; speed: number; angle: number; opacity: number } | null = null;
    let nextShootingStarTime = Date.now() + 4000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient glow gradients
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.2, 50, width * 0.2, height * 0.2, width * 0.6);
      grad1.addColorStop(0, 'rgba(112, 26, 117, 0.12)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 50, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(67, 24, 112, 0.1)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.twinkleSpeed;
        if (star.alpha > star.maxAlpha || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional soft glow for brighter stars
        if (star.size > 1.4) {
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Handle shooting stars
      const now = Date.now();
      if (!shootingStar && now > nextShootingStarTime) {
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 70,
          speed: Math.random() * 10 + 12,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          opacity: 1
        };
        nextShootingStarTime = now + Math.random() * 8000 + 6000;
      }

      if (shootingStar) {
        const headX = shootingStar.x;
        const headY = shootingStar.y;
        const tailX = headX - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = headY - Math.sin(shootingStar.angle) * shootingStar.length;

        const sGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        sGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        sGrad.addColorStop(1, `rgba(253, 224, 71, ${shootingStar.opacity})`);

        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = shootingStar.opacity;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar = null;
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
