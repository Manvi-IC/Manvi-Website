import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f27a1a] text-white pt-14 pb-7 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#f27a1a] font-extrabold text-lg italic shadow">M</div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-extrabold text-[#0b1220] tracking-tight">Manvi</span>
                <span className="text-[10px] text-white font-bold uppercase tracking-wider mt-0.5">International Courier</span>
              </div>
            </div>
            <p className="text-orange-50 text-[11px] leading-relaxed max-w-sm">Manvi International Courier is a premier globally consolidated logistics company connecting global borders safely, transparently, and on time.</p>
            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {["f", "in", "tw"].map(s => (
                <div key={s} className="h-7 w-7 rounded-full bg-[#0b1220] flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:bg-slate-800 transition-colors">{s}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[#0b1220] uppercase tracking-wider">Quick Links</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-orange-50 font-semibold">
              {["About Us", "Services", "Claim Policy", "Help Center FAQs", "Banned Goods", "Contact Us"].map(l => (
                <a key={l} href="#" className="hover:text-[#0b1220] transition-colors">{l}</a>
              ))}
            </div>
          </div>

          {/* Office Info */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[#0b1220] uppercase tracking-wider">Office Info</span>
            <div className="flex flex-col gap-2 text-[11px] text-orange-50 font-medium">
              <span className="flex items-start gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#0b1220] flex-shrink-0 mt-0.5" />Metro Plaza, Mumbai, India.</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-[#0b1220]" />info@manvi-express.com</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#0b1220]" />+91 99000 99000</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-orange-100">
          <span>&copy; {new Date().getFullYear()} Manvi International Courier. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
