import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { Layout, Code2, Smartphone, Terminal, Cpu, Globe, Rocket, ShieldCheck, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const services = [
  {
    title: 'Website Development',
    description: 'Modern, fast, and designed to generate leads for your business.',
    icon: Layout,
    color: 'brand-blue',
    link: '/website-development'
  },
  {
    title: 'Mobile App Development',
    description: 'Android & iOS apps built for performance and user experience.',
    icon: Smartphone,
    color: 'brand-gold',
    link: '/mobile-app-development'
  },
  {
    title: 'Business Automation',
    description: 'Smart systems to save time and improve your workflow.',
    icon: Terminal,
    color: 'brand-blue',
    link: '/business-automation'
  },
  {
    title: 'Custom Software Solutions',
    description: 'Tailored solutions built specifically for your business needs.',
    icon: Code2,
    color: 'brand-gold',
    link: '/custom-software'
  }
];

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: any;
    color: string;
    link: string;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = service.icon;
  const isBlue = service.color === 'brand-blue';

  return (
    <Link to={service.link}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1.2,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
          y: { duration: 0.4, ease: "easeOut" }
        }}
        className={`group relative p-6 md:p-8 bg-[#080808] border border-white/5 transition-all duration-700 overflow-hidden touch-manipulation cursor-pointer ${
          isBlue ? 'hover:border-brand-blue/40 shadow-brand-blue/5' : 'hover:border-brand-gold/40 shadow-brand-gold/5'
        } hover:shadow-2xl`}
      >
        <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 md:mb-6 ${isBlue ? 'text-brand-blue' : 'text-brand-gold'}`}>
          <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-700" />
        </div>
        
        <h3 className="font-display text-lg md:xl font-bold mb-2 md:mb-3 text-white uppercase tracking-tight flex items-center justify-between">
          {service.title}
          <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-blue" />
        </h3>
        <p className="text-white/40 text-sm leading-relaxed font-sans font-light group-hover:text-white/70 transition-colors">
          {service.description}
        </p>
      </motion.div>
    </Link>
  );
};


const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="py-20 bg-[#030303] relative" style={{ touchAction: 'pan-y' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-8">
             <div className="max-w-2xl">
                <SectionHeading 
                  title="Services Designed to Drive Sales" 
                  subtitle="Expertise" 
                  align="left"
                />
             </div>
             <div className="flex gap-4 opacity-20">
                <Cpu className="w-8 h-8" />
                <Globe className="w-8 h-8" />
                <Rocket className="w-8 h-8" />
                <ShieldCheck className="w-8 h-8" />
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
             <p className="text-white/30 text-xs font-mono uppercase tracking-[0.3em]">
               // Build_Protocol: SECURE_V3.1
             </p>
             <button className="text-brand-blue font-bold text-xs uppercase tracking-widest hover:text-brand-gold transition-colors flex items-center gap-2 group">
                View Technical Stack 
                <div className="w-8 h-[1px] bg-brand-blue group-hover:w-16 transition-all group-hover:bg-brand-gold" />
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
