import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence timing
    const timers = [
      setTimeout(() => setStage(1), 500),   // Logo appears
      setTimeout(() => setStage(2), 1500),  // Circuit lines
      setTimeout(() => setStage(3), 3000),  // Lights up
      setTimeout(() => setStage(4), 4500),  // Complete/Transition
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {stage < 4 && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <motion.div 
            animate={stage >= 3 ? { opacity: [0, 0.2, 0.1] } : { opacity: 0 }}
            className="absolute inset-0 bg-brand-blue blur-[150px] rounded-full scale-150 pointer-events-none"
          />

          <div className="relative flex items-center justify-center">
            {/* Circuit Lines (Visualized with animated borders/gradients) */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Flow Particles */}
                    <motion.circle
                      r="1"
                      fill="#1E90FF"
                      animate={{
                        cx: [0, 100],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                      r="1"
                      fill="#CFA75B"
                      animate={{
                        cy: [0, 100],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "brightness(0.5) blur(10px)" }}
              animate={
                stage === 1 ? { scale: 1, opacity: 1, filter: "brightness(0.8) blur(0px)" } :
                stage === 2 ? { scale: 1.05, opacity: 1, filter: "brightness(1) blur(0px)" } :
                stage === 3 ? { 
                  scale: 1, 
                  opacity: 1, 
                  filter: "brightness(1.5) drop-shadow(0 0 40px rgba(0, 174, 239, 0.6))",
                } : {}
              }
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <img src="/Logo.png" alt="Velgorex Logo" className="h-40 md:h-56 w-auto" />
              
              {/* Gold Flash Overlay */}
              <motion.div
                animate={stage >= 3 ? { opacity: [0, 0.4, 0] } : { opacity: 0 }}
                className="absolute inset-0 bg-brand-gold mix-blend-overlay rounded-full blur-2xl"
              />
            </motion.div>

            {/* "System Boot" Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={stage >= 1 ? { opacity: 0.4 } : {}}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.8em] uppercase text-white whitespace-nowrap"
            >
              VELGOREX TECHNOLOGIES
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
