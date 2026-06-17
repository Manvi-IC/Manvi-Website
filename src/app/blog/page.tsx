"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [filter, setFilter] = useState("all");
  const [nmsg, setNmsg] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNmsg("Thanks! You're on the list. ✈");
    setEmail("");
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const posts = [
    {
      cat: "customs",
      ico: "📋",
      tag: "Customs & Compliance",
      title: "A simple guide to international customs clearance.",
      desc: "What paperwork actually matters, who handles it, and how to avoid your shipment getting stuck at the border.",
      time: "6 min",
      thumbClass: "c3"
    },
    {
      cat: "guides",
      ico: "📦",
      tag: "Shipping Guides",
      title: "Document, parcel or cargo: which service do you need?",
      desc: "The three ways to ship with us explained in plain terms — so you pick the right one and pay only for what you need.",
      time: "5 min",
      thumbClass: ""
    },
    {
      cat: "logistics",
      ico: "🏬",
      tag: "International Logistics",
      title: "Bulk sourcing from India for your overseas store.",
      desc: "How Indian restaurants, grocers and boutiques abroad restock from India — pickup, freight and recurring shipments made simple.",
      time: "7 min",
      thumbClass: "c4"
    },
    {
      cat: "customs",
      ico: "⚠️",
      tag: "Customs & Compliance",
      title: "What you can't ship: a guide to prohibited goods.",
      desc: "From hazardous chemicals to precious stones — the items we can't move, and how to check before you book.",
      time: "4 min",
      thumbClass: "c5"
    },
    {
      cat: "guides",
      ico: "📍",
      tag: "Shipping Guides",
      title: "Real-time tracking, explained.",
      desc: "Your tracking number, what each status means, and how to follow your parcel's journey from pickup to doorstep.",
      time: "4 min",
      thumbClass: ""
    },
    {
      cat: "gifting",
      ico: "🍬",
      tag: "Festive & Gifting",
      title: "Sending sweets & food items overseas: what to know.",
      desc: "Packing, shelf-life and customs tips for getting mithai and homemade favourites to loved ones abroad, fresh.",
      time: "5 min",
      thumbClass: "c2"
    }
  ];

  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.cat === filter);

  return (
    <div className="blog-wrapper flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
        
        .blog-wrapper {
          --paper:#F4F2EC; --paper-2:#FFFFFF; --panel:#0F1E2E; --panel-2:#17293A;
          --ink:#13212E; --muted:#5C6B77; --line:#E3DDD1;
          --accent:#E0922F; --accent-deep:#B5701B; --accent-soft:#F7E8CF;
          --display:"Bricolage Grotesque", Georgia, serif;
          --body:"Hanken Grotesk", system-ui, sans-serif;
          --r:16px;
          font-family: var(--body);
          color: var(--ink);
          background: var(--paper);
          line-height: 1.6;
        }
        .blog-wrapper h1, .blog-wrapper h2, .blog-wrapper h3, .blog-wrapper h4 {
          font-family: var(--display);
          line-height: 1.06;
          letter-spacing: -.02em;
          font-weight: 700;
        }
        .blog-wrapper a { color: inherit; text-decoration: none; }
        .blog-wrapper .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
        
        .blog-route { display: flex; align-items: center; gap: 0; margin: 0 0 14px; max-width: 260px; }
        .blog-route .pt { width: 9px; height: 9px; border-radius: 50%; background: var(--accent); flex: none; }
        .blog-route .ln { flex: 1; height: 0; border-top: 2px dotted var(--accent-deep); opacity: .5; }
        .blog-route .plane { color: var(--accent-deep); font-size: .95rem; margin-left: -2px; }
        .blog-eyebrow { font-family: var(--body); font-weight: 700; letter-spacing: .16em; text-transform: uppercase; font-size: .74rem; color: var(--accent-deep); }
        
        .blog-bhero { background: radial-gradient(80% 120% at 90% -30%, rgba(224,146,47,.16), transparent 60%), var(--paper); padding: 58px 0 30px; }
        .blog-bhero h1 { font-size: clamp(2.5rem, 6vw, 4.2rem); font-weight: 800; margin: 14px 0 14px; letter-spacing: -.03em; }
        .blog-bhero h1 .hl { color: var(--accent-deep); }
        .blog-bhero p { font-size: 1.16rem; color: var(--muted); max-width: 52ch; }
        
        .blog-cats { display: flex; flex-wrap: wrap; gap: 10px; padding: 26px 0 8px; }
        .blog-cat { background: var(--paper-2); border: 1px solid var(--line); border-radius: 100px; padding: 9px 17px; font-weight: 600; font-size: .9rem; color: var(--muted); cursor: pointer; transition: .15s; }
        .blog-cat:hover { border-color: var(--accent); }
        .blog-cat.active { background: var(--panel); color: #fff; border-color: var(--panel); }
        
        .blog-thumb { position: relative; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #1b3346, #0f1e2e); display: grid; place-items: center; color: #fff; }
        .blog-thumb .ico { font-size: 2.6rem; opacity: .92; }
        .blog-thumb::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px); background-size: 16px 16px; opacity: .5; }
        .blog-thumb.c2 { background: linear-gradient(135deg, #7a4a12, #b5701b); }
        .blog-thumb.c3 { background: linear-gradient(135deg, #234a3a, #11302222); }
        .blog-thumb.c4 { background: linear-gradient(135deg, #3a2350, #5a2d6e); }
        .blog-thumb.c5 { background: linear-gradient(135deg, #5c1320, #a81e34); }
        .blog-tag { display: inline-block; background: var(--accent-soft); color: var(--accent-deep); font-size: .72rem; font-weight: 700; letter-spacing: .04em; padding: 5px 11px; border-radius: 100px; text-transform: uppercase; }
        
        .blog-featured { display: grid; grid-template-columns: 1.05fr 1fr; gap: 30px; background: var(--paper-2); border: 1px solid var(--line); border-radius: 22px; overflow: hidden; padding: 14px; }
        .blog-featured .blog-thumb { min-height: 320px; }
        .blog-featured .blog-thumb .ico { font-size: 4rem; }
        .blog-featured .fcontent { padding: 22px 22px 22px 6px; display: flex; flex-direction: column; justify-content: center; }
        .blog-featured h2 { font-size: clamp(1.7rem, 3.4vw, 2.5rem); font-weight: 800; margin: 14px 0 12px; }
        .blog-featured p { color: var(--muted); font-size: 1.04rem; margin-bottom: 18px; }
        .blog-flink { font-weight: 700; color: var(--accent-deep); }
        .blog-pmeta { display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: .86rem; margin-top: auto; }
        .blog-pmeta .av { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(140deg, var(--accent), var(--accent-deep)); color: #241404; display: grid; place-items: center; font-weight: 800; font-size: .8rem; }
        @media(max-width: 780px) {
          .blog-featured { grid-template-columns: 1fr; }
          .blog-featured .blog-thumb { min-height: 200px; }
          .blog-featured .fcontent { padding: 8px 16px 18px; }
        }
        
        .blog-pgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 30px; }
        .blog-post { background: var(--paper-2); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; display: flex; flex-direction: column; transition: transform .2s ease, box-shadow .2s ease; }
        .blog-post:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -24px rgba(15,30,46,.5); }
        .blog-post .blog-thumb { height: 160px; }
        .blog-post .blog-thumb .ico { font-size: 2.4rem; }
        .blog-post .pc { padding: 18px 18px 20px; display: flex; flex-direction: column; flex: 1; }
        .blog-post h3 { font-size: 1.18rem; font-weight: 700; margin: 12px 0 8px; }
        .blog-post p { color: var(--muted); font-size: .92rem; margin-bottom: 16px; flex: 1; }
        @media(max-width: 860px) { .blog-pgrid { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 560px) { .blog-pgrid { grid-template-columns: 1fr; } }
        
        .blog-news { background: var(--panel); color: #eaf0f4; border-radius: 24px; padding: 46px; text-align: center; position: relative; overflow: hidden; }
        .blog-news::after { content: ""; position: absolute; left: -40px; top: -40px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(224,146,47,.35), transparent 70%); }
        .blog-news h2 { font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 8px; color: #fff; position: relative; z-index: 2; }
        .blog-news p { color: #aebcc7; max-width: 46ch; margin: 0 auto 22px; position: relative; z-index: 2; }
        .blog-nform { display: flex; gap: 10px; max-width: 460px; margin: 0 auto; position: relative; z-index: 2; }
        .blog-nform input { flex: 1; padding: 14px 18px; border-radius: 100px; border: 1.5px solid rgba(255,255,255,.2); background: rgba(255,255,255,.06); color: #fff; font-family: var(--body); font-size: 1rem; }
        .blog-nform input::placeholder { color: #90a0ab; }
        .blog-nform input:focus { outline: none; border-color: var(--accent); }
        .blog-nform button { background: var(--accent); color: #241404; border: 0; padding: 14px 24px; border-radius: 100px; font-weight: 700; font-family: var(--body); font-size: 1rem; cursor: pointer; white-space: nowrap; }
        .blog-nform button:hover { background: #fff; }
        .blog-nmsg { margin-top: 14px; color: var(--accent); font-weight: 600; min-height: 1.2em; position: relative; z-index: 2; }
        @media(max-width: 520px) { .blog-nform { flex-direction: column; } .blog-news { padding: 34px 22px; } }
        
        .blog-pager { display: flex; justify-content: center; gap: 8px; margin-top: 42px; }
        .blog-pager a { min-width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 11px; background: var(--paper-2); font-weight: 600; color: var(--muted); }
        .blog-pager a.active { background: var(--accent); color: #241404; border-color: var(--accent); }
        .blog-pager a:hover:not(.active) { border-color: var(--ink); color: var(--ink); }
        
        .blog-section { padding: 40px 0; }
        
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.in { opacity: 1; transform: none; }
        @media(prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; } }
      `}} />

      {/* HERO */}
      <header className="blog-bhero">
        <div className="wrap">
          <div className="blog-route"><span className="pt"></span><span className="ln"></span><span className="plane">✈</span></div>
          <span className="blog-eyebrow">The Manvi Blog</span>
          <h1>Stories From <span className="hl">The Network.</span></h1>
          <p>Practical guides to international shipping, customs and sourcing — plus stories from the families and businesses we connect across the world.</p>
          <div className="blog-cats">
            {[
              { id: "all", label: "All" },
              { id: "guides", label: "Shipping Guides" },
              { id: "customs", label: "Customs & Compliance" },
              { id: "logistics", label: "International Logistics" },
              { id: "gifting", label: "Festive & Gifting" },
              { id: "news", label: "Company News" }
            ].map(cat => (
              <button 
                key={cat.id} 
                className={`blog-cat ${filter === cat.id ? "active" : ""}`} 
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* FEATURED */}
      <section className="blog-section" style={{ paddingTop: "18px" }}>
        <div className="wrap">
          <a className="blog-featured reveal" href="#" aria-label="Read featured article">
            <div className="blog-thumb c2"><span className="ico">🎁</span></div>
            <div className="fcontent">
              <span className="blog-tag">Festive &amp; Gifting</span>
              <h2>How To Send Rakhi Gifts From India To Your Family Abroad.</h2>
              <p>From choosing what to send to clearing customs in time for the festival — a complete, no-stress guide for families in the USA, UK, Canada and Australia.</p>
              <span className="blog-flink">Read the guide →</span>
              <div className="blog-pmeta"><span className="av">M</span><span>Manvi Team</span><span>·</span><span>8 min read</span></div>
            </div>
          </a>
        </div>
      </section>

      {/* POST GRID */}
      <section className="blog-section" style={{ paddingTop: "8px" }}>
        <div className="wrap">
          <div className="blog-pgrid">
            {filteredPosts.map((post, idx) => (
              <a key={idx} className="blog-post reveal" href="#">
                <div className={`blog-thumb ${post.thumbClass}`}><span className="ico">{post.ico}</span></div>
                <div className="pc">
                  <span className="blog-tag">{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <div className="blog-pmeta"><span className="av">M</span><span>Manvi Team</span><span>·</span><span>{post.time}</span></div>
                </div>
              </a>
            ))}
          </div>

          <div className="blog-pager">
            <a href="#" className="active">1</a><a href="#">2</a><a href="#">3</a><a href="#">Next →</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="blog-section">
        <div className="wrap">
          <div className="blog-news reveal">
            <h2>Never Miss A Shipping Tip.</h2>
            <p>Guides, festive deadlines and offers — straight to your inbox. No spam, just useful.</p>
            <form className="blog-nform" onSubmit={handleSubscribe}>
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
            <div className="blog-nmsg">{nmsg}</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
