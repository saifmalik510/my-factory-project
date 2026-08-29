import { useEffect } from 'react';

/**
 * SEO Helper Component
 * Updates document title, meta description, and open graph tags dynamically per page.
 */
export default function SEO({
  title = 'Abdullah Marble Factory — Premium Natural Stone & Marble',
  description = 'Premier manufacturer and exporter of Pakistani and imported Italian marble, granite, and exotic stone in Fort Abbas, Punjab, Pakistan.',
  keywords = 'marble, granite, ziarat white, calacatta gold, onyx, stone cutting, marble factory, Fort Abbas',
}) {
  useEffect(() => {
    // 1. Document Title
    const formattedTitle = title.includes('Abdullah Marble')
      ? title
      : `${title} | Abdullah Marble Factory`;
    document.title = formattedTitle;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // 3. Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;

    // 4. OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = formattedTitle;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;
  }, [title, description, keywords]);

  return null;
}
