"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MapPin, ArrowUpRight, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { checkZipcodeAction } from "./actions";

interface ZipItem {
  zip: string;
  days: string;
  highlighted?: boolean;
}

interface CityGroup {
  city: string;
  items: ZipItem[];
}

const initialCities: CityGroup[] = [
  {
    city: "New York, NY",
    items: [
      { zip: "10001", days: "6-9 Business Days" },
      { zip: "10002", days: "6-9 Business Days" },
      { zip: "10001", days: "6-9 Business Days" },
      { zip: "10001", days: "6-9 Business Days" },
    ],
  },
  {
    city: "Los Angeles, CA",
    items: [
      { zip: "90001", days: "7-11 Business Days" },
      { zip: "90002", days: "7-11 Business Days" },
      { zip: "90002", days: "6-10 Business Days" },
      { zip: "90002", days: "7-11 Business Days" },
    ],
  },
];

export default function ZipcodePage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [cities, setCities] = useState<CityGroup[]>(initialCities);

  // Detailed success state variables
  const [matchedCountry, setMatchedCountry] = useState("");
  const [matchedPostcode, setMatchedPostcode] = useState("");
  const [matchedDeliveryTime, setMatchedDeliveryTime] = useState("");
  const [matchedIsRemote, setMatchedIsRemote] = useState(false);
  const [matchedDetails, setMatchedDetails] = useState("");
  const [matchedNotes, setMatchedNotes] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      setStatus("idle");
      setCities(initialCities);
      return;
    }

    try {
      const result = await checkZipcodeAction(cleanQuery);
      
      if (result.status === "success") {
        setStatus("success");
        setMatchedCountry(result.country || "");
        setMatchedPostcode(result.postcode || cleanQuery.toUpperCase());
        setMatchedDeliveryTime(result.deliveryTime || "Serviceable");
        setMatchedIsRemote(!!result.isRemote);
        setMatchedDetails(result.details || "");
        setMatchedNotes(result.notes || "");
        
        if (result.matches && result.matches.length > 0) {
          setCities([
            {
              city: `Matches for "${cleanQuery}"`,
              items: result.matches.map(m => ({
                zip: m.zip,
                days: m.days,
                highlighted: true
              }))
            }
          ]);
        } else {
          setCities([
            {
              city: result.country || "Search Match",
              items: [
                {
                  zip: result.postcode || cleanQuery.toUpperCase(),
                  days: result.deliveryTime || "Serviceable",
                  highlighted: true
                }
              ]
            },
            ...initialCities
          ]);
        }
      } else {
        setStatus("fail");
        setCities(initialCities);
      }
    } catch (err) {
      console.error("Error validating zipcode:", err);
      setStatus("fail");
      setCities(initialCities);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      <Header />

      {/* Top Banner Section */}
      <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
              Serviceable Zipcode
            </h1>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Check Availability */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                  Check Delivery<br />Availability In Your Area
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  Enter Your City Or Zip Code Below To Instantly Check If We Deliver To Your Location.
                </p>
              </div>

              <form onSubmit={handleCheck} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter City Or Pincode"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-white text-[#333] text-[14px] font-medium rounded-xl px-5 py-4 focus:outline-none placeholder:text-gray-400 border border-gray-200 shadow-sm w-full"
                />
                <button
                  type="submit"
                  className="bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-[14px] py-4 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  Check Availability
                </button>
              </form>

              {/* Status Alert Cards */}
              {status === "success" && (
                <div className="bg-[#ecfdf5] border border-[#10b981] rounded-2xl p-5 flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#059669] font-extrabold text-[14px]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Great News! We Serve Your Area</span>
                  </div>
                  
                  <div className="text-[13px] text-gray-600 font-semibold pl-7 flex flex-col gap-1.5 border-t border-emerald-100/50 pt-2.5">
                    <div><span className="text-gray-400">Country:</span> {matchedCountry}</div>
                    {matchedPostcode && <div><span className="text-gray-400">Postcode/Area:</span> {matchedPostcode}</div>}
                    {matchedDeliveryTime && <div><span className="text-gray-400">Est. Delivery:</span> {matchedDeliveryTime}</div>}
                    <div><span className="text-gray-400">Zone Type:</span> {matchedIsRemote ? "Remote Area (Surcharges may apply)" : "Standard Zone"}</div>
                    {matchedDetails && <div className="text-xs text-gray-500 italic mt-1 font-medium">{matchedDetails}</div>}
                    {matchedNotes && <div className="text-xs text-gray-500 bg-emerald-50/50 p-2.5 rounded-lg mt-1 font-medium leading-relaxed">{matchedNotes}</div>}
                  </div>
                </div>
              )}

              {status === "fail" && (
                <div className="bg-[#fef2f2] border border-[#ef4444] rounded-2xl p-5 flex flex-col gap-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#dc2626] font-extrabold text-[14px]">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>We&apos;re Not There Yet</span>
                  </div>
                  <span className="text-[13px] text-gray-500 font-semibold pl-7">But Don&apos;t Worry... We&apos;re Expanding Soon!</span>
                </div>
              )}
            </div>

            {/* Card 2: Need Assistance */}
            <div className="bg-[#eef0f5] rounded-4xl p-8 lg:p-10 shadow-sm border border-gray-200/50 flex flex-col items-start gap-5">
              <h3 className="text-[28px] md:text-[32px] font-extrabold text-[#f27a1a] tracking-tight leading-tight">
                Need Assistance With<br />Your ZIP Code?
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                Not Sure About Your PIN Code? Enter Your City Name Instead.
              </p>
              <a
                href="/#contact"
                className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2"
              >
                Contact Support <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>

          </div>

          {/* Right Column List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {cities.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-4">
                
                {/* City Heading Row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#f27a1a]" />
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-extrabold text-[#1c1f2e]">
                    {group.city}
                  </h3>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3.5">
                  {group.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className={`flex justify-between items-center px-6 py-4.5 rounded-2xl border transition-all ${
                        item.highlighted
                          ? "bg-[#fff7ed] border-[#fed7aa] shadow-sm"
                          : "bg-white border-gray-100 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#f27a1a] shrink-0" />
                        <span className="text-[15px] font-extrabold text-[#1c1f2e]">
                          {item.zip}
                        </span>
                      </div>
                      <span className="text-[13.5px] text-gray-400 font-bold">
                        {item.days}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
