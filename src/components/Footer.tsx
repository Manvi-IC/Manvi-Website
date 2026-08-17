// components/Footer.tsx
"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  // Accordion state for mobile view
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    quick: true,
    campaigns: true,
    policies: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-[#f27a1a] text-white pt-12 sm:pt-16 pb-8 px-4 sm:px-6 font-sans rounded-t-2xl sm:rounded-t-3xl shadow-inner">
      <div className="max-w-[1650px] mx-auto flex flex-col gap-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/footer-logo.png"
                alt="Manvi International Courier Logo"
                width={71}
                height={36}
                loading="lazy"
                style={{ width: "70.69px", height: "36px", opacity: 1 }}
                className="object-contain shrink-0"
              />
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: "var(--font-league-spartan), sans-serif",
                    fontWeight: 700,
                    fontSize: "24.16px",
                    lineHeight: "100%",
                    letterSpacing: 0,
                  }}
                  className="text-white"
                >
                  Manvi
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-league-spartan), sans-serif",
                    fontWeight: 700,
                    fontSize: "24.16px",
                    lineHeight: "100%",
                    letterSpacing: 0,
                  }}
                  className="text-white"
                >
                  International Courier
                </span>
              </div>
            </div>
            <p className="text-white/90 text-[13.5px] italic leading-relaxed max-w-sm">
              {t.footer_tagline}
            </p>
            <p className="text-white/75 text-[12.5px] leading-relaxed max-w-sm">
              {t.footer_desc}
            </p>

            {/* Social Icons with PageSpeed Lighthouse compliant touch targets (44px+) */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-white/90 text-[13px] font-semibold">
                {t.footer_social}
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/Manvi-International-Courier-61575480958807/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors border border-white/15"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/manviinternational/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors border border-white/15"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* Globe */}
                <a
                  href="#"
                  aria-label="Website Link"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors border border-white/15"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Policies */}
          <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-6">
            <div className="hidden md:flex flex-col gap-3">
              <h3 className="text-[18px] font-extrabold text-white">
                {t.footer_quick_links}
              </h3>
              <div className="w-full h-[1px] bg-white/30" />
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden md:grid grid-cols-3 gap-x-4 gap-y-3 text-[14px] text-white/85 font-medium">
              {/* Column 1: Main Pages */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-0.5">
                  Navigation
                </span>
                <Link href="/" className="hover:text-white transition-colors py-0.5">
                  {t.nav_home}
                </Link>
                <Link href="/about" className="hover:text-white transition-colors py-0.5">
                  {t.nav_about}
                </Link>
                <Link href="/services" className="hover:text-white transition-colors py-0.5">
                  {t.nav_services}
                </Link>
                <Link href="/track" className="hover:text-white transition-colors py-0.5">
                  {t.nav_track_shipment}
                </Link>
                <Link href="/quote" className="hover:text-white transition-colors py-0.5">
                  {t.nav_quote}
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors py-0.5">
                  {t.nav_contact}
                </Link>
                <Link href="/faq" className="hover:text-white transition-colors py-0.5">
                  {t.bc_faq}
                </Link>
              </div>

              {/* Column 2: Campaigns & Career */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-0.5">
                  Explore
                </span>
                <Link
                  href="/campaign"
                  className="hover:text-white transition-colors font-semibold py-0.5"
                >
                  {t.footer_campaign}
                </Link>
                <Link
                  href="/business-campaign"
                  className="hover:text-white transition-colors font-semibold py-0.5"
                >
                  {t.footer_business_campaign}
                </Link>
                <Link href="/blog" className="hover:text-white transition-colors py-0.5">
                  {t.footer_blog}
                </Link>
                <Link href="/career" className="hover:text-white transition-colors py-0.5">
                  {t.footer_career}
                </Link>
              </div>

              {/* Column 3: Legal & Policies */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-0.5">
                  Legal & Policies
                </span>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors py-0.5"
                >
                  {t.footer_privacy_policy}
                </Link>
                <Link
                  href="/refund-policy"
                  className="hover:text-white transition-colors py-0.5"
                >
                  {t.footer_refund_policy}
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-white transition-colors py-0.5"
                >
                  {t.footer_terms}
                </Link>
                <Link
                  href="/shipping-policy"
                  className="hover:text-white transition-colors py-0.5"
                >
                  {t.footer_shipping_policy}
                </Link>
                <Link
                  href="/mandatory-policy"
                  className="hover:text-white transition-colors py-0.5"
                >
                  {t.footer_mandatory_policy}
                </Link>
              </div>
            </div>

            {/* Mobile Accordion View (< md) */}
            <div className="flex md:hidden flex-col gap-3">
              {/* Section 1: Navigation */}
              <div className="border border-white/20 rounded-xl bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection("quick")}
                  className="w-full px-4 py-3 flex items-center justify-between font-extrabold text-[15px] text-white text-left focus:outline-none"
                >
                  <span>{t.footer_quick_links}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openSections.quick ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openSections.quick && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/10 grid grid-cols-2 gap-2 text-[13.5px] text-white/90">
                    <Link href="/" className="py-1.5 hover:text-white transition-colors">
                      {t.nav_home}
                    </Link>
                    <Link href="/about" className="py-1.5 hover:text-white transition-colors">
                      {t.nav_about}
                    </Link>
                    <Link href="/services" className="py-1.5 hover:text-white transition-colors">
                      {t.nav_services}
                    </Link>
                    <Link href="/track" className="py-1.5 hover:text-white transition-colors">
                      {t.nav_track_shipment}
                    </Link>
                    <Link href="/quote" className="py-1.5 hover:text-white transition-colors">
                      {t.nav_quote}
                    </Link>
                    <Link href="/contact" className="py-1.5 hover:text-white transition-colors">
                      {t.nav_contact}
                    </Link>
                    <Link href="/faq" className="py-1.5 hover:text-white transition-colors col-span-2">
                      {t.bc_faq}
                    </Link>
                  </div>
                )}
              </div>

              {/* Section 2: Explore & Campaigns */}
              <div className="border border-white/20 rounded-xl bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection("campaigns")}
                  className="w-full px-4 py-3 flex items-center justify-between font-extrabold text-[15px] text-white text-left focus:outline-none"
                >
                  <span>Explore & Programs</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openSections.campaigns ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openSections.campaigns && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-1.5 text-[13.5px] text-white/90">
                    <Link
                      href="/campaign"
                      className="py-1.5 hover:text-white transition-colors font-semibold"
                    >
                      {t.footer_campaign}
                    </Link>
                    <Link
                      href="/business-campaign"
                      className="py-1.5 hover:text-white transition-colors font-semibold"
                    >
                      {t.footer_business_campaign}
                    </Link>
                    <Link href="/blog" className="py-1.5 hover:text-white transition-colors">
                      {t.footer_blog}
                    </Link>
                    <Link href="/career" className="py-1.5 hover:text-white transition-colors">
                      {t.footer_career}
                    </Link>
                  </div>
                )}
              </div>

              {/* Section 3: Legal & Policies */}
              <div className="border border-white/20 rounded-xl bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection("policies")}
                  className="w-full px-4 py-3 flex items-center justify-between font-extrabold text-[15px] text-white text-left focus:outline-none"
                >
                  <span>Legal & Policies</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openSections.policies ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openSections.policies && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-1.5 text-[13.5px] text-white/90">
                    <Link
                      href="/privacy-policy"
                      className="py-1.5 hover:text-white transition-colors"
                    >
                      {t.footer_privacy_policy}
                    </Link>
                    <Link
                      href="/refund-policy"
                      className="py-1.5 hover:text-white transition-colors"
                    >
                      {t.footer_refund_policy}
                    </Link>
                    <Link
                      href="/terms-and-conditions"
                      className="py-1.5 hover:text-white transition-colors"
                    >
                      {t.footer_terms}
                    </Link>
                    <Link
                      href="/shipping-policy"
                      className="py-1.5 hover:text-white transition-colors"
                    >
                      {t.footer_shipping_policy}
                    </Link>
                    <Link
                      href="/mandatory-policy"
                      className="py-1.5 hover:text-white transition-colors"
                    >
                      {t.footer_mandatory_policy}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Office Info */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[18px] font-extrabold text-white">
                {t.footer_office_info}
              </h3>
              <div className="w-full h-[1px] bg-white/30" />
            </div>
            <div className="flex flex-col gap-3">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-[16px] h-[16px] text-white shrink-0" />
                <a
                  href="tel:+917070506070"
                  className="text-[14px] text-white/90 font-medium hover:text-white transition-colors py-0.5"
                >
                  +91 70 70 50 60 70
                </a>
              </div>
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-[16px] h-[16px] text-white shrink-0" />
                <a
                  href="mailto:info@manvicourier.com"
                  className="text-[14px] text-white/90 font-medium hover:text-white transition-colors py-0.5 break-all sm:break-normal"
                >
                  info@manvicourier.com
                </a>
              </div>
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-[16px] h-[16px] text-white shrink-0 mt-0.5" />
                <div className="flex flex-col text-[13.5px] text-white/90 font-medium leading-relaxed">
                  <span>C1034, A 2ND FLOOR, HARIJAN BASTI,</span>
                  <span>PALAM EXTN, PART-1 RAMPHAL CHOWK, NEW DELHI, INDIA, 110045</span>
                </div>
              </div>
            </div>

            {/* Map - Responsive for mobile */}
            <div className="w-full max-w-full lg:max-w-[260px] h-[160px] sm:h-[150px] rounded-2xl overflow-hidden mt-1 shadow-md border border-white/25 shrink-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890!2d77.0691071!3d28.5850824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1bec78b44a8d%3A0xdaff70b1db8da2c0!2sManvi%20International%20Courier!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Manvi International Courier Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[12.5px] sm:text-[13px] text-white/80 text-center">
          <div className="flex items-center gap-2">
            <span>&copy; 2026</span>
            <span className="font-semibold text-white">Manvi International Courier</span>
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <span>{t.footer_rights}</span>
        </div>
      </div>
    </footer>
  );
}
