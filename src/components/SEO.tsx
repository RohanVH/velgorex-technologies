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
  image = "/Logo.png",
  url = "https://velgorex.com",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Velgorex Technologies",
    "alternateName": "Velgorex",
    "url": url,
    "logo": `${url}/Logo.png`,
    "description": "Premium digital agency based in Bangalore specializing in high-performance web engineering and custom software for global clients.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "admin@velgorex.com",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/velgorex",
      "https://linkedin.com/company/velgorex",
      "https://www.instagram.com/velgorex_technologies/"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Digital Cluster, Indiranagar",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560038",
      "addressCountry": "IN"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Velgorex Technologies Bangalore",
    "image": `${url}/Logo.png`,
    "url": url,
    "telephone": "+91-XXXXXXXXXX",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tech Hub, Indiranagar",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560038",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "description": "Expert website development, mobile app development, and business automation services in Bangalore, serving clients globally."
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web and App Development",
    "provider": {
      "@type": "Organization",
      "name": "Velgorex Technologies"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "High-converting, performance-optimized custom website development for businesses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "Native and cross-platform mobile apps for iOS and Android."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Automation",
            "description": "Intelligent workflow automation and CRM custom integrations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Solutions",
            "description": "Bespoke enterprise software and scalable SaaS platform engineering."
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
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
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
