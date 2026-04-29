/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import SectionHeading from './SectionHeading';
import { Trophy, Users, Rocket, Globe } from 'lucide-react';

const stats = [
  { label: 'Customer Inquiries', value: '+300%', icon: Rocket },
  { label: 'Online Presence', value: '100%', icon: Users },
  { label: 'Business Growth', value: '250%', icon: Trophy },
  { label: 'Global Clients', value: '50+', icon: Globe },
];

const Counter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Extract number and formatting
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.endsWith('%') ? '%' : value.endsWith('+') ? '+' : '';

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 2,
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="impact" className="py-16 md:py-24 bg-[#030303] relative" style={{ touchAction: 'pan-y' }} ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20"
        >
          <div className="lg:w-1/2 space-y-6 lg:space-y-8">
            <SectionHeading 
              title="A Digital Strategy and Architecture Built for Results" 
              subtitle="The Impact" 
              align="left" 
            />
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-xl">
              We design digital products that don't just look visually stunning but are mathematically engineered to drive conversion and scale.
            </p>
            
            <div className="space-y-8 pt-4">
              {['Fast Delivery (3–5 Days)', 'Customer-Focused Approach', 'Premium Quality at Affordable Pricing', 'Dedicated Support'].map((item, index) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.8 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover:scale-150 transition-transform duration-500 shadow-[0_0_15px_#CFA75B]" />
                  <span className="text-white/70 text-lg font-light tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-brand-gold/20 transition-all duration-700 group"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-brand-gold transition-colors duration-500 mb-4 md:mb-6">
                  <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="font-display text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 tracking-tight">
                  <Counter value={stat.value} />
                </div>
                <div className="text-brand-gold/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] leading-tight group-hover:text-brand-gold/60 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
