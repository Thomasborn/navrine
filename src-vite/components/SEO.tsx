import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, url = 'https://navrine.com' }) => {
  const { t, i18n } = useTranslation();
  
  const siteTitle = title || t('seo.defaultTitle');
  const siteDescription = description || t('seo.defaultDescription');
  const lang = i18n.language || 'en';

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      
      {/* Hreflang tags for internationalization SEO */}
      <link rel="alternate" hrefLang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hrefLang="id" href={`${url}?lang=id`} />
      <link rel="alternate" hrefLang="x-default" href={`${url}?lang=en`} />
    </Helmet>
  );
};
