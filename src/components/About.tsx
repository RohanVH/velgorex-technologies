import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import SectionHeading from './SectionHeading';
import { Database, Terminal, Code2, Layers, Globe, Monitor, Shield, Zap } from 'lucide-react';

const TypingURL = ({ onComplete, isActive }: { onComplete: () => void, isActive: boolean }) => {
  const text = "www.customersite.com";
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      setIsDone(false);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onComplete();
        }, 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete, isActive]);

  return (
    <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono text-white/40 bg-white/[0.03] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/5 w-40 md:w-64">
      <Globe size={12} className="text-white/20" />
      <span>{displayText}</span>
      {!isDone && (
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-1.5 h-3 bg-brand-blue"
        />
      )}
    </div>
  );
};

const ClientWebsitePreview = ({ startScroll }: { startScroll: boolean }) => {
  return (
    <div className="relative w-full h-full bg-[#030303] overflow-hidden rounded-b-lg">
      <motion.div
        animate={startScroll ? {
          y: ["0%", "-75%"]
        } : { y: "0%" }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "linear",
          delay: 0.5
        }}
        className="w-full space-y-2"
      >
        {/* Navigation Mock */}
        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
           <div className="flex items-center gap-2">
             <div className="w-4 h-4 bg-brand-blue rounded-sm" />
             <div className="h-2 w-12 bg-white/20 rounded-full" />
           </div>
           <div className="flex gap-4">
             <div className="h-1.5 w-8 bg-white/10 rounded-full" />
             <div className="h-1.5 w-8 bg-white/10 rounded-full" />
             <div className="h-1.5 w-8 bg-white/10 rounded-full" />
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-64 w-full flex items-center px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="relative z-10 space-y-4 max-w-[70%]">
             <div className="h-1 w-8 bg-brand-blue rounded-full" />
             <h3 className="text-xl font-bold text-white leading-tight">Scale Your Digital Infrastructure</h3>
             <div className="space-y-2">
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-2/3 bg-white/10 rounded-full" />
             </div>
             <div className="w-20 h-8 bg-brand-blue/80 rounded-md" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 py-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Uptime', val: '99.9%', color: 'brand-blue' },
            { label: 'Security', val: 'L4/L7', color: 'brand-gold' },
            { label: 'Speed', val: '240ms', color: 'brand-blue' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className={`text-sm font-bold text-${stat.color}`}>{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Feature Sections with Real-looking images */}
        <div className="px-6 space-y-3">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 relative group">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
              alt="Performance Analytics" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 p-4 glass-premium rounded-xl border border-white/10 max-w-[200px]">
               <div className="text-[10px] font-bold text-white mb-1">Advanced Analytics</div>
               <div className="h-1 w-full bg-white/10 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative group">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" 
                alt="Data Visualization" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative group">
               <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500" 
                alt="Datacenter Infrastructure" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="px-6 py-8">
           <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue/20 to-transparent border border-brand-blue/10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue/30 flex items-center justify-center mb-4">
                 <Layers size={20} className="text-brand-blue" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Unparalleled Integration</h4>
              <p className="text-[10px] text-white/40 max-w-[200px] mx-auto">Seamlessly connect your existing stack with our zero-latency API infrastructure.</p>
           </div>
        </div>

        {/* Footer Mock */}
        <div className="px-6 py-12 border-t border-white/5 bg-black/60">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div className="h-2 w-16 bg-white/20 rounded-full" />
                 <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                 </div>
              </div>
              <div className="flex justify-end gap-2">
                 {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/5" />)}
              </div>
           </div>
        </div>
      </motion.div>
      
      {/* Overlay Shine & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 via-transparent to-white/5 opacity-40" />
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setTypingComplete(false);
    }
  }, [isInView]);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#030303]" style={{ touchAction: 'pan-y' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          <div className="about-card lg:w-1/2 relative">
            {/* Laptop UI */}
            <div className="relative z-10 rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              {/* Laptop Header */}
              <div className="bg-[#121212] p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                </div>
                <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                   <TypingURL isActive={isInView} onComplete={() => setTypingComplete(true)} />
                </div>
                <div className="flex items-center gap-4 text-white/20">
                   <Monitor size={14} />
                </div>
              </div>

              {/* Laptop Screen Content */}
              <div className="aspect-[16/10] w-full relative">
                 <ClientWebsitePreview startScroll={typingComplete} />
                 
                 {!typingComplete && (
                   <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm">
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white/20 flex flex-col items-center gap-4"
                      >
                         <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                            <Layers size={20} />
                         </div>
                         <span className="text-[10px] font-mono tracking-widest uppercase">Initializing Deployment...</span>
                      </motion.div>
                   </div>
                 )}
              </div>
            </div>

            {/* Decorative HUD Elements */}
            <AnimatePresence>
              {typingComplete && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-[20%] -right-12 z-20 glass-premium p-4 rounded-2xl border border-brand-blue/20 shadow-xl shadow-brand-blue/5"
                  >
                    <Database className="w-6 h-6 text-brand-blue" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-[20%] -left-12 z-20 glass-premium p-4 rounded-2xl border border-brand-blue/20 shadow-xl shadow-brand-blue/5"
                  >
                    <Zap className="w-6 h-6 text-brand-blue" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* Ambient Glow */}
            <div className={`absolute -inset-10 bg-brand-blue/5 blur-[100px] rounded-full -z-10 transition-opacity duration-1000 ${typingComplete ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          <div className="about-card lg:w-1/2 space-y-8">
            <SectionHeading 
              title="The Solution for Your Growth" 
              subtitle="The Results-First Approach" 
              align="left" 
              className="mb-8"
            />
            
            <div className="space-y-6 md:space-y-8">
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed font-sans">
                Most businesses lose momentum because they lack a high-performance digital identity. At <span className="text-white font-medium">Velgorex</span>, we bridge the gap between complex strategy and seamless execution.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-brand-blue/30 transition-colors">
                  <Globe className="w-10 h-10 text-brand-blue shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Bangalore Hub</h4>
                    <p className="text-xs text-white/40">Strategically headquartered in Bangalore to serve local growth and global excellence.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-brand-gold/30 transition-colors">
                  <Shield className="w-10 h-10 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Global Influence</h4>
                    <p className="text-xs text-white/40">Empowering enterprises worldwide with high-performance engineering from the silicon heart of India.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-gold group flex items-center gap-3"
                >
                  Initiate Project
                  <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:scale-125 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
