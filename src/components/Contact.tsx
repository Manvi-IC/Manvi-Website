import { Phone, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="max-w-[1700px] w-full mx-auto px-6 mt-6 mb-20 font-sans">
      <div className="bg-[#eef0f5] rounded-[32px] px-10 md:px-16 lg:px-20 pt-14 md:pt-20 pb-0 overflow-hidden shadow-sm border border-gray-100">
        
        {/* Top Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-8 lg:gap-12 items-start mb-12">
          
          {/* Left: Badge + Title + Description */}
          <div className="flex flex-col gap-4">
            <div className="border border-orange-300 text-[#ff8a00] bg-transparent rounded-full px-4 py-1 text-[12px] font-bold tracking-wide w-fit">
              Get In Touch
            </div>
            <h2 className="text-[32px] md:text-[38px] font-extrabold text-[#1c1f2e] tracking-tight leading-tight">
              We&apos;re Here For You
            </h2>
            <p className="text-[13px] text-gray-400 font-medium leading-relaxed max-w-[95%]">
              We believe in value. Your quote is based on exactly what you need—considering weight, destination, and how fast you need it delivered. We promise no hidden surprises when it&apos;s time to pay.
            </p>
          </div>

          {/* Middle: Call Us */}
          <div className="flex items-start gap-4">
            <div className="w-[48px] h-[48px] rounded-full bg-[#ff8a00] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[18px] font-extrabold text-[#1c1f2e]">Call Us</span>
              <span className="text-[14px] text-gray-500 font-medium">+91 7070-506070</span>
              <a href="#" className="text-[14px] text-[#ff8a00] font-semibold underline underline-offset-2 hover:text-orange-600 transition-colors">
                Whatsapp Us
              </a>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="flex items-start gap-4">
            <div className="w-[48px] h-[48px] rounded-full bg-[#ff8a00] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[18px] font-extrabold text-[#1c1f2e]">Contact Info</span>
              <span className="text-[14px] text-gray-500 font-medium">info@manvicourier.com</span>
              <span className="text-[14px] text-gray-500 font-medium">Insta Handle</span>
            </div>
          </div>

        </div>

        {/* Full-width Google Map */}
        <div className="w-full rounded-t-[20px] overflow-hidden" style={{ height: "340px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.684754458917!2d77.0586!3d28.5849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b2e2fb3e5e7%3A0xcourier!2sDwarka%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1716624000000!5m2!1sen!2sin"
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
