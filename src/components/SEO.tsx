import { useEffect } from "react";

const BASE_URL = "https://fin-calculators.web.app";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function SEO({ title, description, keywords, path = "" }: SEOProps) {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);

    // Twitter
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [title, description, keywords, path]);

  return null;
}
