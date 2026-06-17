"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CareerPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="career-wrapper flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
        
        .career-wrapper {
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
        .career-wrapper h1, .career-wrapper h2, .career-wrapper h3, .career-wrapper h4 {
          font-family: var(--display);
          line-height: 1.04;
          letter-spacing: -.02em;
          font-weight: 700;
        }
        .career-wrapper a { color: inherit; text-decoration: none; }
        .career-wrapper .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
        
        .career-route { display: flex; align-items: center; gap: 0; margin: 0 0 14px; max-width: 260px; }
        .career-route .pt { width: 9px; height: 9px; border-radius: 50%; background: var(--accent); flex: none; }
        .career-route .ln { flex: 1; height: 0; border-top: 2px dotted var(--accent-deep); opacity: .5; }
        .career-route .plane { color: var(--accent-deep); font-size: .95rem; margin-left: -2px; }
        .career-eyebrow { font-family: var(--body); font-weight: 700; letter-spacing: .16em; text-transform: uppercase; font-size: .74rem; color: var(--accent-deep); }
        
        .career-hero { background: radial-gradient(80% 120% at 88% -20%, rgba(224,146,47,.16), transparent 60%), var(--paper); padding: 64px 0 56px; position: relative; overflow: hidden; }
        .career-hero-grid { display: grid; grid-template-columns: 1.25fr .9fr; gap: 48px; align-items: center; }
        .career-hero h1 { font-size: clamp(2.5rem, 6vw, 4.4rem); font-weight: 800; margin: 14px 0 18px; letter-spacing: -.03em; }
        .career-hero h1 .hl { color: var(--accent-deep); }
        .career-hero p.sub { font-size: 1.16rem; color: var(--muted); max-width: 46ch; }
        .career-hero .btns { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
        .career-btn { display: inline-flex; align-items: center; gap: 9px; font-family: var(--body); font-weight: 700; font-size: 1rem; padding: 14px 24px; border-radius: 100px; cursor: pointer; border: 1.5px solid transparent; transition: .18s; }
        .career-btn-primary { background: var(--accent); color: #241404; }
        .career-btn-primary:hover { background: var(--accent-deep); color: #fff; }
        .career-btn-ghost { background: transparent; color: var(--ink); border-color: var(--line); }
        .career-btn-ghost:hover { border-color: var(--ink); }
        .career-hero-card { background: var(--panel); color: #eaf0f4; border-radius: 22px; padding: 30px; position: relative; overflow: hidden; }
        .career-hero-card::after { content: ""; position: absolute; right: -40px; bottom: -40px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(224,146,47,.4), transparent 70%); }
        .career-hero-card h3 { font-size: 1.3rem; margin-bottom: 18px; color: #fff; position: relative; z-index: 2; }
        .career-stat { display: flex; align-items: baseline; gap: 12px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.1); position: relative; z-index: 2; }
        .career-stat:last-child { border-bottom: 0; }
        .career-stat b { font-family: var(--display); font-size: 1.9rem; color: var(--accent); min-width: 108px; }
        .career-stat span { color: #c4cfd7; font-size: .95rem; }
        @media(max-width: 860px) {
          .career-hero { padding: 44px 0 40px; }
          .career-hero-grid { grid-template-columns: 1fr; gap: 30px; }
        }
        
        .career-section { padding: 64px 0; }
        .career-sec-head { max-width: 640px; margin-bottom: 38px; }
        .career-sec-head h2 { font-size: clamp(2rem, 4.4vw, 3rem); font-weight: 800; margin-top: 8px; letter-spacing: -.02em; }
        .career-sec-head p { color: var(--muted); font-size: 1.08rem; margin-top: 10px; }
        
        .career-values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .career-value { background: var(--paper-2); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; }
        .career-value .ic { width: 46px; height: 46px; border-radius: 12px; background: var(--accent-soft); display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 16px; }
        .career-value h3 { font-size: 1.16rem; font-weight: 700; margin-bottom: 6px; }
        .career-value p { color: var(--muted); font-size: .94rem; }
        @media(max-width: 860px) { .career-values { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 520px) { .career-values { grid-template-columns: 1fr; } }
        
        .career-roles { background: var(--panel-2); background: linear-gradient(180deg, #0F1E2E, #142838); }
        .career-roles .career-sec-head h2, .career-roles .career-sec-head p { color: #eaf0f4; }
        .career-roles .career-sec-head p { color: #aebcc7; }
        .career-role { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); border-radius: var(--r); margin-bottom: 12px; overflow: hidden; }
        .career-role summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 16px; padding: 20px 22px; color: #eef3f7; }
        .career-role summary::-webkit-details-marker { display: none; }
        .career-role .rtitle { flex: 1; }
        .career-role .rtitle b { font-family: var(--display); font-size: 1.22rem; font-weight: 700; display: block; }
        .career-role .rtitle span { color: #9fb0bb; font-size: .88rem; }
        .career-role .tag { background: rgba(224,146,47,.16); color: var(--accent); font-size: .74rem; font-weight: 700; padding: 5px 11px; border-radius: 100px; white-space: nowrap; letter-spacing: .04em; }
        .career-role .chev { color: var(--accent); font-size: 1.5rem; transition: .25s; flex: none; }
        .career-role[open] .chev { transform: rotate(45deg); }
        .career-role .body { padding: 0 22px 22px 22px; color: #bcc9d2; font-size: .96rem; }
        .career-role .body ul { margin: 6px 0 18px 18px; list-style-type: disc; }
        .career-role .body li { margin: 4px 0; }
        .career-role .apply { display: inline-flex; gap: 8px; align-items: center; background: var(--accent); color: #241404; font-weight: 700; padding: 11px 20px; border-radius: 100px; font-size: .92rem; }
        .career-role .apply:hover { background: #fff; }
        
        .career-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; counter-reset: s; }
        .career-hstep { background: var(--paper-2); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; position: relative; }
        .career-hstep .n { font-family: var(--display); font-size: 1rem; font-weight: 800; color: var(--accent-deep); border: 2px solid var(--accent); border-radius: 9px; width: 38px; height: 38px; display: grid; place-items: center; margin-bottom: 16px; }
        .career-hstep h3 { font-size: 1.1rem; margin-bottom: 5px; }
        .career-hstep p { color: var(--muted); font-size: .92rem; }
        @media(max-width: 860px) { .career-steps { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 520px) { .career-steps { grid-template-columns: 1fr; } }
        
        .career-cta-band { background: var(--accent); color: #2a1804; border-radius: 24px; padding: 46px; text-align: center; position: relative; overflow: hidden; }
        .career-cta-band h2 { font-size: clamp(1.7rem, 4vw, 2.6rem); font-weight: 800; margin-bottom: 10px; }
        .career-cta-band p { font-size: 1.08rem; max-width: 48ch; margin: 0 auto 24px; color: #5a3c12; }
        .career-cta-band .career-btn-primary { background: var(--panel); color: #fff; }
        .career-cta-band .career-btn-primary:hover { background: #000; }
        
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.in { opacity: 1; transform: none; }
        @media(prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; } }
      `}} />

      <div className="flex-1">
        {/* HERO */}
        <header className="career-hero">
          <div className="wrap">
            <div className="career-hero-grid">
              <div>
                <div className="career-route"><span className="pt"></span><span className="ln"></span><span className="plane">✈</span></div>
                <span className="career-eyebrow">Careers at Manvi</span>
                <h1>Help Us Bridge <span className="hl">Distances.</span></h1>
                <p className="sub">Behind every parcel is a family waiting on the other side of the world. Join the team that gets it there — across the USA, UK, Canada, Europe and Australia.</p>
                <div className="btns">
                  <a className="career-btn career-btn-primary" href="#openings">View Open Roles</a>
                  <a className="career-btn career-btn-ghost" href="mailto:careers@manvicourier.com?subject=Job%20Application%20%E2%80%94%20Manvi%20International">Email Your CV</a>
                </div>
              </div>
              <aside className="career-hero-card">
                <h3>A growing network.</h3>
                <div className="career-stat"><b>50,000+</b><span>International shipments delivered</span></div>
                <div className="career-stat"><b>10,000+</b><span>Happy customers worldwide</span></div>
                <div className="career-stat"><b>98%</b><span>Delivery success rate</span></div>
                <div className="career-stat"><b>5</b><span>Global carrier partners</span></div>
              </aside>
            </div>
          </div>
        </header>

        {/* VALUES */}
        <section className="career-section">
          <div className="wrap">
            <div className="career-sec-head reveal">
              <div className="career-route"><span className="pt"></span><span className="ln"></span><span className="plane">✈</span></div>
              <span className="career-eyebrow">Why Manvi</span>
              <h2>Work That Actually Moves.</h2>
              <p>We're a logistics company built on precision and care. Here's what it feels like on the inside.</p>
            </div>
            <div className="career-values">
              <div className="career-value reveal"><div className="ic">🎯</div><h3>Precision First</h3><p>Every shipment is someone's trust. We sweat the details so nothing gets lost in transit.</p></div>
              <div className="career-value reveal"><div className="ic">🌍</div><h3>Global Exposure</h3><p>Work across borders, carriers and time zones with partners like DHL, FedEx and Aramex.</p></div>
              <div className="career-value reveal"><div className="ic">🤝</div><h3>People First</h3><p>Customers and colleagues alike. We're small enough to know your name and back your ideas.</p></div>
              <div className="career-value reveal"><div className="ic">🚀</div><h3>Real Ownership</h3><p>A fast-growing company where what you build ships — and you see the impact quickly.</p></div>
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section className="career-section career-roles" id="openings">
          <div className="wrap">
            <div className="career-sec-head reveal">
              <div className="career-route"><span className="pt"></span><span className="ln"></span><span className="plane">✈</span></div>
              <span className="career-eyebrow" style={{ color: "var(--accent)" }}>Open positions</span>
              <h2>Find Your Place In The Network.</h2>
              <p>All roles are based at our Dwarka, New Delhi office unless noted. Tap a role to see the details and apply.</p>
            </div>

            <details className="career-role reveal">
              <summary><div className="rtitle"><b>Operations Executive</b><span>Full-time · Dwarka, New Delhi</span></div><span className="tag">Operations</span><span className="chev">+</span></summary>
              <div className="body">
                <p>Own the day-to-day movement of shipments — coordinating pickups, carriers and deliveries so parcels reach families on time.</p>
                <ul><li>Coordinate pickups and hand-offs to carrier partners</li><li>Track shipments and resolve exceptions proactively</li><li>Keep customers updated across their journey</li></ul>
                <a className="apply" href="mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20Operations%20Executive">Apply for this role →</a>
              </div>
            </details>

            <details className="career-role reveal">
              <summary><div className="rtitle"><b>Customs Documentation Specialist</b><span>Full-time · Dwarka, New Delhi</span></div><span className="tag">Customs</span><span className="chev">+</span></summary>
              <div className="body">
                <p>Be the expert who navigates global borders — preparing and verifying paperwork so shipments clear customs smoothly.</p>
                <ul><li>Prepare export/import documentation</li><li>Liaise with carrier partners and customs brokers</li><li>Stay current on destination-country regulations</li></ul>
                <a className="apply" href="mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20Customs%20Documentation%20Specialist">Apply for this role →</a>
              </div>
            </details>

            <details className="career-role reveal">
              <summary><div className="rtitle"><b>International Business Development</b><span>Full-time · Dwarka / Hybrid</span></div><span className="tag">Sales</span><span className="chev">+</span></summary>
              <div className="body">
                <p>Grow our commercial and bulk-shipping accounts across the USA, UK, Canada and Australia.</p>
                <ul><li>Build relationships with businesses sourcing from India</li><li>Develop bulk and recurring-shipment accounts</li><li>Work with operations to deliver on promises</li></ul>
                <a className="apply" href="mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20International%20Business%20Development">Apply for this role →</a>
              </div>
            </details>

            <details className="career-role reveal">
              <summary><div className="rtitle"><b>Customer Support Associate (WhatsApp)</b><span>Full-time · Dwarka, New Delhi</span></div><span className="tag">Support</span><span className="chev">+</span></summary>
              <div className="body">
                <p>Be the friendly, fast voice customers reach on WhatsApp and calls — turning questions into confident bookings.</p>
                <ul><li>Respond to enquiries on WhatsApp, email and phone</li><li>Capture order and pickup details accurately</li><li>Follow up so no customer is left waiting</li></ul>
                <a className="apply" href="mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20Customer%20Support%20Associate">Apply for this role →</a>
              </div>
            </details>

            <details className="career-role reveal">
              <summary><div className="rtitle"><b>Performance Marketing Manager</b><span>Full-time · Dwarka / Hybrid</span></div><span className="tag">Marketing</span><span className="chev">+</span></summary>
              <div className="body">
                <p>Run paid campaigns on Meta and Google that reach the diaspora and businesses abroad — and turn clicks into enquiries.</p>
                <ul><li>Plan and optimise Meta &amp; Google ad campaigns</li><li>Own budgets, targeting and reporting</li><li>Work with creative on landing pages and ads</li></ul>
                <a className="apply" href="mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20Performance%20Marketing%20Manager">Apply for this role →</a>
              </div>
            </details>

            <details className="career-role reveal">
              <summary><div className="rtitle"><b>Pickup &amp; Warehouse Coordinator</b><span>Full-time · Delhi NCR</span></div><span className="tag">Operations</span><span className="chev">+</span></summary>
              <div className="body">
                <p>Keep goods moving on the ground — organising pickups across North India and prepping consignments for dispatch.</p>
                <ul><li>Schedule and verify pickups</li><li>Inspect, weigh and pack consignments</li><li>Maintain accurate inventory records</li></ul>
                <a className="apply" href="mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20Pickup%20and%20Warehouse%20Coordinator">Apply for this role →</a>
              </div>
            </details>
          </div>
        </section>

        {/* HOW WE HIRE */}
        <section className="career-section">
          <div className="wrap">
            <div className="career-sec-head reveal">
              <div className="career-route"><span className="pt"></span><span className="ln"></span><span className="plane">✈</span></div>
              <span className="career-eyebrow">How we hire</span>
              <h2>A Clear Route To Joining Us.</h2>
              <p>No black holes. Four simple steps, and we keep you posted at each one.</p>
            </div>
            <div className="career-steps">
              <div className="career-hstep reveal"><div className="n">01</div><h3>Apply</h3><p>Send your CV for a role — or speculatively if none fits yet.</p></div>
              <div className="career-hstep reveal"><div className="n">02</div><h3>Screening Call</h3><p>A short chat to understand your experience and what you're after.</p></div>
              <div className="career-hstep reveal"><div className="n">03</div><h3>Interview</h3><p>Meet the team you'd work with and dig into the role.</p></div>
              <div className="career-hstep reveal"><div className="n">04</div><h3>Offer &amp; Onboarding</h3><p>We make it official and get you set up to ship from day one.</p></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="career-section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="career-cta-band reveal">
              <h2>Don't See Your Role?</h2>
              <p>We're always looking for sharp people who care about getting things where they need to be. Tell us how you'd help.</p>
              <a className="career-btn career-btn-primary" href="mailto:careers@manvicourier.com?subject=Speculative%20Application%20%E2%80%94%20Manvi%20International">Send Your CV Anyway</a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
