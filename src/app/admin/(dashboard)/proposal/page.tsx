'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  ArrowRight, 
  Scale, 
  Box, 
  Boxes,
  Clock, 
  TrendingDown, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Search, 
  Printer, 
  Download,
  Copy, 
  Check, 
  LogOut, 
  User, 
  Building, 
  Phone,
  FileText, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  SlidersHorizontal,
  X,
  Star,
  Layers,
  Sparkles,
  Truck,
  Calendar,
  UserCheck,
  Tag,
  Plus,
  Trash2
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

/* ── Box Interface for Multi-Box Consignment ─────────────────────────────── */
interface PackageBox {
  id: string;
  boxName: string;
  actualWt: string;
  length: string;
  breadth: string;
  height: string;
  products: string;
}

/* ── Carrier Network Configurations ───────────────────────────────────────── */
interface NetworkMeta {
  name: string;
  shortName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentBar: string;
  logoBg: string;
  textColor: string;
}

const NETWORK_METAS: Record<string, NetworkMeta> = {
  DHL: {
    name: "DHL Express",
    shortName: "DHL",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-200",
    badgeText: "text-amber-800",
    accentBar: "bg-[#D40511]",
    logoBg: "bg-[#FFCC00] text-[#D40511]",
    textColor: "text-[#D40511]"
  },
  FED: {
    name: "FedEx International",
    shortName: "FedEx",
    badgeBg: "bg-purple-50",
    badgeBorder: "border-purple-200",
    badgeText: "text-purple-800",
    accentBar: "bg-[#4D148C]",
    logoBg: "bg-[#4D148C] text-white",
    textColor: "text-[#4D148C]"
  },
  UPS: {
    name: "UPS Worldwide",
    shortName: "UPS",
    badgeBg: "bg-yellow-50",
    badgeBorder: "border-yellow-200",
    badgeText: "text-yellow-900",
    accentBar: "bg-[#351C15]",
    logoBg: "bg-[#351C15] text-[#FFB500]",
    textColor: "text-[#351C15]"
  },
  ARA: {
    name: "Aramex Priority",
    shortName: "Aramex",
    badgeBg: "bg-red-50",
    badgeBorder: "border-red-200",
    badgeText: "text-red-700",
    accentBar: "bg-[#E31837]",
    logoBg: "bg-[#E31837] text-white",
    textColor: "text-[#E31837]"
  },
  SELF: {
    name: "Manvi Self",
    shortName: "Manvi Self",
    badgeBg: "bg-orange-50",
    badgeBorder: "border-orange-200",
    badgeText: "text-[#f27a1a]",
    accentBar: "bg-[#f27a1a]",
    logoBg: "bg-[#f27a1a] text-white",
    textColor: "text-[#f27a1a]"
  }
};

/* ── Carrier & Duty Helper Functions ──────────────────────────────────────── */
const getCarrierName = (network?: string, fullService?: string): string => {
  const net = (network || '').toUpperCase();
  const serv = (fullService || '').toLowerCase();
  if (net === 'SELF' || serv.includes('self') || serv.includes('direct') || serv.includes('manvi')) {
    return 'Manvi Self';
  }
  if (net === 'DHL' || serv.includes('dhl')) {
    return 'DHL Express';
  }
  if (net === 'FED' || serv.includes('fedex')) {
    return 'FedEx';
  }
  if (net === 'UPS' || serv.includes('ups')) {
    return 'UPS';
  }
  if (net === 'ARA' || serv.includes('aramex')) {
    return 'Aramex';
  }
  return NETWORK_METAS[network || '']?.name || network || 'Courier Service';
};

const isDutyFreeService = (network?: string, serviceName?: string): boolean => {
  const net = (network || '').toUpperCase();
  const serv = (serviceName || '').toLowerCase();
  return net === 'SELF' || serv.includes('self') || serv.includes('direct') || serv.includes('manvi');
};

