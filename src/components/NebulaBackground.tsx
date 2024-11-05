// NebulaBackground.tsx
import React, { useRef, useEffect } from 'react';

const NebulaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nebulaColors = [
      'rgba(173, 0, 255, 0.03)', // Soft purple

    //   'rgba(75, 0, 130, 0.02)',  // Deep indigo
    ];

    const nebulas = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 300 + Math.random() * 300, // Larger initial radius for mist effect
      scaleX: 1.5 + Math.random(),
      scaleY: 1.5 + Math.random(),
      rotation: Math.random() * Math.PI * 2,
      targetScaleX: 1.2 + Math.random(),
      targetScaleY: 1.2 + Math.random(),
      targetRotation: Math.random() * Math.PI * 2,
      dx: (Math.random() - 0.5) * 0.01,
      dy: (Math.random() - 0.5) * 0.01,
      color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
    }));

    const updateNebulaTargets = () => {
      nebulas.forEach((nebula) => {
        nebula.targetScaleX = 1.3 + Math.random();
        nebula.targetScaleY = 1.3 + Math.random();
        nebula.targetRotation = Math.random() * Math.PI * 2;
      });
    };

    setInterval(updateNebulaTargets, 6000);

    const renderNebula = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebulas.forEach((nebula) => {
        nebula.scaleX += (nebula.targetScaleX - nebula.scaleX) * 0.01;
        nebula.scaleY += (nebula.targetScaleY - nebula.scaleY) * 0.01;
        nebula.rotation += (nebula.targetRotation - nebula.rotation) * 0.01;

        ctx.save();
        ctx.translate(nebula.x, nebula.y);
        ctx.rotate(nebula.rotation);
        ctx.scale(nebula.scaleX, nebula.scaleY);

        for (let i = 0; i < 8; i++) { // Increase the layers
          const offsetRadius = nebula.radius * (0.6 + i * 0.15); // More gradual growth per layer
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, offsetRadius);
          gradient.addColorStop(0, nebula.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(
            0, 0,
            offsetRadius * (1 + Math.random() * 0.2), // Smaller offset and irregularity
            offsetRadius * (0.8 + Math.random() * 0.2),
            Math.random() * Math.PI * 2,
            0, Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();

        nebula.x += nebula.dx;
        nebula.y += nebula.dy;

        if (nebula.x < -nebula.radius || nebula.x > canvas.width + nebula.radius) nebula.dx *= -1;
        if (nebula.y < -nebula.radius || nebula.y > canvas.height + nebula.radius) nebula.dy *= -1;
      });
    };

    const animate = () => {
      renderNebula();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, opacity: 0.12 }}
    />
  );
};

export default NebulaBackground;
