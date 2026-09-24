'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  ArrowRight, 
  Scale, 
  Box, 
  Clock, 
  TrendingDown, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Filter, 
  Search, 
  Printer, 
  Copy, 
  Check, 
  LogOut, 
  User, 
  Building, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { logoutAction } from '../../actions';

/* ── Destination Data ─────────────────────────────────────────────────────── */
interface Destination {
  label: string;
  value: string;
  requiresZip: boolean;
  requiresSubCountry: boolean;
  flag: string;
}

const DESTINATIONS: Destination[] = [
  { label: "United Kingdom", value: "UK", requiresZip: false, requiresSubCountry: false, flag: "🇬🇧" },
  { label: "Australia", value: "AUSTRALIA", requiresZip: true, requiresSubCountry: false, flag: "🇦🇺" },
  { label: "Canada", value: "CANADA", requiresZip: true, requiresSubCountry: false, flag: "🇨🇦" },
  { label: "Europe", value: "EUROPE", requiresZip: false, requiresSubCountry: true, flag: "🇪🇺" },
  { label: "International", value: "INTERNATIONAL", requiresZip: false, requiresSubCountry: true, flag: "🌍" },
];

const EUROPE_COUNTRIES = [
  "GERMANY", "FRANCE", "ITALY", "SPAIN", "NETHERLANDS", "BELGIUM", "AUSTRIA", 
  "SWITZERLAND", "POLAND", "SWEDEN", "IRELAND", "PORTUGAL", "DENMARK", 
  "CZECH REPUBLIC", "GREECE", "HUNGARY", "ROMANIA", "NORWAY", "FINLAND"
];

const INTERNATIONAL_COUNTRIES = [
  "USA", "UNITED ARAB EMIRATES", "SINGAPORE", "MALAYSIA", "SAUDI ARABIA", 
  "QATAR", "NEW ZEALAND", "HONG KONG", "THAILAND", "JAPAN", "INDONESIA", 
  "PHILIPPINES", "OMAN", "BAHRAIN", "KUWAIT", "SOUTH AFRICA", "NEPAL", "BANGLADESH"
];

/* ── Carrier Network Light Theme Configurations ───────────────────────────── */
interface NetworkMeta {
  name: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentBar: string;
  logoColor: string;
}

const NETWORK_METAS: Record<string, NetworkMeta> = {
  DHL: {
    name: "DHL Express",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-200",
    badgeText: "text-amber-800",
    accentBar: "bg-[#D40511]",
    logoColor: "#D40511"
  },
  FED: {
    name: "FedEx International",
    badgeBg: "bg-purple-50",
    badgeBorder: "border-purple-200",
    badgeText: "text-purple-800",
    accentBar: "bg-[#4D148C]",
    logoColor: "#4D148C"
  },
  UPS: {
    name: "UPS Worldwide",
    badgeBg: "bg-yellow-50",
    badgeBorder: "border-yellow-200",
    badgeText: "text-yellow-900",
    accentBar: "bg-[#351C15]",
    logoColor: "#351C15"
  },
  ARA: {
    name: "Aramex Priority",
    badgeBg: "bg-red-50",
    badgeBorder: "border-red-200",
    badgeText: "text-red-700",
    accentBar: "bg-[#E31837]",
    logoColor: "#E31837"
  },
  SELF: {
    name: "Manvi Direct Line",
    badgeBg: "bg-orange-50",
    badgeBorder: "border-orange-200",
    badgeText: "text-[#f27a1a]",
    accentBar: "bg-[#f27a1a]",
    logoColor: "#f27a1a"
  }
};

