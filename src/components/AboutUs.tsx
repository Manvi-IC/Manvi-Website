"use client";
import { useState } from "react";

// ── Icon helpers ────────────────────────────────────────────────────
const OrangeCircleIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0">
    {children}
  </span>
);

// ── Banner ──────────────────────────────────────────────────────────
function AboutBanner() {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-end"
      style={{
        width: "100%",
        maxWidth: 1239,
        height: "clamp(120px, 25vw, 200px)",
        borderRadius: 16,
        padding: "20px 24px",
        margin: "0 auto",
        backgroundImage: `url('/banner.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(39, 40, 53, 0) 0%, #272835 84.78%)",
          borderRadius: 16,
        }}
      />
      <div className="relative z-10 text-right">
        <h1 className="font-extrabold text-white tracking-wide text-2xl sm:text-3xl">
          About Us
        </h1>
      </div>
    </div>
  );
}

// ── Sidebar nav items ───────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "vision", label: "Our Vision" },
  { id: "mission", label: "Our Mission" },
  { id: "edge", label: "The Manvi Edge" },
  { id: "features", label: "Key Features" },
  { id: "performance", label: "Our Performance" },
  { id: "claim", label: "Refund & Loss Claim Policy" },
];

// ── Section card ────────────────────────────────────────────────────
function SectionCard({
  id,
  icon,
  title,
  image,
  children,
}: {
  id: string;
  icon?: string;
  title: string;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="bg-[#F5F5F7] border border-slate-100 scroll-mt-24 w-full"
      style={{
        borderRadius: 12,
        padding: "20px 20px",
        gap: 12,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
        ) : (
          <OrangeCircleIcon>{icon}</OrangeCircleIcon>
        )}
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#272835]">
          {title}
        </h2>
      </div>
      <div className="text-[14px] text-[#727C88] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ── Individual Nav Card Component ──────────────────────────────────
function NavCard({
  item,
  isActive,
  onClick,
}: {
  item: { id: string; label: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
        isActive
          ? "bg-white border-[#f27a1a] shadow-sm"
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
      }`}
    >
      <OrangeCircleIcon>✦</OrangeCircleIcon>
      <span
        className={`text-sm font-semibold text-left ${
          isActive ? "text-[#f27a1a]" : "text-slate-700"
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}

// ── Main Component ──────────────────────────────────────────────────
export default function AboutUs() {
  const [active, setActive] = useState("vision");

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#0f172a] antialiased">
      {/* ── Banner ── */}
      <div className="px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
        <AboutBanner />
      </div>

      {/* ── Body ── */}
      {/*
        Mobile  (<lg): single column, sidebar stacks on top, no sticky
        Desktop (lg+): two columns, sidebar sticky
      */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-10 sm:pb-16 flex flex-col lg:flex-row lg:items-start lg:justify-center gap-5 sm:gap-8">
        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-[42%] lg:shrink-0 lg:sticky lg:top-6 flex flex-col gap-4">
          {/* Who Are We card */}
          <div
            className="bg-[#F5F5F7] border border-slate-100 w-full"
            style={{
              borderRadius: 12,
              padding: "24px 20px",
              boxShadow: "-2px 0px 12px 0px #24242740",
            }}
          >
            <h3 className="text-2xl sm:text-[36px] font-extrabold text-[#272835] mb-2">
              Who Are We?
            </h3>
            <p className="text-[14px] text-[#727C88] leading-relaxed">
              Manvi International Courier Is A Trusted Logistics And Courier
              Service Provider Committed To Delivering Parcels, Documents, And
              Commercial Shipments Safely, Swiftly, And Cost-Effectively. With A
              Strong Operational Network And Experienced Professionals, We
              Specialise In International Courier Solutions.
            </p>

            {/* Nav Cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
              {NAV_ITEMS.map((item) => (
                <NavCard
                  key={item.id}
                  item={item}
                  isActive={active === item.id}
                  onClick={() => scrollTo(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Ready to Ship card */}
          <div
            className="bg-[#F5F5F7] border border-slate-100 w-full"
            style={{
              borderRadius: 12,
              padding: "24px 20px",
              boxShadow: "-2px 0px 12px 0px #24242740",
            }}
          >
            <p className="text-2xl sm:text-[36px] text-[#FF7F00] font-bold uppercase tracking-wider mb-1">
              Ready To Ship?
            </p>
            <p className="text-[14px] text-[#727C88] leading-relaxed mb-4">
              Experience The Difference Of A Courier Service That Cares. Join
              The Manvi International Family Today.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#F5F5F7] text-[#FF7F00] text-[15px] font-bold px-4 py-2 rounded-md border border-[#FF7F00] hover:bg-[#FF7F00] hover:text-white transition-colors">
              Contact Us ↗
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="w-full lg:w-[58%] flex flex-col gap-4 sm:gap-5 min-w-0">
          <SectionCard id="vision" title="Our Vision" image="/our-vision.png">
            <p>
              At Manvi International, We Believe That Distance Should Never Be A
              Barrier To Emotions. Based In The Heart Of Delhi, We Specialise In
              Seamless International Courier Services That Bridge The Gap
              Between India And The Rest Of The World. Whether It&apos;s A
              Festive Gift Or Critical Business Documents, We Deliver More Than
              Just Packages; We Deliver Peace Of Mind.
            </p>
          </SectionCard>

          <SectionCard
            id="mission"
            title="Our Mission"
            image="/our-mission.png"
          >
            <ul className="list-disc pl-5 space-y-1">
              <li>
                To Eliminate Shipment Delays Or Losses From Our Customers Minds
              </li>
              <li>To Provide Transparent Pricing And Real-Time Tracking</li>
              <li>To Build Life-Long Relationships With Our Customers</li>
            </ul>
          </SectionCard>

          <SectionCard id="edge" title="The Manvi Edge" image="/edge.png">
            <p className="mb-3">
              We Don&apos;t Just Ship, We Strategise. By Integrating World-Class
              Technology With A Deep Understanding Of Global Logistics, We
              Ensure Your Shipment Is Handled With The Highest Standards Of
              Safety And Speed.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Global Reach, Local Roots:",
                  body: "From Our Delhi Headquarters, We Reach Over 225+ Countries, Including The USA, UK, Canada, And Australia.",
                },
                {
                  title: "Tier-1 Partnerships:",
                  body: "We Leverage The Global Infrastructure Of Industry Leaders Like DHL, FedEx, And UPS To Offer You Premium Service At Competitive Rates.",
                },
                {
                  title: "Real-Time Transparency:",
                  body: "Our Advanced Tracking Systems Ensure You Know Exactly Where Your Shipment Is, From Our Doorstep To Their Destination.",
                },
                {
                  title: "Customer-Centric Ethics:",
                  body: "Our Operations Are Guided By A Rigorous Refund And Loss Claim Policy, Ensuring That Your Investment Is Always Protected.",
                },
                {
                  title: "Reliability:",
                  body: "We Do What We Say, Every Timeline We Provide Is Backed By Data And Commitment.",
                },
                {
                  title: "Integrity:",
                  body: "Transparent Pricing With No Hidden Costs. What You See Is What You Pay.",
                },
                {
                  title: "Speed:",
                  body: "In A Fast-Moving World, We Prioritise Express Routes To Ensure Your Packages Arrive Ahead Of The Deadline.",
                },
              ].map(({ title, body }) => (
                <div key={title}>
                  <span className="font-bold text-[#272835]">{title}</span>{" "}
                  {body}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[#727C88] text-xs">
              What Started As A Vision To Simplify International Shipping For
              The Indian Diaspora Has Grown Into A Full-Scale Logistics
              Powerhouse. Today, Manvi International Is The Preferred Partner
              For Thousands Of Families And Businesses Who Value Security As
              Much As Speed.
            </p>
          </SectionCard>

          <SectionCard id="features" title="Key Features" image="/edge.png">
            <ul className="list-disc pl-5 space-y-1">
              <li>Customs Documentation Support</li>
              <li>International Tracking At Every Stage</li>
              <li>Competitive International Rates</li>
            </ul>
          </SectionCard>

          <SectionCard
            id="performance"
            title="Our Performance"
            image="/edge.png"
          >
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>98% Successful Delivery Rate</li>
              <li>Thousands Of Shipments Completed Successfully</li>
              <li>Multiple International Destinations Served</li>
              <li>Strong Repeat Customer Base</li>
            </ul>
            <p className="text-[#727C88] text-xs">
              Our Performance Is Driven By Disciplined Operations, Trained
              Staff, And Reliable Logistics Partners.
            </p>
          </SectionCard>

          <SectionCard
            id="claim"
            image="/edge.png"
            title="Refund & Loss Claim Policy"
          >
            <p className="mb-3">
              At Manvi International, Your Investment Is Always Protected. Our
              rigorous claim policy ensures that any damage or loss is handled
              swiftly and fairly.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Claims Must Be Raised Within 7 Days Of Delivery</li>
              <li>Full Documentation Required For Processing</li>
              <li>Refunds Processed Within 10–14 Business Days</li>
              <li>Dedicated Support Team For Every Claim</li>
            </ul>
          </SectionCard>
        </main>
      </div>
    </div>
  );
}
