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
  title = 'Website & App Development Company in Bangalore | Velgorex',
  description = 'Velgorex is a premier website development company in Bangalore. We build custom software and high-converting mobile apps for businesses locally and worldwide.',
  keywords = 'website development company in Bangalore, web development services Bangalore, custom software developers Bangalore, mobile app development company Bangalore, business automation Bangalore, global tech partner',
  image = 'https://velgorex.com/Logo.png',
  url = 'https://velgorex.com/',
  type = 'website',
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Velgorex Technologies',
    alternateName: 'Velgorex',
    url: 'https://velgorex.com/',
    logo: 'https://velgorex.com/Logo.png',
    description: description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'admin@velgorex.com',
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.instagram.com/velgorex_technologies/',
    ],
  };

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary SEO */}
      <title data-rh="true">{title}</title>

      <meta
        data-rh="true"
        name="description"
        content={description}
      />

      <meta
        data-rh="true"
        name="keywords"
        content={keywords}
      />

      <meta
        data-rh="true"
        name="robots"
        content="index, follow"
      />

      <link
        data-rh="true"
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}
      <meta
        data-rh="true"
        property="og:type"
        content={type}
      />

      <meta
        data-rh="true"
        property="og:title"
        content={title}
      />

      <meta
        data-rh="true"
        property="og:description"
        content={description}
      />

      <meta
        data-rh="true"
        property="og:image"
        content={image}
      />

      <meta
        data-rh="true"
        property="og:url"
        content={url}
      />

      <meta
        data-rh="true"
        property="og:site_name"
        content="Velgorex"
      />

      {/* Twitter */}
      <meta
        data-rh="true"
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        data-rh="true"
        name="twitter:title"
        content={title}
      />

      <meta
        data-rh="true"
        name="twitter:description"
        content={description}
      />

      <meta
        data-rh="true"
        name="twitter:image"
        content={image}
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
