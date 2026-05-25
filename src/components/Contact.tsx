import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl w-full mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-[#f27a1a] font-bold uppercase tracking-widest">Local Branch</span>
            <h2 className="text-2xl font-extrabold text-[#0b1220]">We&apos;re Here For You</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">Connect with our local service hub or mail us directly. Our booking agents are available 24/7 to manage your pickup orders.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Phone className="h-4 w-4" />, label: "Call Desk", value: "+91 99000 99000" },
              { icon: <Mail className="h-4 w-4" />, label: "Mail Info", value: "info@manvi-express.com" },
              { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "Mumbai, India" },
            ].map(c => (
              <div key={c.label} className="flex items-start gap-3 bg-white border border-slate-100 p-3.5 rounded-xl shadow-sm">
                <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#f27a1a] flex-shrink-0">{c.icon}</div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{c.label}</span>
                  <span className="text-[10px] font-bold text-[#0b1220] mt-0.5">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Map */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl overflow-hidden relative shadow-sm" style={{ height: "300px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823355!2d72.74109995709657!3d19.08250598683297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716624000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Manvi International Courier Location"
          />
          <div className="absolute bottom-4 left-4 bg-[#0b1220] text-white p-3 rounded-xl shadow-lg border border-white/5 z-10 max-w-[220px]">
            <span className="text-[8px] font-bold text-[#f27a1a] uppercase tracking-wider block">Headquarters</span>
            <span className="text-[10px] font-bold block mt-0.5">Manvi International Hub</span>
            <p className="text-[9px] text-zinc-400 mt-0.5 leading-normal">Metro Business Plaza, Mumbai, India.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
