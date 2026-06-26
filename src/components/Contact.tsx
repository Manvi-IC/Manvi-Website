"use client";
import { Phone, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const WhatsAppIcon = ({
  width = 16,
  height = 16,
  fill = "currentColor",
  className = "",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
export default function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="max-w-425 w-full mx-auto px-6 mt-6 mb-20 font-sans"
    >
      <div className="bg-[#eef0f5] rounded-4xl px-6 sm:px-10 md:px-16 lg:px-20 pt-14 md:pt-20 pb-0 overflow-hidden shadow-sm border border-gray-100">
        {/* Top Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-8 lg:gap-12 items-start mb-12">
          {/* Left: Badge + Title + Description */}
          <div className="flex flex-col gap-4">
            <div className="border border-orange-300 text-[#ff8a00] bg-transparent rounded-full px-4 py-1 text-[12px] font-bold tracking-wide w-fit">
              {t.contact_badge}
            </div>
            <h2 className="text-[26px] md:text-[38px] font-extrabold text-[#1c1f2e] tracking-tight leading-tight">
              {t.contact_title}
            </h2>
            <p className="text-[13px] text-gray-400 font-medium leading-relaxed max-w-[95%]">
              {t.contact_desc}
            </p>
          </div>

          {/* Middle: Call Us */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-[48px] h-[48px] rounded-full bg-[#ff8a00] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[18px] font-extrabold text-[#1c1f2e]">
                  {t.contact_call}
                </span>
                <span className="text-[14px] text-gray-500 font-medium">
                  +91 70 70 50 60 70
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-[48px] h-[48px] rounded-full bg-[#008000] flex items-center justify-center shrink-0">
                <WhatsAppIcon width={20} height={20} fill="white" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[18px] font-extrabold text-[#1c1f2e]">
                  {t.contact_whatsapp}
                </span>
                <a
                  href="https://wa.me/917070506070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-gray-500 font-medium hover:text-[#ff8a00] transition-colors"
                >
                  +91 70 70 50 60 70
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="flex items-start gap-4">
            <div className="w-[48px] h-[48px] rounded-full bg-[#ff8a00] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[18px] font-extrabold text-[#1c1f2e]">
                {t.contact_info}
              </span>
              <span className="text-[14px] text-gray-500 font-medium">
                info@manvicourier.com
              </span>
              <a
                href="https://www.instagram.com/manviinternational/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-gray-500 font-medium hover:text-[#f27a1a] transition-colors"
              >
                @manviinternational
              </a>
            </div>
          </div>
        </div>

        {/* Full-width Google Map */}
        <div
          className="w-full rounded-t-[20px] overflow-hidden"
          style={{ height: "340px" }}
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
    </section>
  );
}
