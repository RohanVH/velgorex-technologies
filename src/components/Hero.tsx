import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ color = "#00AEEF" }: { color?: string }) => {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 10;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

const AtmosphericGlow = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-brand-blue/10 blur-[150px] rounded-full mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [1.2, 1, 1.2],
          x: [20, -20, 20],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-30%] right-[-10%] w-[90%] h-[90%] bg-brand-blue/5 blur-[180px] rounded-full mix-blend-screen"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />
    </div>
  );
};

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [sequenceIndex, setSequenceIndex] = useState(0);
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(typingInterval);
        // Start reset timer after typing is complete
        setTimeout(() => {
          setDisplayedText('');
          // Increment sequence to trigger re-run
          setSequenceIndex(prev => prev + 1);
        }, 5000);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [text, sequenceIndex]);

  return <span>{displayedText}</span>;
};

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden py-10 md:py-16" 
             style={{ 
               touchAction: 'pan-y',
               background: '#000'
             }}>
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 3D Particle Field Layer */}
        <div className="absolute inset-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ParticleField color="#00AEEF" />
          </Canvas>
        </div>

        {/* Global Atmospheric Glows */}
        <AtmosphericGlow />

        {/* Framing Glowing Orbs (Blue & Gold Combo) - Increased Visibility */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none z-10">
          {/* Left Side Side Orbs */}
          <motion.div 
            animate={{ 
              y: [-40, 40, -40],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] -left-[15%] w-80 h-80 md:w-[600px] md:h-[600px] bg-[#00AEEF]/30 blur-[120px] md:blur-[200px] rounded-full"
          />
          <motion.div 
            animate={{ 
              y: [40, -40, 40],
              opacity: [0.25, 0.5, 0.25],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[5%] -left-[10%] w-64 h-64 md:w-[450px] md:h-[450px] bg-[#CFA75B]/25 blur-[100px] md:blur-[160px] rounded-full"
          />

          {/* Right Side Side Orbs */}
          <motion.div 
            animate={{ 
              y: [40, -40, 40],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[5%] -right-[15%] w-72 h-72 md:w-[550px] md:h-[550px] bg-[#E6B96A]/25 blur-[110px] md:blur-[180px] rounded-full"
          />
          <motion.div 
            animate={{ 
              y: [-40, 40, -40],
              opacity: [0.35, 0.7, 0.35],
              scale: [1.3, 1, 1.3]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[10%] -right-[10%] w-80 h-80 md:w-[600px] md:h-[600px] bg-[#1E90FF]/30 blur-[120px] md:blur-[200px] rounded-full"
          />
        </div>

        {/* Premium Gold Bottom Glow & Fog Effect */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-10 overflow-hidden">
          {/* Main Radial Glow */}
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[150%] bg-gradient-to-t from-[#CFA75B]/20 via-[#E6B96A]/5 to-transparent blur-[100px] rounded-[100%]"
          />
          
          {/* Fog Layer */}
          <motion.div 
            animate={{ 
              x: ["-2%", "2%"],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-full h-full opacity-40 mix-blend-overlay"
            style={{ 
              background: "linear-gradient(to top, #CFA75B 0%, transparent 100%)",
              maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)"
            }}
          />

          {/* Shimmering Bottom Edge */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E6B96A]/40 to-transparent blur-[2px]" />
        </div>

        {/* Subtle Noise / Grain Layer */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-20" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        
        {/* Scanning Light Line */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent z-10"
        />
      </div>

      {/* Content Layer */}
      <div className="hero-content-main container mx-auto px-6 relative z-20 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-4 md:mb-6 flex justify-center group cursor-pointer relative"
        >
          {/* Subtle Cinematic Glow */}
          <motion.div
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-10 bg-brand-blue/10 blur-[40px] rounded-full -z-10 group-hover:bg-brand-gold/20 transition-all duration-1000"
          />
          
          <img 
            src="/Logo.png" 
            alt="Velgorex Logo" 
            className="h-24 md:h-32 w-auto relative z-10 drop-shadow-[0_0_40px_rgba(0,174,239,0.5)]"
          />
        </motion.div>

        <div className="space-y-4 md:space-y-8 w-full max-w-6xl text-center flex flex-col items-center">
          {/* Tagline with Cinematic Gradient Animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative"
          >
            <motion.h2 
              className="text-2xl md:text-5xl font-display font-black tracking-[0.1em] uppercase relative z-10 leading-tight"
              style={{
                background: "linear-gradient(to right, #FFFFFF, #00AEEF, #CFA75B, #FFFFFF)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              The Technology Behind Winning Brands
            </motion.h2>
            <motion.div 
               animate={{ opacity: [0.05, 0.2, 0.05], scale: [1, 1.05, 1] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -inset-6 bg-brand-blue/5 blur-3xl -z-10 rounded-full"
            />
          </motion.div>

          {/* Clean One-line Heading with Gold Animation */}
          <div className="relative mt-2 max-w-full">
            <motion.h1 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight md:tracking-[0.3em] uppercase relative z-10 whitespace-normal px-4"
              style={{
                background: "linear-gradient(to right, #FFFFFF, #CFA75B, #E6B96A, #FFFFFF)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              Website & App Development That Brings You Customers
            </motion.h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
          </div>

          <div className="max-w-2xl mx-auto px-4 mt-4 min-h-[3em] flex items-center justify-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-white/80 text-sm md:text-xl font-sans font-medium tracking-tight leading-relaxed text-center"
            >
              <TypingText text="Turn visitors into customers with high-performing digital experiences." />
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-5 md:w-2 md:h-6 bg-brand-gold ml-2 align-middle shadow-[0_0_10px_rgba(207,167,91,0.5)]"
              />
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
      >
        <div className="w-px h-16 bg-gradient-to-b from-brand-gold/50 via-brand-gold/20 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 64, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-blue/20 blur-[1px]"
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-white/20 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
