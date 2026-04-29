/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading = ({ title, subtitle, align = 'center', className = 'mb-16' }: SectionHeadingProps) => {
  return (
    <div className={`${className} ${align === 'center' ? 'max-w-4xl mx-auto text-center' : 'max-w-2xl text-left'}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;
