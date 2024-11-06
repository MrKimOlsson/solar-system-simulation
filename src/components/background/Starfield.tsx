import React, { useEffect, useRef } from 'react';
import './Starfield.scss';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: { x: number; y: number; z: number; twinkleFactor: number }[] = [];
    // Set number of stars
    const numStars = 1000;

    // Random star speed
    const randomSpread = (range: number) => (Math.random() - 0.5) * range * 3;

    // Initialize stars with spread-out positions and a random twinkle factor
    for (let i = 0; i < numStars; i++) {
      stars.push({
        // Spread width
        x: randomSpread(canvas.width * 2),
        // Spread hight
        y: randomSpread(canvas.height * 2),
        z: Math.random() * canvas.width,
        // Set star twinkle amount
        twinkleFactor: Math.random() * 0.005 + 0.95, // Starting twinkle factor close to 1
      });
    }

    // Render the starfield background
    const render = () => {
      // Background color
      ctx.fillStyle = 'black';
      // Size
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Set movement speed
        star.z -= .4;
        // Move star closer at a slower speed
        if (star.z <= 0) {
          star.x = randomSpread(canvas.width * 2);
          star.y = randomSpread(canvas.height * 2);
          star.z = canvas.width;
        }

        // Calculate screen position of the star
        const k = 128 / star.z;
        const x = star.x * k + canvas.width / 2;
        const y = star.y * k + canvas.height / 2;

        // Smaller stars for subtle visibility and reduced opacity
        const size = (1 - star.z / canvas.width) * 1.5;
        
        // Apply twinkle effect
        star.twinkleFactor += (Math.random() - 0.5) * 0.02; // Adjust twinkle intensity here
        star.twinkleFactor = Math.min(1, Math.max(0.9, star.twinkleFactor)); // Limit to keep it subtle

        ctx.fillStyle = `rgba(255, 255, 255, ${(1 - star.z / canvas.width) * 0.5 * star.twinkleFactor})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Starfield;
