// app/careers/page.tsx
"use client";

import React, { useEffect } from "react";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Types
interface StatItem {
  label: string;
  value: string;
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface RoleItem {
  id: string;
  title: string;
  department: string;
  location: string;
  tag: string;
  description: string;
  responsibilities: string[];
}

interface StepItem {
  number: string;
  title: string;
  description: string;
}

// Constants
const STATS: StatItem[] = [
  { value: "50,000+", label: "International shipments delivered" },
  { value: "10,000+", label: "Happy customers worldwide" },
  { value: "98%", label: "Delivery success rate" },
  { value: "5", label: "Global carrier partners" },
];

const VALUES: ValueItem[] = [
  {
    icon: "🎯",
    title: "Precision First",
    description:
      "Every shipment is someone's trust. We sweat the details so nothing gets lost in transit.",
  },
  {
    icon: "🌍",
    title: "Global Exposure",
    description:
      "Work across borders, carriers and time zones with partners like DHL, FedEx and Aramex.",
  },
  {
    icon: "🤝",
    title: "People First",
    description:
      "Customers and colleagues alike. We're small enough to know your name and back your ideas.",
  },
  {
    icon: "🚀",
    title: "Real Ownership",
    description:
      "A fast-growing company where what you build ships — and you see the impact quickly.",
  },
];

const ROLES: RoleItem[] = [
  {
    id: "operations-exec",
    title: "Operations Executive",
    department: "Operations",
    location: "Dwarka, New Delhi",
    tag: "Operations",
    description:
      "Own the day-to-day movement of shipments — coordinating pickups, carriers and deliveries so parcels reach families on time.",
    responsibilities: [
      "Coordinate pickups and hand-offs to carrier partners",
      "Track shipments and resolve exceptions proactively",
      "Keep customers updated across their journey",
    ],
  },
  {
    id: "customs-specialist",
    title: "Customs Documentation Specialist",
    department: "Customs",
    location: "Dwarka, New Delhi",
    tag: "Customs",
    description:
      "Be the expert who navigates global borders — preparing and verifying paperwork so shipments clear customs smoothly.",
    responsibilities: [
      "Prepare export/import documentation",
      "Liaise with carrier partners and customs brokers",
      "Stay current on destination-country regulations",
    ],
  },
  {
    id: "biz-dev",
    title: "International Business Development",
    department: "Sales",
    location: "Dwarka / Hybrid",
    tag: "Sales",
    description:
      "Grow our commercial and bulk-shipping accounts across the USA, UK, Canada and Australia.",
    responsibilities: [
      "Build relationships with businesses sourcing from India",
      "Develop bulk and recurring-shipment accounts",
      "Work with operations to deliver on promises",
    ],
  },
  {
    id: "customer-support",
    title: "Customer Support Associate (WhatsApp)",
    department: "Support",
    location: "Dwarka, New Delhi",
    tag: "Support",
    description:
      "Be the friendly, fast voice customers reach on WhatsApp and calls — turning questions into confident bookings.",
    responsibilities: [
      "Respond to enquiries on WhatsApp, email and phone",
      "Capture order and pickup details accurately",
      "Follow up so no customer is left waiting",
    ],
  },
  {
    id: "marketing-manager",
    title: "Performance Marketing Manager",
    department: "Marketing",
    location: "Dwarka / Hybrid",
    tag: "Marketing",
    description:
      "Run paid campaigns on Meta and Google that reach the diaspora and businesses abroad — and turn clicks into enquiries.",
    responsibilities: [
      "Plan and optimise Meta & Google ad campaigns",
      "Own budgets, targeting and reporting",
      "Work with creative on landing pages and ads",
    ],
  },
  {
    id: "warehouse-coordinator",
    title: "Pickup & Warehouse Coordinator",
    department: "Operations",
    location: "Delhi NCR",
    tag: "Operations",
    description:
      "Keep goods moving on the ground — organising pickups across North India and prepping consignments for dispatch.",
    responsibilities: [
      "Schedule and verify pickups",
      "Inspect, weigh and pack consignments",
      "Maintain accurate inventory records",
    ],
  },
];

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Apply",
    description: "Send your CV for a role — or speculatively if none fits yet.",
  },
  {
    number: "02",
    title: "Screening Call",
    description:
      "A short chat to understand your experience and what you're after.",
  },
  {
    number: "03",
    title: "Interview",
    description: "Meet the team you'd work with and dig into the role.",
  },
  {
    number: "04",
    title: "Offer & Onboarding",
    description: "We make it official and get you set up to ship from day one.",
  },
];

