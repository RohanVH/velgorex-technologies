/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import SectionHeading from './SectionHeading';
import { Mail, MessageSquare, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectIdea: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormState({ name: '', email: '', projectIdea: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-brand-blue/3 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="bg-[#080808] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 relative shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
           <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Info Side */}
            <div className="lg:w-1/3 p-6 md:p-10 space-y-6 md:space-y-10 bg-gradient-to-b from-white/[0.02] to-transparent">
              <SectionHeading 
                title="Your Digital Evolution Begins Here" 
                subtitle="The Next Step" 
                align="left"
                className="mb-6 md:mb-12"
              />
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/10 group-hover:border-brand-gold/20 transition-all duration-700 shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-base md:text-lg mb-0.5 md:mb-1 tracking-tight">Direct Channel</h5>
                    <p className="text-white/40 text-xs md:text-base font-light">admin@velgorex.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/10 group-hover:border-brand-blue/20 transition-all duration-700 shrink-0">
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-base md:text-lg mb-0.5 md:mb-1 tracking-tight">Strategy Consultation</h5>
                    <p className="text-white/40 text-xs md:text-base font-light">Book your technology assessment</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 md:pt-12 border-t border-white/5">
                <p className="text-brand-gold/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 leading-relaxed">Strategic Delivery Worldwide <br /> Excellence in 3–5 Days</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/[0.02] border border-white/5 text-[8px] md:text-[9px] text-white/30 font-mono tracking-widest uppercase">London</span>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/[0.02] border border-white/5 text-[8px] md:text-[9px] text-white/30 font-mono tracking-widest uppercase">Seoul</span>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/[0.02] border border-white/5 text-[8px] md:text-[9px] text-white/30 font-mono tracking-widest uppercase">New York</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3 p-6 md:p-12 relative bg-white/[0.01]">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 size={56} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-4xl font-display font-bold text-white tracking-tight">Project request received.</h3>
                      <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
                        We’re reviewing your details and will reach out with the next steps soon.
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 font-mono uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                        We typically respond within 24 hours.
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                      <motion.button
                        onClick={resetForm}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs transition-transform"
                      >
                        Submit Another Request
                      </motion.button>
                      
                      <a 
                        href="#development-journey" 
                        onClick={() => setStatus('idle')}
                        className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
                      >
                        View Our Work
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Enter your name" 
                          disabled={status === 'submitting'}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="Enter your email" 
                          disabled={status === 'submitting'}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ml-1">Your Project Idea</label>
                      <textarea 
                        required
                        name="projectIdea"
                        value={formState.projectIdea}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us your idea — we’ll turn it into reality." 
                        disabled={status === 'submitting'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all resize-none disabled:opacity-50"
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle size={16} />
                        {errorMessage}
                      </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
                      <p className="text-white/40 text-xs leading-relaxed max-w-sm">
                        By submitting, you agree to our privacy policy and consent to us contacting you regarding your project.
                      </p>
                      <motion.button 
                        type="submit"
                        disabled={status === 'submitting'}
                        whileHover={status !== 'submitting' ? { scale: 1.05 } : {}}
                        whileTap={status !== 'submitting' ? { scale: 0.95 } : {}}
                        animate={status === 'idle' ? {
                          boxShadow: [
                            "0 0 20px rgba(207,167,91,0.2)",
                            "0 0 40px rgba(207,167,91,0.4)",
                            "0 0 20px rgba(207,167,91,0.2)"
                          ]
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className={`w-full md:w-auto flex items-center justify-center gap-3 py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-xs transition-all relative overflow-hidden group ${
                          status === 'submitting' 
                            ? 'bg-white/10 text-white/40 border border-white/5' 
                            : 'bg-brand-gold text-black hover:bg-white hover:text-black shadow-[0_0_30px_rgba(207,167,91,0.2)]'
                        }`}
                      >
                        {status === 'idle' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                        )}
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Start Your Project Today
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default Contact;
