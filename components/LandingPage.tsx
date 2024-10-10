import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from 'react-starfield';
import ShootingStar from './ShootingStar';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  const [secretCode, setSecretCode] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode === 'verity') {
      onExplore();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://forms.gle/Nn11jtQ7nkLHqTPu6', '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#000814]">
      <Starfield
        starCount={1500}
        starColor={[255, 255, 255]}
        speedFactor={0}
        backgroundColor="transparent"
      />
      <ShootingStar />
      <div className="z-10 text-center">
        <h1 className="text-6xl font-bold mb-8 text-[#5beebd] drop-shadow-[0_0_10px_rgba(91,238,189,0.8)]">Welcome to Verity OS</h1>
        <form onSubmit={handleSecretSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="password"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Enter passcode"
            className="w-64 px-4 py-2 bg-black/30 border border-[#5beebd] rounded-full text-white focus:outline-none focus:ring-2 focus:ring-[#5beebd] transition-all duration-300 placeholder-gray-400"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#5beebd] text-black rounded-full hover:bg-[#4ad9a8] transition-colors text-sm font-bold"
          >
            Enter
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignUp}
            className="px-4 py-2 bg-[#5beebd] text-black rounded-full hover:bg-[#4ad9a8] transition-colors text-xs font-bold"
          >
            Sign up for beta
          </motion.button>
        </form>
        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 mt-4"
            >
              Incorrect passcode. Please try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;