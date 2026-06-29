// app/blog/page.tsx
"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import {
  type BlogPost,
  type FilterCategory,
  BLOG_POSTS,
  FEATURED_POST,
  CATEGORIES,
} from "./data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BlogPage(): React.ReactElement {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [newsletterMessage, setNewsletterMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const [featuredPost, setFeaturedPost] = useState<BlogPost>(FEATURED_POST);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const list: BlogPost[] = data.data;
          const feat = list.find((p) => p.featured) || list[0];
          setFeaturedPost(feat);
          setBlogs(list.filter((p) => p.slug !== feat.slug));
        }
      } catch (err) {
        console.warn(
          "Failed to fetch blogs from API, falling back to static local data",
          err,
        );
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [blogs, featuredPost]);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email.trim()) {
      setNewsletterMessage("Thanks! You're on the list. ✈");
      setEmail("");
      setTimeout(() => setNewsletterMessage(""), 5000);
    }
  };

  const filteredPosts =
    filter === "all" ? blogs : blogs.filter((post) => post.category === filter);

  return (
    <div className={`blog-wrapper ${geistSans.variable}`}>
      <title>Manvi Logistics Blog | Shipping & Customs Guides</title>
      <meta name="description" content="Practical guides to international shipping, customs and sourcing — plus stories from the families and businesses we connect across the world." />
      <Header />

      <style jsx>{`
        .blog-wrapper {
          --paper: #f8fafc;
          --paper-2: #ffffff;
          --panel: #0d1527;
          --ink: #0f172a;
          --muted: #64748b;
          --line: #e2e8f0;
          --accent: #f27a1a;
          --accent-deep: #db660c;
          --accent-soft: #fed7aa;
          --display:
            var(--font-geist-sans, -apple-system), BlinkMacSystemFont,
            "Segoe UI", "Roboto", sans-serif;
          --body:
            var(--font-geist-sans, -apple-system), BlinkMacSystemFont,
            "Segoe UI", "Roboto", sans-serif;
          --radius: 16px;

          font-family: var(--body);
          color: var(--ink);
          background: var(--paper);
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .blog-wrapper h1,
        .blog-wrapper h2,
        .blog-wrapper h3 {
          font-family: var(--display);
          line-height: 1.06;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .wrap {
          max-width: 106rem;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Route indicator */
        .route-indicator {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 14px;
          max-width: 260px;
        }
        .route-indicator .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent);
          flex: none;
        }
        .route-indicator .line {
          flex: 1;
          height: 0;
          border-top: 2px dotted var(--accent-deep);
          opacity: 0.5;
        }
        .route-indicator .plane {
          color: var(--accent-deep);
          font-size: 0.95rem;
          margin-left: -2px;
        }

        .eyebrow {
          font-family: var(--body);
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.74rem;
          color: var(--accent-deep);
        }

        /* Hero */
        .blog-hero {
          background:
            radial-gradient(
              80% 120% at 90% -30%,
              rgba(242, 122, 26, 0.16),
              transparent 60%
            ),
            var(--paper);
          padding: 58px 0 30px;
        }
        .blog-hero h1 {
          font-size: clamp(2.5rem, 6vw, 4.2rem);
          font-weight: 800;
          margin: 14px 0 14px;
          letter-spacing: -0.03em;
        }
        .blog-hero h1 .highlight {
          color: var(--accent-deep);
        }
        .blog-hero p {
          font-size: 1.16rem;
          color: var(--muted);
          max-width: 52ch;
        }

        /* Category filters */
        .blog-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 26px 0 8px;
        }
        .blog-filter-btn {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 100px;
          padding: 9px 17px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: var(--body);
        }
        .blog-filter-btn:hover {
          border-color: var(--accent);
        }
        .blog-filter-btn.active {
          background: var(--panel);
          color: #fff;
          border-color: var(--panel);
        }

        /* Thumbnail */
        .blog-thumb {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: linear-gradient(135deg, #1b3346, #0f1e2e);
          display: grid;
          place-items: center;
          color: #fff;
        }
        .blog-thumb .icon {
          font-size: 2.6rem;
          opacity: 0.92;
        }
        .blog-thumb::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.14) 1px,
            transparent 1px
          );
          background-size: 16px 16px;
          opacity: 0.5;
          pointer-events: none;
        }
        .blog-thumb.thumb-gifting {
          background: linear-gradient(135deg, #7a4a12, #b5701b);
        }
        .blog-thumb.thumb-customs {
          background: linear-gradient(135deg, #1a4a3a, #0f3022);
        }
        .blog-thumb.thumb-logistics {
          background: linear-gradient(135deg, #3a2350, #5a2d6e);
        }
        .blog-thumb.thumb-prohibited {
          background: linear-gradient(135deg, #5c1320, #a81e34);
        }
        .blog-thumb.thumb-featured {
          background: linear-gradient(135deg, #6a3a0a, #b5701b);
        }
        .blog-thumb .thumb-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
          display: block;
        }

        .blog-tag {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent-deep);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 5px 11px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        /* Featured post */
        .blog-featured {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 30px;
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 22px;
          overflow: hidden;
          padding: 14px;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .blog-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -24px rgba(15, 30, 46, 0.5);
        }
        .blog-featured .blog-thumb {
          aspect-ratio: 16 / 9;
          min-height: unset;
        }
        .blog-featured .blog-thumb .icon {
          font-size: 4rem;
        }
        .blog-featured .featured-content {
          padding: 22px 22px 22px 6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blog-featured h2 {
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
          font-weight: 800;
          margin: 14px 0 12px;
        }
        .blog-featured p {
          color: var(--muted);
          font-size: 1.04rem;
          margin-bottom: 18px;
        }
        .blog-featured .read-link {
          font-weight: 700;
          color: var(--accent-deep);
        }

        @media (max-width: 780px) {
          .blog-featured {
            grid-template-columns: 1fr;
          }
          .blog-featured .blog-thumb {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }
          .blog-featured .featured-content {
            padding: 8px 16px 18px;
          }
        }

        /* Post grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 30px;
        }
        .blog-post {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .blog-post:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -24px rgba(15, 30, 46, 0.5);
        }
        .blog-post .blog-thumb {
          aspect-ratio: 16 / 9;
          height: auto;
        }
        .blog-post .blog-thumb .icon {
          font-size: 2.4rem;
        }
        .blog-post .post-content {
          padding: 18px 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .blog-post h3 {
          font-size: 1.18rem;
          font-weight: 700;
          margin: 12px 0 8px;
        }
        .blog-post p {
          color: var(--muted);
          font-size: 0.92rem;
          margin-bottom: 16px;
          flex: 1;
        }

        @media (max-width: 860px) {
          .blog-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Meta info */
        .post-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--muted);
          font-size: 0.86rem;
          margin-top: auto;
        }
        .post-meta .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(
            140deg,
            var(--accent),
            var(--accent-deep)
          );
          color: #241404;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 0.8rem;
        }

        /* Newsletter */
        .blog-newsletter {
          background: var(--panel);
          color: #eaf0f4;
          border-radius: 24px;
          padding: 46px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .blog-newsletter::after {
          content: "";
          position: absolute;
          left: -40px;
          top: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(242, 122, 26, 0.35),
            transparent 70%
          );
          pointer-events: none;
        }
        .blog-newsletter h2 {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 8px;
          color: #fff;
          position: relative;
          z-index: 2;
        }
        .blog-newsletter p {
          color: #aebcc7;
          max-width: 46ch;
          margin: 0 auto 22px;
          position: relative;
          z-index: 2;
        }
        .newsletter-form {
          display: flex;
          gap: 10px;
          max-width: 460px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .newsletter-form input {
          flex: 1;
          padding: 14px 18px;
          border-radius: 100px;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          font-family: var(--body);
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .newsletter-form input::placeholder {
          color: #90a0ab;
        }
        .newsletter-form input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .newsletter-form button {
          background: var(--accent);
          color: #fff;
          border: 0;
          padding: 14px 24px;
          border-radius: 100px;
          font-weight: 700;
          font-family: var(--body);
          font-size: 1rem;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .newsletter-form button:hover {
          background: var(--accent-deep);
        }
        .newsletter-message {
          margin-top: 14px;
          color: var(--accent);
          font-weight: 600;
          min-height: 1.2em;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 520px) {
          .newsletter-form {
            flex-direction: column;
          }
          .blog-newsletter {
            padding: 34px 22px;
          }
        }

        /* Pagination */
        .blog-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 42px;
        }
        .blog-pagination a {
          min-width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 11px;
          background: var(--paper-2);
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.15s;
        }
        .blog-pagination a.active {
          background: var(--accent);
          color: #241404;
          border-color: var(--accent);
        }
        .blog-pagination a:hover:not(.active) {
          border-color: var(--ink);
          color: var(--ink);
        }

        .section-spacing {
          padding: 40px 0;
        }

        /* Reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* HERO */}
      <header className="blog-hero">
        <div className="wrap">
          <div className="route-indicator">
            <span className="dot"></span>
            <span className="line"></span>
            <span className="plane">✈</span>
          </div>
          <span className="eyebrow">The Manvi Blog</span>
          <h1>
            Stories From <span className="highlight">The Network.</span>
          </h1>
          <p>
            Practical guides to international shipping, customs and sourcing —
            plus stories from the families and businesses we connect across the
            world.
          </p>

          <div className="blog-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`blog-filter-btn ${filter === cat.id ? "active" : ""}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* FEATURED POST */}
      <section className="section-spacing" style={{ paddingTop: "18px" }}>
        <div className="wrap">
          <a
            href={`/blog/${featuredPost.slug}`}
            className="blog-featured reveal"
            aria-label="Read featured article"
          >
            <div className={`blog-thumb ${featuredPost.thumbClass}`}>
              {featuredPost.previewImage ? (
                <img src={featuredPost.previewImage} alt={featuredPost.title} className="thumb-image" />
              ) : (
                <span className="icon">{featuredPost.icon}</span>
              )}
            </div>
            <div className="featured-content">
              <span className="blog-tag">{featuredPost.tag}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.description}</p>
              <span className="read-link">Read the guide →</span>
              <div className="post-meta">
                <span className="avatar">
                  {featuredPost.author?.avatarInitials || "M"}
                </span>
                <span>{featuredPost.author?.name || "Manvi Team"}</span>
                <span>·</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* POST GRID */}
      <section className="section-spacing" style={{ paddingTop: "8px" }}>
        <div className="wrap">
          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <a
                key={post._id || post.slug || post.id}
                href={`/blog/${post.slug}`}
                className="blog-post reveal"
              >
                <div className={`blog-thumb ${post.thumbClass}`}>
                  {post.previewImage ? (
                    <img src={post.previewImage} alt={post.title} className="thumb-image" />
                  ) : (
                    <span className="icon">{post.icon}</span>
                  )}
                </div>
                <div className="post-content">
                  <span className="blog-tag">{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <div className="post-meta">
                    <span className="avatar">
                      {post.author?.avatarInitials || "M"}
                    </span>
                    <span>{post.author?.name || "Manvi Team"}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredPosts.length > 6 && (
            <div className="blog-pagination">
              <a href="#" className="active">
                1
              </a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">Next →</a>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section-spacing">
        <div className="wrap">
          <div className="blog-newsletter reveal">
            <h2>Never Miss A Shipping Tip.</h2>
            <p>
              Guides, festive deadlines and offers — straight to your inbox. No
              spam, just useful.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
            <div className="newsletter-message">{newsletterMessage}</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
