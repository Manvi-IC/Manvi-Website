// app/blog/[slug]/page.tsx
"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, type BlogPost, type BlogBlock } from "../data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

import { RefreshCw } from "lucide-react";

function SlideshowBlock({ block }: { block: BlogBlock }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = block.images || [];

  if (images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="slideshow-block">
      <div className="slideshow-slide">
        {currentImage.src ? (
          <img src={currentImage.src} alt={currentImage.alt || `Slide ${currentIndex + 1}`} className="slideshow-img" />
        ) : (
          <div className="slideshow-placeholder">No Image URL</div>
        )}
        
        {images.length > 1 && (
          <>
            <button type="button" className="slideshow-btn prev" onClick={handlePrev}>&larr;</button>
            <button type="button" className="slideshow-btn next" onClick={handleNext}>&rarr;</button>
          </>
        )}
      </div>
      
      <div className="slideshow-meta">
        {currentImage.caption && <div className="slideshow-caption">{currentImage.caption}</div>}
        {images.length > 1 && (
          <div className="slideshow-dots">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`slideshow-dot ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const getLanguageName = (code: string) => {
  switch (code) {
    case "hi": return "Hindi (हिन्दी)";
    case "pa": return "Punjabi (ਪੰਜਾਬੀ)";
    case "fr": return "French (Français)";
    case "es": return "Spanish (Español)";
    default: return "English";
  }
};

const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (!text || !text.trim() || targetLang === "en") return text;
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    const data = await res.json();
    if (data.responseData && data.responseData.translatedText) {
      const translated = data.responseData.translatedText;
      if (
        translated.toUpperCase().includes("LIMIT EXCEEDED") ||
        translated.toUpperCase().includes("DAILY LIMIT") ||
        translated.toUpperCase().includes("MYMEMORY WARNING")
      ) {
        return text;
      }
      return translated;
    }
    return text;
  } catch (err) {
    console.error("Translation API error:", err);
    return text;
  }
};

const translatePostData = async (originalPost: BlogPost, targetLang: string): Promise<BlogPost> => {
  if (targetLang === "en") return originalPost;

  const newPost = JSON.parse(JSON.stringify(originalPost)) as BlogPost;

  // Translate title and description
  const [translatedTitle, translatedDesc] = await Promise.all([
    translateText(originalPost.title, targetLang),
    translateText(originalPost.description, targetLang)
  ]);
  newPost.title = translatedTitle;
  newPost.description = translatedDesc;

  // Translate blocks
  const contentPromises = originalPost.content.map(async (block, idx) => {
    const newBlock = newPost.content[idx];
    if (block.text) {
      newBlock.text = await translateText(block.text, targetLang);
    }
    if (block.caption) {
      newBlock.caption = await translateText(block.caption, targetLang);
    }
    if (block.items && block.items.length > 0) {
      newBlock.items = await Promise.all(
        block.items.map(item => translateText(item, targetLang))
      );
    }
    if (block.images && block.images.length > 0) {
      newBlock.images = await Promise.all(
        block.images.map(async (img, imgIdx) => {
          const newImg = newBlock.images![imgIdx];
          if (img.caption) {
            newImg.caption = await translateText(img.caption, targetLang);
          }
          return newImg;
        })
      );
    }
  });

  await Promise.all(contentPromises);
  return newPost;
};

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const { language: globalLang } = useLanguage();
  
  const [post, setPost] = useState<BlogPost | undefined>(() => getPostBySlug(slug));
  const [related, setRelated] = useState<BlogPost[]>(() => {
    const p = getPostBySlug(slug);
    return p ? getRelatedPosts(slug, p.category, 2) : [];
  });
  const [loading, setLoading] = useState(true);

  // Translation States
  const [activeTransLang, setActiveTransLang] = useState<string>("en");
  const [translatedPost, setTranslatedPost] = useState<BlogPost | null>(null);
  const [translationState, setTranslationState] = useState<"idle" | "translating" | "success" | "error">("idle");
  const [translationCache, setTranslationCache] = useState<Record<string, BlogPost>>({});

  // Reset translation cache on slug change
  useEffect(() => {
    setTranslatedPost(null);
    setTranslationState("idle");
    setTranslationCache({});
    setActiveTransLang("en");
  }, [slug]);

  // Sync translation language when site global language changes
  useEffect(() => {
    if (!post) return;
    
    if (globalLang && globalLang !== activeTransLang) {
      handleLangSelect(globalLang);
    }
  }, [globalLang, post]);

  const handleLangSelect = async (targetLang: string) => {
    if (!post) return;
    
    setActiveTransLang(targetLang);
    
    if (targetLang === "en") {
      setTranslatedPost(null);
      setTranslationState("idle");
      return;
    }
    
    if (translationCache[targetLang]) {
      setTranslatedPost(translationCache[targetLang]);
      setTranslationState("success");
      return;
    }
    
    setTranslationState("translating");
    try {
      const translated = await translatePostData(post, targetLang);
      setTranslationCache(prev => ({ ...prev, [targetLang]: translated }));
      setTranslatedPost(translated);
      setTranslationState("success");
    } catch (err) {
      console.error("Translation failed:", err);
      setTranslationState("error");
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setPost(data.data);
          
          const allRes = await fetch(`${API_URL}/api/blogs`);
          const allData = await allRes.json();
          if (allData.success && allData.data) {
            const allPosts: BlogPost[] = allData.data;
            const currentPost: BlogPost = data.data;
            const rel = allPosts
              .filter(p => p.slug !== slug && p.category === currentPost.category)
              .slice(0, 2);
            if (rel.length < 2) {
              const extra = allPosts.filter(p => p.slug !== slug && p.category !== currentPost.category);
              rel.push(...extra.slice(0, 2 - rel.length));
            }
            setRelated(rel);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch blog post from API, falling back to static local data", err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (loading && !post) {
    return (
      <div className={`blog-post-wrapper ${geistSans.variable}`} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "12px", minHeight: "60vh" }}>
          <RefreshCw className="animate-spin" style={{ color: "#f27a1a", width: "40px", height: "40px" }} />
          <p style={{ color: "#64748b", fontWeight: 600 }}>Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const displayPost = translatedPost || post;

  const renderBlock = (block: BlogBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        // Check if paragraph has an image with a layout alignment
        if (block.src && (block.layout === "left-image" || block.layout === "right-image")) {
          const isLeft = block.layout === "left-image";
          return (
            <div key={index} className={`split-container ${isLeft ? "split-container-left" : "split-container-right"}`}>
              <div className="split-image-wrapper">
                <div className="split-image-square-frame">
                  <img src={block.src} alt={block.alt || "Paragraph image"} className="split-image" />
                </div>
                {block.caption && <span className="article-image-caption">{block.caption}</span>}
              </div>
              <div className="split-text-wrapper">
                <p className="article-paragraph">{block.text}</p>
              </div>
            </div>
          );
        }
        if (block.src && (block.layout === "top-image" || block.layout === "bottom-image")) {
          const isTop = block.layout === "top-image";
          return (
            <div key={index} className="paragraph-stacked-container">
              {isTop && (
                <div className="article-image-container" style={{ margin: "12px 0" }}>
                  <img src={block.src} alt={block.alt || "Paragraph image"} className="article-image" />
                  {block.caption && <span className="article-image-caption">{block.caption}</span>}
                </div>
              )}
              <p className="article-paragraph">{block.text}</p>
              {!isTop && (
                <div className="article-image-container" style={{ margin: "12px 0" }}>
                  <img src={block.src} alt={block.alt || "Paragraph image"} className="article-image" />
                  {block.caption && <span className="article-image-caption">{block.caption}</span>}
                </div>
              )}
            </div>
          );
        }
        return (
          <p key={index} className="article-paragraph">
            {block.text}
          </p>
        );
      case "subheading":
        return (
          <h2 key={index} className="article-subheading">
            {block.text}
          </h2>
        );
      case "heading":
        const HeadingTag = block.style === "h3" ? "h3" : block.style === "h4" ? "h4" : "h2";
        const headingClassName = HeadingTag === "h3" ? "article-heading-h3" : HeadingTag === "h4" ? "article-heading-h4" : "article-subheading";
        return React.createElement(HeadingTag, { key: index, className: headingClassName }, block.text);
      case "divider":
        return <hr key={index} className="article-divider" />;
      case "slideshow":
        return <SlideshowBlock key={index} block={block} />;
      case "list":
        const ListTag = block.style === "numbered" ? "ol" : "ul";
        return (
          <ListTag key={index} className="article-list">
            {block.items?.map((item, itemIdx) => (
              <li key={itemIdx} className="article-list-item">
                {item}
              </li>
            ))}
          </ListTag>
        );
      case "callout":
        return (
          <div key={index} className="article-callout">
            <p>{block.text}</p>
          </div>
        );
      case "image":
        return (
          <div key={index} className="article-image-container">
            {block.src ? (
              <img src={block.src} alt={block.alt || "Blog Image"} className="article-image" />
            ) : (
              <div className="article-image-placeholder">
                <span className="placeholder-icon">📸</span>
                <span className="placeholder-text">{block.alt || "Illustration"}</span>
              </div>
            )}
            {block.caption && <span className="article-image-caption">{block.caption}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`blog-post-wrapper ${geistSans.variable}`}>
      <Header />

      <style jsx global>{`
        .blog-post-wrapper {
          --paper: #f8fafc;
          --paper-2: #ffffff;
          --panel: #0d1527;
          --ink: #0f172a;
          --muted: #64748b;
          --line: #e2e8f0;
          --accent: #f27a1a;
          --accent-deep: #db660c;
          --accent-soft: #fed7aa;
          --display: var(--font-geist-sans, -apple-system), BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
          --body: var(--font-geist-sans, -apple-system), BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
          --radius: 16px;

          font-family: var(--body);
          color: var(--ink);
          background: var(--paper);
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .blog-post-wrapper h1,
        .blog-post-wrapper h2,
        .blog-post-wrapper h3,
        .blog-post-wrapper h4 {
          font-family: var(--display);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .post-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          width: 100%;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.92rem;
          margin-bottom: 30px;
          transition: color 0.2s;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }

        .back-link:hover {
          color: var(--accent-deep);
        }

        /* Post Header */
        .post-header {
          margin: 0 auto 34px;
          max-width: 1000px;
          width: 100%;
        }

        .post-header .tag-badge {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent-deep);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 6px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .post-header h1 {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          color: var(--panel);
        }

        .post-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          color: var(--muted);
          font-size: 0.94rem;
          border-bottom: 1px solid var(--line);
          padding-bottom: 24px;
        }

        .post-meta-row .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-deep));
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 0.92rem;
        }

        .post-meta-row .author-name {
          font-weight: 700;
          color: var(--ink);
        }

        /* Cover Visual */
        .post-cover-visual {
          height: 380px;
          border-radius: 20px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.4);
        }

        .post-cover-visual::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.7;
        }

        .post-cover-visual.thumb-featured {
          background: linear-gradient(135deg, #7c2d12, #ea580c);
        }
        .post-cover-visual.thumb-customs {
          background: linear-gradient(135deg, #064e3b, #059669);
        }
        .post-cover-visual.thumb-logistics {
          background: linear-gradient(135deg, #4c1d95, #7c3aed);
        }
        .post-cover-visual.thumb-prohibited {
          background: linear-gradient(135deg, #7f1d1d, #dc2626);
        }

        .cover-icon {
          font-size: 5rem;
          margin-bottom: 12px;
          z-index: 2;
        }

        .cover-title {
          font-size: 1.4rem;
          font-weight: 600;
          opacity: 0.85;
          text-align: center;
          max-width: 80%;
          z-index: 2;
        }

        /* Article Content */
        .article-content {
          font-size: 1.125rem;
          color: #334155;
          line-height: 1.75;
          max-width: 1000px;
          margin: 0 auto;
        }

        .article-paragraph {
          margin-bottom: 24px;
        }

        .article-subheading {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--panel);
          margin-top: 56px;
          margin-bottom: 20px;
        }

        .article-list {
          margin-bottom: 28px;
          padding-left: 24px;
        }

        .article-list-item {
          margin-bottom: 12px;
        }

        .article-callout {
          background: #fffbeb;
          border-left: 4px solid #f59e0b;
          padding: 20px;
          border-radius: 0 12px 12px 0;
          margin: 44px 0;
          color: #b45309;
          font-weight: 500;
        }

        .article-callout p {
          margin: 0;
        }

        .article-image-container {
          margin: 48px 0;
          text-align: center;
        }

        .article-image {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
        }

        .article-image-placeholder {
          height: 240px;
          background: #f1f5f9;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--muted);
        }

        .placeholder-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .article-image-caption {
          display: block;
          margin-top: 8px;
          font-size: 0.88rem;
          color: var(--muted);
          font-style: italic;
        }

        /* Split layouts styling */
        .split-container {
          display: flex;
          gap: 28px;
          align-items: center;
          margin-bottom: 40px;
        }
        .split-container-left {
          flex-direction: row;
        }
        .split-container-right {
          flex-direction: row-reverse;
        }
        .split-image-wrapper {
          flex: 0 0 300px;
          width: 300px;
          display: flex;
          flex-direction: column;
        }
        .split-image-square-frame {
          width: 300px;
          height: 300px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        }
        .split-text-wrapper {
          flex: 1;
        }
        .split-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .paragraph-stacked-container {
          margin-bottom: 24px;
        }

        /* Subheadings and headings styling */
        .article-heading-h3 {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--panel);
          margin-top: 44px;
          margin-bottom: 16px;
        }
        .article-heading-h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--panel);
          margin-top: 36px;
          margin-bottom: 12px;
        }
        .article-divider {
          border: 0;
          border-top: 1.5px solid var(--line);
          margin: 56px 0;
        }

        /* Banner styling */
        .post-banner-image-container {
          width: 100%;
          height: 440px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 40px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
        }
        .post-banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Slideshow styling */
        .slideshow-block {
          margin: 48px 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: var(--paper-2);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .slideshow-slide {
          position: relative;
          height: 460px;
          background: #0d1527;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .slideshow-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .slideshow-placeholder {
          color: #cbd5e1;
          font-size: 1rem;
        }
        .slideshow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(13, 21, 39, 0.6);
          color: #fff;
          border: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s;
          z-index: 10;
        }
        .slideshow-btn:hover {
          background: var(--accent);
          transform: translateY(-50%) scale(1.05);
        }
        .slideshow-btn.prev {
          left: 18px;
        }
        .slideshow-btn.next {
          right: 18px;
        }
        .slideshow-meta {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          background: var(--paper-2);
          border-top: 1px solid var(--line);
        }
        .slideshow-caption {
          font-size: 0.92rem;
          color: var(--muted);
          font-style: italic;
        }
        .slideshow-dots {
          display: flex;
          gap: 8px;
        }
        .slideshow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e2e8f0;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .slideshow-dot.active {
          background: var(--accent);
          width: 18px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .split-container {
            flex-direction: column !important;
            gap: 16px;
            align-items: center;
          }
          .split-image-wrapper {
            max-width: 100%;
            width: 300px;
          }
          .slideshow-slide {
            height: 280px;
          }
        }

        /* Minimal Top-Left Translation Bar */
        .top-left-translation-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
        .translate-icon {
          font-size: 1.1rem;
        }
        .translation-select-minimal {
          border: 1px solid var(--line);
          background: #fff;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--ink);
          outline: none;
          cursor: pointer;
          font-weight: 600;
          transition: border-color 0.2s;
        }
        .translation-select-minimal:hover {
          border-color: var(--accent);
        }
        .translating-status-minimal {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--muted);
          font-style: italic;
        }
        .view-original-btn-minimal {
          border: 0;
          background: transparent;
          color: var(--accent);
          font-weight: 700;
          font-size: 0.78rem;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }
        .view-original-btn-minimal:hover {
          color: var(--accent-deep);
          text-decoration: underline;
        }

        /* Booking CTA Banner */
        .booking-cta-banner {
          background: linear-gradient(135deg, #0d1527, #1e293b);
          border-radius: 20px;
          padding: 36px;
          text-align: center;
          color: #fff;
          margin: 60px 0 40px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
        }

        .booking-cta-banner::before {
          content: "";
          position: absolute;
          right: -50px;
          bottom: -50px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(242, 122, 26, 0.25), transparent 70%);
        }

        .booking-cta-banner h3 {
          font-size: 1.6rem;
          margin-bottom: 12px;
          color: #fff;
        }

        .booking-cta-banner p {
          color: #94a3b8;
          max-width: 500px;
          margin: 0 auto 24px;
        }

        .booking-cta-banner .cta-btn {
          background: var(--accent);
          color: #fff;
          padding: 12px 30px;
          border-radius: 100px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, transform 0.2s;
        }

        .booking-cta-banner .cta-btn:hover {
          background: var(--accent-deep);
          transform: translateY(-2px);
        }

        /* Related Articles */
        .related-section {
          border-top: 1px solid var(--line);
          padding-top: 60px;
          margin-top: 60px;
        }

        .related-section h3 {
          font-size: 1.6rem;
          margin-bottom: 24px;
          color: var(--panel);
        }

        .related-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .related-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 20px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .related-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.1);
        }

        .related-card .related-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-deep);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .related-card h4 {
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: var(--panel);
        }

        .related-card p {
          font-size: 0.9rem;
          color: var(--muted);
          margin-bottom: 12px;
          flex-grow: 1;
        }

        .related-card .card-meta {
          font-size: 0.8rem;
          color: var(--muted);
        }

        @media (max-width: 600px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
          .post-cover-visual {
            height: 240px;
          }
        }
      `}</style>

      <div className="post-container">
        <Link href="/blog" className="back-link">
          <span>←</span> Back to all posts
        </Link>

        {/* Top-Left Minimal Translation Bar */}
        <div className="top-left-translation-bar">
          <span className="translate-icon">🌐</span>
          <select
            value={activeTransLang}
            onChange={(e) => handleLangSelect(e.target.value)}
            className="translation-select-minimal"
            disabled={translationState === "translating"}
          >
            <option value="en">English (Original)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="fr">Français (French)</option>
            <option value="es">Español (Spanish)</option>
          </select>
          {translationState === "translating" && (
            <span className="translating-status-minimal">
              <RefreshCw className="animate-spin h-3.5 w-3.5 text-[#f27a1a]" style={{ verticalAlign: "middle" }} />
              Translating...
            </span>
          )}
          {activeTransLang !== "en" && translationState === "success" && (
            <button 
              onClick={() => handleLangSelect("en")}
              className="view-original-btn-minimal"
            >
              Show Original
            </button>
          )}
        </div>

        <article>
          <header className="post-header">
            <span className="tag-badge">{displayPost.tag}</span>
            <h1>{displayPost.title}</h1>
            <div className="post-meta-row">
              <div className="author-avatar">{displayPost.author.avatarInitials}</div>
              <div>
                <div className="author-name">{displayPost.author.name}</div>
                <div>
                  <span>Published on {displayPost.publishedDate}</span>
                  <span style={{ margin: "0 8px" }}>·</span>
                  <span>{displayPost.readTime} read time</span>
                </div>
              </div>
            </div>
          </header>

          {displayPost.bannerImage ? (
            <div className="post-banner-image-container">
              <img src={displayPost.bannerImage} alt={displayPost.title} className="post-banner-image" />
            </div>
          ) : (
            <div className={`post-cover-visual ${displayPost.thumbClass}`}>
              <span className="cover-icon">{displayPost.icon}</span>
              <span className="cover-title">{displayPost.category.toUpperCase()} GUIDES</span>
            </div>
          )}

          <div className="article-content">
            {displayPost.content.map((block, idx) => renderBlock(block, idx))}
          </div>
        </article>

        {/* CTA Banner */}
        <div className="booking-cta-banner">
          <h3>Need to ship internationally?</h3>
          <p>
            Get a reliable quote, check pin code serviceability, or arrange a doorstep pickup from our logistics team.
          </p>
          <Link href="/zipcode" className="cta-btn">
            Calculate Shipping Cost
          </Link>
        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <div className="related-section">
            <h3>Keep Reading</h3>
            <div className="related-grid">
              {related.map((relPost) => (
                <Link key={relPost.id} href={`/blog/${relPost.slug}`} className="related-card">
                  <span className="related-badge">{relPost.tag}</span>
                  <h4>{relPost.title}</h4>
                  <p>{relPost.description}</p>
                  <span className="card-meta">{relPost.readTime} read</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
