import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Create grid
    const gridSize = 50;
    const gridOpacity = 0.2;

    function drawGrid() {
      if (!ctx) return;
      ctx.strokeStyle = `rgba(91, 238, 189, ${gridOpacity})`;
      ctx.lineWidth = 0.5;

      if (canvas) {
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
    }

    function createShootingStar(canvas: HTMLCanvasElement) {
      const x = Math.random() * canvas.width;
      const y = 0;
      const length = Math.random() * 80 + 50;
      const speed = Math.random() * 15 + 5;
      shootingStars.push({ x, y, length, speed, opacity: 1 });
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid();

      // Animate and draw stars
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate and draw shooting stars
      shootingStars.forEach((star, index) => {
        star.y += star.speed;
        star.x += star.speed;
        star.opacity -= 0.01;

        if (star.opacity <= 0) {
          shootingStars.splice(index, 1);
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.length, star.y - star.length);
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Create a new shooting star every 4 seconds
    setInterval(createShootingStar, 4000);

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default SpaceBackground;