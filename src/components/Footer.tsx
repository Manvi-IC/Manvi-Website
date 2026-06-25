// components/Footer.tsx
"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f27a1a] text-white pt-16 pb-8 px-6 font-sans rounded-t-2xl">
      <div className="max-w-425 mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/footer-logo.png"
                alt="Logo"
                style={{ width: "70.69px", height: "36px", opacity: 1 }}
                className="object-contain"
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
            <p className="text-white/80 text-[13px] italic leading-relaxed max-w-sm">
              {t.footer_tagline}
            </p>
            <p className="text-white/70 text-[12px] leading-relaxed max-w-sm">
              {t.footer_desc}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-white/80 text-[13px] font-semibold">
                {t.footer_social}
              </span>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/Manvi-International-Courier-61575480958807/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/70 transition-colors"
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
                  className="text-white hover:text-white/70 transition-colors"
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
                  className="text-white hover:text-white/70 transition-colors"
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

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-extrabold text-white">
                {t.footer_quick_links}
              </h3>
              <div className="w-full h-[1px] bg-white/30" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-[14px] text-white/85 font-medium">
              {/* Left Column */}
              <div className="flex flex-col gap-3">
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav_home}
                </Link>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  {t.nav_about}
                </Link>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {t.nav_services}
                </Link>
                <Link
                  href="/track"
                  className="hover:text-white transition-colors"
                >
                  {t.nav_track_shipment}
                </Link>
                <Link
                  href="/quote"
                  className="hover:text-white transition-colors"
                >
                  {t.nav_quote}
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  {t.nav_contact}
                </Link>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  {t.bc_faq}
                </Link>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-3">
                {/* <Link
                  href="/pickup-availability"
                  className="hover:text-white transition-colors"
                >
                  {t.footer_pickup_availability}
                </Link> */}
                <Link
                  href="/campaign"
                  className="hover:text-white transition-colors font-bold"
                >
                  {t.footer_campaign}
                </Link>
                <Link
                  href="/business-campaign"
                  className="hover:text-white transition-colors font-bold"
                >
                  {t.footer_business_campaign}
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  {t.footer_blog}
                </Link>
                <Link
                  href="/career"
                  className="hover:text-white transition-colors"
                >
                  {t.footer_career}
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Office Info */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-extrabold text-white">
                {t.footer_office_info}
              </h3>
              <div className="w-full h-[1px] bg-white/30" />
            </div>
            <div className="flex flex-col gap-3">
              {/* Phone - reduced gap */}
              <div className="flex items-center gap-3">
                <Phone className="w-[16px] h-[16px] text-white shrink-0" />
                <span className="text-[14px] text-white/85 font-medium">
                  +91 70 70 50 60 70
                </span>
              </div>
              {/* Email - reduced gap */}
              <div className="flex items-center gap-3">
                <Mail className="w-[16px] h-[16px] text-white shrink-0" />
                <span className="text-[14px] text-white/85 font-medium">
                  info@manvicourier.com
                </span>
              </div>
              {/* Address - reduced gap */}
              <div className="flex items-start gap-3">
                <MapPin className="w-[16px] h-[16px] text-white shrink-0 mt-0.5" />
                <div className="flex flex-col text-[14px] text-white/85 font-medium leading-relaxed">
                  <span>C-699, Palam Extension, Sector 7,</span>
                  <span>Dwarka, New Delhi, 110077</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div
              className="w-full rounded-[20px] overflow-hidden mt-1"
              style={{ height: "200px" }}
            >
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
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-[13px] text-white/80">
          <span>&copy; 2026</span>
          <span className="font-semibold">Manvi International Courier</span>
          <span>{t.footer_rights}</span>
        </div>
      </div>
    </footer>
  );
}
