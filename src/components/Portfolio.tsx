/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionHeading from './SectionHeading';
import { ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const benefits = [
    {
      title: 'Tailored Strategy',
      description: 'Custom-engineered solutions specifically for your business objectives.',
      icon: Target
    },
    {
      title: 'Fast Execution',
      description: 'Rapid turnaround with performance-ready systems in 3–5 days.',
      icon: Zap
    },
    {
      title: 'Scalable Growth',
      description: 'Infrastructure designed to scale alongside your evolving business needs.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="work" className="py-24 bg-[#030303] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blue Atmospheric Glows */}
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-blue/10 blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            opacity: [0.02, 0.05, 0.02],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-brand-blue/5 blur-[180px] rounded-full mix-blend-screen"
        />

        {/* Light Streaks */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%", y: `${30 + i * 20}%`, opacity: 0 }}
            animate={{ 
              x: "200%",
              opacity: [0, 0.1, 0]
            }}
            transition={{ 
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 4
            }}
            className="absolute h-[1px] w-[60%] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent rotate-[-10deg]"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              title="Let’s Build Something That Drives Results" 
              subtitle="The Partnership" 
              align="center" 
            />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-6 md:p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-brand-gold/20 transition-all duration-700 text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-700">
                    <benefit.icon size={28} className="md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-white font-display font-bold text-lg md:text-xl mb-3 md:mb-4 uppercase tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-12 text-center"
            >
              <a 
                href="#contact"
                className="btn-gold group inline-flex items-center gap-4"
              >
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full -z-10" />
    </section>
  );
};

export default Portfolio;
