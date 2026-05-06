import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Website & App Development Company in Bangalore | Velgorex",
  description = "Velgorex is a premier website development company in Bangalore. We build custom software and high-converting mobile apps for businesses locally and worldwide.",
  keywords = "website development company in Bangalore, web development services Bangalore, custom software developers Bangalore, mobile app development company Bangalore, business automation Bangalore, global tech partner",
  image = "https://velgorex.com/Logo.png",
  url = "https://velgorex.com/",
  type = "website"
}) => {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Velgorex Technologies",
    "alternateName": "Velgorex",
    "url": "https://velgorex.com/",
    "logo": "https://velgorex.com/Logo.png",
    "description": description,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "admin@velgorex.com",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.instagram.com/velgorex_technologies/"
    ]
  };

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />

      <meta property="og:url" content={url} />

      <meta property="og:site_name" content="Velgorex" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
