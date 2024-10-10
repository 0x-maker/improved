import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ShootingStar: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newX = Math.random() * window.innerWidth;
      const newY = Math.random() * window.innerHeight / 2; // Start in the top half of the screen
      setPosition({ x: newX, y: newY });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 1000); // Hide after 1 second
    }, 4000); // Trigger every 4 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{ top: position.y, left: position.x }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: [1, 0],
        scale: [0, 1],
        x: 100,
        y: 100,
      }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  );
};

export default ShootingStar;