/* ── Shipping Restrictions / Guidelines ───────────────────────────────────── */
const SHIPPING_RESTRICTIONS: Record<string, { blocked: string[]; warning: string[]; allowed: string[]; note?: string }> = {
  DHL: {
    blocked: [
      "All medical tablets, syrups & remedies",
      "Herbal, Ayurvedic & Unani medications",
      "Pure Desi Ghee & butter products",
      "Cooking, edible, or hair oils",
      "Pickles (Achar) preserved in liquid oil",
      "Bullion, silver & precious metals",
      "Nutritional powders & protein supplements",
      "SD memory cards & flash storage"
    ],
    warning: [
      "Homemade Mithai & sweets (dry only)",
      "Beauty cosmetics & makeup creams",
      "Branded packaged food items",
      "Sealed dry spices & culinary masalas",
      "Electronics & battery-free gadgets"
    ],
    allowed: [
      "Garments, textiles & fashion apparel",
      "Personal items, gifts & books",
      "Turban materials & religious items",
      "Documents, certificates & contracts",
      "Mobile accessories & phone cases"
    ],
    note: "All edible items must carry manufacturer commercial ingredient labels."
  },
  UPS: {
    blocked: [
      "Any medicinal or pharmaceutical product",
      "Ayurvedic & herbal formulations",
      "Liquid oils, sprays & aerosols",
      "Pickles, dairy pastes & ghee",
      "Valuable jewelry & bullion",
      "Food articles of any kind"
    ],
    warning: [
      "Electronic goods (without lithium cells)",
      "Wooden crafts & decorative items",
      "Cosmetics (pressed powders only)",
      "Office stationery & brochures"
    ],
    allowed: [
      "Fabrics, clothing & suits",
      "Footwear & leather accessories",
      "Legal & corporate documentation",
      "Non-perishable personal effects"
    ],
    note: "UPS strictly restricts any ingestible food products from transit."
  },
  FED: {
    blocked: [
      "Liquid oils & greasy pastes",
      "Desi Ghee & dairy spreads",
      "Homemade pickled condiments",
      "Medicines & vitamin supplements",
      "Precious silver & coins",
      "Digital memory cards"
    ],
    warning: [
      "Commercial packaged eatables",
      "Dry powdered spice blends",
      "Solid cosmetics & soaps",
      "General electronics"
    ],
    allowed: [
      "Apparel, dresses & sarees",
      "Turban cloths & cultural accessories",
      "Leather goods & travel bags",
      "Phone covers & plastic items"
    ],
    note: "Commercial invoice with itemized values required for customs clearance."
  },
  SELF: {
    blocked: [
      "Hazmat & flammable substances",
      "Pressurized deodorants & gases",
      "Prohibited narcotics or weapons"
    ],
    warning: [
      "UK customs tariff applies on declared value > £135",
      "Commercial consignments require recipient tax ID"
    ],
    allowed: [
      "Personal clothes, blankets & luggage",
      "Homemade non-perishable traditional sweets",
      "Sealed branded snacks & namkeens",
      "Religious artifacts & turban items",
      "Door-to-door tracking with local courier handoff"
    ],
    note: "Manvi direct line offers the most flexible allowance for household & cultural packages."
  },
  ARA: {
    blocked: [
      "Alcohol & alcoholic beverages",
      "Animal fats & pork derivatives",
      "Precious gems & bullion",
      "Liquids exceeding 100ml"
    ],
    warning: [
      "Perfumes & fragrances (needs MSDS report)",
      "Electronics with enclosed batteries"
    ],
    allowed: [
      "Documents & commercial shipments",
      "Garments & readymade clothes",
      "Personal items & gifts"
    ],
    note: "Ideal choice for Middle East (UAE, Saudi Arabia, Qatar, Oman) destinations."
  }
};

interface Quote {
  service: string;
  network: string;
  chargeableWt: number;
  actualWt: number;
  volWt: number;
  zone: string;
  rateType: string;
  totalPrice: number;
  tat: string;
}

