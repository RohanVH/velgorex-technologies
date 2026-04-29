import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

const BrandVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detect visibility at 50% threshold
  const isTargetVisible = useInView(containerRef, { amount: 0.5 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Global listener for first interaction to satisfy unmuting policy
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('mousedown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isTargetVisible) {
      // Autoplay logic with muted fallback
      const playVideo = async () => {
        try {
          // Attempt playback
          await video.play();
          
          // Try to unmute if visible
          // If we had a previous interaction, or if the browser allows sound
          video.muted = false;
        } catch (err) {
          // Autoplay with sound likely blocked
          video.muted = true;
          video.play().catch(e => console.error("Video play failed:", e));
        }
      };

      playVideo();
    } else {
      video.pause();
      video.muted = true;
    }
  }, [isTargetVisible, hasInteracted]);

  return (
    <section className="py-16 relative bg-black overflow-hidden" id="brand-video">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-blue/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white mb-4">
              Our <span className="text-brand-gold">Vision</span> in Motion
            </h2>
            <div className="w-16 md:w-24 h-1 bg-brand-blue mx-auto rounded-full" />
          </div>

          {/* Video Container - No Controls, No Progress Bar */}
          <div 
            ref={containerRef}
            className="relative aspect-video bg-[#050505] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-blue/10 pointer-events-none"
          >
            <video
              ref={videoRef}
              src="/brand_video.mp4"
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
            
            {/* Cinematic Overlay to prevent context menu and indicate state subtly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
          </div>
          
          <div className="mt-6 md:mt-8 text-center px-4">
             <motion.p 
               animate={isTargetVisible ? { opacity: 0.6 } : { opacity: 0.2 }}
               className="text-white font-mono text-[10px] md:text-sm uppercase tracking-widest leading-relaxed transition-opacity duration-1000"
             >
                Experience the frontier of premium technology. <br className="hidden md:block" />
                Velgorex: Defining the next generation of digital excellence.
             </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandVideo;