/* ── Shipping Restrictions / Guidelines ───────────────────────────────────── */
const SHIPPING_RESTRICTIONS: Record<string, { blocked: string[]; warning: string[]; allowed: string[]; note?: string }> = {
  DHL: {
    blocked: [
      "All medical tablets, syrups & remedies",
      "Herbal, Ayurvedic & Unani medications",
      "Pure Desi Ghee & liquid butter",
      "Cooking, edible, or hair oils",
      "Pickles (Achar) preserved in liquid oil",
      "Bullion, silver & precious metals",
      "SD memory cards & flash storage"
    ],
    warning: [
      "Homemade Mithai & sweets (dry only)",
      "Beauty cosmetics & makeup creams",
      "Branded packaged food items",
      "Sealed dry spices & culinary masalas"
    ],
    allowed: [
      "Garments, textiles & fashion apparel",
      "Personal items, gifts & books",
      "Turban materials & religious items",
      "Documents, certificates & contracts"
    ],
    note: "Commercial invoice with itemized values required for customs clearance."
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
    note: "Customs declaration requires manufacturer ingredient label on food packets."
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
    note: "Specialized direct routing for Middle East (UAE, Saudi Arabia, Qatar, Oman)."
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
  /* ── 1. Salesperson Identity (Cookie Only, Form Inputs Start 100% Empty) ── */
  const [salesUser, setSalesUser] = useState<string>("sales@manvi");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin_user=([^;]*)/);
    if (match && match[1]) {
      const user = decodeURIComponent(match[1]);
      setSalesUser(user);
    }
  }, []);

  /* ── 2. All Form Inputs Initialized EMPTY (Placeholders Clearly Visible) ── */
  const [proposalRef, setProposalRef] = useState<string>("");
  const [proposalDate, setProposalDate] = useState<string>("");
  const [agentName, setAgentName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  /* ── 3. Destination Parameters (Empty) ── */
  const [destination, setDestination] = useState<string>("");
  const [zoningCountry, setZoningCountry] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");

  /* ── 4. Pickup & Handover Details ── */
  const [pickupRequired, setPickupRequired] = useState(false);
  const [pickupPincode, setPickupPincode] = useState<string>("");
  const [pickupCity, setPickupCity] = useState<string>("");
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [dropoffAddress, setDropoffAddress] = useState<string>("Khasra No 91 Bamnoli, Village Dwarka Sector 28, New Delhi, Delhi - 110061");

  /* ── 5. Package Boxes State & Data (Inputs Start Empty) ── */
  const [boxes, setBoxes] = useState<PackageBox[]>([
    {
      id: "box-1",
      boxName: "Box 1",
      actualWt: "",
      length: "",
      breadth: "",
      height: "",
      products: ""
    }
  ]);

  /* ── Derived Weights & Multi-Box Calculations ── */
  const activeDestObj = useMemo(() => DESTINATIONS.find(d => d.value === destination), [destination]);
  const requiresZip = activeDestObj?.requiresZip ?? false;
  const requiresSubCountry = activeDestObj?.requiresSubCountry ?? false;
  const subCountryList = destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const boxCalculations = useMemo(() => {
    let totalAct = 0;
    let totalVol = 0;

    const computedBoxes = boxes.map((box, idx) => {
      const act = parseFloat(box.actualWt) || 0;
      const l = parseFloat(box.length) || 0;
      const b = parseFloat(box.breadth) || 0;
      const h = parseFloat(box.height) || 0;
      const vol = l > 0 && b > 0 && h > 0 ? (l * b * h) / 5000 : 0;
      
      totalAct += act;
      totalVol += vol;

      return {
        ...box,
        displayName: `Box ${idx + 1}`,
        boxNumber: idx + 1,
        actNumber: act,
        volNumber: vol,
        chargeableNumber: Math.ceil(Math.max(act, vol))
      };
    });

    const totalChargeable = Math.ceil(Math.max(totalAct, totalVol));

    return {
      computedBoxes,
      totalActualWt: totalAct,
      totalVolWt: totalVol,
      totalChargeableWt: totalChargeable
    };
  }, [boxes]);

  /* ── Box Manipulation Handlers ── */
  const updateBox = (id: string, field: keyof PackageBox, value: string) => {
    setBoxes(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const addBox = () => {
    const nextNum = boxes.length + 1;
    const newBox: PackageBox = {
      id: `box-${Date.now()}-${nextNum}`,
      boxName: `Box ${nextNum}`,
      actualWt: "",
      length: "",
      breadth: "",
      height: "",
      products: ""
    };
    setBoxes(prev => [...prev, newBox]);
  };

  const removeBox = (id: string) => {
    if (boxes.length <= 1) return;
    setBoxes(prev => prev.filter(b => b.id !== id));
  };

  /* ── Quote Results State ── */
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  /* ── Interactive Selection & Filter State ── */
  const [selectedServiceKeys, setSelectedServiceKeys] = useState<string[]>([]);
  const [recommendedKey, setRecommendedKey] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [filterSort, setFilterSort] = useState<"cheapest" | "fastest" | "all">("cheapest");
  const [networkFilter, setNetworkFilter] = useState<string>("ALL");

  /* ── Helper to parse TAT days for sorting ── */
  const parseTatDays = (tat: string): number => {
    const match = tat.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 999;
  };

  /* ── Min Price & Fastest TAT for Badging ── */
  const lowestPrice = useMemo(() => {
    if (quotes.length === 0) return 0;
    return Math.min(...quotes.map(q => q.totalPrice));
  }, [quotes]);

  const fastestTatDays = useMemo(() => {
    if (quotes.length === 0) return 999;
    return Math.min(...quotes.map(q => parseTatDays(q.tat)));
  }, [quotes]);

  /* ── Filtered & Sorted Available Services ── */
  const displayedQuotes = useMemo(() => {
    let list = [...quotes];

    // Filter by carrier network
    if (networkFilter !== "ALL") {
      list = list.filter(q => (q.network || "").toUpperCase() === networkFilter);
    }

    // Filter by search string
    if (searchFilter.trim()) {
      const qLower = searchFilter.toLowerCase();
      list = list.filter(q => 
        q.service.toLowerCase().includes(qLower) ||
        (NETWORK_METAS[q.network]?.name || q.network).toLowerCase().includes(qLower)
      );
    }

    // Sort order
    if (filterSort === "cheapest") {
      list.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (filterSort === "fastest") {
      list.sort((a, b) => parseTatDays(a.tat) - parseTatDays(b.tat));
    }

    return list;
  }, [quotes, networkFilter, searchFilter, filterSort]);

  /* ── Selected Quotes for Comparison ── */
  const selectedQuotes = useMemo(() => {
    return quotes.filter(q => selectedServiceKeys.includes(`${q.service}__${q.rateType}`));
  }, [quotes, selectedServiceKeys]);

  /* ── Fetch Real Live Rates from Backend API ── */
  const fetchQuotes = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!destination) {
      setErrorMsg("Please select a destination region.");
      return;
    }
    
    if (boxCalculations.totalActualWt <= 0 && boxCalculations.totalChargeableWt <= 0) {
      setErrorMsg("Please enter actual weight for your package(s).");
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
      const effectiveWt = boxes.length > 1
        ? boxCalculations.totalChargeableWt
        : (boxCalculations.totalActualWt || boxCalculations.totalChargeableWt);

      const params = new URLSearchParams({
        actualWt: String(effectiveWt),
        country: destination.trim(),
      });

      if (boxes.length === 1) {
        if (boxes[0].length) params.append("length", boxes[0].length.trim());
        if (boxes[0].breadth) params.append("breadth", boxes[0].breadth.trim());
        if (boxes[0].height) params.append("height", boxes[0].height.trim());
      }

      if (zipcode) params.append("zipcode", zipcode.trim());
      if (zoningCountry) params.append("zoningCountry", zoningCountry.trim());

      const res = await fetch(`/api/rates/quote?${params.toString()}`, {
        headers: { "x-database": "manvi" },
      });

      const data = await res.json();

      if (data.success && data.quotes && data.quotes.length > 0) {
        setQuotes(data.quotes);
        
        // Auto-select top 2-3 cheapest courier options for instant side-by-side comparison
        const sorted = [...data.quotes].sort((a: Quote, b: Quote) => a.totalPrice - b.totalPrice);
        const topKeys = sorted.slice(0, 3).map((q: Quote) => `${q.service}__${q.rateType}`);
        setSelectedServiceKeys(topKeys);
        setRecommendedKey(topKeys[0] || null);
      } else {
        setQuotes([]);
        setSelectedServiceKeys([]);
        setRecommendedKey(null);
        setErrorMsg(data.message || "No courier rates found for this weight and destination combination.");
      }
    } catch (err: any) {
      console.error("Quote fetch error:", err);
      setErrorMsg(err.message || "Failed to retrieve rates from server.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Reset Form Handler (Returns Everything to Empty) ── */
  const resetForm = () => {
    setProposalRef("");
    setProposalDate("");
    setAgentName("");
    setClientName("");
    setClientCompany("");
    setClientPhone("");
    setDestination("");
    setZoningCountry("");
    setZipcode("");
    setBoxes([
      {
        id: "box-1",
        boxName: "",
        actualWt: "",
        length: "",
        breadth: "",
        height: "",
        products: ""
      }
    ]);
    setPickupRequired(false);
    setPickupPincode("");
    setPickupCity("");
    setPickupAddress("");
    setDropoffAddress("Khasra No 91 Bamnoli, Village Dwarka Sector 28, New Delhi, Delhi - 110061");
    setQuotes([]);
    setSelectedServiceKeys([]);
    setRecommendedKey(null);
    setErrorMsg("");
    setHasSearched(false);
  };

  /* ── Checkbox Selection Handlers ── */
  const toggleSelectService = (key: string) => {
    setSelectedServiceKeys(prev => {
      const exists = prev.includes(key);
      const next = exists ? prev.filter(k => k !== key) : [...prev, key];
      if (recommendedKey === key && exists) {
        setRecommendedKey(next[0] || null);
      }
      return next;
    });
  };

  const selectAllDisplayed = () => {
    const keysToAdd = displayedQuotes.map(q => `${q.service}__${q.rateType}`);
    setSelectedServiceKeys(prev => Array.from(new Set([...prev, ...keysToAdd])));
  };

  const clearSelection = () => {
    setSelectedServiceKeys([]);
    setRecommendedKey(null);
  };

  const selectCheapestAndFastest = () => {
    if (quotes.length === 0) return;
    const sortedByPrice = [...quotes].sort((a, b) => a.totalPrice - b.totalPrice);
    const sortedByTat = [...quotes].sort((a, b) => parseTatDays(a.tat) - parseTatDays(b.tat));
    const keys: string[] = [];
    if (sortedByPrice[0]) keys.push(`${sortedByPrice[0].service}__${sortedByPrice[0].rateType}`);
    if (sortedByTat[0]) {
      const fastKey = `${sortedByTat[0].service}__${sortedByTat[0].rateType}`;
      if (!keys.includes(fastKey)) keys.push(fastKey);
    }
    setSelectedServiceKeys(keys);
    setRecommendedKey(keys[0] || null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#f27a1a] selection:text-white">
      
      {/* ── TOP NAV BAR (EXPANDED TO FULL WIDTH, HIDDEN IN PRINT) ── */}
      <header className="print:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 lg:px-12 py-3 shadow-xs">
        <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
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
              <p className="text-[12px] text-slate-500 font-medium">Multi-Box International Courier Rate Calculator & Comparison</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
              <UserCheck size={14} className="text-[#f27a1a]" />
              <span className="text-slate-700 font-semibold">{agentName || salesUser}</span>
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
        </div>
      </header>

      {/* ── EMBEDDED PRINT SPECIFIC STYLES FOR SEQUENTIAL 1-2 PAGE OUTPUT ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm 8mm 10mm;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .proposal-print-document {
            background: #ffffff !important;
            width: 100% !important;
            color: #0f172a !important;
            display: block !important;
          }
          .print-avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}} />

      {/* ── PRINT-ONLY SEQUENTIAL PROPOSAL DOCUMENT (NON-REPETITIVE, 1 OR 2 PAGES) ── */}
      <div className="hidden print:block print:w-full bg-white text-slate-900">
        {selectedQuotes.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-sans">
            <h2 className="text-lg font-bold text-slate-800">No Services Selected</h2>
            <p className="text-xs mt-1">Please select at least one courier service option on the proposal comparison screen before printing.</p>
          </div>
        ) : (
          <div className="proposal-print-document space-y-3.5">
            {/* 1. Official Letterhead (Printed ONCE at top) */}
            <div className="border-b-2 border-[#0D1527] pb-3 mb-3 print-avoid-break">
              <div className="flex justify-between items-start">
                <div>
                  {/* Company Logo using public/logo-png.png */}
                  <div className="overflow-hidden mb-1.5" style={{ height: "36px", width: "220px" }}>
                    <img
                      src="/logo-png.png"
                      alt="Manvi International Courier"
                      style={{
                        height: "135px",
                        marginTop: "-50px",
                        marginLeft: "-9px",
                        width: "auto",
                        maxWidth: "none",
                        display: "block"
                      }}
                    />
                  </div>
                  <p className="text-[9.5px] text-slate-600 font-semibold mt-1">
                    Door-to-Door Worldwide Air Express Courier Services
                  </p>
                  <p className="text-[8.5px] text-slate-500 font-medium">
                    Web: manvicourier.com | Email: info@manvicourier.com | Ph: +91 7070506070
                  </p>
                </div>

                <div className="text-right">
                  <div className="inline-block bg-[#0D1527] text-white text-[9.5px] font-black uppercase px-2 py-0.5 rounded tracking-wide mb-1.5">
                    Official Courier Proposal
                  </div>
                  <div className="text-[9.5px] text-slate-600 font-semibold">
                    Ref: <span className="font-mono font-bold text-[#f27a1a]">{proposalRef.trim() || 'MIC-QUOTE'}</span>
                  </div>
                  <div className="text-[9.5px] text-slate-600 font-semibold">
                    Date: <span className="font-medium text-slate-800">{proposalDate || new Date().toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="text-[9.5px] text-slate-600 font-semibold">
                    Proposed By: <span className="font-bold text-slate-800">{agentName.trim() || 'Manvi Courier Team'}</span>
                  </div>
                  <div className="text-[8px] text-slate-400 font-semibold mt-1">
                    {selectedQuotes.length} Courier Option{selectedQuotes.length > 1 ? 's' : ''} Included
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Routing & Customer Metadata (Printed ONCE) */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-4 gap-3 text-[9.5px] mb-3 print-avoid-break">
              <div>
                <span className="text-slate-400 uppercase text-[8px] font-bold block mb-0.5">Consignor / Client</span>
                <span className="font-bold text-slate-900 block truncate">{clientName || 'Valued Customer'}</span>
                {clientPhone && <span className="text-slate-600 block text-[8.5px]">Ph: {clientPhone}</span>}
                {clientCompany && <span className="text-slate-500 block text-[8.5px]">{clientCompany}</span>}
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[8px] font-bold block mb-0.5">Destination Country</span>
                <span className="font-bold text-slate-900 block">
                  {zoningCountry ? `${zoningCountry} (${destination})` : destination || 'International'}
                  {zipcode ? ` - ${zipcode}` : ''}
                </span>
                <span className="text-slate-500 text-[8.5px] block">Zone Direct Routing</span>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[8px] font-bold block mb-0.5">Consignment Total</span>
                <span className="font-bold text-slate-900 block">
                  {boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'} • {boxCalculations.totalActualWt.toFixed(1)} kg Act
                </span>
                <span className="text-orange-600 font-black text-[9.5px] block">
                  Chargeable: {boxCalculations.totalChargeableWt} kg
                </span>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[8px] font-bold block mb-0.5">Package Handover</span>
                {pickupRequired ? (
                  <>
                    <span className="font-extrabold text-emerald-800 block text-[9.5px]">DOORSTEP PICKUP</span>
                    <span className="text-slate-700 block text-[8px] leading-snug mt-0.5 font-medium">
                      {[pickupAddress, pickupCity, pickupPincode ? `PIN: ${pickupPincode}` : ''].filter(Boolean).join(', ') || 'Client Address on Record'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-extrabold text-slate-800 block text-[9.5px]">PACKAGE DROP-OFF</span>
                    <span className="text-slate-600 block text-[8px] leading-snug mt-0.5 font-medium">
                      {dropoffAddress}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* 3. Multi-Box Specifications & Commodity Inventory Table (Printed ONCE) */}
            <div className="mb-3 print-avoid-break">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-700">
                  Package Specifications & Commodity Inventory ({boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'})
                </span>
                <span className="text-[8px] text-slate-400 font-medium">
                  Higher of Actual vs Volumetric Weight applied as Chargeable (L × W × H cm / 5000)
                </span>
              </div>
              
              <table className="w-full text-left text-[8.5px] border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-1.5 px-2.5">Box #</th>
                    <th className="py-1.5 px-2.5">Contents / Products in Box</th>
                    <th className="py-1.5 px-2.5 text-center">Dimensions (L × W × H cm)</th>
                    <th className="py-1.5 px-2.5 text-right">Actual Wt</th>
                    <th className="py-1.5 px-2.5 text-right">Volumetric Wt</th>
                    <th className="py-1.5 px-2.5 text-right">Chargeable Wt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {boxCalculations.computedBoxes.map((b) => (
                    <tr key={b.id} className="text-slate-800">
                      <td className="py-1.5 px-2.5 font-bold">{b.displayName}</td>
                      <td className="py-1.5 px-2.5 text-slate-700">{b.products || 'General Personal / Commercial Goods'}</td>
                      <td className="py-1.5 px-2.5 text-center font-mono text-[8px]">
                        {b.length && b.breadth && b.height ? `${b.length} × ${b.breadth} × ${b.height} cm` : 'Standard Packing'}
                      </td>
                      <td className="py-1.5 px-2.5 text-right font-mono">{b.actualWt ? `${parseFloat(b.actualWt).toFixed(1)} kg` : '0 kg'}</td>
                      <td className="py-1.5 px-2.5 text-right font-mono">{b.volNumber > 0 ? `${b.volNumber.toFixed(2)} kg` : '0 kg'}</td>
                      <td className="py-1.5 px-2.5 text-right font-mono font-bold text-orange-600">{b.chargeableNumber} kg</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t border-slate-200 text-slate-900">
                    <td colSpan={2} className="py-1.5 px-2.5 text-right uppercase text-[8px] tracking-wide">
                      Consignment Total:
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-[8px] text-slate-500">
                      {boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes Total'}
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-mono">{boxCalculations.totalActualWt.toFixed(1)} kg</td>
                    <td className="py-1.5 px-2.5 text-right font-mono">{boxCalculations.totalVolWt.toFixed(2)} kg</td>
                    <td className="py-1.5 px-2.5 text-right font-mono text-[#f27a1a] font-extrabold text-[9.5px]">
                      {boxCalculations.totalChargeableWt} kg
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4. Sequential Courier Service Options (Together, Non-Repetitive) */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2 print-avoid-break">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                  Proposed Courier Services ({selectedQuotes.length} Available)
                </span>
                <span className="text-[8px] text-slate-400 font-medium">
                  All rates inclusive of 18% GST and fuel surcharges
                </span>
              </div>

              {/* Comparative Summary Table when multiple services are selected */}
              {selectedQuotes.length > 1 && (
                <div className="mb-3 print-avoid-break border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-[8.5px]">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="py-1.5 px-2.5">Carrier</th>
                        <th className="py-1.5 px-2.5 text-center">Transit Time (TAT)</th>
                        <th className="py-1.5 px-2.5 text-right">Rate / kg</th>
                        <th className="py-1.5 px-2.5 text-right">Total Price (GST Inc)</th>
                        <th className="py-1.5 px-2.5 text-center">Duty Status</th>
                        <th className="py-1.5 px-2.5 text-center">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedQuotes.map((q, idx) => {
                        const carrier = getCarrierName(q.network, q.service);
                        const isDutyFree = isDutyFreeService(q.network, q.service);
                        const effectiveChargeable = boxCalculations.totalChargeableWt || q.chargeableWt || 1;
                        const ratePerKg = Math.round(q.totalPrice / effectiveChargeable);
                        const isRecommended = recommendedKey === `${q.service}__${q.rateType}`;
                        const isLowest = q.totalPrice === lowestPrice;

                        return (
                          <tr key={`summary-row-${idx}`} className={isRecommended ? 'bg-orange-50/60 font-semibold' : 'bg-white'}>
                            <td className="py-1.5 px-2.5 font-bold text-slate-900">{carrier}</td>
                            <td className="py-1.5 px-2.5 text-center text-slate-700">{q.tat}</td>
                            <td className="py-1.5 px-2.5 text-right font-mono text-slate-700">₹{ratePerKg.toLocaleString('en-IN')}/kg</td>
                            <td className="py-1.5 px-2.5 text-right font-mono font-bold text-[#f27a1a]">₹{Math.round(q.totalPrice).toLocaleString('en-IN')}</td>
                            <td className="py-1.5 px-2.5 text-center">
                              {isDutyFree ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                                  ✓ Duty Free
                                </span>
                              ) : (
                                <span className="bg-slate-100 text-slate-600 text-[8px] font-medium px-2 py-0.5 rounded border border-slate-200">
                                  Additional Duty May Apply
                                </span>
                              )}
                            </td>
                            <td className="py-1.5 px-2.5 text-center">
                              {isRecommended ? (
                                <span className="bg-[#f27a1a] text-white text-[7.5px] font-bold px-1.5 py-0.5 rounded">⭐ Recommended</span>
                              ) : isLowest ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[7.5px] font-bold px-1.5 py-0.5 rounded">✓ Lowest Cost</span>
                              ) : (
                                <span className="text-slate-400 text-[7.5px]">Standard</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sequential Detailed Carrier Cards */}
              <div className="space-y-3">
                {selectedQuotes.map((q, qIndex) => {
                  const carrier = getCarrierName(q.network, q.service);
                  const isDutyFree = isDutyFreeService(q.network, q.service);
                  const meta = NETWORK_METAS[q.network] || {
                    name: carrier,
                    shortName: carrier,
                    accentBar: 'bg-[#f27a1a]',
                    textColor: 'text-slate-900',
                    badgeBg: 'bg-slate-100',
                    badgeBorder: 'border-slate-300',
                    badgeText: 'text-slate-800'
                  };
                  const restrictions = SHIPPING_RESTRICTIONS[q.network] || { blocked: [], warning: [], allowed: [] };
                  const effectiveChargeable = boxCalculations.totalChargeableWt || q.chargeableWt || 1;
                  const ratePerKg = Math.round(q.totalPrice / effectiveChargeable);
                  const isRecommended = recommendedKey === `${q.service}__${q.rateType}`;
                  const isLowest = q.totalPrice === lowestPrice;

                  return (
                    <div 
                      key={`seq-service-${q.service}-${q.rateType}-${qIndex}`}
                      className="border border-slate-300 rounded-xl p-3 bg-white relative overflow-hidden print-avoid-break shadow-2xs"
                    >
                      {/* Top Section: 2-column grid matching below boxes (Col 1: Carrier & TAT; Col 2: Amount Info) */}
                      <div className="grid grid-cols-2 gap-2.5 items-center mb-2.5">
                        {/* Left Side: Carrier Name, Badges & Estimated Delivery (Matches Permitted Goods width) */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 uppercase tracking-tight">
                              {carrier}
                            </span>
                            {isDutyFree && (
                              <span className="text-[8px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                ✓ Duty Free
                              </span>
                            )}
                            {isRecommended && (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#f27a1a] text-white">
                                ⭐ Recommended Choice
                              </span>
                            )}
                            {isLowest && (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                ✓ Lowest Cost Option
                              </span>
                            )}
                          </div>

                          <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80 flex items-center justify-between text-[8px]">
                            <span className="text-slate-500 font-medium">Estimated Delivery (TAT):</span>
                            <span className="font-extrabold text-slate-900">{q.tat} (Door-to-Door Express)</span>
                          </div>
                        </div>

                        {/* Right Side: Amount Info (Vertical stack aligned to the right) */}
                        <div className="text-right flex flex-col justify-center items-end">
                          <div className="flex items-baseline justify-end gap-1.5">
                            <span className="text-[8px] text-slate-400 font-semibold uppercase">Total Rate:</span>
                            <span className="text-base font-black text-[#0D1527] leading-none">
                              ₹{Math.round(q.totalPrice).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[8.5px] font-bold text-[#f27a1a]">
                              (₹{ratePerKg.toLocaleString('en-IN')}/kg)
                            </span>
                          </div>
                          <div className="mt-1">
                            {isDutyFree ? (
                              <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                                ✓ 100% Duty Free (Included)
                              </span>
                            ) : (
                              <span className="text-[8px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                                Additional Duty May Apply
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Compliance: Permitted vs Prohibited items */}
                      <div className="grid grid-cols-2 gap-2.5 text-[8px]">
                        <div className="bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                          <span className="font-bold text-emerald-900 block mb-1 text-[8.5px]">
                            ✓ Permitted Goods ({meta.shortName}):
                          </span>
                          <ul className="text-slate-700 space-y-0.5 pl-3.5 list-disc marker:text-emerald-600 text-[8px] leading-tight">
                            {restrictions.allowed.slice(0, 3).map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-red-50/70 p-2 rounded-lg border border-red-100">
                          <span className="font-bold text-red-900 block mb-1 text-[8.5px]">
                            ✕ Prohibited Goods ({meta.shortName}):
                          </span>
                          <ul className="text-slate-700 space-y-0.5 pl-3.5 list-disc marker:text-red-500 text-[8px] leading-tight">
                            {restrictions.blocked.slice(0, 3).map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Terms, Sign-off & Support Footer (Printed ONCE at document conclusion) */}
            <div className="border-t border-slate-200 pt-3 mt-3 print-avoid-break">
              <div className="grid grid-cols-3 gap-2.5 text-[7.5px] text-slate-500 leading-tight mb-3">
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">1. Chargeable Weight Policy:</span>
                  The higher weight between the actual weight and volume weight (volumetric weight) will be applied as chargeable weight (L × W × H cm / 5000 as per airline standard).
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">2. Inspection & Security Screening:</span>
                  Consignments undergo mandatory physical check & security x-ray scan prior to loading on export flight.
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">3. Transit & Tracking:</span>
                  Live end-to-end Airwaybill tracking provided upon flight departure. Door-to-door transit to destination address.
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-end text-[8.5px]">
                <div>
                  <p className="text-slate-400 text-[7.5px]">Proposal Prepared By:</p>
                  <p className="font-bold text-slate-900 text-[10px]">{agentName.trim() || 'Manvi Courier Team'}</p>
                  <p className="text-slate-500 text-[7px] mt-0.5">Customer Support: +91 7070506070 | manvicourier.com</p>
                </div>

                <div className="text-right">
                  {/* Dedicated generous space for physical signature & company stamp */}
                  <div className="h-12 flex flex-col justify-end items-end">
                    <div className="w-48 border-b border-slate-400 mb-1"></div>
                  </div>
                  <p className="font-bold text-slate-800 text-[8.5px]">Client Acceptance Signature</p>
                  <p className="text-slate-400 text-[7.5px]">{clientName || 'Consignor Authorization'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── EXPANDED MAIN CONTAINER (TAKES GENEROUS FULL WIDTH, HIDDEN DURING PRINT) ── */}
      <div className="flex-1 w-full max-w-[96%] xl:max-w-[1780px] mx-auto px-2 sm:px-6 lg:px-10 py-6 space-y-6 print:hidden">
        
        {/* ── SECTION 1: PROPOSAL CONFIGURATION & SHIPMENT PARAMETERS FORM ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden print:border-none print:shadow-none">
          
          {/* Card Sub-Header: Agent, Date, Customer & Ref (All Inputs Start Empty with Visible Placeholders) */}
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-orange-100 text-[#f27a1a] rounded-lg">
                <SlidersHorizontal size={16} />
              </div>
              <div>
                <h2 className="font-bold text-[#0D1527] text-base leading-tight">Shipment & Consignment Parameters</h2>
                <p className="text-[11px] text-slate-500">All fields are empty by default so placeholders guide your inputs</p>
              </div>
            </div>
            
            {/* Metadata Inputs Bar (Wide and Spacious) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:items-center flex-wrap gap-2.5">
              
              {/* Proposal Ref */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
                <span className="text-slate-400 mr-1.5 font-medium shrink-0">Ref:</span>
                <input 
                  type="text" 
                  value={proposalRef} 
                  onChange={(e) => setProposalRef(e.target.value)}
                  className="bg-transparent text-slate-800 font-mono font-bold focus:outline-none w-28 sm:w-32 placeholder:text-slate-400"
                  placeholder="e.g. MIC-001"
                  suppressHydrationWarning
                />
              </div>

              {/* Date */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
                <Calendar size={13} className="text-[#f27a1a] mr-1.5 shrink-0" />
                <input 
                  type="date" 
                  value={proposalDate} 
                  onChange={(e) => setProposalDate(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer w-28 sm:w-32"
                  title="Proposal Date"
                  suppressHydrationWarning
                />
              </div>

              {/* Agent Name */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
                <UserCheck size={13} className="text-[#f27a1a] mr-1.5 shrink-0" />
                <input 
                  type="text" 
                  value={agentName} 
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none w-28 sm:w-36 placeholder:text-slate-400"
                  placeholder="Agent Name"
                  title="Salesperson / Agent Name"
                />
              </div>

              {/* Customer / Client Name */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs col-span-2 sm:col-span-1">
                <User size={13} className="text-slate-400 mr-1.5 shrink-0" />
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none w-36 sm:w-44 placeholder:text-slate-400"
                  placeholder="Customer / Client Name *"
                  title="Customer Name"
                />
              </div>

              {/* Customer Phone / WhatsApp */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
                <Phone size={13} className="text-slate-400 mr-1.5 shrink-0" />
                <input 
                  type="text" 
                  value={clientPhone} 
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none w-28 sm:w-36 placeholder:text-slate-400"
                  placeholder="Phone / WhatsApp"
                  title="Customer Contact"
                />
              </div>

              {/* Company (Optional) */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
                <Building size={13} className="text-slate-400 mr-1.5 shrink-0" />
                <input 
                  type="text" 
                  value={clientCompany} 
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none w-28 sm:w-36 placeholder:text-slate-400"
                  placeholder="Company (Optional)"
                  title="Client Company"
                />
              </div>

            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={fetchQuotes} className="p-6 sm:p-8 space-y-6">
            
            {/* Top Row: Destination Region & Sub-Country/Zipcode (Wide Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              
              {/* Destination Region Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#f27a1a]" />
                  Destination Region <span className="text-[#f27a1a]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setZoningCountry("");
                      setZipcode("");
                      setQuotes([]);
                      setSelectedServiceKeys([]);
                      setHasSearched(false);
                    }}
                    className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="text-slate-400">Select Destination Region...</option>
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
                    <span>🌍</span> Select Country <span className="text-[#f27a1a]">*</span>
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

            </div>

            {/* ── MULTI-BOXES & PACKAGES SECTION (WIDE & SPACIOUS) ── */}
            <div className="bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/90 space-y-4">
              
              {/* Header: Title, Enable Multiple Boxes Button & Add Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-orange-100 text-[#f27a1a] rounded-lg">
                    <Boxes size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>Package & Box Specifications</span>
                      <span className="text-xs bg-orange-100 text-[#f27a1a] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                        {boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">Each box can have its own weight, dimensions and product contents</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={addBox}
                    className="bg-[#f27a1a] hover:bg-[#db660c] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <Plus size={15} />
                    <span>+ Add Box</span>
                  </button>
                </div>
              </div>

              {/* Itemized Boxes List (Wide Layout with Empty Default Inputs) */}
              <div className="space-y-3.5">
                {boxes.map((box, index) => {
                  const l = parseFloat(box.length) || 0;
                  const b = parseFloat(box.breadth) || 0;
                  const h = parseFloat(box.height) || 0;
                  const boxVol = l > 0 && b > 0 && h > 0 ? (l * b * h) / 5000 : 0;
                  const boxAct = parseFloat(box.actualWt) || 0;
                  const boxChargeable = Math.ceil(Math.max(boxAct, boxVol));

                  return (
                    <div
                      key={box.id}
                      className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5 relative group transition-all hover:border-slate-300"
                    >
                      {/* Box Row Top: Number Badge, Automatic Box Name & Calculations */}
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#f27a1a] font-bold text-xs flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            Box {index + 1}
                          </span>
                        </div>

                        {/* Calculated specs badge for this specific box */}
                        <div className="flex items-center gap-3 text-xs">
                          <div className="hidden sm:flex items-center gap-2 text-slate-500 font-mono">
                            <span>Volumetric: <strong className="text-slate-800">{boxVol > 0 ? `${boxVol.toFixed(2)} kg` : '0 kg'}</strong></span>
                            <span>•</span>
                            <span>Chargeable: <strong className="text-orange-600">{boxChargeable} kg</strong></span>
                          </div>

                          {boxes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBox(box.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete this box"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Box Fields Grid (Wide Columns with Empty Defaults) */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                        
                        {/* Box Actual Weight */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                            <Scale size={13} className="text-[#f27a1a]" />
                            Actual Weight (kg) <span className="text-[#f27a1a]">*</span>
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={box.actualWt}
                            onChange={(e) => updateBox(box.id, 'actualWt', e.target.value)}
                            placeholder="e.g. 5.0"
                            required
                            className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white font-mono placeholder:text-slate-400"
                          />
                        </div>

                        {/* Box Dimensions (L × W × H) */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                            <Box size={13} className="text-[#f27a1a]" />
                            Dimensions (L × W × H in cm)
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="number"
                              step="0.5"
                              value={box.length}
                              onChange={(e) => updateBox(box.id, 'length', e.target.value)}
                              placeholder="L (cm)"
                              className="bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-2.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white text-center font-mono placeholder:text-slate-400"
                            />
                            <input
                              type="number"
                              step="0.5"
                              value={box.breadth}
                              onChange={(e) => updateBox(box.id, 'breadth', e.target.value)}
                              placeholder="W (cm)"
                              className="bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-2.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white text-center font-mono placeholder:text-slate-400"
                            />
                            <input
                              type="number"
                              step="0.5"
                              value={box.height}
                              onChange={(e) => updateBox(box.id, 'height', e.target.value)}
                              placeholder="H (cm)"
                              className="bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-2.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white text-center font-mono placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Product or Products in this Box */}
                        <div className="sm:col-span-5 space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                            <Tag size={13} className="text-[#f27a1a]" />
                            Product(s) in this Box
                          </label>
                          <input
                            type="text"
                            value={box.products}
                            onChange={(e) => updateBox(box.id, 'products', e.target.value)}
                            placeholder="e.g. Sarees, Kurtas, Homemade Sweets, Documents..."
                            className="w-full bg-slate-50 text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-[#f27a1a] focus:bg-white placeholder:text-slate-400"
                          />
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Multiple Boxes Overview Summary Banner */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 text-[#f27a1a] rounded-xl">
                    <Layers size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Consignment Totals</span>
                    <span className="text-xs text-slate-800 font-bold">
                      {boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes Total'} • Combined across consignment
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-medium">Total Actual Wt</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {boxCalculations.totalActualWt > 0 ? `${boxCalculations.totalActualWt.toFixed(1)} kg` : '0 kg'}
                    </span>
                  </div>

                  <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-medium">Total Volumetric Wt</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {boxCalculations.totalVolWt > 0 ? `${boxCalculations.totalVolWt.toFixed(2)} kg` : '0 kg'}
                    </span>
                  </div>

                  <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
                    <span className="text-[10px] text-orange-600 block font-extrabold uppercase">Chargeable Wt</span>
                    <span className="font-mono font-black text-[#f27a1a] text-lg leading-tight">
                      {boxCalculations.totalChargeableWt} kg
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Doorstep Pickup Details (Checkbox Optional) */}
            <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pickupRequired}
                    onChange={(e) => setPickupRequired(e.target.checked)}
                    className="w-4 h-4 rounded text-[#f27a1a] focus:ring-[#f27a1a] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Truck size={14} className="text-[#f27a1a]" />
                    Requires Doorstep Pickup (Optional)
                  </span>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  {pickupRequired ? "Doorstep pickup requested" : "Enable if pickup is required"}
                </span>
              </div>

              {/* Handover Details Inputs */}
              {pickupRequired ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200/60 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Client Pickup Address</label>
                    <input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="e.g. House/Shop #12, Market Area"
                      className="w-full bg-white text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2 border border-slate-300 focus:outline-none focus:border-[#f27a1a] placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">City / District</label>
                    <input
                      type="text"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      placeholder="e.g. Amritsar, Delhi, Ludhiana"
                      className="w-full bg-white text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2 border border-slate-300 focus:outline-none focus:border-[#f27a1a] placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Pincode</label>
                    <input
                      type="text"
                      value={pickupPincode}
                      onChange={(e) => setPickupPincode(e.target.value)}
                      placeholder="e.g. 110001, 143001"
                      className="w-full bg-white text-slate-900 text-xs font-semibold rounded-xl px-3.5 py-2 border border-slate-300 focus:outline-none focus:border-[#f27a1a] placeholder:text-slate-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={14} className="text-[#f27a1a] shrink-0" />
                    <span className="font-semibold text-slate-700">Drop-off Hub Address for Package:</span>
                  </div>
                  <input
                    type="text"
                    value={dropoffAddress}
                    onChange={(e) => setDropoffAddress(e.target.value)}
                    className="flex-1 bg-white text-slate-800 text-xs font-medium rounded-xl px-3.5 py-2 border border-slate-300 focus:outline-none focus:border-[#f27a1a]"
                    placeholder="Drop-off address where client drops package"
                    title="Package drop-off address"
                  />
                </div>
              )}
            </div>

            {/* Calculations Summary Bar & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-100">
              
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Calculated on:</span>
                <span className="font-mono font-bold text-slate-800">
                  {boxCalculations.totalChargeableWt} kg Chargeable
                </span>
                <span>•</span>
                <span>{boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'}</span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 print:hidden">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <RotateCcw size={13} />
                  <span>Reset Form</span>
                </button>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#f27a1a] hover:bg-[#db660c] disabled:opacity-50 text-white font-extrabold text-sm px-7 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
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

        {/* ── INITIAL STATE: NO SEARCH PERFORMED YET ── */}
        {!hasSearched && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#f27a1a] flex items-center justify-center mx-auto border border-orange-100">
              <Package size={28} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-bold text-slate-900">Shipment Rate Calculator Ready</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Enter your destination region and package weight or boxes above, then click <strong className="text-[#f27a1a]">Calculate Rates</strong> to pull live courier quotes. You can then select services with checkboxes to compare them side-by-side.
              </p>
            </div>
          </div>
        )}

        {/* ── SECTION 2: COMPACT SERVICES LIST WITH CHECKBOXES (WIDE TABLE) ── */}
        {quotes.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:hidden">
            
            {/* Header / Filter Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-[#0D1527] text-base">
                    Available Courier Services ({displayedQuotes.length})
                  </h3>
                  <span className="text-[11px] bg-slate-100 text-slate-700 font-mono font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                    {activeDestObj?.flag} {zoningCountry || activeDestObj?.label} • {boxCalculations.totalChargeableWt} kg ({boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'})
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select services with the checkboxes to add them to the side-by-side comparison below.
                </p>
              </div>

              {/* Controls: Search, Carrier Filter, Sort */}
              <div className="flex items-center flex-wrap gap-2.5">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search service name or carrier..."
                    className="bg-white text-slate-800 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#f27a1a] w-48 sm:w-60 placeholder:text-slate-400"
                  />
                  {searchFilter && (
                    <button 
                      onClick={() => setSearchFilter("")} 
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Carrier Filter */}
                <div className="relative">
                  <select
                    value={networkFilter}
                    onChange={(e) => setNetworkFilter(e.target.value)}
                    className="bg-white text-slate-800 text-xs font-semibold rounded-xl px-3.5 py-2 border border-slate-200 focus:outline-none appearance-none cursor-pointer pr-8"
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

                {/* Sort Filter */}
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setFilterSort("cheapest")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      filterSort === "cheapest" 
                        ? "bg-[#f27a1a] text-white shadow-2xs" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <TrendingDown size={12} />
                    <span>Cheapest</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFilterSort("fastest")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      filterSort === "fastest" 
                        ? "bg-[#f27a1a] text-white shadow-2xs" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Zap size={12} />
                    <span>Fastest</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Bulk Selection Helpers Bar */}
            <div className="px-6 py-3 bg-slate-50/40 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700">
                  <span className="text-[#f27a1a] font-bold">{selectedServiceKeys.length}</span> of {displayedQuotes.length} selected for comparison
                </span>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={selectAllDisplayed}
                  className="text-[#f27a1a] hover:underline font-semibold cursor-pointer"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Quick Picks:</span>
                <button
                  type="button"
                  onClick={selectCheapestAndFastest}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Lowest + Fastest
                </button>
              </div>
            </div>

            {/* Compact High-Density Table View of Services (Wide Spaced) */}
            <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-xs border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-5 w-14 text-center">Compare</th>
                    <th className="py-3 px-5 w-44">Carrier Network</th>
                    <th className="py-3 px-5">Service Name & Zone</th>
                    <th className="py-3 px-5 w-40">Transit Time</th>
                    <th className="py-3 px-5 w-36">Effective Rate</th>
                    <th className="py-3 px-5 w-40">Total Price (GST Inc)</th>
                    <th className="py-3 px-5 text-center w-36">Badges</th>
                    <th className="py-3 px-5 text-right w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedQuotes.map((q) => {
                    const serviceKey = `${q.service}__${q.rateType}`;
                    const isSelected = selectedServiceKeys.includes(serviceKey);
                    const meta = NETWORK_METAS[q.network] || { 
                      name: q.network, 
                      badgeBg: 'bg-slate-100', 
                      badgeText: 'text-slate-800',
                      badgeBorder: 'border-slate-200',
                      logoBg: 'bg-slate-700 text-white',
                      textColor: 'text-slate-700'
                    };
                    const effectiveChargeable = boxCalculations.totalChargeableWt || q.chargeableWt || 1;
                    const ratePerKg = Math.round(q.totalPrice / effectiveChargeable);
                    const isLowest = q.totalPrice === lowestPrice;
                    const isFastest = parseTatDays(q.tat) === fastestTatDays;

                    return (
                      <tr 
                        key={serviceKey}
                        onClick={() => toggleSelectService(serviceKey)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected 
                            ? 'bg-orange-50/80 hover:bg-orange-50' 
                            : 'hover:bg-slate-50/80 bg-white'
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => toggleSelectService(serviceKey)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer mx-auto ${
                              isSelected 
                                ? 'bg-[#f27a1a] text-white shadow-2xs' 
                                : 'border border-slate-300 hover:border-slate-400 bg-white text-transparent'
                            }`}
                          >
                            <Check size={13} strokeWidth={3} />
                          </button>
                        </td>

                        {/* Carrier Badge */}
                        <td className="py-3 px-5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {meta.name}
                          </span>
                        </td>

                        {/* Service Name & Zone */}
                        <td className="py-3 px-5">
                          <div className="font-bold text-slate-900 leading-tight group-hover:text-[#f27a1a] transition-colors">
                            {q.service}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Zone {q.zone} • {q.rateType === 'S' ? 'Slab Rate' : 'Per-Kg Rate'}
                          </span>
                        </td>

                        {/* Transit Time (TAT) */}
                        <td className="py-3 px-5 whitespace-nowrap text-slate-700 font-medium">
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-slate-400" />
                            <span>{q.tat}</span>
                          </div>
                        </td>

                        {/* Effective Rate/Kg */}
                        <td className="py-3 px-5 whitespace-nowrap font-mono font-semibold text-slate-700">
                          ₹{ratePerKg.toLocaleString('en-IN')}/kg
                        </td>

                        {/* Total Price */}
                        <td className="py-3 px-5 whitespace-nowrap font-black text-[#f27a1a] text-sm">
                          ₹{Math.round(q.totalPrice).toLocaleString('en-IN')}
                        </td>

                        {/* Highlights Badges */}
                        <td className="py-3 px-5 text-center whitespace-nowrap">
                          {isLowest && (
                            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                              ⭐ Lowest Rate
                            </span>
                          )}
                          {!isLowest && isFastest && (
                            <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                              ⚡ Fastest TAT
                            </span>
                          )}
                        </td>

                        {/* Select / In Compare Action Button */}
                        <td className="py-3 px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => toggleSelectService(serviceKey)}
                            className={`text-xs px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-orange-100 text-[#f27a1a] border border-orange-200'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ Added' : '+ Compare'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SECTION 3: DYNAMIC SIDE-BY-SIDE SERVICE COMPARISON (WIDE GRID) ── */}
        {quotes.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
            
            {/* Comparison Section Header */}
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-[#f27a1a] rounded-xl shadow-2xs">
                  <Layers size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#0D1527] text-base leading-tight">
                      Service Comparison Matrix
                    </h3>
                    <span className="text-xs bg-[#f27a1a] text-white font-bold px-2.5 py-0.5 rounded-full">
                      {selectedQuotes.length} Compared
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Side-by-side breakdown of rates, transit times, volumetric specs, and courier policies.
                  </p>
                </div>
              </div>

              {/* Action Button: Single prominent place to download PDF */}
              {selectedQuotes.length > 0 && (
                <div className="flex items-center gap-2.5 print:hidden">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                    title="Download official PDF quotation"
                  >
                    <Download size={15} />
                    <span>Download Proposal (PDF)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Prompt when 0 services are selected */}
            {selectedQuotes.length === 0 && (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Layers size={22} />
                </div>
                <h4 className="text-sm font-bold text-slate-800">No Services Selected for Comparison</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Check the boxes next to any courier service in the list above to compare them side-by-side.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={selectCheapestAndFastest}
                    className="bg-[#f27a1a] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-[#db660c] transition-colors cursor-pointer"
                  >
                    Compare Lowest & Fastest Options
                  </button>
                </div>
              </div>
            )}

            {/* Side-by-Side Comparison Columns (Expands comfortably across full width) */}
            {selectedQuotes.length > 0 && (
              <div className="p-6 sm:p-8 overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 min-w-[320px]">
                  {selectedQuotes.map((q) => {
                    const serviceKey = `${q.service}__${q.rateType}`;
                    const isRecommended = recommendedKey === serviceKey;
                    const meta = NETWORK_METAS[q.network] || { 
                      name: q.network, 
                      badgeBg: 'bg-slate-100', 
                      badgeText: 'text-slate-800',
                      badgeBorder: 'border-slate-200',
                      accentBar: 'bg-slate-500',
                      textColor: 'text-slate-800'
                    };
                    const restrictions = SHIPPING_RESTRICTIONS[q.network] || { blocked: [], warning: [], allowed: [] };
                    const effectiveChargeable = boxCalculations.totalChargeableWt || q.chargeableWt || 1;
                    const ratePerKg = Math.round(q.totalPrice / effectiveChargeable);
                    const isLowest = q.totalPrice === lowestPrice;
                    const priceDiff = q.totalPrice - lowestPrice;
                    const isFastest = parseTatDays(q.tat) === fastestTatDays;

                    return (
                      <div
                        key={serviceKey}
                        className={`rounded-2xl border transition-all flex flex-col relative bg-white overflow-hidden shadow-xs ${
                          isRecommended 
                            ? 'border-[#f27a1a] ring-2 ring-[#f27a1a]/20 shadow-md' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Top Carrier Accent Bar */}
                        <div className={`h-2 w-full ${meta.accentBar}`}></div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          
                          {/* Card Top: Carrier, Badge, Recommendation & Remove */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}>
                                {meta.name}
                              </span>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => setRecommendedKey(isRecommended ? null : serviceKey)}
                                  title={isRecommended ? "Remove Recommended" : "Mark as Recommended Option"}
                                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                    isRecommended 
                                      ? "text-amber-500 bg-amber-50" 
                                      : "text-slate-400 hover:text-amber-500 hover:bg-slate-100"
                                  }`}
                                >
                                  <Star size={15} fill={isRecommended ? "currentColor" : "none"} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleSelectService(serviceKey)}
                                  title="Remove from comparison"
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer print:hidden"
                                >
                                  <X size={15} />
                                </button>
                              </div>
                            </div>

                            <h4 className="font-extrabold text-[#0D1527] text-base leading-snug">
                              {q.service}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              Zone {q.zone} • {q.rateType === 'S' ? 'Slab Tier Rate' : 'Per-Kg Rate'}
                            </p>
                          </div>

                          {/* Pricing & Difference Block */}
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
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

                            {/* Duty Status Badge near price */}
                            <div>
                              {isDutyFreeService(q.network, q.service) ? (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                                  ✓ 100% Duty Free (Included)
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md inline-block">
                                  Additional Duty May Apply
                                </span>
                              )}
                            </div>

                            {/* Comparison Indicator Pill */}
                            <div className="pt-1 flex items-center justify-between border-t border-slate-200/80 text-xs">
                              {isLowest ? (
                                <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md text-[11px]">
                                  <CheckCircle2 size={12} /> Lowest Rate
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 font-semibold text-slate-600 text-[11px]">
                                  +₹{Math.round(priceDiff).toLocaleString('en-IN')} vs Lowest
                                </span>
                              )}

                              {isFastest ? (
                                <span className="inline-flex items-center gap-1 font-extrabold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-md text-[11px]">
                                  <Zap size={11} /> Fastest TAT
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-500 font-medium">Standard</span>
                              )}
                            </div>
                          </div>

                          {/* Transit & Clearance Specifications */}
                          <div className="space-y-2 text-xs py-1">
                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/70">
                              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                <Clock size={13} className="text-[#f27a1a]" />
                                Estimated Delivery (TAT)
                              </span>
                              <span className="font-bold text-slate-900">{q.tat}</span>
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/70">
                              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                <Scale size={13} className="text-[#f27a1a]" />
                                Total Chargeable Weight
                              </span>
                              <span className="font-mono font-extrabold text-orange-600">
                                {boxCalculations.totalChargeableWt} kg ({boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'})
                              </span>
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/70">
                              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                <ShieldCheck size={13} className="text-[#f27a1a]" />
                                Customs Duty
                              </span>
                              {isDutyFreeService(q.network, q.service) ? (
                                <span className="font-bold text-emerald-700">✓ Duty Free (Included)</span>
                              ) : (
                                <span className="font-medium text-amber-800">Additional Duty May Apply</span>
                              )}
                            </div>
                          </div>

                          {/* Carrier Shipping Guidelines & Restrictions */}
                          <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px]">
                            <span className="font-bold text-slate-800 block text-xs">Courier Guidelines & Policy:</span>
                            
                            {/* Permitted Goods */}
                            {restrictions.allowed.length > 0 && (
                              <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                                <span className="text-emerald-800 font-bold flex items-center gap-1 mb-1">
                                  <ShieldCheck size={12} /> Permitted Items:
                                </span>
                                <ul className="text-slate-700 space-y-0.5 pl-4 list-disc marker:text-emerald-600">
                                  {restrictions.allowed.slice(0, 3).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Blocked Goods */}
                            {restrictions.blocked.length > 0 && (
                              <div className="bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                                <span className="text-red-700 font-bold flex items-center gap-1 mb-1">
                                  <ShieldAlert size={12} /> Prohibited Items:
                                </span>
                                <ul className="text-slate-700 space-y-0.5 pl-4 list-disc marker:text-red-500">
                                  {restrictions.blocked.slice(0, 3).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Special Note */}
                            {restrictions.note && (
                              <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-200">
                                {restrictions.note}
                              </p>
                            )}
                          </div>

                          {/* Card Footer: Set Recommendation / Select */}
                          <div className="pt-2 print:hidden">
                            <button
                              type="button"
                              onClick={() => setRecommendedKey(isRecommended ? null : serviceKey)}
                              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isRecommended
                                  ? 'bg-[#f27a1a] text-white shadow-md shadow-orange-500/20'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                              }`}
                            >
                              <Star size={13} fill={isRecommended ? "currentColor" : "none"} />
                              <span>{isRecommended ? 'Selected as Client Recommendation' : 'Set as Recommended Choice'}</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
