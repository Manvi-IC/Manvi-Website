"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Quote {
  price: number;
  days: number;
}

export default function Hero() {
  const { t } = useLanguage();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("");
  const [content, setContent] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(weight) || 1;
    const svcMul: Record<string, number> = { document: 0.85, parcel: 1.1, express: 1.4 };
    const price = Math.round((w * 480 + 300) * (svcMul[service] ?? 1));
    const days = service === "express" ? 3 : 5;
    setQuote({ price, days });
  };

  return (
    <section 
      className="w-full mx-auto font-sans"
      style={{
        maxWidth: "1700px",
        paddingTop: "24px",
        paddingBottom: "24px",
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
    >
      {/* Hero Card — exact dimensions: width 100%, height 533 */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          width: "100%",
          height: "533px",
          borderRadius: "28px",
        }}
      >
        {/* Background image - full coverage */}
        <Image
          src="/hero-right.jpg"
          alt="Manvi Legacy Courier"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Overlay layer 1: solid black with opacity */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.5)" }}
        />

        {/* Overlay layer 2: directional gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 54.84%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10 lg:p-12">
          {/* Top: badge + headline + subtext */}
          <div className="flex flex-col gap-4 max-w-2xl">
            {/* Badge */}
            <span
              className="text-[11px] font-bold tracking-widest text-white/90 w-fit px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              🌐 International Courier Service
            </span>

            {/* Headline */}
            <h1
              className="text-white font-extrabold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Your Parcel, Picked Up
              <br />
              In India —{" "}
              <span style={{ color: "#f27a1a" }}>Delivered To</span>
              <br />
              <span style={{ color: "#f27a1a" }}>Your Door Worldwide.</span>
            </h1>

            {/* Sub-text */}
            <p
              className="text-white/75 text-[14px] leading-relaxed max-w-lg"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
            >
              Documents, Gifts, Parcels, And Commercial Shipments To The USA,
              UK, Canada, Australia And Beyond. Doorstep Pickup. Customs
              Handled. Real-Time Tracking.
            </p>
          </div>

          {/* Bottom: CTAs + stats */}
          <div className="flex flex-col gap-5">
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Get Quote Button - Now links to /quote page */}
              <Link
                href="/quote"
                className="flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-full transition-all active:scale-95 no-underline"
                style={{
                  background: "#f27a1a",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 4px 18px rgba(242,122,26,0.45)",
                }}
              >
                Get Quote <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-[14px] px-5 py-3 rounded-full transition-all active:scale-95 no-underline"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  boxShadow: "0 4px 18px rgba(37,211,102,0.35)",
                }}
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="#f27a1a"
                      aria-hidden
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/80 text-[13px] font-medium">
                  Trusted By 10,000+ Families Worldwide
                </span>
              </div>
              <p
                className="text-[14px] font-extrabold"
                style={{ color: "#f27a1a" }}
              >
                50,000+ Shipments Delivered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Tabs - with bg color #FF7F00 */}
      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3" 
        style={{ 
          marginTop: "24px",
          gap: "24px"
        }}
      >
        {[
          { label: "Serviceable Zipcodes", href: "/zipcode", icon: "📍" },
          { label: "Track Shipment", href: "/track", icon: "📦" },
          { label: "Our Services", href: "/services", icon: "👥" },
          { label: "Contact Us", href: "/contact", icon: "🎧" },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex items-center justify-center gap-2 rounded-2xl text-[13px] font-semibold text-white py-4 transition-all text-center px-3 no-underline"
            style={{ background: "#FF7F00" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#e67200")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#FF7F00")
            }
          >
            <span>{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}