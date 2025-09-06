import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  articleData?: {
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    section: string;
    tags: string[];
  };
}

export function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  canonicalUrl,
  ogImage,
  articleData 
}: SEOHeadProps) {
  useEffect(() => {
    // Set page title
    document.title = `${title} | CyberSecBulletain`;
    
    // Meta description
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    
    // Open Graph tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:type', articleData ? 'article' : 'website');
    updateMetaProperty('og:site_name', 'CyberSecBulletain');
    
    if (ogImage) {
      updateMetaProperty('og:image', ogImage);
      updateMetaProperty('og:image:alt', title);
    }
    
    // Twitter Card tags
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', title);
    updateMetaName('twitter:description', description);
    
    if (ogImage) {
      updateMetaName('twitter:image', ogImage);
    }
    
    // Article-specific meta tags
    if (articleData) {
      updateMetaProperty('article:author', articleData.author);
      updateMetaProperty('article:published_time', articleData.publishedTime);
      updateMetaProperty('article:section', articleData.section);
      
      if (articleData.modifiedTime) {
        updateMetaProperty('article:modified_time', articleData.modifiedTime);
      }
      
      // Article tags
      articleData.tags.forEach(tag => {
        addMetaProperty('article:tag', tag);
      });
    }
    
    // Canonical URL
    if (canonicalUrl) {
      updateLinkRel('canonical', canonicalUrl);
    }
    
    // Structured data for articles
    if (articleData) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "description": description,
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "CyberSecBulletain",
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/favicon.ico`
          }
        },
        "datePublished": articleData.publishedTime,
        "dateModified": articleData.modifiedTime || articleData.publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };
      
      if (ogImage) {
        (structuredData as any).image = {
          "@type": "ImageObject",
          "url": ogImage,
          "width": 1200,
          "height": 630
        };
      }
      
      updateStructuredData('article-schema', structuredData);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, articleData]);

  return null;
}

// Helper functions
function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function addMetaProperty(property: string, content: string) {
  const meta = document.createElement('meta');
  meta.setAttribute('property', property);
  meta.content = content;
  document.head.appendChild(meta);
}

function updateLinkRel(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function updateStructuredData(id: string, data: object) {
  let script = document.querySelector(`script[data-schema="${id}"]`) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}