export default function ProposalPage() {
  /* ── Salesperson Identity ── */
  const [salesUser, setSalesUser] = useState<string>("sales@manvi");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin_user=([^;]*)/);
    if (match && match[1]) {
      setSalesUser(decodeURIComponent(match[1]));
    }
  }, []);

  /* ── Client Details Form State ── */
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [proposalRef, setProposalRef] = useState("");

  /* ── Package / Quote Form State (Clean Initial State, No Mock Defaults) ── */
  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");

  /* ── Quote Results State ── */
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  /* ── Comparison & Selection State ── */
  const [selectedServiceKeys, setSelectedServiceKeys] = useState<string[]>([]);
  const [filterSort, setFilterSort] = useState<"cheapest" | "fastest" | "all">("cheapest");
  const [networkFilter, setNetworkFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  /* ── Derived Weights ── */
  const activeDestObj = useMemo(() => DESTINATIONS.find(d => d.value === destination), [destination]);
  const requiresZip = activeDestObj?.requiresZip ?? false;
  const requiresSubCountry = activeDestObj?.requiresSubCountry ?? false;
  const subCountryList = destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const volWtNumber = useMemo(() => {
    const l = parseFloat(length) || 0;
    const b = parseFloat(breadth) || 0;
    const h = parseFloat(height) || 0;
    if (l > 0 && b > 0 && h > 0) {
      return (l * b * h) / 5000;
    }
    return 0;
  }, [length, breadth, height]);

  const chargeableWtNumber = useMemo(() => {
    const act = parseFloat(actualWt) || 0;
    return Math.ceil(Math.max(act, volWtNumber));
  }, [actualWt, volWtNumber]);

  /* ── Helper to parse TAT days for sorting ── */
  const parseTatDays = (tat: string): number => {
    const match = tat.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 999;
  };

  /* ── Filtered & Sorted Quotes from live API ── */
  const displayedQuotes = useMemo(() => {
    let list = [...quotes];

    // Filter by network
    if (networkFilter !== "ALL") {
      list = list.filter(q => (q.network || "").toUpperCase() === networkFilter);
    }

    // Sort
    if (filterSort === "cheapest") {
      list.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (filterSort === "fastest") {
      list.sort((a, b) => parseTatDays(a.tat) - parseTatDays(b.tat));
    }

    return list;
  }, [quotes, networkFilter, filterSort]);

  /* ── Fetch Real Live Rates from Backend API ── */
  const fetchQuotes = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!destination) {
      setErrorMsg("Please select a destination country.");
      return;
    }
    if (!actualWt || parseFloat(actualWt) <= 0) {
      setErrorMsg("Please enter a valid package actual weight (kg).");
      return;
    }
    if (requiresZip && !zipcode.trim()) {
      setErrorMsg(`Zipcode/Postal code is required for ${activeDestObj?.label}.`);
      return;
    }
    if (requiresSubCountry && !zoningCountry) {
      setErrorMsg(`Please select a specific destination country in ${activeDestObj?.label}.`);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams({
        actualWt: actualWt.trim(),
        country: destination.trim(),
      });
      if (length) params.append("length", length.trim());
      if (breadth) params.append("breadth", breadth.trim());
      if (height) params.append("height", height.trim());
      if (zipcode) params.append("zipcode", zipcode.trim());
      if (zoningCountry) params.append("zoningCountry", zoningCountry.trim());

      const res = await fetch(`/api/rates/quote?${params.toString()}`, {
        headers: { "x-database": "manvi" },
      });

      const data = await res.json();

      if (data.success && data.quotes && data.quotes.length > 0) {
        setQuotes(data.quotes);
        const firstKey = `${data.quotes[0].service}__${data.quotes[0].rateType}`;
        setSelectedServiceKeys([firstKey]);
        setExpandedCard(firstKey);
      } else {
        setQuotes([]);
        setSelectedServiceKeys([]);
        setErrorMsg(data.message || "No courier rates found for this weight and destination combination.");
      }
    } catch (err: any) {
      console.error("Quote fetch error:", err);
      setErrorMsg(err.message || "Failed to retrieve rates from server.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Reset Form Handler ── */
  const resetForm = () => {
    setDestination("");
    setZoningCountry("");
    setZipcode("");
    setActualWt("");
    setLength("");
    setBreadth("");
    setHeight("");
    setQuotes([]);
    setSelectedServiceKeys([]);
    setErrorMsg("");
    setHasSearched(false);
  };

  /* ── Toggle Service Selection for Proposal ── */
  const toggleSelectService = (key: string) => {
    setSelectedServiceKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  /* ── Copy Proposal Summary to Clipboard ── */
  const copyProposalSummary = () => {
    const selectedQuotes = quotes.filter(q => selectedServiceKeys.includes(`${q.service}__${q.rateType}`));
    if (selectedQuotes.length === 0) return;

    const destName = zoningCountry ? `${zoningCountry} (${activeDestObj?.label})` : (activeDestObj?.label || destination);
    
    let text = `📦 *MANVI INTERNATIONAL COURIER — QUOTATION PROPOSAL*\n`;
    text += `Ref: ${proposalRef}\n`;
    if (clientName) text += `Client: ${clientName} ${clientCompany ? `(${clientCompany})` : ''}\n`;
    text += `Destination: ${destName} ${zipcode ? `[Zip: ${zipcode}]` : ''}\n`;
    text += `Weight: Actual ${actualWt} kg | Chargeable: ${chargeableWtNumber} kg\n`;
    if (volWtNumber > 0) text += `Dimensions: ${length}×${breadth}×${height} cm (Vol: ${volWtNumber.toFixed(2)} kg)\n`;
    text += `\n*COMPARED SERVICE OPTIONS:*\n`;

    selectedQuotes.forEach((q, idx) => {
      const meta = NETWORK_METAS[q.network] || { name: q.network };
      text += `\n${idx + 1}. *${q.service}* (${meta.name})\n`;
      text += `   • Total Rate: ₹${Math.round(q.totalPrice).toLocaleString('en-IN')} (GST Included)\n`;
      text += `   • Rate/kg: ₹${Math.round(q.totalPrice / (q.chargeableWt || 1)).toLocaleString('en-IN')} / kg\n`;
      text += `   • Estimated Delivery: ${q.tat}\n`;
    });

    text += `\n📞 Contact sales: +91 7070506070 | info@manvicourier.com\nVisit: manvicourier.com`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#f27a1a] selection:text-white">
      
      {/* ── TOP NAV BAR (WEBSITE LIGHT THEME) ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f27a1a] to-orange-400 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-lg tracking-wider">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#0D1527] text-lg tracking-tight">MANVI</span>
              <span className="text-[11px] bg-orange-50 text-[#f27a1a] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                PROPOSAL PORTAL
              </span>
            </div>
            <p className="text-[12px] text-slate-500 font-medium">International Courier Rate Calculator & Comparison</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <User size={14} className="text-[#f27a1a]" />
            <span className="text-slate-700 font-semibold">{salesUser}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ── SECTION 1: PROPOSAL CONFIGURATION & GET QUOTE CARD ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Card Sub-Header with Client Info */}
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-orange-100 text-[#f27a1a] rounded-lg">
                <SlidersHorizontal size={16} />
              </div>
              <h2 className="font-bold text-[#0D1527] text-base">Package & Shipment Parameters</h2>
            </div>
            
            {/* Proposal metadata inputs */}
            <div className="flex items-center flex-wrap gap-2.5">
              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs shadow-2xs">
                <span className="text-slate-400 mr-1.5 font-medium">Ref:</span>
                <input 
                  type="text" 
                  value={proposalRef} 
                  onChange={(e) => setProposalRef(e.target.value)}
                  className="bg-transparent text-slate-800 font-mono font-bold focus:outline-none w-28"
                  placeholder="Proposal ID"
                />
              </div>

              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs shadow-2xs">
                <User size={13} className="text-slate-400 mr-1.5" />
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none w-32 placeholder:text-slate-400"
                  placeholder="Client Name"
                />
              </div>

              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs shadow-2xs">
                <Building size={13} className="text-slate-400 mr-1.5" />
                <input 
                  type="text" 
                  value={clientCompany} 
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none w-32 placeholder:text-slate-400"
                  placeholder="Client Company"
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={fetchQuotes} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Destination Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#f27a1a]" />
                  Destination Region
                </label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setZoningCountry("");
                      setZipcode("");
                      setQuotes([]);
                      setHasSearched(false);
                    }}
                    className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Destination...</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.value} value={d.value} className="text-slate-900">
                        {d.flag} {d.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Sub-Country Selection (Europe or International) */}
              {requiresSubCountry && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span>🌍</span> Select Country
                  </label>
                  <div className="relative">
                    <select
                      value={zoningCountry}
                      onChange={(e) => setZoningCountry(e.target.value)}
                      required
                      className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-orange-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="text-slate-400">Choose country...</option>
                      {subCountryList.map((c) => (
                        <option key={c} value={c} className="text-slate-900">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Zipcode Field (Australia, Canada) */}
              {requiresZip && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span>📮</span> Postal / Zip Code <span className="text-[#f27a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                    placeholder={destination === "AUSTRALIA" ? "e.g. 2000, 3000" : "e.g. M5V, V6B"}
                    required
                    className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-orange-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white transition-colors placeholder:text-slate-400 font-mono"
                  />
                </div>
              )}

              {/* Actual Weight */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Scale size={14} className="text-[#f27a1a]" />
                  Actual Weight (kg) <span className="text-[#f27a1a]">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={actualWt}
                  onChange={(e) => setActualWt(e.target.value)}
                  placeholder="5.0"
                  required
                  className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white transition-colors placeholder:text-slate-400 font-mono"
                />
              </div>

              {/* Dimensions (L × B × H) */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Box size={14} className="text-[#f27a1a]" />
                  Dimensions (L × W × H in cm) <span className="text-[11px] text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="L (cm)"
                    className="bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white placeholder:text-slate-400 text-center font-mono"
                  />
                  <input
                    type="number"
                    step="0.5"
                    value={breadth}
                    onChange={(e) => setBreadth(e.target.value)}
                    placeholder="W (cm)"
                    className="bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white placeholder:text-slate-400 text-center font-mono"
                  />
                  <input
                    type="number"
                    step="0.5"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="H (cm)"
                    className="bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white placeholder:text-slate-400 text-center font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Summary Bar & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-100">
              
              {/* Quick Weight Chips & Volumetric/Chargeable Info */}
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <span className="text-slate-500 font-medium">Quick Wt:</span>
                {["1", "2", "5", "10", "15", "20"].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setActualWt(w)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                      actualWt === w
                        ? "bg-[#f27a1a] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {w}kg
                  </button>
                ))}

                <div className="ml-0 sm:ml-4 flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Volumetric Wt</span>
                    <span className="font-mono font-bold text-slate-800">{volWtNumber > 0 ? `${volWtNumber.toFixed(2)} kg` : '0 kg'}</span>
                  </div>
                  <div className="h-6 w-px bg-slate-200"></div>
                  <div>
                    <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider block">Chargeable Wt</span>
                    <span className="font-mono font-extrabold text-[#f27a1a] text-sm">{chargeableWtNumber} kg</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#f27a1a] hover:bg-[#db660c] disabled:opacity-50 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Calculating Rates...</span>
                    </>
                  ) : (
                    <>
                      <span>Calculate Rates</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                <ShieldAlert size={15} />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>
        </div>

        {/* ── INITIAL STATE (NO SEARCH PERFORMED YET) ── */}
        {!hasSearched && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#f27a1a] flex items-center justify-center mx-auto border border-orange-100">
              <Package size={28} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-bold text-slate-900">Live Rate Calculator Ready</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Select a destination region and enter package weight above, then click <strong className="text-[#f27a1a]">Calculate Rates</strong> to pull live courier quotes directly from the database.
              </p>
            </div>
          </div>
        )}

        {/* ── SECTION 2: COMPARISON TOOLBAR & STATS ── */}
        {quotes.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left: Summary Count */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0D1527] font-extrabold text-base">
                    {displayedQuotes.length} Available Services
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-mono font-medium px-2 py-0.5 rounded-md border border-slate-200">
                    {activeDestObj?.flag} {zoningCountry || activeDestObj?.label} • {chargeableWtNumber} kg
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Select and compare courier options below to include in client quotation.
                </p>
              </div>
            </div>

            {/* Right: Filters & View Switchers */}
            <div className="flex items-center flex-wrap gap-2.5">
              
              {/* Sort By Filter */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterSort("cheapest")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    filterSort === "cheapest" 
                      ? "bg-[#f27a1a] text-white shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <TrendingDown size={13} />
                  <span>Cheapest</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterSort("fastest")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    filterSort === "fastest" 
                      ? "bg-[#f27a1a] text-white shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Zap size={13} />
                  <span>Fastest</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterSort("all")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    filterSort === "all" 
                      ? "bg-[#f27a1a] text-white shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All
                </button>
              </div>

              {/* Carrier Network Filter */}
              <div className="relative">
                <select
                  value={networkFilter}
                  onChange={(e) => setNetworkFilter(e.target.value)}
                  className="bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-200 focus:outline-none appearance-none cursor-pointer pr-8"
                >
                  <option value="ALL">All Carriers</option>
                  <option value="SELF">Manvi Direct Line</option>
                  <option value="DHL">DHL Express</option>
                  <option value="FED">FedEx</option>
                  <option value="UPS">UPS</option>
                  <option value="ARA">Aramex</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "cards" ? "bg-white text-[#0D1527] shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
                  title="Card Comparison View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "table" ? "bg-white text-[#0D1527] shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
                  title="Table Comparison View"
                >
                  <TableIcon size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 3: EXPANDED SERVICE COMPARISON GRID (LIGHT THEME) ── */}
        {quotes.length > 0 && viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedQuotes.map((q) => {
              const serviceKey = `${q.service}__${q.rateType}`;
              const isSelected = selectedServiceKeys.includes(serviceKey);
              const meta = NETWORK_METAS[q.network] || {
                name: q.network,
                badgeBg: "bg-slate-100",
                badgeBorder: "border-slate-200",
                badgeText: "text-slate-700",
                accentBar: "bg-slate-400",
                logoColor: "#000000"
              };

              const restrictions = SHIPPING_RESTRICTIONS[q.network] || { blocked: [], warning: [], allowed: [] };
              const isExpanded = expandedCard === serviceKey;
              const ratePerKg = Math.round(q.totalPrice / (q.chargeableWt || 1));

              return (
                <div 
                  key={serviceKey}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col relative overflow-hidden group ${
                    isSelected 
                      ? 'border-[#f27a1a] shadow-lg shadow-orange-500/10 ring-2 ring-[#f27a1a]/30' 
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {/* Top Color Accent Line */}
                  <div className={`h-1.5 w-full ${meta.accentBar}`}></div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    {/* Header: Carrier Badge & Service Name */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}>
                          {meta.name}
                        </span>

                        <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded border border-slate-200">
                          Zone {q.zone} • {q.rateType === 'S' ? 'Slab' : 'Per-Kg'}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-[#0D1527] text-base leading-snug group-hover:text-[#f27a1a] transition-colors">
                        {q.service}
                      </h3>
                    </div>

                    {/* Price & Delivery Details Highlight */}
                    <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Total Price (GST Inc)</span>
                          <span className="text-2xl font-black text-[#f27a1a] tracking-tight">
                            ₹{Math.round(q.totalPrice).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Rate per kg</span>
                          <span className="font-mono font-bold text-slate-700 text-sm">
                            ₹{ratePerKg.toLocaleString('en-IN')}/kg
                          </span>
                        </div>
                      </div>

                      <div className="h-px bg-slate-200/80"></div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <Clock size={13} className="text-[#f27a1a]" />
                          <span>{q.tat}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          <span>Commercial Clearance</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-1 text-slate-600">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                        <span className="text-[10px] text-slate-400 block font-medium">Actual Weight</span>
                        <span className="font-mono font-bold text-slate-800">{q.actualWt} kg</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                        <span className="text-[10px] text-slate-400 block font-medium">Chargeable Weight</span>
                        <span className="font-mono font-bold text-orange-600">{q.chargeableWt} kg</span>
                      </div>
                    </div>

                    {/* Expandable Restrictions & Guidelines Accordion */}
                    <div className="border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => setExpandedCard(isExpanded ? null : serviceKey)}
                        className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 transition-colors py-1 cursor-pointer font-medium"
                      >
                        <span className="flex items-center gap-1.5">
                          <Info size={13} className="text-[#f27a1a]" />
                          {isExpanded ? "Hide Goods Policy & Notes" : "View Goods Allowed & Blocked"}
                        </span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 text-[11px]">
                          {/* Blocked */}
                          {restrictions.blocked.length > 0 && (
                            <div className="bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                              <span className="text-red-700 font-bold flex items-center gap-1 mb-1">
                                <ShieldAlert size={12} /> Strictly Blocked Items:
                              </span>
                              <ul className="text-slate-700 space-y-0.5 pl-4 list-disc marker:text-red-500">
                                {restrictions.blocked.slice(0, 4).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Warning / Conditional */}
                          {restrictions.warning.length > 0 && (
                            <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-100">
                              <span className="text-amber-800 font-bold flex items-center gap-1 mb-1">
                                <span>⚠️</span> Conditional / Inspection:
                              </span>
                              <ul className="text-slate-700 space-y-0.5 pl-4 list-disc marker:text-amber-500">
                                {restrictions.warning.slice(0, 3).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Allowed */}
                          {restrictions.allowed.length > 0 && (
                            <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                              <span className="text-emerald-800 font-bold flex items-center gap-1 mb-1">
                                <ShieldCheck size={12} /> Permitted & Recommended:
                              </span>
                              <ul className="text-slate-700 space-y-0.5 pl-4 list-disc marker:text-emerald-600">
                                {restrictions.allowed.slice(0, 3).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {restrictions.note && (
                            <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-200">
                              {restrictions.note}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Proposal Action Toggle Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleSelectService(serviceKey)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#f27a1a] text-white shadow-md shadow-orange-500/20 ring-1 ring-orange-400' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 size={15} />
                            <span>Included in Proposal</span>
                          </>
                        ) : (
                          <>
                            <span>Add to Proposal Comparison</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SECTION 4: FULL COMPARISON TABLE VIEW (LIGHT THEME) ── */}
        {quotes.length > 0 && viewMode === "table" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Selection</th>
                    <th className="p-4">Carrier Network</th>
                    <th className="p-4">Service Name</th>
                    <th className="p-4">Total Price (GST Inc)</th>
                    <th className="p-4">Effective Rate/Kg</th>
                    <th className="p-4">Transit Time (TAT)</th>
                    <th className="p-4">Zone / Type</th>
                    <th className="p-4">Chargeable Wt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedQuotes.map((q) => {
                    const serviceKey = `${q.service}__${q.rateType}`;
                    const isSelected = selectedServiceKeys.includes(serviceKey);
                    const meta = NETWORK_METAS[q.network] || { name: q.network, badgeBg: 'bg-slate-100', badgeText: 'text-slate-800' };
                    const ratePerKg = Math.round(q.totalPrice / (q.chargeableWt || 1));

                    return (
                      <tr 
                        key={serviceKey}
                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-orange-50/60' : ''
                        }`}
                        onClick={() => toggleSelectService(serviceKey)}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-[#f27a1a] focus:ring-[#f27a1a] cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-slate-200 ${meta.badgeBg} ${meta.badgeText}`}>
                            {meta.name}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-slate-900">
                          {q.service}
                        </td>
                        <td className="p-4 font-black text-[#f27a1a] text-sm">
                          ₹{Math.round(q.totalPrice).toLocaleString('en-IN')}
                        </td>
                        <td className="p-4 font-mono font-semibold text-slate-700">
                          ₹{ratePerKg.toLocaleString('en-IN')}/kg
                        </td>
                        <td className="p-4 text-slate-700 font-medium">
                          {q.tat}
                        </td>
                        <td className="p-4 font-mono text-slate-500">
                          Zone {q.zone} • {q.rateType === 'S' ? 'Slab' : 'Per-Kg'}
                        </td>
                        <td className="p-4 font-mono font-bold text-orange-600">
                          {q.chargeableWt} kg
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── EMPTY STATE WHEN NO QUOTES FETCHED ── */}
        {hasSearched && quotes.length === 0 && !loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-[#f27a1a] flex items-center justify-center mx-auto">
              <Package size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Courier Rates Available</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please check the destination country, postal code, or weight settings and calculate again.
            </p>
          </div>
        )}

        {/* ── STICKY PROPOSAL SUMMARY & EXPORT DRAWER (LIGHT THEME) ── */}
        {selectedServiceKeys.length > 0 && (
          <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md border-2 border-[#f27a1a]/70 rounded-2xl p-4 shadow-xl shadow-slate-300/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#f27a1a] text-white rounded-xl shadow-sm">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">
                  Proposal Selection Summary ({selectedServiceKeys.length} {selectedServiceKeys.length === 1 ? 'service' : 'services'} selected)
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-extrabold text-[#0D1527]">
                    {clientName ? `${clientName} • ` : ''}{activeDestObj?.flag} {zoningCountry || activeDestObj?.label} ({chargeableWtNumber} kg)
                  </span>
                  <span className="text-xs text-[#f27a1a] font-mono font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    Ref: {proposalRef}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={copyProposalSummary}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700">Copied Proposal Text!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-slate-600" />
                    <span>Copy Quotation Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
