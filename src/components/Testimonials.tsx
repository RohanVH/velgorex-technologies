/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionHeading from './SectionHeading';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO at NexaStore',
    content: "Velgorex transformed our digital presence. Their attention to motion design and performance is genuinely world-class. Our conversion rates tripled within the first quarter.",
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Marcus Thorne',
    role: 'Product Director at Orbit',
    content: "Working with Velgorex felt like having a future-proof R&D lab in our pocket. They don't just solve today's problems; they anticipate tomorrow's needs.",
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-24 bg-[#030303] relative" style={{ touchAction: 'pan-y' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading 
            title="Voices of Strategic Partnership" 
            subtitle="Testimonials" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 relative group hover:bg-white/[0.02] transition-colors duration-700"
              >
                <Quote className="absolute top-8 right-8 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 text-white/[0.03] group-hover:text-brand-gold/10 transition-colors duration-700" />
                
                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="relative">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                    <div className="absolute -inset-1.5 md:-inset-2 border border-brand-gold/0 group-hover:border-brand-gold/20 rounded-full transition-all duration-700" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg tracking-tight">{t.name}</h4>
                    <p className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-white/50 font-sans font-light leading-relaxed group-hover:text-white/80 transition-colors duration-700">
                  "{t.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
