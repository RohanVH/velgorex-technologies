import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Github,
  Mail,
  Globe,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const solutions = [
    { name: 'Website Development', path: '/website-development' },
    { name: 'Mobile App Development', path: '/mobile-app-development' },
    { name: 'Business Automation', path: '/business-automation' },
    { name: 'Custom Software Solutions', path: '/custom-software' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Start Your Project', path: '/#contact' }
  ];

  return (
    <footer className="bg-[#050505] pt-24 pb-12 overflow-hidden relative">
      {/* Premium Top Border with Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent blur-[4px]" />
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Final CTA Section */}
        <div className="mb-16 md:mb-24 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-2xl md:text-5xl font-display font-bold text-white mb-6 md:mb-8 tracking-tight">
              Ready to build <span className="text-brand-gold">something powerful?</span>
            </h2>
            <a 
              href="#contact"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-brand-gold text-black font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] group"
            >
              Start Your Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20 border-t border-white/5 pt-16 md:pt-20">
          {/* Brand Identity Section */}
          <div className="col-span-2 md:col-span-1 space-y-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 group">
                <img src="/Logo.png" alt="Velgorex Logo" className="h-10 w-auto" loading="lazy" />
                <span className="font-display text-xl font-bold tracking-tighter text-white">VELGOREX <span className="text-brand-gold">TECHNOLOGIES</span></span>
              </Link>
              <div className="space-y-4">
                <p className="text-brand-gold/80 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                  "Engineered in Bangalore • Serving Globally"
                </p>
                <p className="text-white/40 text-sm font-sans leading-relaxed max-w-xs mx-auto md:mx-0">
                  Building high-performance digital systems and engineering growth for modern enterprises in Bangalore and beyond.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-brand-blue font-bold uppercase tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                  </span>
                  <span>HQ: Indiranagar, Bangalore</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start gap-4">
              {[
                { Icon: Twitter, url: '#' },
                { Icon: Linkedin, url: 'https://www.linkedin.com/company/velgorex' },
                { Icon: Github, url: '#' },
                { Icon: Instagram, url: 'https://www.instagram.com/velgorex_technologies/' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target={social.url !== '#' ? "_blank" : undefined}
                  rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -4, color: '#D4AF37' }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-colors"
                >
                  <social.Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 space-y-8">
            <h4 className="text-white font-display font-bold uppercase tracking-[0.2em] text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  {item.path.startsWith('/#') ? (
                    <a 
                      href={item.path.substring(1)}
                      className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-sans"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-brand-gold transition-all" />
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.path}
                      onClick={handleLinkClick}
                      className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-sans"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-brand-gold transition-all" />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="col-span-1 space-y-8">
            <h4 className="text-white font-display font-bold uppercase tracking-[0.2em] text-xs">Services</h4>
            <ul className="space-y-4">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    onClick={handleLinkClick}
                    className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-sans"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-brand-blue transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 space-y-8 text-center md:text-left">
            <h4 className="text-white font-display font-bold uppercase tracking-[0.2em] text-xs">Contact</h4>
            <div className="space-y-6 text-sm text-white/40 font-sans">
              <div className="flex items-center justify-center md:justify-start gap-4 group cursor-pointer">
                <Mail size={18} className="text-brand-gold group-hover:text-white transition-colors shrink-0" />
                <a href="mailto:admin@velgorex.com" className="hover:text-white transition-colors">admin@velgorex.com</a>
              </div>
              <div className="flex items-start justify-center md:justify-start gap-4">
                <Globe size={18} className="text-brand-blue shrink-0" />
                <span>We work with clients globally</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Rocket size={18} className="text-brand-gold shrink-0" />
                <span className="text-brand-gold font-bold">Delivery in 3–5 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Animated Visual Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <span className="text-[15vw] font-display font-black leading-none select-none">VELGOREX</span>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
          <div className="flex items-center gap-6">
            <span>© {currentYear} Velgorex Technologies. All rights reserved.</span>
            <span className="hidden md:block w-[1px] h-3 bg-white/10" />
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms & Conditions</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              Mainnet Operational
            </span>
            <span className="opacity-50">•</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
