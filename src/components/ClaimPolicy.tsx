"use client";
import { useState } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";

const TagIcon = ({ active }: { active: boolean }) => (
  <div
    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${active ? "bg-[#fff7ed]" : "bg-[#fff7ed]/35"}`}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={active ? "#ff8a00" : "#ff8a0050"}
      className={`-rotate-45 transform transition-opacity duration-300 ${active ? "opacity-100" : "opacity-40"}`}
    >
      <path d="M21.71 11.29l-9-9C12.53 2.11 12.28 2 12 2H3c-.55 0-1 .45-1 1v9c0 .28.11.53.29.71l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.42zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  </div>
);

const DiamondIcon = () => (
  <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 border-[#ff8a00] flex items-center justify-center shrink-0 bg-white">
    <div className="w-1.5 h-1.5 sm:w-1.75 sm:h-1.75 rotate-45 bg-[#ff8a00]" />
  </div>
);

interface SubItem {
  label: string;
  text: string;
}

interface ClaimDetail {
  num: string;
  title: string;
  desc?: string;
  subItems?: SubItem[];
}

interface ClaimData {
  id: string;
  title: string;
  subtext: string;
  panelTitle: string;
  details: ClaimDetail[];
}

const tab3Translations: Record<
  Language,
  {
    d1_title: string;
    d1_s1_label: string;
    d1_s1_text: string;
    d1_s2_label: string;
    d1_s2_text: string;
    d1_s3_label: string;
    d1_s3_text: string;
    d2_title: string;
    d2_desc: string;
    d2_s1_label: string;
    d2_s1_text: string;
    d2_s2_label: string;
    d2_s2_text: string;
    d2_s3_label: string;
    d2_s3_text: string;
  }
> = {
  en: {
    d1_title: "Investigation Timeline",
    d1_s1_label: "Standard Processing Window",
    d1_s1_text:
      'A minimum of <strong class="font-extrabold text-[#1c1f2e]">25 business days</strong> is required to initiate and investigate the claim.',
    d1_s2_label: "Extended Resolution Window",
    d1_s2_text:
      'Depending on the complexity of the international route and carrier responsiveness, the resolution period may extend up to <strong class="font-extrabold text-[#1c1f2e]">40 business days</strong>.',
    d1_s3_label: "Carrier Standards",
    d1_s3_text:
      'Please be advised that international carriers (DHL, FedEx, UPS) maintain an internal standard claim processing cycle of up to <strong class="font-extrabold text-[#1c1f2e]">45 days</strong>. Manvi International acts as the liaison between the customer and these carriers and must adhere to their global investigative timelines.',
    d2_title: "Documentation & Evidence",
    d2_desc: "For a claim to be considered valid, the claimant must provide:",
    d2_s1_label: "Proof of Value",
    d2_s1_text: "Original invoices or receipts for the contents.",
    d2_s2_label: "Damage Evidence",
    d2_s2_text:
      "Photographic or video evidence of the damaged packaging and contents (in cases of damage/destruction).",
    d2_s3_label: "Communication Logs",
    d2_s3_text:
      "Any correspondence with the local delivery branch at the destination.",
  },
  hi: {
    d1_title: "जांच की समयसीमा",
    d1_s1_label: "मानक प्रसंस्करण विंडो",
    d1_s1_text:
      'दावे को शुरू करने और उसकी जांच के लिए न्यूनतम <strong class="font-extrabold text-[#1c1f2e]">25 कार्य दिवसों</strong> की आवश्यकता होती है।',
    d1_s2_label: "विस्तारित समाधान विंडो",
    d1_s2_text:
      'अंतरराष्ट्रीय मार्ग की जटिलता और वाहक की प्रतिक्रिया के आधार पर, समाधान की अवधि <strong class="font-extrabold text-[#1c1f2e]">40 कार्य दिवसों</strong> तक बढ़ सकती है।',
    d1_s3_label: "वाहक मानक",
    d1_s3_text:
      "कृपया ध्यान दें कि अंतरराष्ट्रीय वाहक (DHL, FedEx, UPS) 45 दिनों तक का आंतरिक मानक दावा प्रसंस्करण चक्र बनाए रखते हैं। मानवी इंटरनेशनल ग्राहक और इन वाहकों के बीच मध्यस्थ के रूप में कार्य करता है और उसे उनकी वैश्विक जांच समयसीमा का पालन करना चाहिए।",
    d2_title: "दस्तावेज़ीकरण और साक्ष्य",
    d2_desc:
      "दावे को वैध माने जाने के लिए, दावेदार को निम्नलिखित प्रदान करना होगा:",
    d2_s1_label: "मूल्य का प्रमाण",
    d2_s1_text: "सामग्री के लिए मूल चालान या रसीदें।",
    d2_s2_label: "क्षति के साक्ष्य",
    d2_s2_text:
      "क्षतिग्रस्त पैकेजिंग और सामग्री के फोटोग्राफिक या वीडियो साक्ष्य (क्षति/विनाश के मामलों में)।",
    d2_s3_label: "संचार लॉग",
    d2_s3_text: "गंतव्य पर स्थानीय वितरण शाखा के साथ कोई भी पत्राचार।",
  },
  pa: {
    d1_title: "ਜਾਂਚ ਦੀ ਸਮਾਂ ਸੀਮਾ",
    d1_s1_label: "ਮਿਆਰੀ ਪ੍ਰੋਸੈਸਿੰਗ ਵਿੰਡੋ",
    d1_s1_text:
      'ਦਾਅਵੇ ਨੂੰ ਸ਼ੁਰੂ ਕਰਨ ਅਤੇ ਜਾਂਚ ਕਰਨ ਲਈ ਘੱਟੋ-ਘੱਟ <strong class="font-extrabold text-[#1c1f2e]">25 ਕਾਰੋਬਾਰੀ ਦਿਨਾਂ</strong> ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।',
    d1_s2_label: "ਵਿਸਤ੍ਰਿਤ ਹੱਲ ਵਿੰਡੋ",
    d1_s2_text:
      'ਅੰਤਰਰਾਸ਼ਟਰੀ ਰੂਟ ਦੀ ਗੁੰਝਲਤਾ ਅਤੇ ਕੈਰੀਅਰ ਦੀ ਪ੍ਰਤੀਕਿਰਿਆ ਦੇ ਆਧਾਰ \'ਤੇ, ਹੱਲ ਦੀ ਮਿਆਦ <strong class="font-extrabold text-[#1c1f2e]">40 ਕਾਰੋਬਾਰੀ ਦਿਨਾਂ</strong> ਤੱਕ ਵਧ ਸਕਦੀ ਹੈ।',
    d1_s3_label: "ਕੈਰੀਅਰ ਦੇ ਮਿਆਰ",
    d1_s3_text:
      "ਕਿਰਪਾ ਕਰਕੇ ਨੋਟ ਕਰੋ ਕਿ ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੈਰੀਅਰ (DHL, FedEx, UPS) 45 ਦਿਨਾਂ ਤੱਕ ਦਾ ਅੰਦਰੂਨੀ ਮਿਆਰੀ ਦਾਅਵਾ ਪ੍ਰੋਸੈਸਿੰਗ ਚੱਕਰ ਬਣਾਈ ਰੱਖਦੇ ਹਨ। ਮਾਨਵੀ ਇੰਟਰਨੈਸ਼ਨਲ ਗਾਹਕ ਅਤੇ ਇਹਨਾਂ ਕੈਰੀਅਰਾਂ ਵਿਚਕਾਰ ਇੱਕ ਵਿਚੋਲੇ ਵਜੋਂ ਕੰਮ ਕਰਦਾ ਹੈ।",
    d2_title: "ਦਸਤਾਵੇਜ਼ ਅਤੇ ਸਬੂਤ",
    d2_desc: "ਦਾਅਵੇ ਨੂੰ ਵੈਧ ਮੰਨਣ ਲਈ, ਦਾਅਵੇਦਾਰ ਨੂੰ ਪ੍ਰਦਾਨ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ:",
    d2_s1_label: "ਮੁੱਲ ਦਾ ਸਬੂਤ",
    d2_s1_text: "ਸਮੱਗਰੀ ਲਈ ਅਸਲ ਇਨਵੌਇਸ ਜਾਂ ਰਸੀਦਾਂ।",
    d2_s2_label: "ਨੁਕਸਾਨ ਦੇ ਸਬੂਤ",
    d2_s2_text: "ਨੁਕਸਾਨੀ ਗਈ ਪੈਕਿੰਗ ਅਤੇ ਸਮੱਗਰੀ ਦੇ ਫੋਟੋਗ੍ਰਾਫਿਕ ਜਾਂ ਵੀਡੀਓ ਸਬੂਤ।",
    d2_s3_label: "ਸੰਚਾਰ ਲੌਗ",
    d2_s3_text: "ਮੰਜ਼ਿਲ 'ਤੇ ਸਥਾਨਕ ਡਿਲਿਵਰੀ ਸ਼ਾਖਾ ਨਾਲ ਕੋਈ ਵੀ ਪੱਤਰ ਵਿਹਾਰ।",
  },
  fr: {
    d1_title: "Calendrier de l'enquête",
    d1_s1_label: "Fenêtre standard",
    d1_s1_text:
      'Un minimum de <strong class="font-extrabold text-[#1c1f2e]">25 jours ouvrables</strong> est requis pour initier et enquêter sur la réclamation.',
    d1_s2_label: "Fenêtre de résolution prolongée",
    d1_s2_text:
      "Selon la complexité de l'itinéraire international et la réactivité du transporteur, la période de résolution peut s'étendre jusqu'à <strong class=\"font-extrabold text-[#1c1f2e]\">40 jours ouvrables</strong>.",
    d1_s3_label: "Normes des transporteurs",
    d1_s3_text:
      'Veuillez noter que les transporteurs internationaux (DHL, FedEx, UPS) maintiennent un cycle interne standard de traitement des réclamations allant jusqu\'à <strong class="font-extrabold text-[#1c1f2e]">45 jours</strong>.',
    d2_title: "Documentation et preuves",
    d2_desc:
      "Pour qu'une réclamation soit considérée comme valide, le demandeur doit fournir :",
    d2_s1_label: "Preuve de valeur",
    d2_s1_text: "Factures originales ou reçus pour le contenu.",
    d2_s2_label: "Preuve de dommage",
    d2_s2_text:
      "Preuves photographiques ou vidéo de l'emballage et du contenu endommagés (en cas de dommage/destruction).",
    d2_s3_label: "Journaux de communication",
    d2_s3_text:
      "Toute correspondance avec l'agence de livraison locale à destination.",
  },
  es: {
    d1_title: "Cronograma de investigación",
    d1_s1_label: "Ventana de procesamiento estándar",
    d1_s1_text:
      'Se requiere un mínimo de <strong class="font-extrabold text-[#1c1f2e]">25 días hábiles</strong> para iniciar e investigar la reclamación.',
    d1_s2_label: "Ventana de resolución extendida",
    d1_s2_text:
      'Dependiendo de la complejidad de la ruta internacional y la capacidad de respuesta del transportista, el período de resolución puede extenderse hasta <strong class="font-extrabold text-[#1c1f2e]">40 días hábiles</strong>.',
    d1_s3_label: "Normas del transportista",
    d1_s3_text:
      'Tenga en cuenta que los transportistas internacionales (DHL, FedEx, UPS) mantienen un ciclo de procesamiento de reclamaciones estándar interno de hasta <strong class="font-extrabold text-[#1c1f2e]">45 días</strong>.',
    d2_title: "Documentación y pruebas",
    d2_desc:
      "Para que una reclamación sea considerada válida, el reclamante debe proporcionar:",
    d2_s1_label: "Prueba de valor",
    d2_s1_text: "Facturas originales o recibos del contenido.",
    d2_s2_label: "Prueba de daños",
    d2_s2_text:
      "Evidencia fotográfica o en video del embalaje y contenido dañados (en casos de daño/destrucción).",
    d2_s3_label: "Registros de comunicación",
    d2_s3_text:
      "Cualquier correspondencia con la sucursal de entrega local en el destino.",
  },
};

export default function ClaimPolicy() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("general-1");

  const lang: Language = language || "en";
  const t3 = tab3Translations[lang] || tab3Translations.en;

  const claimsData: ClaimData[] = [
    {
      id: "general-1",
      title: t.claim_tab1_title,
      subtext: t.claim_tab1_subtext,
      panelTitle: t.claim_tab1_panelTitle,
      details: [
        {
          num: t.claim_tab1_d1_num,
          title: t.claim_tab1_d1_title,
          desc: t.claim_tab1_d1_desc,
        },
        {
          num: t.claim_tab1_d2_num,
          title: t.claim_tab1_d2_title,
          desc: t.claim_tab1_d2_desc,
        },
        {
          num: t.claim_tab1_d3_num,
          title: t.claim_tab1_d3_title,
          desc: t.claim_tab1_d3_desc,
        },
      ],
    },
    {
      id: "rto",
      title: t.claim_tab2_title,
      subtext: t.claim_tab2_subtext,
      panelTitle: t.claim_tab2_panelTitle,
      details: [
        {
          num: t.claim_tab2_d1_num,
          title: t.claim_tab2_d1_title,
          desc: t.claim_tab2_d1_desc,
        },
        {
          num: t.claim_tab2_d2_num,
          title: t.claim_tab2_d2_title,
          desc: t.claim_tab2_d2_desc,
        },
        {
          num: t.claim_tab2_d3_num,
          title: t.claim_tab2_d3_title,
          desc: t.claim_tab2_d3_desc,
        },
      ],
    },
    {
      id: "lost",
      title: t.claim_tab3_title,
      subtext: t.claim_tab3_subtext,
      panelTitle: t.claim_tab3_panelTitle,
      details: [
        {
          num: "01",
          title: t3.d1_title,
          subItems: [
            {
              label: t3.d1_s1_label,
              text: t3.d1_s1_text,
            },
            {
              label: t3.d1_s2_label,
              text: t3.d1_s2_text,
            },
            {
              label: t3.d1_s3_label,
              text: t3.d1_s3_text,
            },
          ],
        },
        {
          num: "02",
          title: t3.d2_title,
          desc: t3.d2_desc,
          subItems: [
            {
              label: t3.d2_s1_label,
              text: t3.d2_s1_text,
            },
            {
              label: t3.d2_s2_label,
              text: t3.d2_s2_text,
            },
            {
              label: t3.d2_s3_label,
              text: t3.d2_s3_text,
            },
          ],
        },
      ],
    },
    {
      id: "general-2",
      title: t.claim_tab4_title,
      subtext: t.claim_tab4_subtext,
      panelTitle: t.claim_tab4_panelTitle,
      details: [
        {
          num: t.claim_tab4_d1_num,
          title: t.claim_tab4_d1_title,
          desc: t.claim_tab4_d1_desc,
        },
        {
          num: t.claim_tab4_d2_num,
          title: t.claim_tab4_d2_title,
          desc: t.claim_tab4_d2_desc,
        },
      ],
    },
  ];

  const currentData =
    claimsData.find((d) => d.id === activeTab) || claimsData[0];

  return (
    <section className="w-full mx-auto px-4 sm:px-6 py-10 font-sans max-w-425">
      <div className="bg-[#eef0f5] rounded-4xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 mb-8">
              <div className="border border-orange-300/80 text-[#ff8a00] bg-transparent rounded-full px-4 py-1 text-[12px] font-bold w-fit tracking-wide">
                {t.claim_badge}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#1c1f2e] tracking-tight leading-tight">
                {t.claim_title}
              </h2>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-[98%] mt-1">
                {t.claim_intro}
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {claimsData.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative p-4 sm:p-5 lg:p-6 rounded-3xl cursor-pointer flex items-center gap-4 sm:gap-5 transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  >
                    <TagIcon active={isActive} />
                    <div className="flex flex-col pr-6 sm:pr-8">
                      <h3
                        className={`text-[15px] sm:text-[17px] font-extrabold transition-colors duration-300 ${isActive ? "text-[#1c1f2e]" : "text-[#9ca3af]"}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-[11.5px] sm:text-[12.5px] font-medium leading-relaxed mt-1 transition-colors duration-300 ${isActive ? "text-[#9ca3af]" : "text-[#d1d5db]"}`}
                      >
                        {item.subtext}
                      </p>
                    </div>

                    {/* Active Orange Bar */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.25 h-7.5 sm:h-9 bg-[#ff8a00] rounded-l-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Panel */}
          <div className="bg-[#c26d46] rounded-4xl p-6 sm:p-8 lg:p-12 shadow-[0_10px_40px_-10px_rgba(194,109,70,0.4)] flex flex-col h-full justify-between mt-6 lg:mt-0">
            <div>
              <h3 className="text-white text-[22px] sm:text-[24px] md:text-[26px] font-bold leading-[1.3] tracking-tight">
                {currentData.panelTitle}
              </h3>

              <div className="flex flex-col gap-4 sm:gap-5 mt-8 sm:mt-10">
                {currentData.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-3"
                  >
                    <span className="text-[#ff8a00] text-[12px] sm:text-[13px] font-extrabold tracking-wider">
                      {detail.num}
                    </span>
                    <h4 className="text-[15px] sm:text-[17px] font-extrabold text-[#1c1f2e]">
                      {detail.title}
                    </h4>

                    {detail.desc && (
                      <p
                        className="text-[12px] sm:text-[13px] text-gray-500 font-medium leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: detail.desc }}
                      />
                    )}

                    {detail.subItems && (
                      <div className="flex flex-col gap-4 mt-2">
                        {detail.subItems.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-2 md:gap-4"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 text-[#1c1f2e] text-[12px] sm:text-[13px] font-extrabold tracking-tight shrink-0">
                              <DiamondIcon />
                              <span>{sub.label}</span>
                            </div>
                            <p
                              className="text-[12px] sm:text-[13px] text-gray-500 font-medium leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: sub.text }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
