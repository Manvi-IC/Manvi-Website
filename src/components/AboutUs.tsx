"use client";
import { useState } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";

// ── Icon helpers ────────────────────────────────────────────────────
const OrangeCircleIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f27a1a] text-white text-xs font-bold shrink-0">
    {children}
  </span>
);

// ── Banner ──────────────────────────────────────────────────────────
function AboutBanner({ title }: { title: string }) {
  return (
    <section className="relative bg-[#0b1220] overflow-hidden min-h-55 flex items-center py-12 px-6">
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url('/banner.jpg')` }}
      />
      <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
        <div>
          <h1 className="text-[28px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

// ── Section card ────────────────────────────────────────────────────
function SectionCard({
  id,
  icon,
  title,
  image,
  children,
}: {
  id: string;
  icon?: string;
  title: string;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="bg-[#eef0f5] border border-gray-200/50 rounded-4xl p-8 lg:p-10 shadow-sm scroll-mt-24 w-full"
    >
      <div className="flex items-center gap-3 mb-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
        ) : (
          <OrangeCircleIcon>{icon}</OrangeCircleIcon>
        )}
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f2e]">
          {title}
        </h2>
      </div>
      <div className="text-[14px] text-[#727C88] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ── Individual Nav Card Component ──────────────────────────────────
function NavCard({
  item,
  isActive,
  onClick,
}: {
  item: { id: string; label: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
        isActive
          ? "bg-white border-[#f27a1a] shadow-sm"
          : "bg-white border-transparent hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      <OrangeCircleIcon>✦</OrangeCircleIcon>
      <span
        className={`text-sm font-semibold text-left ${
          isActive ? "text-[#f27a1a]" : "text-slate-700"
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}

// ── Local Translations for About Us ──────────────────────────────────
const localTranslations: Record<
  Language,
  {
    banner_title: string;
    who_we_are_title: string;
    who_we_are_desc: string;
    ready_title: string;
    ready_desc: string;
    btn_contact: string;
    nav_vision: string;
    nav_mission: string;
    nav_edge: string;
    nav_features: string;
    nav_performance: string;
    nav_claim: string;

    vision_desc: string;

    mission_1: string;
    mission_2: string;
    mission_3: string;

    edge_desc: string;
    edge_t1: string;
    edge_b1: string;
    edge_t2: string;
    edge_b2: string;
    edge_t3: string;
    edge_b3: string;
    edge_t4: string;
    edge_b4: string;
    edge_t5: string;
    edge_b5: string;
    edge_t6: string;
    edge_b6: string;
    edge_t7: string;
    edge_b7: string;
    edge_footer: string;

    feature_1: string;
    feature_2: string;
    feature_3: string;

    perf_1: string;
    perf_2: string;
    perf_3: string;
    perf_4: string;
    perf_footer: string;

    claim_desc: string;
    claim_1: string;
    claim_2: string;
    claim_3: string;
    claim_4: string;
  }
> = {
  en: {
    banner_title: "About Us",
    who_we_are_title: "Who Are We?",
    who_we_are_desc:
      "Manvi International Courier Is A Trusted Logistics And Courier Service Provider Committed To Delivering Parcels, Documents, And Commercial Shipments Safely, Swiftly, And Cost-Effectively. With A Strong Operational Network And Experienced Professionals, We Specialise In International Courier Solutions.",
    ready_title: "Ready To Ship?",
    ready_desc:
      "Experience The Difference Of A Courier Service That Cares. Join The Manvi International Family Today.",
    btn_contact: "Contact Us ↗",
    nav_vision: "Our Vision",
    nav_mission: "Our Mission",
    nav_edge: "The Manvi Edge",
    nav_features: "Key Features",
    nav_performance: "Our Performance",
    nav_claim: "Refund & Loss Claim Policy",
    vision_desc:
      "At Manvi International, We Believe That Distance Should Never Be A Barrier To Emotions. Based In The Heart Of Delhi, We Specialise In Seamless International Courier Services That Bridge The Gap Between India And The Rest Of The World. Whether It's A Festive Gift Or Critical Business Documents, We Deliver More Than Just Packages; We Deliver Peace Of Mind.",
    mission_1:
      "To Eliminate Shipment Delays Or Losses From Our Customers Minds",
    mission_2: "To Provide Transparent Pricing And Real-Time Tracking",
    mission_3: "To Build Life-Long Relationships With Our Customers",
    edge_desc:
      "We Don't Just Ship, We Strategise. By Integrating World-Class Technology With A Deep Understanding Of Global Logistics, We Ensure Your Shipment Is Handled With The Highest Standards Of Safety And Speed.",
    edge_t1: "Global Reach, Local Roots:",
    edge_b1:
      "From Our Delhi Headquarters, We Reach Over 195 Countries, Including The USA, UK, Canada, And Australia.",
    edge_t2: "Tier-1 Partnerships:",
    edge_b2:
      "We Leverage The Global Infrastructure Of Industry Leaders Like DHL, FedEx, And UPS To Offer You Premium Service At Competitive Rates.",
    edge_t3: "Real-Time Transparency:",
    edge_b3:
      "Our Advanced Tracking Systems Ensure You Know Exactly Where Your Shipment Is, From Our Doorstep To Their Destination.",
    edge_t4: "Customer-Centric Ethics:",
    edge_b4:
      "Our Operations Are Guided By A Rigorous Refund And Loss Claim Policy, Ensuring That Your Investment Is Always Protected.",
    edge_t5: "Reliability:",
    edge_b5:
      "We Do What We Say, Every Timeline We Provide Is Backed By Data And Commitment.",
    edge_t6: "Integrity:",
    edge_b6:
      "Transparent Pricing With No Hidden Costs. What You See Is What You Pay.",
    edge_t7: "Speed:",
    edge_b7:
      "In A Fast-Moving World, We Prioritise Express Routes To Ensure Your Packages Arrive Ahead Of The Deadline.",
    edge_footer:
      "What Started As A Vision To Simplify International Shipping For The Indian Diaspora Has Grown Into A Full-Scale Logistics Powerhouse. Today, Manvi International Is The Preferred Partner For Thousands Of Families And Businesses Who Value Security As Much As Speed.",
    feature_1: "Customs Documentation Support",
    feature_2: "International Tracking At Every Stage",
    feature_3: "Competitive International Rates",
    perf_1: "98% Successful Delivery Rate",
    perf_2: "Thousands Of Shipments Completed Successfully",
    perf_3: "Multiple International Destinations Served",
    perf_4: "Strong Repeat Customer Base",
    perf_footer:
      "Our Performance Is Driven By Disciplined Operations, Trained Staff, And Reliable Logistics Partners.",
    claim_desc:
      "At Manvi International, Your Investment Is Always Protected. Our rigorous claim policy ensures that any damage or loss is handled swiftly and fairly.",
    claim_1: "Claims Must Be Raised Within 7 Days Of Delivery",
    claim_2: "Full Documentation Required For Processing",
    claim_3: "Refunds Processed In A Minimum Of 25 Business Days",
    claim_4: "Dedicated Support Team For Every Claim",
  },
  hi: {
    banner_title: "हमारे बारे में",
    who_we_are_title: "हम कौन हैं?",
    who_we_are_desc:
      "मानवी इंटरनेशनल कूरियर एक विश्वसनीय लॉजिस्टिक्स और कूरियर सेवा प्रदाता है जो पार्सल, दस्तावेजों और वाणिज्यिक शिपमेंट को सुरक्षित, तेजी से और लागत प्रभावी ढंग से वितरित करने के लिए प्रतिबद्ध है। एक मजबूत परिचालन नेटवर्क और अनुभवी पेशेवरों के साथ, हम अंतरराष्ट्रीय कूरियर समाधानों में विशेषज्ञता रखते हैं।",
    ready_title: "शिपिंग के लिए तैयार?",
    ready_desc:
      "एक ऐसी कूरियर सेवा का अनुभव करें जो आपकी परवाह करती है। आज ही मानवी इंटरनेशनल परिवार में शामिल हों।",
    btn_contact: "संपर्क करें ↗",
    nav_vision: "हमारा दृष्टिकोण",
    nav_mission: "हमारा लक्ष्य",
    nav_edge: "मानवी की विशेषताएं",
    nav_features: "मुख्य विशेषताएं",
    nav_performance: "हमारा प्रदर्शन",
    nav_claim: "रिफंड और हानि दावा नीति",
    vision_desc:
      "मानवी इंटरनेशनल में, हमारा मानना है कि दूरी कभी भी भावनाओं के आड़े नहीं आनी चाहिए। दिल्ली के केंद्र में स्थित, हम सहज अंतर्राष्ट्रीय कूरियर सेवाओं के विशेषज्ञ हैं जो भारत और शेष विश्व के बीच की दूरी को पाटती हैं। चाहे वह कोई त्योहारी उपहार हो या महत्वपूर्ण व्यावसायिक दस्तावेज, हम सिर्फ पैकेज ही नहीं बल्कि मानसिक शांति भी वितरित करते हैं।",
    mission_1:
      "हमारे ग्राहकों के दिमाग से शिपमेंट में देरी या नुकसान के डर को समाप्त करना",
    mission_2: "पारदर्शी मूल्य निर्धारण और वास्तविक समय ट्रैकिंग प्रदान करना",
    mission_3: "अपने ग्राहकों के साथ जीवन भर के संबंध बनाना",
    edge_desc:
      "हम केवल शिपिंग नहीं करते, हम रणनीति बनाते हैं। वैश्विक लॉजिस्टिक्स की गहरी समझ के साथ विश्व स्तरीय तकनीक को एकीकृत करके, हम यह सुनिश्चित करते हैं कि आपका शिपमेंट सुरक्षा और गति के उच्चतम मानकों के साथ संभाला जाए।",
    edge_t1: "वैश्विक पहुंच, स्थानीय जड़ें:",
    edge_b1:
      "हमारे दिल्ली मुख्यालय से, हम अमेरिका, ब्रिटेन, कनाडा और ऑस्ट्रेलिया सहित 195 देशों तक पहुंचते हैं।",
    edge_t2: "टियर-1 साझेदारी:",
    edge_b2:
      "हम आपको प्रतिस्पर्धी दरों पर प्रीमियम सेवा प्रदान करने के लिए डीएचएल, फेडेक्स और यूपीएस जैसे उद्योग जगत के दिग्गजों के वैश्विक बुनियादी ढांचे का लाभ उठाते हैं।",
    edge_t3: "वास्तविक समय पारदर्शिता:",
    edge_b3:
      "हमारी उन्नत ट्रैकिंग प्रणालियाँ यह सुनिश्चित करती हैं कि आपको पता रहे कि आपका शिपमेंट हमारे दरवाजे से उनके गंतव्य तक कहाँ है।",
    edge_t4: "ग्राहक-केंद्रित नैतिकता:",
    edge_b4:
      "हमारे संचालन एक कठोर धनवापसी और हानि दावा नीति द्वारा निर्देशित होते हैं, यह सुनिश्चित करते हुए कि आपका निवेश हमेशा सुरक्षित रहे।",
    edge_t5: "विश्वसनीयता:",
    edge_b5:
      "हम जो कहते हैं वह करते हैं, हमारा प्रदान किया गया प्रत्येक समय डेटा और प्रतिबद्धता द्वारा समर्थित होता है।",
    edge_t6: "ईमानदारी:",
    edge_b6:
      "बिना किसी छिपे हुए शुल्क के पारदर्शी मूल्य निर्धारण। जो आप देखते हैं वही भुगतान करते हैं।",
    edge_t7: "गति:",
    edge_b7:
      "तेजी से बदलती दुनिया में, हम यह सुनिश्चित करने के लिए एक्सप्रेस मार्गों को प्राथमिकता देते हैं कि आपके पैकेज समय सीमा से पहले पहुंचें।",
    edge_footer:
      "भारतीय प्रवासियों के लिए अंतर्राष्ट्रीय शिपिंग को सरल बनाने के दृष्टिकोण के रूप में जो शुरू हुआ था, वह आज एक बड़े पैमाने के लॉजिस्टिक्स पावरहाउस में विकसित हो चुका है। आज, मानवी इंटरनेशनल उन हजारों परिवारों और व्यवसायों के लिए पसंदीदा भागीदार है जो गति के साथ सुरक्षा को भी उतना ही महत्व देते हैं।",
    feature_1: "सीमा शुल्क दस्तावेज़ीकरण सहायता",
    feature_2: "हर चरण पर अंतर्राष्ट्रीय ट्रैकिंग",
    feature_3: "प्रतिस्पर्धी अंतर्राष्ट्रीय दरें",
    perf_1: "98% सफल वितरण दर",
    perf_2: "हजारों शिपमेंट सफलतापूर्वक पूरे हुए",
    perf_3: "कई अंतर्राष्ट्रीय गंतव्यों पर सेवाएं प्रदान की गईं",
    perf_4: "मजबूत ग्राहक आधार",
    perf_footer:
      "हमारा प्रदर्शन अनुशासित संचालन, प्रशिक्षित कर्मचारियों और विश्वसनीय लॉजिस्टिक्स भागीदारों द्वारा संचालित है।",
    claim_desc:
      "मानवी इंटरनेशनल में, आपका निवेश हमेशा सुरक्षित रहता है। हमारी कठोर दावा नीति यह सुनिश्चित करती है कि किसी भी क्षति या नुकसान को तेजी से और निष्पक्ष रूप से हल किया जाए।",
    claim_1: "दावे वितरण के 7 दिनों के भीतर उठाए जाने चाहिए",
    claim_2: "प्रसंस्करण के लिए पूर्ण दस्तावेज़ीकरण की आवश्यकता है",
    claim_3: "रिफंड प्रक्रिया में कम से कम 25 कार्य दिवस लगते हैं",
    claim_4: "हर दावे के लिए समर्पित सहायता टीम",
  },
  pa: {
    banner_title: "ਸਾਡੇ ਬਾਰੇ",
    who_we_are_title: "ਅਸੀਂ ਕੌਣ ਹਾਂ?",
    who_we_are_desc:
      "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਕੂਰੀਅਰ ਇੱਕ ਭਰੋਸੇਮੰਦ ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਕੂਰੀਅਰ ਸੇਵਾ ਪ੍ਰਦਾਤਾ ਹੈ ਜੋ ਪਾਰਸਲ, ਦਸਤਾਵੇਜ਼ਾਂ ਅਤੇ ਵਪਾਰਕ ਸ਼ਿਪਮੈਂਟਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ, ਤੇਜ਼ੀ ਨਾਲ ਅਤੇ ਲਾਗਤ-ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਢੰਗ ਨਾਲ ਪਹੁੰਚਾਉਣ ਲਈ ਵਚਨਬੱਧ ਹੈ। ਇੱਕ ਮਜ਼ਬੂਤ ਕਾਰਜਸ਼ੀਲ ਨੈੱਟਵਰਕ ਅਤੇ ਤਜਰਬੇਕਾਰ ਪੇਸ਼ੇਵਰਾਂ ਦੇ ਨਾਲ, ਅਸੀਂ ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੂਰੀਅਰ ਹੱਲਾਂ ਵਿੱਚ ਮੁਹਾਰਤ ਰੱਖਦੇ ਹਾਂ।",
    ready_title: "ਭੇਜਣ ਲਈ ਤਿਆਰ?",
    ready_desc:
      "ਇੱਕ ਅਜਿਹੀ ਕੂਰੀਅਰ ਸੇਵਾ ਦਾ ਅਨੁਭਵ ਕਰੋ ਜੋ ਤੁਹਾਡੀ ਪਰਵਾਹ ਕਰਦੀ ਹੈ। ਅੱਜ ਹੀ ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਪਰਿਵਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।",
    btn_contact: "ਸੰਪਰਕ ਕਰੋ ↗",
    nav_vision: "ਸਾਡਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
    nav_mission: "ਸਾਡਾ ਮਿਸ਼ਨ",
    nav_edge: "ਮਾਨਵੀ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    nav_features: "ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    nav_performance: "ਸਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ",
    nav_claim: "ਰਿਫੰਡ ਅਤੇ ਨੁਕਸਾਨ ਦੇ ਦਾਅਵੇ ਦੀ ਨੀਤੀ",
    vision_desc:
      "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਵਿੱਚ, ਸਾਡਾ ਮੰਨਣਾ ਹੈ ਕਿ ਦੂਰੀ ਕਦੇ ਵੀ ਭਾਵਨਾਵਾਂ ਦੇ ਰਾਹ ਵਿੱਚ ਰੁਕਾਵਟ ਨਹੀਂ ਬਣਨੀ ਚਾਹੀਦੀ। ਦਿੱਲੀ ਦੇ ਦਿਲ ਵਿੱਚ ਸਥਿਤ, ਅਸੀਂ ਨਿਰਵਿਘਨ ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੂਰੀਅਰ ਸੇਵਾਵਾਂ ਦੇ ਮਾਹਰ ਹਾਂ ਜੋ ਭਾਰਤ ਅਤੇ ਬਾਕੀ ਸੰਸਾਰ ਵਿਚਕਾਰ ਪਾੜੇ ਨੂੰ ਪੂਰਦੀਆਂ ਹਨ। ਚਾਹੇ ਇਹ ਕੋਈ ਤਿਉਹਾਰੀ ਤੋਹਫ਼ਾ ਹੋਵੇ ਜਾਂ ਮਹੱਤਵਪੂਰਨ ਕਾਰੋਬਾਰੀ ਦਸਤਾਵੇਜ਼, ਅਸੀਂ ਸਿਰਫ਼ ਪੈਕੇਜ ਹੀ ਨਹੀਂ ਬਲਕਿ ਮਨ ਦੀ ਸ਼ਾਂਤੀ ਵੀ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।",
    mission_1:
      "ਸਾਡੇ ਗਾਹਕਾਂ ਦੇ ਮਨਾਂ ਵਿੱਚੋਂ ਸ਼ਿਪਮੈਂਟ ਵਿੱਚ ਦੇਰੀ ਜਾਂ ਨੁਕਸਾਨ ਦੇ ਡਰ ਨੂੰ ਖਤਮ ਕਰਨਾ",
    mission_2: "ਪਾਰਦਰਸ਼ੀ ਕੀਮਤ ਅਤੇ ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ ਪ੍ਰਦਾਨ ਕਰਨਾ",
    mission_3: "ਆਪਣੇ ਗਾਹਕਾਂ ਨਾਲ ਉਮਰ ਭਰ ਦੇ ਸਬੰਧ ਬਣਾਉਣਾ",
    edge_desc:
      "ਅਸੀਂ ਸਿਰਫ ਸ਼ਿਪਿੰਗ ਨਹੀਂ ਕਰਦੇ, ਅਸੀਂ ਰਣਨੀਤੀ ਬਣਾਉਂਦੇ ਹਾਂ। ਗਲੋਬਲ ਲੌਜਿਸਟਿਕਸ ਦੀ ਡੂੰਘੀ ਸਮਝ ਦੇ ਨਾਲ ਵਿਸ਼ਵ ਪੱਧਰੀ ਤਕਨਾਲੋਜੀ ਨੂੰ ਜੋੜ ਕੇ, ਅਸੀਂ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਾਂ ਕਿ ਤੁਹਾਡੀ ਸ਼ਿਪਮੈਂਟ ਸੁਰੱਖਿਆ ਅਤੇ ਗਤੀ ਦੇ ਉੱਚੇ ਮਿਆਰਾਂ ਨਾਲ ਸੰਭਾਲੀ ਜਾਵੇ।",
    edge_t1: "ਗਲੋਬਲ ਪਹੁੰਚ, ਸਥਾਨਕ ਜੜ੍ਹਾਂ:",
    edge_b1:
      "ਸਾਡੇ ਦਿੱਲੀ ਦੇ ਮੁੱਖ ਦਫਤਰ ਤੋਂ, ਅਸੀਂ ਅਮਰੀਕਾ, ਯੂਕੇ, ਕੈਨੇਡਾ ਅਤੇ ਆਸਟ੍ਰੇਲੀਆ ਸਮੇਤ 195 ਦੇਸ਼ਾਂ ਤੱਕ ਪਹੁੰਚਦੇ ਹਾਂ।",
    edge_t2: "ਟਾਇਰ-1 ਭਾਈਵਾਲੀ:",
    edge_b2:
      "ਅਸੀਂ ਤੁਹਾਨੂੰ ਪ੍ਰਤੀਯੋਗੀ ਦਰਾਂ 'ਤੇ ਪ੍ਰੀਮੀਅਮ ਸੇਵਾ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਨ ਲਈ DHL, FedEx ਅਤੇ UPS ਵਰਗੇ ਉਦਯੋਗ ਦੇ ਪ੍ਰਮੁੱਖ ਨੇਤਾਵਾਂ ਦੇ ਗਲੋਬਲ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਦਾ ਲਾਭ ਉਠਾਉਂਦੇ ਹਾਂ।",
    edge_t3: "ਰੀਅਲ-ਟਾਈਮ ਪਾਰਦਰਸ਼ਤਾ:",
    edge_b3:
      "ਸਾਡੇ ਉੱਨਤ ਟਰੈਕਿੰਗ ਸਿਸਟਮ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ ਕਿ ਤੁਹਾਨੂੰ ਪਤਾ ਹੋਵੇ ਕਿ ਤੁਹਾਡੀ ਸ਼ਿਪਮੈਂਟ ਸਾਡੇ ਦਰਵਾਜ਼ੇ ਤੋਂ ਉਨ੍ਹਾਂ ਦੀ ਮੰਜ਼ਿਲ ਤੱਕ ਕਿੱਥੇ ਹੈ।",
    edge_t4: "ਗਾਹਕ-ਕੇਂਦ੍ਰਿਤ ਨੈਤਿਕਤਾ:",
    edge_b4:
      "ਸਾਡੇ ਕਾਰਜ ਇੱਕ ਸਖ਼ਤ ਰਿਫੰਡ ਅਤੇ ਨੁਕਸਾਨ ਦੇ ਦਾਅਵੇ ਦੀ ਨੀਤੀ ਦੁਆਰਾ ਸੇਧਿਤ ਹੁੰਦੇ ਹਨ, ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹੋਏ ਕਿ ਤੁਹਾਡਾ ਨਿਵੇਸ਼ ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਅਤ ਰਹੇ।",
    edge_t5: "ਭਰੋਸੇਯੋਗਤਾ:",
    edge_b5:
      "ਅਸੀਂ ਉਹ ਕਰਦੇ ਹਾਂ ਜੋ ਅਸੀਂ ਕਹਿੰਦੇ ਹਾਂ, ਸਾਡੀ ਪ੍ਰਦਾਨ ਕੀਤੀ ਗਈ ਹਰ ਸਮਾਂ ਸੀਮਾ ਡੇਟਾ ਅਤੇ ਵਚਨਬੱਧਤਾ ਦੁਆਰਾ ਸਮਰਥਿਤ ਹੁੰਦੀ ਹੈ।",
    edge_t6: "ਇਮਾਨਦਾਰੀ:",
    edge_b6:
      "ਬਿਨਾਂ ਕਿਸੇ ਲੁਕਵੇਂ ਖਰਚੇ ਦੇ ਪਾਰਦਰਸ਼ੀ ਕੀਮਤ। ਜੋ ਤੁਸੀਂ ਦੇਖਦੇ ਹੋ ਉਹੀ ਭੁਗਤਾਨ ਕਰਦੇ ਹੋ।",
    edge_t7: "ਗਤੀ:",
    edge_b7:
      "ਤੇਜ਼ੀ ਨਾਲ ਚੱਲ ਰਹੀ ਦੁਨੀਆ ਵਿੱਚ, ਅਸੀਂ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਐਕਸਪ੍ਰੈਸ ਰੂਟਾਂ ਨੂੰ ਤਰਜੀਹ ਦਿੰਦੇ ਹਾਂ ਕਿ ਤੁਹਾਡੇ ਪੈਕੇਜ ਸਮਾਂ ਸੀਮਾ ਤੋਂ ਪਹਿਲਾਂ ਪਹੁੰਚਣ।",
    edge_footer:
      "ਭਾਰਤੀ ਪ੍ਰਵਾਸੀਆਂ ਲਈ ਅੰਤਰਰਾਸ਼ਟਰੀ ਸ਼ਿਪਿੰਗ ਨੂੰ ਸਰਲ ਬਣਾਉਣ ਦੇ ਦ੍ਰਿਸ਼ਟੀਕੋਣ ਵਜੋਂ ਜੋ ਸ਼ੁਰੂ ਹੋਇਆ ਸੀ, ਉਹ ਅੱਜ ਇੱਕ ਪੂਰੇ ਪੈਮਾਨੇ ਦੇ ਲੌਜਿਸਟਿਕ ਪਾਵਰਹਾਊਸ ਵਿੱਚ ਵਿਕਸਤ ਹੋ ਚੁੱਕਾ ਹੈ। ਅੱਜ, ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਉਨ੍ਹਾਂ ਹਜ਼ਾਰਾਂ ਪਰਿਵਾਰਾਂ ਅਤੇ ਕਾਰੋਬਾਰਾਂ ਲਈ ਤਰਜੀਹੀ ਭਾਈਵਾਲ ਹੈ ਜੋ ਗਤੀ ਦੇ ਨਾਲ ਸੁਰੱਖਿਆ ਨੂੰ ਵੀ ਓਨਾ ਹੀ ਮਹੱਤਵ ਦਿੰਦੇ ਹਨ।",
    feature_1: "ਕਸਟਮ ਦਸਤਾਵੇਜ਼ ਸਹਾਇਤਾ",
    feature_2: "ਹਰ ਪੜਾਅ 'ਤੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਟਰੈਕਿੰਗ",
    feature_3: "ਪ੍ਰਤੀਯੋਗੀ ਅੰਤਰਰਾਸ਼ਟਰੀ ਦਰਾਂ",
    perf_1: "98% ਸਫਲ ਡਿਲਿਵਰੀ ਦਰ",
    perf_2: "ਹਜ਼ਾਰਾਂ ਸ਼ਿਪਮੈਂਟ ਸਫਲਤਾਪੂਰਵਕ ਪੂਰੀਆਂ ਹੋਈਆਂ",
    perf_3: "ਕਈ ਅੰਤਰਰਾਸ਼ਟਰੀ ਮੰਜ਼ਿਲਾਂ ਦੀ ਸੇਵਾ ਕੀਤੀ ਗਈ",
    perf_4: "ਮਜ਼ਬੂਤ ਗਾਹਕ ਅਧਾਰ",
    perf_footer:
      "ਸਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਅਨੁਸ਼ਾਸਿਤ ਕਾਰਜਾਂ, ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਸਟਾਫ ਅਤੇ ਭਰੋਸੇਯੋਗ ਲੌਜਿਸਟਿਕ ਭਾਈਵਾਲਾਂ ਦੁਆਰਾ ਚਲਾਇਆ ਜਾਂਦਾ ਹੈ।",
    claim_desc:
      "ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਵਿੱਚ, ਤੁਹਾਡਾ ਨਿਵੇਸ਼ ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦਾ ਹੈ। ਸਾਡੀ ਸਖ਼ਤ ਦਾਅਵਾ ਨੀਤੀ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ ਕਿ ਕਿਸੇ ਵੀ ਨੁਕਸਾਨ ਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਅਤੇ ਨਿਰਪੱਖਤਾ ਨਾਲ ਹੱਲ ਕੀਤਾ ਜਾਵੇ।",
    claim_1: "ਦਾਅਵੇ ਡਿਲਿਵਰੀ ਦੇ 7 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਕੀਤੇ ਜਾਣੇ ਚਾਹੀਦੇ ਹਨ",
    claim_2: "ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ ਪੂਰੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਲੋੜ ਹੈ",
    claim_3: "ਰਿਫੰਡ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 25 ਕਾਰੋਬਾਰੀ ਦਿਨ ਲੱਗਦੇ ਹਨ",
    claim_4: "ਹਰ ਦਾਅਵੇ ਲਈ ਸਮਰਪਿਤ ਸਹਾਇਤਾ ਟੀਮ",
  },
  fr: {
    banner_title: "À propos de nous",
    who_we_are_title: "Qui sommes-nous ?",
    who_we_are_desc:
      "Manvi International Courier est un prestataire de services logistiques et de messagerie de confiance qui s'engage à livrer des colis, des documents et des expéditions commerciales en toute sécurité, rapidité et rentabilité. Fort d'un réseau opérationnel solide et de professionnels expérimentés, nous sommes spécialisés dans les solutions de messagerie internationale.",
    ready_title: "Prêt à expédier ?",
    ready_desc:
      "Découvrez la différence d'un service de messagerie attentionné. Rejoignez la famille Manvi International dès aujourd'hui.",
    btn_contact: "Contactez-nous ↗",
    nav_vision: "Notre vision",
    nav_mission: "Notre mission",
    nav_edge: "L'avantage Manvi",
    nav_features: "Caractéristiques clés",
    nav_performance: "Notre performance",
    nav_claim: "Politique de réclamation",
    vision_desc:
      "Chez Manvi International, nous pensons que la distance ne devrait jamais être un obstacle aux émotions. Basés au cœur de Delhi, nous sommes spécialisés dans les services de messagerie internationale fluides qui comblent le fossé entre l'Inde et le reste du monde. Qu'il s'agisse d'un cadeau de fête ou de documents commerciaux critiques, nous livrons plus que de simples colis ; nous livrons la tranquillité d'esprit.",
    mission_1:
      "Éliminer l'inquiétude des retards ou des pertes d'expédition de l'esprit de nos clients",
    mission_2: "Fournir des tarifs transparents et un suivi en temps réel",
    mission_3: "Établir des relations durables avec nos clients",
    edge_desc:
      "Nous ne nous contentons pas d'expédier, nous élaborons des stratégies. En intégrant une technologie de classe mondiale à une connaissance approfondie de la logistique mondiale, nous veillons à ce que votre envoi soit traité selon les normes les plus élevées de sécurité et de rapidité.",
    edge_t1: "Portée mondiale, racines locales :",
    edge_b1:
      "Depuis notre siège de Delhi, nous desservons plus de 195 pays, dont les États-Unis, le Royaume-Uni, le Canada et l'Australie.",
    edge_t2: "Partenariats de niveau 1 :",
    edge_b2:
      "Nous exploitons l'infrastructure mondiale de leaders du secteur comme DHL, FedEx et UPS pour vous offrir un service premium à des tarifs compétitifs.",
    edge_t3: "Transparence en temps réel :",
    edge_b3:
      "Nos systèmes de suivi avancés vous permettent de savoir exactement où se trouve votre envoi, de notre porte à leur destination.",
    edge_t4: "Éthique centrée sur le client :",
    edge_b4:
      "Nos opérations sont guidées par une politique rigoureuse de remboursement et de réclamation en cas de perte, garantissant que votre investissement soit toujours protégé.",
    edge_t5: "Fiabilité :",
    edge_b5:
      "Nous faisons ce que nous disons, chaque délai que nous fournissons est soutenu par des données et un engagement.",
    edge_t6: "Intégrité :",
    edge_b6:
      "Des tarifs transparents sans frais cachés. Ce que vous voyez est ce que vous payez.",
    edge_t7: "Rapidité :",
    edge_b7:
      "Dans un monde en évolution rapide, nous donnons la priorité aux itinéraires express pour garantir que vos colis arrivent avant la date limite.",
    edge_footer:
      "Ce qui a commencé comme une vision pour simplifier les expéditions internationales pour la diaspora indienne est devenu un géant de la logistique à part entière. Aujourd'hui, Manvi International est le partenaire privilégié de milliers de familles et d'entreprises qui accordent autant d'importance à la sécurité qu'à la rapidité.",
    feature_1: "Assistance pour la documentation douanière",
    feature_2: "Suivi international à chaque étape",
    feature_3: "Tarifs internationaux compétitifs",
    perf_1: "Taux de livraison réussie de 98 %",
    perf_2: "Des milliers d'envois complétés avec succès",
    perf_3: "De nombreuses destinations internationales desservies",
    perf_4: "Forte base de clients réguliers",
    perf_footer:
      "Nos performances sont guidées par des opérations disciplinées, un personnel qualifié et des partenaires logistiques fiables.",
    claim_desc:
      "Chez Manvi International, votre investissement est toujours protégé. Notre politique de réclamation rigoureuse garantit que tout dommage ou perte soit traité rapidement et équitablement.",
    claim_1:
      "Les réclamations doivent être formulées dans les 7 jours suivant la livraison",
    claim_2: "Documentation complète requise pour le traitement",
    claim_3: "Remboursements traités dans un minimum de 25 jours ouvrables",
    claim_4: "Équipe d'assistance dédiée pour chaque réclamation",
  },
  es: {
    banner_title: "Sobre nosotros",
    who_we_are_title: "¿Quiénes somos?",
    who_we_are_desc:
      "Manvi International Courier es un proveedor de servicios de mensajería y logística de confianza comprometido a entregar paquetes, documentos y envíos comerciales de forma segura, rápida y rentable. Con una sólida red operativa y profesionales experimentados, nos especializamos en soluciones de mensajería internacional.",
    ready_title: "¿Listo para enviar?",
    ready_desc:
      "Experimente la diferencia de un servicio de mensajería que se preocupa por usted. Únase a la familia Manvi International hoy mismo.",
    btn_contact: "Contáctenos ↗",
    nav_vision: "Nuestra visión",
    nav_mission: "Nuestra misión",
    nav_edge: "La ventaja Manvi",
    nav_features: "Características clave",
    nav_performance: "Nuestro rendimiento",
    nav_claim: "Política de reclamaciones",
    vision_desc:
      "En Manvi International, creemos que la distancia nunca debe ser una barrera para las emociones. Con sede en el corazón de Delhi, nos especializamos en servicios de mensajería internacional fluidos que acortan la distancia entre la India y el resto del mundo. Ya sea un regalo festivo o documentos comerciales críticos, entregamos más que solo paquetes; entregamos tranquilidad.",
    mission_1:
      "Eliminar la preocupación por retrasos o pérdidas de envío de la mente de nuestros clientes",
    mission_2:
      "Proporcionar precios transparentes y seguimiento en tiempo real",
    mission_3: "Construir relaciones de por vida con nuestros clientes",
    edge_desc:
      "No solo enviamos, creamos estrategias. Al integrar tecnología de primer nivel con un profundo conocimiento de la logística global, garantizamos que su envío se gestione con los más altos estándares de seguridad y rapidez.",
    edge_t1: "Alcance global, raíces locales:",
    edge_b1:
      "Desde nuestra sede en Delhi, llegamos a más de 195 países, incluidos EE. UU., Reino Unido, Canadá y Australia.",
    edge_t2: "Asociaciones de nivel 1:",
    edge_b2:
      "Aprovechamos la infraestructura global de líderes de la industria como DHL, FedEx y UPS para ofrecerle un servicio premium a tarifas competitivas.",
    edge_t3: "Transparencia en tiempo real:",
    edge_b3:
      "Nuestros sistemas de seguimiento avanzados garantizan que sepa exactamente dónde se encuentra su envío, desde nuestra puerta hasta su destino.",
    edge_t4: "Ética centrada en el cliente:",
    edge_b4:
      "Nuestras operaciones se guían por una rigurosa política de reembolso y reclamaciones por pérdida, garantizando que su inversión siempre esté protegida.",
    edge_t5: "Fiabilidad:",
    edge_b5:
      "Hacemos lo que decimos, cada plazo que proporcionamos está respaldado por datos y compromiso.",
    edge_t6: "Integridad:",
    edge_b6:
      "Precios transparentes sin costos ocultos. Lo que ve es lo que paga.",
    edge_t7: "Velocidad:",
    edge_b7:
      "En un mundo que se mueve rápido, priorizamos las rutas express para garantizar que sus paquetes lleguen antes de la fecha límite.",
    edge_footer:
      "Lo que comenzó como una visión para simplificar el envío internacional para la diáspora india se ha convertido en una potencia logística a gran escala. Hoy en día, Manvi International es el socio preferido de miles de familias y empresas que valoran tanto la seguridad como la velocidad.",
    feature_1: "Soporte de documentación aduanera",
    feature_2: "Seguimiento internacional en cada etapa",
    feature_3: "Tarifas internacionales competitivas",
    perf_1: "Tasa de entrega exitosa del 98%",
    perf_2: "Miles de envíos completados con éxito",
    perf_3: "Múltiples destinos internacionales atendidos",
    perf_4: "Sólida base de clientes recurrentes",
    perf_footer:
      "Nuestro rendimiento está impulsado por operaciones disciplinadas, personal capacitado y socios logísticos confiables.",
    claim_desc:
      "En Manvi International, su inversión siempre está protegida. Nuestra rigurosa política de reclamaciones garantiza que cualquier daño o pérdida se gestione de forma rápida y justa.",
    claim_1:
      "Las reclamaciones deben presentarse dentro de los 7 días posteriores a la entrega",
    claim_2: "Documentación completa requerida para el procesamiento",
    claim_3: "Reembolsos procesados en un mínimo de 25 días hábiles",
    claim_4: "Equipo de soporte dedicado para cada reclamación",
  },
};

// ── Main Component ──────────────────────────────────────────────────
export default function AboutUs() {
  const { language } = useLanguage();
  const [active, setActive] = useState("vision");

  const lang: Language = language || "en";
  const t = localTranslations[lang] || localTranslations.en;

  const NAV_ITEMS = [
    { id: "vision", label: t.nav_vision },
    { id: "mission", label: t.nav_mission },
    { id: "edge", label: t.nav_edge },
    { id: "features", label: t.nav_features },
    { id: "performance", label: t.nav_performance },
    { id: "claim", label: t.nav_claim },
  ];

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#0f172a] antialiased flex flex-col">
      {/* ── Banner ── */}
      <AboutBanner title={t.banner_title} />

      {/* ── Body ── */}
      <main className="flex-grow max-w-425 w-full mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Sidebar (5/12) ── */}
          <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Who Are We card */}
            <div className="bg-[#eef0f5] border border-gray-200/50 rounded-4xl p-8 lg:p-10 shadow-sm flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h2 className="text-[24px] md:text-[34px] font-extrabold text-[#1c1f2e] leading-tight tracking-tight">
                  {t.who_we_are_title}
                </h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  {t.who_we_are_desc}
                </p>
              </div>

              {/* Nav Cards */}
              <div className="flex flex-col gap-2 sm:gap-3">
                {NAV_ITEMS.map((item) => (
                  <NavCard
                    key={item.id}
                    item={item}
                    isActive={active === item.id}
                    onClick={() => scrollTo(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Ready to Ship card */}
            <div className="bg-[#eef0f5] border border-gray-200/50 rounded-4xl p-8 lg:p-10 shadow-sm flex flex-col items-start gap-5">
              <h3 className="text-[24px] md:text-[34px] font-extrabold text-[#f27a1a] tracking-tight leading-tight">
                {t.ready_title}
              </h3>
              <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">
                {t.ready_desc}
              </p>
              <button className="border-2 border-[#f27a1a] text-[#f27a1a] hover:bg-[#f27a1a] hover:text-white transition-colors duration-300 rounded-xl px-6 py-3 text-[14px] font-bold flex items-center gap-1.5 mt-2">
                {t.btn_contact}
              </button>
            </div>
          </aside>

          {/* ── Main content (7/12) ── */}
          <div className="lg:col-span-7 flex flex-col gap-5 min-w-0">
            <SectionCard
              id="vision"
              title={t.nav_vision}
              image="/our-vision.png"
            >
              <p>{t.vision_desc}</p>
            </SectionCard>

            <SectionCard
              id="mission"
              title={t.nav_mission}
              image="/our-mission.png"
            >
              <ul className="list-disc pl-5 space-y-1">
                <li>{t.mission_1}</li>
                <li>{t.mission_2}</li>
                <li>{t.mission_3}</li>
              </ul>
            </SectionCard>

            <SectionCard id="edge" title={t.nav_edge} image="/edge.png">
              <p className="mb-3">{t.edge_desc}</p>
              <div className="space-y-3">
                {[
                  { title: t.edge_t1, body: t.edge_b1 },
                  { title: t.edge_t2, body: t.edge_b2 },
                  { title: t.edge_t3, body: t.edge_b3 },
                  { title: t.edge_t4, body: t.edge_b4 },
                  { title: t.edge_t5, body: t.edge_b5 },
                  { title: t.edge_t6, body: t.edge_b6 },
                  { title: t.edge_t7, body: t.edge_b7 },
                ].map(({ title, body }) => (
                  <div key={title}>
                    <span className="font-bold text-[#1c1f2e]">{title}</span>{" "}
                    {body}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[#727C88] text-xs">{t.edge_footer}</p>
            </SectionCard>

            <SectionCard id="features" title={t.nav_features} image="/edge.png">
              <ul className="list-disc pl-5 space-y-1">
                <li>{t.feature_1}</li>
                <li>{t.feature_2}</li>
                <li>{t.feature_3}</li>
              </ul>
            </SectionCard>

            <SectionCard
              id="performance"
              title={t.nav_performance}
              image="/edge.png"
            >
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>{t.perf_1}</li>
                <li>{t.perf_2}</li>
                <li>{t.perf_3}</li>
                <li>{t.perf_4}</li>
              </ul>
              <p className="text-[#727C88] text-xs">{t.perf_footer}</p>
            </SectionCard>

            <SectionCard id="claim" image="/edge.png" title={t.nav_claim}>
              <p className="mb-3">{t.claim_desc}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t.claim_1}</li>
                <li>{t.claim_2}</li>
                <li>{t.claim_3}</li>
                <li>{t.claim_4}</li>
              </ul>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}
