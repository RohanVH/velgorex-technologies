import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Rocket, 
  TrendingUp, 
  Layout,
  Smartphone,
  Globe,
  Monitor
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const SceneBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00AEEF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#CFA75B" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} position={[2, 1, 0]}>
              <MeshDistortMaterial
                color="#00AEEF"
                speed={2}
                distort={0.4}
                transparent
                opacity={0.3}
              />
            </Sphere>
          </Float>
        </Canvas>
      </div>

      {/* Cinematic Blue Glows */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-blue/10 blur-[180px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-blue/5 blur-[200px] rounded-full mix-blend-screen" />

      {/* Light Streaks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%", y: `${20 + i * 25}%`, opacity: 0 }}
            animate={{ 
              x: "200%",
              opacity: [0, 0.15, 0]
            }}
            transition={{ 
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
            className="absolute h-[1px] w-[50%] bg-gradient-to-r from-transparent via-brand-blue to-transparent rotate-[-15deg]"
          />
        ))}
      </div>
    </div>
  );
};

const DevelopmentJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Normalize scroll for smoother experience across devices
      ScrollTrigger.normalizeScroll(true);

      // MASTER TIMELINE - Compact and impactful
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", 
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      const sceneDur = 1.2;
      const transitionDur = 0.8;

      // INITIAL STATE
      gsap.set(".scene-1, .scene-2, .scene-3, .scene-4, .scene-pause", { opacity: 0, scale: 0.9, y: 30 });

      // SCENE 1: CODE (Center Screen, Fast Typing)
      masterTl
        .to(".scene-1", { opacity: 1, scale: 1, y: 0, duration: sceneDur })
        .to(".scene-1-typing", { width: "100%", duration: 0.8, ease: "steps(30)" })
        .to(".scene-1", { opacity: 0, scale: 1.5, z: 500, filter: "blur(20px)", duration: transitionDur });

      // SCENE 2: TRANSFORMATION (WOW Moment - Fragments Snapping to UI)
      masterTl
        .fromTo(".scene-2", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: sceneDur })
        .fromTo(".fragment", { 
          x: (i) => (Math.random() - 0.5) * 800, 
          y: (i) => (Math.random() - 0.5) * 800,
          z: (i) => Math.random() * -600,
          opacity: 0,
          rotation: (i) => Math.random() * 360
        }, { 
          x: 0, 
          y: 0, 
          z: 0,
          opacity: 1, 
          rotation: 0, 
          stagger: 0.05, 
          duration: 1.5, 
          ease: "back.out(1.5)" 
        })
        .to(".scene-2-ui", { scale: 1.05, boxShadow: "0 0 60px rgba(0, 174, 239, 0.4)", duration: 1.5, ease: "power2.inOut" })
        .to(".scene-2", { opacity: 0, scale: 1.2, z: 300, duration: transitionDur });

      // BRIDGE: PAUSE MOMENT
      masterTl
        .to(".scene-pause", { opacity: 1, scale: 1, y: 0, duration: sceneDur })
        .to(".scene-pause-text", { letterSpacing: "1.2em", duration: 2, ease: "power2.out" })
        .to(".scene-pause", { opacity: 0, scale: 1.1, duration: transitionDur }, "+=0.5");

      // SCENE 3: DEPLOYMENT
      masterTl
        .to(".scene-3", { opacity: 1, scale: 1, y: 0, duration: sceneDur })
        .to(".scene-3-progress", { width: "100%", duration: 1.5, ease: "slow(0.7, 0.7, false)" })
        .fromTo(".scene-3-success", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" })
        .to(".scene-3", { opacity: 0, y: -50, duration: transitionDur });

      // SCENE 4: RESULT
      masterTl
        .to(".scene-4", { opacity: 1, scale: 1, y: 0, duration: sceneDur })
        .fromTo(".scene-4-chart", { scaleY: 0 }, { scaleY: 1, transformOrigin: "bottom", duration: 1.2, ease: "power4.out" })
        .to(".scene-4", { opacity: 0, scale: 1.1, duration: transitionDur });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="journey-root relative z-10 w-full h-[100svh] overflow-hidden bg-black selection:bg-brand-blue/30" style={{ touchAction: 'pan-y' }}>
      <SceneBackground />
      
      {/* GLOBAL OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 opacity-[0.015]" 
             style={{ backgroundImage: 'radial-gradient(circle, #00AEEF 1.5px, transparent 1.5px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* SCENE 1: CODE */}
        <section className="scene-1 absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0">
          <div className="w-full max-w-2xl glass-premium rounded-xl overflow-hidden shadow-2xl border-white/5 relative">
             <div className="h-2 bg-brand-blue/20 w-full" />
             <div className="p-8 font-mono text-lg md:text-xl font-light text-white/90 bg-[#010101] relative flex flex-col justify-center min-h-[180px]">
                <div className="scene-1-typing w-0 overflow-hidden whitespace-nowrap border-r-2 border-brand-gold">
                  <p className="mb-2"><span className="text-brand-blue">import</span> {'{ System }'} <span className="text-brand-blue">from</span> <span className="text-brand-gold">"velgorex"</span></p>
                  <p className="mb-2"><span className="text-brand-blue">const</span> app = <span className="text-brand-blue">new</span> System()</p>
                  <p><span className="text-brand-gold">app</span>.<span className="text-brand-blue">launch</span>()</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/10 blur-[80px] pointer-events-none" />
             </div>
          </div>
          <div className="mt-8 md:mt-12 text-center px-4">
             <h2 className="text-xl md:text-4xl font-display font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40">
                Every system starts with <span className="text-white font-black tracking-tight">code</span>
             </h2>
          </div>
        </section>

        {/* SCENE 2: TRANSFORMATION */}
        <section className="scene-2 absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0">
          <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
             <div className="scene-2-ui relative flex items-center justify-center w-full max-w-2xl aspect-video glass-premium rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="grid grid-cols-3 gap-6 w-full p-8">
                   {[
                     { title: "Mobile", icon: Smartphone, img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=80" },
                     { title: "Website", icon: Globe, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" },
                     { title: "Desktop", icon: Monitor, img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=400&q=80" }
                   ].map((item, i) => (
                     <div key={i} className="fragment group/item relative w-full h-40 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden">
                        {/* Background Cinematic Image */}
                        <div className="absolute inset-0 z-0">
                           <motion.img 
                             src={item.img} 
                             alt={item.title}
                             className="w-full h-full object-cover opacity-20 transition-all duration-700 group-hover/item:opacity-50 group-hover/item:scale-110 grayscale group-hover/item:grayscale-0"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>

                        {/* Icon & Label */}
                        <div className="relative z-10 flex flex-col items-center gap-3">
                           <div className="p-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 group-hover/item:bg-brand-blue group-hover/item:text-black transition-all duration-500 shadow-[0_0_20px_rgba(0,174,239,0.1)] group-hover/item:shadow-[0_0_30px_rgba(0,174,239,0.5)]">
                              <item.icon size={20} />
                           </div>
                           <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold group-hover/item:text-white transition-colors">
                             {item.title}
                           </span>
                        </div>

                        {/* Interaction Glow */}
                        <div className="absolute inset-0 border border-brand-blue/0 group-hover/item:border-brand-blue/30 rounded-xl transition-all duration-500" />
                     </div>
                   ))}
                </div>
                <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none" />
             </div>
          </div>
          <div className="mt-6 md:mt-8 text-center px-4">
             <h2 className="text-xl md:text-4xl font-display font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40">
                We turn logic into <span className="text-brand-gold font-black tracking-tight">real products</span>
             </h2>
          </div>
        </section>

        {/* BRIDGE: CINEMATIC PAUSE */}
        <section className="scene-pause absolute inset-0 flex items-center justify-center p-12 opacity-0 bg-black/80 backdrop-blur-sm z-30 font-display">
           <h2 className="scene-pause-text text-xl md:text-5xl font-black uppercase text-white tracking-[0.8em] text-center leading-relaxed">
              This is where <br/>
              <span className="text-brand-gold">ideas become systems</span>
           </h2>
        </section>

        {/* SCENE 3: DEPLOYMENT */}
        <section className="scene-3 absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0">
          <div className="w-full max-w-md glass-premium rounded-2xl p-10 border-white/10 shadow-2xl bg-[#030303] relative">
             <div className="flex items-center gap-3 mb-8 opacity-40">
                <Terminal size={16} className="text-brand-blue" />
                <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Production Cluster</span>
             </div>
             <div className="space-y-6 font-mono text-sm text-white/60">
                <div className="flex items-center gap-3">
                   <span className="text-brand-blue">$</span>
                   <p className="typing-terminal">deploy --production</p>
                </div>
                <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="scene-3-progress absolute inset-y-0 left-0 bg-brand-blue" style={{ width: '0%' }} />
                </div>
                <div className="scene-3-success flex items-center gap-3 text-brand-gold opacity-0">
                   <CheckCircle2 size={18} />
                   <span className="font-bold uppercase tracking-[0.5em] text-[10px]">Ready to scale</span>
                </div>
             </div>
          </div>
          <div className="mt-6 md:mt-8 text-center px-4">
             <h2 className="text-xl md:text-4xl font-display font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40">
                Built. Launched. <span className="text-brand-blue font-black tracking-tight">Ready to scale.</span>
             </h2>
          </div>
        </section>
        
        {/* SCENE 4: RESULT */}
        <section className="scene-4 absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0">
          <div className="w-full max-w-3xl glass-premium rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border-white/5 shadow-2xl relative overflow-hidden bg-white/[0.01]">
             <div className="flex justify-between items-center mb-8 md:mb-16">
                <div className="space-y-1">
                   <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight">Performance Index</h3>
                   <span className="text-[9px] md:text-[10px] font-mono text-brand-gold uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-60">Revenue Growth</span>
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30">
                   <TrendingUp className="text-brand-blue w-5 h-5 md:w-6 md:h-6" />
                </div>
             </div>
             
             <div className="h-32 md:h-40 flex items-end justify-between gap-3 md:gap-6 px-4 md:px-10">
                {[40, 50, 60, 55, 80, 95, 100].map((h, i) => (
                  <div key={i} className="flex-1 relative group h-full flex items-end">
                    <div 
                      className="scene-4-chart w-full bg-gradient-to-t from-brand-blue/10 to-brand-blue shadow-[0_0_20px_rgba(0,174,239,0.2)] rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
             </div>
          </div>
          <div className="mt-6 md:mt-8 text-center px-4">
             <h2 className="text-xl md:text-4xl font-display font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40">
                Designed to <span className="text-brand-gold font-black tracking-tight">grow your business</span>
             </h2>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DevelopmentJourney;
