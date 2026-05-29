"use client";
import { useState } from "react";
import { ArrowUpRight, Users, Package, Headphones, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("");
  const [content, setContent] = useState("");
  const [quote, setQuote] = useState<{ price: number; days: number } | null>(
    null,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(weight) || 1;
    const svcMul: Record<string, number> = {
      document: 0.85,
      parcel: 1.1,
      express: 1.4,
    };
    const price = Math.round((w * 480 + 300) * (svcMul[service] ?? 1));
    const days = service === "express" ? 3 : 5;
    setQuote({ price, days });
  };

  return (
    <section className="max-w-425 w-full mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Orange Form Card */}
        <div className="bg-[#f27a1a] rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-110 shadow-xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-[32px] sm:text-[36px] md:text-[42px] font-extrabold text-white leading-[1.1] tracking-tight uppercase">
              CONNECTING CONTINENTS,
              <br />
              DELIVERING TRUST.
            </h1>
            <p className="text-white/80 text-[13px] leading-relaxed max-w-md">
              Send documents, parcels, food items, gifts, or commercial
              shipments worldwide with confidence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Pick Up Location"
                aria-label="Pick Up Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Drop Location"
                aria-label="Drop Location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Weight (Kg)"
                aria-label="Weight in Kilograms"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0.1"
                step="0.1"
                className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
              />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                aria-label="Select Service Type"
                className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none appearance-none"
              >
                <option value="">Service</option>
                <option value="document">Document Express</option>
                <option value="parcel">Parcel Shipping</option>
                <option value="express">Cargo Express</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <input
                type="text"
                placeholder="Content"
                aria-label="Package Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-white text-[#333] text-[13px] font-medium rounded-xl px-4 py-3 focus:outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-[#0b1220] hover:bg-slate-800 text-white font-bold text-[13px] py-3 px-6 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Get Quote <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </form>

          {quote && (
            <div className="mt-4 p-4 bg-[#0b1220]/90 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-[#f27a1a] font-bold uppercase tracking-wider block">
                    Estimated Cost
                  </span>
                  <span className="text-lg font-extrabold text-white">
                    ₹{quote.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-400 block">
                    Est. Delivery
                  </span>
                  <span className="text-sm font-bold text-white">
                    {quote.days} Days
                  </span>
                </div>
                <button
                  onClick={() => setQuote(null)}
                  className="text-zinc-500 hover:text-white text-xs ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Dark Image Card */}
        <div className="relative rounded-[16px] min-h-[485px] lg:h-[485px] flex flex-col justify-between">
          {/* Background image + overlays */}
          <div className="absolute inset-0 rounded-[16px] rounded-bl-[18px] overflow-hidden">
            <Image
              src="/hero-right.jpg"
              alt="Manvi Legacy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
            {/* Solid 50% black overlay */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Directional gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 54.84%)",
              }}
            />
          </div>

          {/* Top content */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-3 ">
            <span className="text-[11px] font-bold tracking-wider bg-white/15 text-white/90 border border-white/20 w-fit px-3 py-1 rounded-full">
              The Manvi Legacy
            </span>
            <h2 className="text-[30px] sm:text-[34px] md:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight mt-2">
              We Don&apos;t Just Move Parcels;
              <br />
              We <span className="text-[#f27a1a]">Bridge Distances.</span>
            </h2>
          </div>

          {/* Bottom row */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col  sm:flex-row items-end justify-between gap-6 sm:gap-0">
            {/* Cutout corner circle */}
            <div className="absolute -bottom-4 -left-4 w-34 h-34 sm:w-36 sm:h-36 bg-[#f8f9fa] rounded-full  flex items-center justify-center pointer-events-none z-20">
              {/* Orange spinning WhatsApp circle */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#f27a1a] rounded-full relative flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-300 z-50">
                {/* WhatsApp icon */}
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white z-10 relative"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>

                {/* Spinning circular text */}
                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                  viewBox="0 0 100 100"
                  aria-hidden
                >
                  <path
                    id="heroCircleText"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text>
                    <textPath
                      href="#heroCircleText"
                      startOffset="0"
                      style={{
                        fontSize: "11px",
                        fill: "white",
                        fontWeight: "bold",
                        letterSpacing: "0.12em",
                      }}
                      textLength="239"
                    >
                      •Whatsapp Us •Whatsapp Us •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Spacer matching circle width so dots/button stay right-aligned */}
            <div className="w-24 sm:w-32 flex-shrink-0" />

            {/* Carousel dots + Read More */}
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#f27a1a]" />
                <div className="w-2 h-2 rounded-full bg-[#f27a1a]" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <button className="border border-white/50 text-white text-[12px] font-semibold px-5 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
        {[
          {
            icon: <MapPin className="w-4 h-4" />,
            label: "Serviceable Zipcodes",
            href: "/zipcode",
          },
          {
            icon: <Package className="w-4 h-4" />,
            label: "Track Shipment",
            href: "/track",
          },
          {
            icon: <Users className="w-4 h-4" />,
            label: "Our Services",
            href: "/services",
          },
          {
            icon: <Headphones className="w-4 h-4" />,
            label: "Contact Us",
            href: "/contact",
          },
        ].map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex items-center justify-center gap-2 sm:gap-3 bg-[#0b1220] hover:bg-[#f27a1a] rounded-[14px] sm:rounded-2xl text-[12px] sm:text-[14px] font-semibold text-white py-3 sm:py-4 transition-all text-center px-2"
          >
            {tab.icon} <span className="truncate">{tab.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