export default function CareerPage(): React.ReactElement {
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
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`career-wrapper ${geistSans.variable}`}>
      <Header />

      <style jsx>{`
        .career-wrapper {
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

        .career-wrapper h1,
        .career-wrapper h2,
        .career-wrapper h3 {
          font-family: var(--display);
          line-height: 1.04;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }

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
        .career-hero {
          background:
            radial-gradient(
              80% 120% at 88% -20%,
              rgba(242, 122, 26, 0.16),
              transparent 60%
            ),
            var(--paper);
          padding: 64px 0 56px;
          position: relative;
          overflow: hidden;
        }
        .career-hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.9fr;
          gap: 48px;
          align-items: center;
        }
        .career-hero h1 {
          font-size: clamp(2.5rem, 6vw, 4.4rem);
          font-weight: 800;
          margin: 14px 0 18px;
          letter-spacing: -0.03em;
        }
        .career-hero h1 .highlight {
          color: var(--accent-deep);
        }
        .career-hero .subtitle {
          font-size: 1.16rem;
          color: var(--muted);
          max-width: 46ch;
        }
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--body);
          font-weight: 700;
          font-size: 1rem;
          padding: 14px 24px;
          border-radius: 100px;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.18s ease;
          text-decoration: none;
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
        }
        .btn-primary:hover {
          background: var(--accent-deep);
          color: #fff;
        }
        .btn-ghost {
          background: transparent;
          color: var(--ink);
          border-color: var(--line);
        }
        .btn-ghost:hover {
          border-color: var(--ink);
        }

        /* Hero stats card */
        .hero-stats {
          background: var(--panel);
          color: #eaf0f4;
          border-radius: 22px;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }
        .hero-stats::after {
          content: "";
          position: absolute;
          right: -40px;
          bottom: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(242, 122, 26, 0.4),
            transparent 70%
          );
          pointer-events: none;
        }
        .hero-stats h3 {
          font-size: 1.3rem;
          margin-bottom: 18px;
          color: #fff;
          position: relative;
          z-index: 2;
        }
        .stat-item {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 2;
        }
        .stat-item:last-child {
          border-bottom: 0;
        }
        .stat-item .value {
          font-family: var(--display);
          font-size: 1.9rem;
          color: var(--accent);
          min-width: 108px;
        }
        .stat-item .label {
          color: #c4cfd7;
          font-size: 0.95rem;
        }

        @media (max-width: 860px) {
          .career-hero {
            padding: 44px 0 40px;
          }
          .career-hero-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Sections */
        .section {
          padding: 64px 0;
        }
        .section-head {
          max-width: 640px;
          margin-bottom: 38px;
        }
        .section-head h2 {
          font-size: clamp(2rem, 4.4vw, 3rem);
          font-weight: 800;
          margin-top: 8px;
          letter-spacing: -0.02em;
        }
        .section-head p {
          color: var(--muted);
          font-size: 1.08rem;
          margin-top: 10px;
        }

        /* Values grid */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .value-card {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -20px rgba(15, 30, 46, 0.3);
        }
        .value-card .icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--accent-soft);
          display: grid;
          place-items: center;
          font-size: 1.4rem;
          margin-bottom: 16px;
        }
        .value-card h3 {
          font-size: 1.16rem;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .value-card p {
          color: var(--muted);
          font-size: 0.94rem;
        }

        @media (max-width: 860px) {
          .values-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Roles section (dark) */
        .roles-section {
          background: linear-gradient(180deg, #0d1527, #142838);
        }
        .roles-section .section-head h2,
        .roles-section .section-head p {
          color: #eaf0f4;
        }
        .roles-section .section-head p {
          color: #aebcc7;
        }

        .role-accordion {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: var(--radius);
          margin-bottom: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .role-accordion:hover {
          border-color: rgba(242, 122, 26, 0.3);
        }
        .role-accordion summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 22px;
          color: #eef3f7;
          user-select: none;
        }
        .role-accordion summary::-webkit-details-marker {
          display: none;
        }
        .role-accordion .role-title {
          flex: 1;
        }
        .role-accordion .role-title b {
          font-family: var(--display);
          font-size: 1.22rem;
          font-weight: 700;
          display: block;
        }
        .role-accordion .role-title span {
          color: #9fb0bb;
          font-size: 0.88rem;
        }
        .role-accordion .role-tag {
          background: rgba(242, 122, 26, 0.16);
          color: var(--accent);
          font-size: 0.74rem;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: 100px;
          white-space: nowrap;
          letter-spacing: 0.04em;
        }
        .role-accordion .chevron {
          color: var(--accent);
          font-size: 1.5rem;
          transition: transform 0.25s ease;
          flex: none;
        }
        .role-accordion[open] .chevron {
          transform: rotate(45deg);
        }
        .role-accordion .role-body {
          padding: 0 22px 22px 22px;
          color: #bcc9d2;
          font-size: 0.96rem;
        }
        .role-accordion .role-body ul {
          margin: 6px 0 18px 18px;
          list-style-type: disc;
        }
        .role-accordion .role-body li {
          margin: 4px 0;
        }
        .role-accordion .apply-btn {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          background: var(--accent);
          color: #fff;
          font-weight: 700;
          padding: 11px 20px;
          border-radius: 100px;
          font-size: 0.92rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .role-accordion .apply-btn:hover {
          background: var(--accent-deep);
        }

        /* Steps */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .step-card {
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px;
          position: relative;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -20px rgba(15, 30, 46, 0.3);
        }
        .step-card .step-number {
          font-family: var(--display);
          font-size: 1rem;
          font-weight: 800;
          color: var(--accent-deep);
          border: 2px solid var(--accent);
          border-radius: 9px;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          margin-bottom: 16px;
        }
        .step-card h3 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }
        .step-card p {
          color: var(--muted);
          font-size: 0.92rem;
        }

        @media (max-width: 860px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }

        /* CTA band */
        .cta-band {
          background: var(--accent);
          color: #fff;
          border-radius: 24px;
          padding: 46px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-band h2 {
          font-size: clamp(1.7rem, 4vw, 2.6rem);
          font-weight: 800;
          margin-bottom: 10px;
        }
        .cta-band p {
          font-size: 1.08rem;
          max-width: 48ch;
          margin: 0 auto 24px;
          color: #f3f4f6;
        }
        .cta-band .btn-primary {
          background: var(--panel);
          color: #fff;
        }
        .cta-band .btn-primary:hover {
          background: #000;
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

      <div className="flex-1">
        {/* HERO */}
        <header className="career-hero">
          <div className="wrap">
            <div className="career-hero-grid">
              <div>
                <div className="route-indicator">
                  <span className="dot"></span>
                  <span className="line"></span>
                  <span className="plane">✈</span>
                </div>
                <span className="eyebrow">Careers at Manvi</span>
                <h1>
                  Help Us Bridge <span className="highlight">Distances.</span>
                </h1>
                <p className="subtitle">
                  Behind every parcel is a family waiting on the other side of
                  the world. Join the team that gets it there — across the USA,
                  UK, Canada, Europe and Australia.
                </p>
                <div className="hero-buttons">
                  <a href="#openings" className="btn btn-primary">
                    View Open Roles
                  </a>
                  <a
                    href="mailto:careers@manvicourier.com?subject=Job%20Application%20%E2%80%94%20Manvi%20International"
                    className="btn btn-ghost"
                  >
                    Email Your CV
                  </a>
                </div>
              </div>
              <aside className="hero-stats">
                <h3>A growing network.</h3>
                {STATS.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="value">{stat.value}</span>
                    <span className="label">{stat.label}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </header>

        {/* VALUES */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="route-indicator">
                <span className="dot"></span>
                <span className="line"></span>
                <span className="plane">✈</span>
              </div>
              <span className="eyebrow">Why Manvi</span>
              <h2>Work That Actually Moves.</h2>
              <p>
                We're a logistics company built on precision and care. Here's
                what it feels like on the inside.
              </p>
            </div>
            <div className="values-grid">
              {VALUES.map((value, index) => (
                <div key={index} className="value-card reveal">
                  <div className="icon-wrap">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section className="section roles-section" id="openings">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="route-indicator">
                <span className="dot"></span>
                <span className="line"></span>
                <span className="plane">✈</span>
              </div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                Open positions
              </span>
              <h2>Find Your Place In The Network.</h2>
              <p>
                All roles are based at our Dwarka, New Delhi office unless
                noted. Tap a role to see the details and apply.
              </p>
            </div>

            {ROLES.map((role) => (
              <details key={role.id} className="role-accordion reveal">
                <summary>
                  <div className="role-title">
                    <b>{role.title}</b>
                    <span>{role.location}</span>
                  </div>
                  <span className="role-tag">{role.tag}</span>
                  <span className="chevron">+</span>
                </summary>
                <div className="role-body">
                  <p>{role.description}</p>
                  <ul>
                    {role.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:careers@manvicourier.com?subject=Application%20%E2%80%94%20${encodeURIComponent(role.title)}`}
                    className="apply-btn"
                  >
                    Apply for this role →
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* HOW WE HIRE */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="route-indicator">
                <span className="dot"></span>
                <span className="line"></span>
                <span className="plane">✈</span>
              </div>
              <span className="eyebrow">How we hire</span>
              <h2>A Clear Route To Joining Us.</h2>
              <p>
                No black holes. Four simple steps, and we keep you posted at
                each one.
              </p>
            </div>
            <div className="steps-grid">
              {STEPS.map((step, index) => (
                <div key={index} className="step-card reveal">
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="cta-band reveal">
              <h2>Don't See Your Role?</h2>
              <p>
                We're always looking for sharp people who care about getting
                things where they need to be. Tell us how you'd help.
              </p>
              <a
                href="mailto:careers@manvicourier.com?subject=Speculative%20Application%20%E2%80%94%20Manvi%20International"
                className="btn btn-primary"
              >
                Send Your CV Anyway
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
