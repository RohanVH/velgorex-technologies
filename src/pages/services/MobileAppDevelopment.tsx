import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../ServicePage';

const MobileAppDevelopment = () => {
  return (
    <ServicePage
      id="mobile-app-development"
      title="Mobile App Development"
      subtitle="Native & Cross-platform applications built for unmatched performance and stickiness."
      seoTitle="Mobile App Development Company in Bangalore | iOS & Android | Velgorex"
      seoDescription="Looking for the best mobile app development company in Bangalore? Velgorex builds high-performance iOS and Android apps for local and global businesses."
      features={[
        "Native Android & iOS Development (Bangalore Hub)",
        "Cross-Platform Efficiency (React Native/Flutter)",
        "User-Centric UI/UX for Mobile Retention",
        "Secure Payment & API Gateways",
        "App Store & Play Store Global Launch Support",
        "AI-Powered Mobile Features"
      ]}
      content={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Leading Mobile App Development Company in Bangalore</h2>
            <p className="text-lg leading-relaxed">
              In a mobile-first world, your business needs a presence that goes beyond a responsive website. As a premier <strong className="text-brand-blue">mobile app development company in Bangalore</strong>, Velgorex builds high-performance applications designed to keep your users engaged and your business growing.
            </p>
            <p>
              Whether you're looking to <strong className="text-brand-blue">build a mobile app for customers in Bangalore</strong> or need a sophisticated internal tool for your enterprise, we provide end-to-end services. From initial concept and wireframing in our Indiranagar studio to coding, testing, and global deployment, our team ensures your app stands out.
            </p>
          </section>

          <section className="bg-white/[0.02] p-8 rounded-3xl border border-white/5">
            <h2 className="text-3xl font-display font-bold text-white mb-6">iOS and Android App Development Experts</h2>
            <p className="mb-4">
              We leverage cutting-edge technologies like React Native and Flutter to deliver <strong className="text-brand-gold">cross-platform efficiency</strong> without compromising on performance. Our apps look and feel native, providing the smooth 60fps experience that modern users demand on both iOS and Android platforms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-brand-blue font-bold mb-2">Native-Grade Quality</h4>
                <p className="text-sm">We ensure that every interaction, animation, and lifecycle event matches the high standards of native OS development.</p>
              </div>
              <div>
                <h4 className="text-brand-gold font-bold mb-2">Scalable Backend</h4>
                <p className="text-sm">Our apps are powered by robust cloud infrastructures. See our <Link to="/website-development" className="text-brand-blue hover:underline">website development</Link> services for integrated web platforms.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Mobile App Development for Retention and Scale</h2>
            <p>
              A great app isn't just about utility; it's about "stickiness." We focus on <strong className="text-white">user-centric design</strong> that simplifies complex tasks and rewards user interaction. This approach leads to higher retention rates and better conversion for your business services.
            </p>
            <ul className="space-y-4 mt-8">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span className="text-white/80">Biometric security for frictionless login.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="text-white/80">Intelligent push notification strategies.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span className="text-white/80">Offline-first architecture for constant availability.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Partnering with Bangalore and Global Clients</h2>
            <p>
              As a global <strong className="text-brand-blue">mobile app development partner</strong> based in Bangalore, we work with entrepreneurs and enterprises in London, New York, and beyond. We understand the regional differences in app store compliance and user behavior, allowing us to tailor your product for specific local markets like Karnataka or a global audience.
            </p>
          </section>

          <section className="bg-brand-blue/5 p-8 rounded-3xl border border-brand-blue/20">
            <h3 className="text-2xl font-bold text-white mb-4">Real Use Case: Fintech App Launch</h3>
            <p className="text-sm text-white/70 mb-6">
              We recently developed a secure investment app for a financial startup. By integrating <Link to="/business-automation" className="text-brand-blue hover:underline">business automation</Link> for KYC processing, we reduced onboarding time by 60%.
            </p>
            <p className="text-brand-blue font-bold">Contact our Bangalore team today for a free consultation and roadmap.</p>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">The Velgorex Mobile Advantage</h2>
            <p>
              Choosing the right <strong className="text-brand-gold">mobile developers in Bangalore</strong> is a critical business decision. At Velgorex, we combine technical mastery with a product-first mindset. We don't just build what you ask for—we build what your business needs to win. Check out our <Link to="/custom-software" className="text-brand-gold hover:underline">custom software</Link> for larger enterprise needs.
            </p>
          </section>
        </div>
      }
    />
  );
};

export default MobileAppDevelopment;
