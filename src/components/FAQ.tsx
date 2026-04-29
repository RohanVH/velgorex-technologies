import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "A custom, high-performance website typically takes 4-8 weeks from strategy to launch. This includes UI/UX design, development, and thorough QA testing to ensure your site is built to convert."
  },
  {
    question: "Do you build mobile apps for Android & iOS?",
    answer: "Yes, we specialize in cross-platform mobile app development. Using technologies like React Native and Flutter, we deliver seamless, high-performance applications that work perfectly on both Android and iOS devices."
  },
  {
    question: "What is the cost of website development?",
    answer: "Our website development services are tailored to your specific business goals. Pricing varies based on complexity and features, but we offer transparent quotes and a focus on delivering a high return on investment for your digital growth."
  },
  {
    question: "How do you approach pricing for custom software?",
    answer: "We offer value-based pricing tailored to your specific requirements. We provide transparent, fixed-price quotes for well-defined projects, and flexible engagement models for evolving digital products."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes, we offer comprehensive maintenance and support. This includes performance monitoring, security updates, and feature enhancements to ensure your digital assets continue to perform as your business scales."
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
          {question}
        </span>
        <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus size={18} className="text-brand-blue" /> : <Plus size={18} className="text-brand-blue" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="w-full pb-16 md:pb-24" ref={ref}>
      <motion.div
         initial={{ opacity: 0, y: 40 }}
         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Expertise & Clarity
            </h2>
            <p className="text-white/40 text-base md:text-lg font-light">
              Everything you need to know about partnering with Velgorex for your digital evolution.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
