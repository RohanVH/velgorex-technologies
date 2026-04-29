import React from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicePageProps {
  id: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  features: string[];
  content: React.ReactNode;
}

const ServicePage: React.FC<ServicePageProps> = ({
  id,
  title,
  subtitle,
  seoTitle,
  seoDescription,
  features,
  content
}) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": seoDescription,
    "provider": {
      "@type": "Organization",
      "name": "Velgorex",
      "url": "https://velgorex.com"
    }
  };

  return (
    <main className="bg-[#000000] text-white min-h-screen">
      <SEO 
        title={seoTitle} 
        description={seoDescription} 
        url={`https://velgorex.com/services/${id}`}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-blue/10 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-brand-blue font-mono uppercase tracking-[0.2em]">
              Service Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white">
              {title}
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Sidebar / Features */}
            <div className="lg:col-span-4 space-y-8 sticky top-32">
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
                <h3 className="text-xl font-bold mb-6">Key Features</h3>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-blue mt-1 shrink-0" size={18} />
                      <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-brand-blue/10 border border-brand-blue/20">
                <h4 className="text-lg font-bold mb-3">Ready to Start?</h4>
                <p className="text-white/60 text-sm mb-6">Let's discuss how we can bring your vision to life.</p>
                <a 
                  href="#contact" 
                  className="w-full py-4 rounded-xl bg-brand-blue text-white font-bold flex items-center justify-center gap-2 group transition-all hover:bg-brand-blue/80"
                >
                  Contact Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-li:text-white/70">
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-20">
        <Contact />
      </section>

      <div className="py-12 bg-black">
        <Footer />
      </div>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </main>
  );
};

export default ServicePage;
