"use client";
import { useState, useRef, useEffect } from "react";
import {
  Phone,
  ChevronDown,
  ChevronRight,
  X,
  Mail,
  Globe,
  Package,
  Clock,
  MapPin,
  ChevronUp,
  LogOut,
  Plus,
  ExternalLink,
  Wallet,
  ShieldCheck,
  Edit,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
  FileText,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";

const LANGUAGES: {
  code: Language;
  label: string;
  native: string;
  flag: string;
}[] = [
  { code: "hi", label: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showMarquee, setShowMarquee] = useState(true);
  const [marqueeText, setMarqueeText] = useState("");
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  // Update states
  const [updatingAwb, setUpdatingAwb] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");

  // Event Push states
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventAwb, setEventAwb] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    EventCode: "PU",
    EventDescription: "Shipment Picked Up",
    EventDate: new Date().toISOString().split("T")[0],
    EventTime: new Date().toTimeString().slice(0, 8),
    Location: "",
    EventUser: "API",
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventSuccess, setEventSuccess] = useState(false);
  const [eventError, setEventError] = useState("");

  // Update form data
  const [updateForm, setUpdateForm] = useState({
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverZipcode: "",
    receiverCountry: "",
    shipperName: "",
    shipperPhone: "",
    shipperEmail: "",
    shipperAddress: "",
    shipperCity: "",
    shipperState: "",
    shipperPincode: "",
    invoiceNo: "",
    invoiceDate: "",
    termsOfSale: "",
    reasonForExport: "",
    serviceName: "",
    networkCode: "",
    basicAmt: 0,
    cgstAmt: 0,
    sgstAmt: 0,
    igstAmt: 0,
    totalAmt: 0,
  });

  const langRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("m5c_customer");
    setCustomer(null);
    setIsAvatarOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const stored = localStorage.getItem("m5c_customer");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.status === "APPROVED") {
          setCustomer(parsed);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Response is not JSON");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.marqueeText !== undefined) {
            setMarqueeText(data.data.marqueeText);
          }
          if (data.data.showMarquee !== undefined) {
            setShowMarquee(data.data.showMarquee);
          }
        }
      })
      .catch((err) =>
        console.warn("Failed to fetch site settings:", err.message),
      );
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setIsAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAvatarOpen && customer && bookings.length === 0 && !loadingBookings) {
      fetchBookings();
    }
  }, [isAvatarOpen, customer]);

  const fetchBookings = async () => {
    if (!customer) return;
    setLoadingBookings(true);
    try {
      const res = await fetch(
        `${API_URL}/portal/shipments?accountCode=${customer.id}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      if (data.success) {
        setBookings(data.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // ============================================================
  // UPDATE FUNCTIONS
  // ============================================================

  const openUpdateModal = (awbNo: string) => {
    const booking = bookings.find((b) => b.awbNo === awbNo);
    if (booking) {
      setUpdateForm({
        receiverName: booking.receiver?.receiverName || "",
        receiverPhone: booking.receiver?.receiverPhone || "",
        receiverEmail: booking.receiver?.receiverEmail || "",
        receiverAddress: booking.receiver?.receiverAddress || "",
        receiverCity: booking.receiver?.receiverCity || "",
        receiverState: booking.receiver?.receiverState || "",
        receiverZipcode: booking.receiver?.receiverZipcode || "",
        receiverCountry: booking.receiver?.receiverCountry || "",
        shipperName: booking.shipper?.shipperName || "",
        shipperPhone: booking.shipper?.shipperPhone || "",
        shipperEmail: booking.shipper?.shipperEmail || "",
        shipperAddress: booking.shipper?.shipperAddress || "",
        shipperCity: booking.shipper?.shipperCity || "",
        shipperState: booking.shipper?.shipperState || "",
        shipperPincode: booking.shipper?.shipperPincode || "",
        invoiceNo: booking.invoiceNo || "",
        invoiceDate: booking.invoiceDate
          ? new Date(booking.invoiceDate).toISOString().split("T")[0]
          : "",
        termsOfSale: booking.termsOfSale || "",
        reasonForExport: booking.reasonForExport || "",
        serviceName: booking.service || "",
        networkCode: booking.network || "",
        basicAmt: booking.basicAmt || 0,
        cgstAmt: booking.cgstAmt || 0,
        sgstAmt: booking.sgstAmt || 0,
        igstAmt: booking.igstAmt || 0,
        totalAmt: booking.totalAmt || 0,
      });
    }
    setUpdatingAwb(awbNo);
    setShowUpdateModal(true);
    setUpdateSuccess(false);
    setUpdateError("");
    setIsAvatarOpen(false);
  };

  const handleUpdateSubmit = async () => {
    if (!updatingAwb) return;

    setUpdateLoading(true);
    setUpdateError("");
    setUpdateSuccess(false);

    try {
      // Format dates for Manvi API (YYYY-MM-DDTHH:mm:ss)
      let formattedInvoiceDate;
      if (updateForm.invoiceDate) {
        formattedInvoiceDate = updateForm.invoiceDate + "T00:00:00";
      } else {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        formattedInvoiceDate = `${year}-${month}-${day}T00:00:00`;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const formattedShipDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      const payload = {
        Awbno: updatingAwb,
        AccountCode: customer?.id || "CUST001",
        ShipDate: formattedShipDate,
        Origin: "DEL",
        PaymentType: "Credit",
        Receiver: {
          ReceiverName: updateForm.receiverName || "N/A",
          ReceiverContactPerson: updateForm.receiverName || "N/A",
          ReceiverAddressLine1: updateForm.receiverAddress || "N/A",
          ReceiverCity: updateForm.receiverCity || "N/A",
          ReceiverState:
            updateForm.receiverState || updateForm.receiverCity || "N/A",
          ReceiverZipcode: updateForm.receiverZipcode || "00000",
          ReceiverCountry: updateForm.receiverCountry || "US",
          ReceiverTelephone: updateForm.receiverPhone || "0000000000",
          ReceiverEmailid: updateForm.receiverEmail || "N/A",
        },
        Sender: {
          SenderName: updateForm.shipperName || "N/A",
          SenderContactPerson: updateForm.shipperName || "N/A",
          SenderAddressLine1: updateForm.shipperAddress || "N/A",
          SenderCity: updateForm.shipperCity || "N/A",
          SenderState: updateForm.shipperState || "N/A",
          SenderPincode: updateForm.shipperPincode || "00000",
          SenderTelephone: updateForm.shipperPhone || "0000000000",
          SenderEmailId: updateForm.shipperEmail || "N/A",
        },
        FreightDetails: {
          BasicAmount: updateForm.basicAmt || 0,
          NetTotal: updateForm.totalAmt || 0,
          CGST: updateForm.cgstAmt || 0,
          SGST: updateForm.sgstAmt || 0,
          IGST: updateForm.igstAmt || 0,
        },
        AdditionalDetails: {
          InvoiceNo: updateForm.invoiceNo || "INV-001",
          InvoiceDate: formattedInvoiceDate,
          TermsOfSale: updateForm.termsOfSale || "DAP",
          ReasonForExport: updateForm.reasonForExport || "Sale",
        },
        ServiceDetails: {
          ServiceCode: updateForm.serviceName || "Express",
          ServiceName: updateForm.serviceName || "Express",
          Forwarder: updateForm.networkCode || "SELF",
          NetworkCode: updateForm.networkCode || "SELF",
          NetworkName: updateForm.networkCode || "Self Network",
          NetworkNo: "01",
          GoodsType: "NDOX",
          PackageType: "PACKAGE",
        },
      };

      const res = await fetch(`${API_URL}/shipment/order-update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Update failed");

      setUpdateSuccess(true);
      setTimeout(() => {
        fetchBookings();
        setShowUpdateModal(false);
        setUpdatingAwb(null);
      }, 1500);
    } catch (err: any) {
      setUpdateError(err.message || "Failed to update shipment");
    } finally {
      setUpdateLoading(false);
    }
  };

  // ============================================================
  // EVENT PUSH FUNCTIONS
  // ============================================================

  const handleEventPush = async () => {
    if (!eventAwb) return;

    setEventLoading(true);
    setEventError("");
    setEventSuccess(false);

    try {
      const payload = {
        Awbno: eventAwb,
        EventCode: eventData.EventCode,
        EventDescription: eventData.EventDescription,
        EventDate: eventData.EventDate,
        EventTime: eventData.EventTime || "00:00:00",
        Location: eventData.Location || "",
        EventUser: eventData.EventUser || "API",
      };

      const res = await fetch(`${API_URL}/shipment/event-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!result.success)
        throw new Error(result.message || "Event push failed");

      setEventSuccess(true);
      setTimeout(() => {
        setShowEventModal(false);
        setEventAwb(null);
        fetchBookings();
      }, 1500);
    } catch (err: any) {
      setEventError(err.message || "Failed to push event");
    } finally {
      setEventLoading(false);
    }
  };

  // ============================================================

  const currentLang = LANGUAGES.find((l) => l.code === language);

  const handleSelectLang = (code: Language) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "BOOKED":
        return "text-emerald-400";
      case "ON_HOLD":
        return "text-amber-400";
      case "DELIVERED":
        return "text-blue-400";
      case "CANCELLED":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full flex flex-col">
        {/* Top utility bar */}
        <div className="bg-[#0D1527] text-zinc-300 text-[12px] font-semibold py-3.5 px-4 sm:px-6 border-b border-white/5 relative z-50">
          <div className="max-w-425 mx-auto flex flex-col md:flex-row justify-between items-center gap-2.5 md:gap-0">
            <div className="flex items-center justify-between sm:justify-start gap-4 w-full md:w-auto">
              <a
                href="tel:+917070506070"
                className="flex items-center gap-1.5 sm:gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-white shrink-0" />
                <span className="text-white/90 truncate">
                  +91 70 70 50 60 70
                </span>
              </a>
              <a
                href="mailto:Info@manvicourier.com"
                className="flex items-center gap-1.5 sm:gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-white shrink-0" />
                <span className="text-white/90 truncate">
                  Info@manvicourier.com
                </span>
              </a>
            </div>

            {/* Marquee offer strip */}
            <div className="flex flex-1 w-full mx-0 md:mx-6 overflow-hidden relative pt-1 md:pt-0">
              {showMarquee &&
                marqueeText &&
                (() => {
                  const Marquee = "marquee" as any;
                  return (
                    <Marquee
                      behavior="scroll"
                      direction="left"
                      scrollamount="3"
                      className="text-[12.5px] md:text-[14.5px] font-medium md:font-extrabold tracking-wide whitespace-pre"
                      style={{ color: "#f27a1a" }}
                    >
                      {marqueeText}
                    </Marquee>
                  ) as any;
                })()}
            </div>

            <div className="hidden sm:flex items-center gap-6 overflow-visible">
              <Link
                href="/zipcode"
                className="hover:text-white transition-colors"
              >
                {t.nav_zipcode}
              </Link>

              {/* Language Dropdown */}
              <div className="relative overflow-visible" ref={langRef}>
                <button
                  id="language-selector"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isLangOpen}
                  aria-haspopup="listbox"
                  aria-controls="language-dropdown-list"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>
                    {currentLang
                      ? `${currentLang.flag} ${currentLang.native}`
                      : t.nav_language}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangOpen && (
                  <div
                    id="language-dropdown-list"
                    role="listbox"
                    aria-labelledby="language-selector"
                    className="absolute right-0 top-full mt-2 w-44 bg-[#0f1a2e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[200] animate-in fade-in duration-150"
                  >
                    <button
                      role="option"
                      aria-selected={language === "en"}
                      onClick={() => handleSelectLang("en")}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                        language === "en"
                          ? "bg-[#f27a1a] text-white"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-base">🌐</span>
                      <span className="flex flex-col items-start leading-none gap-0.5">
                        <span>English</span>
                        <span className="text-[10px] opacity-60">English</span>
                      </span>
                    </button>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        role="option"
                        aria-selected={language === lang.code}
                        onClick={() => handleSelectLang(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                          language === lang.code
                            ? "bg-[#f27a1a] text-white"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="flex flex-col items-start leading-none gap-0.5">
                          <span>{lang.label}</span>
                          <span className="text-[10px] opacity-60">
                            {lang.native}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <header className="px-4 sm:px-6 py-4 relative z-40">
          <div className="max-w-425 mx-auto bg-[#0D1527] rounded-2xl px-6 sm:px-8 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "70.69px", height: "36px", opacity: 1 }}
                className="object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-[18px] font-league-spartan">
                  Manvi
                </span>
                <span className="text-white font-bold text-[18px] font-league-spartan">
                  International Courier
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-8 text-[13px] font-semibold text-white">
                <Link
                  href="/about"
                  className={`transition-colors ${pathname?.startsWith("/about") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_about}
                </Link>
                <Link
                  href="/services"
                  className={`transition-colors ${pathname?.startsWith("/services") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_services}
                </Link>
                <Link
                  href="/quote"
                  className={`transition-colors ${pathname?.startsWith("/quote") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_quote}
                </Link>
                <Link
                  href="/contact"
                  className={`transition-colors ${pathname?.startsWith("/contact") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.nav_contact}
                </Link>
                <Link
                  href="/blog"
                  className={`transition-colors ${pathname?.startsWith("/blog") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.footer_blog}
                </Link>
                <Link
                  href="/career"
                  className={`transition-colors ${pathname?.startsWith("/career") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"}`}
                >
                  {t.footer_career}
                </Link>
                {!customer && (
                  <Link
                    href="/customer/login"
                    className={`transition-colors ${pathname?.startsWith("/customer") ? "text-[#f27a1a]" : "hover:text-[#f27a1a]"} whitespace-nowrap`}
                  >
                    Customer Login
                  </Link>
                )}
              </nav>

              <Link
                href="/book-shipment"
                className={`px-4 py-2 rounded-full text-[13px] font-bold border border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors whitespace-nowrap ${
                  pathname?.startsWith("/book-shipment")
                    ? "bg-[#f27a1a] text-white"
                    : ""
                }`}
              >
                Book Shipment
              </Link>
              <Link
                href="/track"
                className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors whitespace-nowrap ${
                  pathname?.startsWith("/track")
                    ? "bg-orange-600 text-white"
                    : "bg-[#f27a1a] text-white hover:bg-orange-600"
                }`}
              >
                {t.nav_track}
              </Link>

              {/* Customer Avatar */}
              {customer && (
                <div className="relative ml-1" ref={avatarRef}>
                  <button
                    onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                    className="w-9 h-9 rounded-full bg-[#f27a1a] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white/20 hover:scale-105 transition-all focus:outline-none select-none"
                    title={customer.name}
                  >
                    {getInitials(customer.name)}
                  </button>

                  {isAvatarOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#0D1527] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 text-xs">
                      {/* Header */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                        <div className="w-9 h-9 rounded-full bg-[#f27a1a] text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {getInitials(customer.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate text-sm">
                            {customer.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono truncate">
                            {customer.id}
                          </p>
                        </div>
                      </div>

                      {/* Recent Bookings with Update & Event Buttons */}
                      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Recent Shipments
                        </span>
                        <Link
                          href="/customer/bookings"
                          onClick={() => setIsAvatarOpen(false)}
                          className="text-[10px] text-[#f27a1a] hover:underline"
                        >
                          View All
                        </Link>
                      </div>
                      <div className="max-h-52 overflow-y-auto">
                        {loadingBookings ? (
                          <div className="px-4 py-3 text-center text-slate-400">
                            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                            Loading...
                          </div>
                        ) : bookings.length === 0 ? (
                          <div className="px-4 py-3 text-center text-slate-400">
                            No shipments yet
                          </div>
                        ) : (
                          bookings.map((b) => (
                            <div
                              key={b.awbNo}
                              className="group flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                            >
                              <Link
                                href={`/track?awb=${b.awbNo}`}
                                onClick={() => setIsAvatarOpen(false)}
                                className="flex-1 min-w-0"
                              >
                                <div className="min-w-0">
                                  <p className="font-semibold text-white truncate">
                                    {b.awbNo}
                                  </p>
                                  <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                                    {b.destination || "N/A"}
                                  </p>
                                </div>
                              </Link>
                              <div className="flex items-center gap-1 shrink-0">
                                <span
                                  className={`text-[10px] font-bold ${getStatusColor(b.status)}`}
                                >
                                  {b.status || "BOOKED"}
                                </span>
                                {/* UPDATE BUTTON */}
                                <button
                                  onClick={() => openUpdateModal(b.awbNo)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[#f27a1a]/20 text-slate-400 hover:text-[#f27a1a]"
                                  title="Update Shipment"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                {/* EVENT PUSH BUTTON */}
                                <button
                                  onClick={() => {
                                    setEventAwb(b.awbNo);
                                    setShowEventModal(true);
                                    setIsAvatarOpen(false);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-blue-500/20 text-slate-400 hover:text-blue-400"
                                  title="Push Tracking Event"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Actions */}
                      <div className="border-t border-white/10 p-2 flex flex-col gap-1">
                        <Link
                          href="/book-shipment"
                          onClick={() => setIsAvatarOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-[#f27a1a] rounded-xl transition-colors font-medium"
                        >
                          <Package size={13} /> Book New Shipment
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium"
                        >
                          <LogOut size={13} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden w-10 h-10 bg-[#f27a1a] rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-white h-5 w-5" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
                  <rect x="0" y="0" width="4" height="4" rx="1" />
                  <rect x="6" y="0" width="4" height="4" rx="1" />
                  <rect x="12" y="0" width="4" height="4" rx="1" />
                  <rect x="0" y="6" width="4" height="4" rx="1" />
                  <rect x="6" y="6" width="4" height="4" rx="1" />
                  <rect x="12" y="6" width="4" height="4" rx="1" />
                  <rect x="0" y="12" width="4" height="4" rx="1" />
                  <rect x="6" y="12" width="4" height="4" rx="1" />
                  <rect x="12" y="12" width="4" height="4" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-33.75 z-40 bg-white px-6 py-6 shadow-xl border-t border-gray-100 flex flex-col gap-6 font-sans overflow-y-auto">
          <nav className="flex flex-col gap-4 text-[16px] font-bold text-[#1c1f2e]">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname === "/" ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_home}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/about") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_about}
            </Link>
            {customer ? (
              <Link
                href="/customer/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/customer") ? "text-[#f27a1a]" : ""}`}
              >
                Customer Dashboard
              </Link>
            ) : (
              <Link
                href="/customer/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/customer") ? "text-[#f27a1a]" : ""}`}
              >
                Customer Login
              </Link>
            )}
            <Link
              href="/track"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/track") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_track_shipment}
            </Link>
            <Link
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/quote") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_quote}
            </Link>
            <Link
              href="/zipcode"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/zipcode") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_zipcode}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/contact") ? "text-[#f27a1a]" : ""}`}
            >
              {t.nav_contact}
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/blog") ? "text-[#f27a1a]" : ""}`}
            >
              {t.footer_blog}
            </Link>
            <Link
              href="/career"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`pb-2 border-b border-gray-100 ${pathname?.startsWith("/career") ? "text-[#f27a1a]" : ""}`}
            >
              {t.footer_career}
            </Link>
            {customer && (
              <Link
                href="/book-shipment"
                onClick={() => setIsMobileMenuOpen(false)}
                className="pb-2 border-b border-gray-100 text-[#f27a1a]"
              >
                Book Shipment
              </Link>
            )}
          </nav>

          {/* Mobile Language Selector */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              {t.nav_language}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleSelectLang("en");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold border transition-colors ${language === "en" ? "bg-[#f27a1a] text-white border-[#f27a1a]" : "border-gray-200 text-gray-700 hover:border-[#f27a1a] hover:text-[#f27a1a]"}`}
              >
                <span>🌐</span> English
              </button>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleSelectLang(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold border transition-colors ${language === lang.code ? "bg-[#f27a1a] text-white border-[#f27a1a]" : "border-gray-200 text-gray-700 hover:border-[#f27a1a] hover:text-[#f27a1a]"}`}
                >
                  <span>{lang.flag}</span> {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {pathname && pathname !== "/" && pathname !== "/campaign" && (
        <div className="py-3.5 px-4 sm:px-6 relative z-30">
          <div className="max-w-425 w-full mx-auto flex items-center gap-2 text-sm font-light text-gray-800">
            <Link href="/" className="hover:text-[#f27a1a] transition-colors">
              {t.nav_home}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
            <span className="text-gray-900 font-medium uppercase tracking-wide">
              {pathname === "/about" && t.bc_about}
              {pathname === "/track" && t.bc_track}
              {pathname === "/zipcode" && t.bc_zipcode}
              {pathname === "/contact" && t.bc_contact}
              {pathname === "/quote" && t.bc_quote}
              {pathname === "/faq" && t.bc_faq}
              {pathname === "/services" && t.bc_services}
              {pathname === "/business-campaign" && t.bc_business_campaign}
              {pathname === "/blog" && "Blog"}
              {pathname === "/career" && "Careers"}
              {pathname === "/pickup-availability" && "Pickup Availability"}
              {pathname === "/customer/bookings" && "My Bookings"}
              {pathname === "/customer/dashboard" && "Dashboard"}
            </span>
          </div>
        </div>
      )}

      {/* ============================================================
          UPDATE MODAL
          ============================================================ */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0D1527] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[#f27a1a]" />
                  Update Shipment
                </h2>
                <p className="text-xs text-slate-400">
                  AWB:{" "}
                  <span className="font-mono font-bold text-[#f27a1a]">
                    {updatingAwb}
                  </span>
                </p>
              </div>
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setUpdatingAwb(null);
                }}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {updateSuccess && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 mb-4">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Shipment updated successfully!</span>
              </div>
            )}

            {updateError && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 mb-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{updateError}</span>
              </div>
            )}

            {!updateSuccess && (
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-[#f27a1a] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <User className="w-4 h-4" /> Receiver Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ["receiverName", "Receiver Name *"],
                      ["receiverPhone", "Phone *"],
                      ["receiverEmail", "Email"],
                      ["receiverAddress", "Address *"],
                      ["receiverCity", "City *"],
                      ["receiverState", "State"],
                      ["receiverZipcode", "Zipcode *"],
                      ["receiverCountry", "Country *"],
                    ].map(([key, label]) => (
                      <div
                        key={key}
                        className={
                          key === "receiverAddress" || key === "receiverCountry"
                            ? "sm:col-span-2"
                            : ""
                        }
                      >
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          value={(updateForm as any)[key] || ""}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-slate-500 focus:border-[#f27a1a] outline-none"
                          placeholder={label.replace("*", "").trim()}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-bold text-[#f27a1a] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4" /> Shipper Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ["shipperName", "Shipper Name *"],
                      ["shipperPhone", "Phone *"],
                      ["shipperEmail", "Email"],
                      ["shipperAddress", "Address *"],
                      ["shipperCity", "City *"],
                      ["shipperState", "State *"],
                      ["shipperPincode", "Pincode *"],
                    ].map(([key, label]) => (
                      <div
                        key={key}
                        className={
                          key === "shipperAddress" ? "sm:col-span-2" : ""
                        }
                      >
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          value={(updateForm as any)[key] || ""}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-slate-500 focus:border-[#f27a1a] outline-none"
                          placeholder={label.replace("*", "").trim()}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-bold text-[#f27a1a] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4" /> Invoice & Customs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ["invoiceNo", "Invoice No"],
                      ["invoiceDate", "Invoice Date"],
                      ["termsOfSale", "Terms of Sale"],
                      ["reasonForExport", "Reason for Export"],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {label}
                        </label>
                        <input
                          type={key === "invoiceDate" ? "date" : "text"}
                          value={(updateForm as any)[key] || ""}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-slate-500 focus:border-[#f27a1a] outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-bold text-[#f27a1a] uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4" /> Freight & Service
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      ["basicAmt", "Basic Amt"],
                      ["cgstAmt", "CGST"],
                      ["sgstAmt", "SGST"],
                      ["igstAmt", "IGST"],
                      ["totalAmt", "Total Amt"],
                      ["serviceName", "Service"],
                      ["networkCode", "Network"],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {label}
                        </label>
                        <input
                          type={key.includes("Amt") ? "number" : "text"}
                          value={(updateForm as any)[key] || ""}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              [key]: key.includes("Amt")
                                ? parseFloat(e.target.value) || 0
                                : e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-slate-500 focus:border-[#f27a1a] outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowUpdateModal(false);
                      setUpdatingAwb(null);
                    }}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 font-semibold rounded-xl text-slate-300 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSubmit}
                    disabled={updateLoading}
                    className="px-6 py-2.5 bg-[#f27a1a] hover:bg-orange-600 font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    {updateLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Shipment
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {updateSuccess && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setShowUpdateModal(false);
                    setUpdatingAwb(null);
                  }}
                  className="px-6 py-2.5 bg-[#f27a1a] hover:bg-orange-600 font-bold rounded-xl text-white transition-colors text-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ============================================================ */}

      {/* ============================================================
          EVENT PUSH MODAL
          ============================================================ */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0D1527] border border-white/10 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#f27a1a]" />
                  Push Tracking Event
                </h2>
                <p className="text-xs text-slate-400">
                  AWB:{" "}
                  <span className="font-mono font-bold text-[#f27a1a]">
                    {eventAwb}
                  </span>
                </p>
              </div>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setEventAwb(null);
                }}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {eventSuccess && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 mb-4">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Event pushed successfully!</span>
              </div>
            )}

            {eventError && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 mb-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{eventError}</span>
              </div>
            )}

            {!eventSuccess && (
              <>
                <div className="mb-4">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Event Code *
                  </label>
                  <select
                    value={eventData.EventCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      const descriptions: Record<string, string> = {
                        PU: "Shipment Picked Up",
                        PD: "Shipment Processed",
                        TR: "In Transit",
                        OD: "Out for Delivery",
                        DL: "Delivered",
                        CN: "Cancelled",
                        RT: "Returned",
                        EX: "Export Clearance",
                        IM: "Import Clearance",
                        AR: "Arrived at Destination",
                      };
                      setEventData({
                        ...eventData,
                        EventCode: code,
                        EventDescription: descriptions[code] || code,
                      });
                    }}
                    className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-[#f27a1a] outline-none"
                  >
                    <option value="PU">PU - Picked Up</option>
                    <option value="PD">PD - Processed</option>
                    <option value="TR">TR - In Transit</option>
                    <option value="OD">OD - Out for Delivery</option>
                    <option value="DL">DL - Delivered</option>
                    <option value="CN">CN - Cancelled</option>
                    <option value="RT">RT - Returned</option>
                    <option value="EX">EX - Export Clearance</option>
                    <option value="IM">IM - Import Clearance</option>
                    <option value="AR">AR - Arrived at Destination</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Event Description *
                  </label>
                  <input
                    type="text"
                    value={eventData.EventDescription}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        EventDescription: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-[#f27a1a] outline-none"
                    placeholder="e.g. Shipment Picked Up"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventData.EventDate}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        EventDate: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-[#f27a1a] outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Event Time
                  </label>
                  <input
                    type="time"
                    value={eventData.EventTime}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        EventTime: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-[#f27a1a] outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventData.Location}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        Location: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-[#f27a1a] outline-none"
                    placeholder="e.g. Delhi, IN"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowEventModal(false);
                      setEventAwb(null);
                    }}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 font-semibold rounded-xl text-slate-300 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEventPush}
                    disabled={eventLoading}
                    className="px-6 py-2.5 bg-[#f27a1a] hover:bg-orange-600 font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    {eventLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Pushing...
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4" />
                        Push Event
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {eventSuccess && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setEventAwb(null);
                  }}
                  className="px-6 py-2.5 bg-[#f27a1a] hover:bg-orange-600 font-bold rounded-xl text-white transition-colors text-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ============================================================ */}
    </>
  );
}
