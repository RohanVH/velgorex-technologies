import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../ServicePage';

const BusinessAutomation = () => {
  return (
    <ServicePage
      id="business-automation"
      title="Business Automation"
      subtitle="Streamline your operations with intelligent workflows and custom automation tools."
      seoTitle="Business Process Automation Services Bangalore | Digital Efficiency | Velgorex"
      seoDescription="Optimize your company with custom business automation solutions in Bangalore. Velgorex builds smart workflows, CRM integrations, and AI tools for enterprise efficiency."
      features={[
        "Workflow Audit and Intelligent Optimization",
        "CRM & ERP Custom Integrations (Bangalore Experts)",
        "Automated Data Extraction & Reporting",
        "AI-Powered Customer Interaction Systems",
        "Legacy System Modernization & Bridging",
        "Scalable Cloud-Based Service Automation"
      ]}
      content={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Business Automation for Growth and Efficiency in Bangalore</h2>
            <p className="text-lg leading-relaxed">
              In the modern era, <strong className="text-brand-blue">business automation</strong> is no longer a luxury—it is a necessity for survival and scale. At Velgorex, we design <strong className="text-brand-blue">custom business automation in Bangalore</strong> that eliminates manual bottlenecks and free your local team to focus on high-value strategic initiatives.
            </p>
            <p>
              By implementing <strong className="text-brand-blue">automated business processes</strong>, Bangalore-based companies can reduce operational costs, eliminate human error, and provide a faster, more reliable service. Our engineering approach ensures that your automation is robust, secure, and perfectly aligned with your unique business logic.
            </p>
          </section>

          <section className="bg-white/[0.02] p-8 rounded-3xl border border-white/5">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Intelligent Workflow Engineering</h2>
            <p className="mb-4">
              We specialize in <strong className="text-brand-gold">high-impact automation</strong> for established businesses and fast-growing startups in Bangalore's tech corridor. Our team identifies the "hidden friction" in your company and builds the technology to smooth it over.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-brand-blue font-bold mb-2">CRM Integration</h4>
                <p className="text-sm">We sync your data to create a unified view. Explore our <Link to="/website-development" className="text-brand-blue hover:underline">website development</Link> for front-end tracking.</p>
              </div>
              <div>
                <h4 className="text-brand-gold font-bold mb-2">AI Agents</h4>
                <p className="text-sm">We deploy smart AI agents that handle routine inquiries 24/7. Check our <Link to="/mobile-app-development" className="text-brand-gold hover:underline">mobile app development</Link> for mobile AI integration.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Automation for Business Growth</h2>
            <p>
              True <strong className="text-white">business automation</strong> is about more than just replacing a spreadsheet. It's about creating a <strong className="text-brand-blue">scalable infrastructure</strong> that grows with your Bangalore company. We build tools that integrate with Salesforce, HubSpot, Slack, and more.
            </p>
            <ul className="space-y-4 mt-8">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span className="text-white/80">Automated lead qualification and routing.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="text-white/80">Real-time revenue and performance dashboards.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span className="text-white/80">Intelligent supply chain management.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Global Scale, Local Expertise in Bangalore</h2>
            <p>
              Velgorex provides <strong className="text-brand-blue">automation services globally</strong> while maintaining a strong local presence in Bangalore. We work with clients to modernize legacy systems that are holding them back. Our experts bridge the gap between old technology and new possibilities.
            </p>
          </section>

          <section className="bg-brand-gold/5 p-8 rounded-3xl border border-brand-gold/20">
            <h3 className="text-2xl font-bold text-white mb-4">Why Automate Your Bangalore Business?</h3>
            <p className="text-sm text-white/70 mb-6">
              Companies that leverage automation see an average productivity increase of 40%. By reducing "busy work," your team can focus on what they do best: innovating.
            </p>
            <p className="text-brand-gold font-bold">Ready to transform your bottom line? Contact our Bangalore automation experts. Also see our <Link to="/custom-software" className="text-brand-blue hover:underline">custom software</Link> for deep enterprise scaling.</p>
          </section>

          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-6">The Future of Efficient Operations</h2>
            <p>
              As <strong className="text-brand-blue">business automation experts in Bangalore</strong>, we stay ahead of the curve, integrating the latest in AI to give our clients a competitive edge. The future belongs to the efficient, and Velgorex is your partner.
            </p>
          </section>
        </div>
      }
    />
  );
};

export default BusinessAutomation;
