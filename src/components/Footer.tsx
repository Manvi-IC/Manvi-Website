import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
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
                style={{
                  width: "70.69px",
                  height: "36px",
                  opacity: 1,
                }}
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
              Connecting Families, Bridging Distances
            </p>
            <p className="text-white/70 text-[12px] leading-relaxed max-w-sm">
              Trusted by 10,000+ happy customers and with over 50,000 successful international shipments, we deliver fast, secure, and seamless courier and freight solutions you can rely on.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-white/80 text-[13px] font-semibold">
                Social Network
              </span>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/Manvi-International-Courier-61575480958807/"
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
                {/* Twitter */}
                {/* <a
                  href="#"
                  className="text-white hover:text-white/70 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a> */}
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
                Quick Links
              </h3>
              <div className="w-full h-[1px] bg-white/30" />
            </div>
            <div className="flex flex-col gap-3 text-[14px] text-white/85 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/track"
                className="hover:text-white transition-colors"
              >
                Tracking
              </Link>
              <Link
                href="/quote"
                className="hover:text-white transition-colors"
              >
                Get Quote
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Column 3: Office Info */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-extrabold text-white">
                Office Info
              </h3>
              <div className="w-full h-[1px] bg-white/30" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Phone className="w-[18px] h-[18px] text-white shrink-0" />
                <span className="text-[14px] text-white/85 font-medium">
                  +91 7070-506070
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-[18px] h-[18px] text-white shrink-0" />
                <span className="text-[14px] text-white/85 font-medium">
                  info@manvicourier.com
                </span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-[18px] h-[18px] text-white shrink-0 mt-0.5" />
                <div className="flex flex-col text-[14px] text-white/85 font-medium">
                  <span>C-699, Palam Extension, Sector 7,</span>
                  <span>Dwarka, New Delhi, 110077</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-[13px] text-white/80">
          <span>&copy; 2024</span>
          <span className="font-semibold">Manvi International Courier</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
