"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";

// ── Brand color ──────────────────────────────────────────────
const BRAND = "#C76645";
const BRAND_DARK = "#a84f35";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const chatbotTranslations: Record<Language, {
  welcome: string;
  options: string[];
  responses: Record<string, string>;
  input_placeholder: string;
  default_response: string;
  send_fallback: string;
  bot_title: string;
  online: string;
}> = {
  en: {
    bot_title: "Manvi Chat Bot",
    online: "Online",
    welcome: "Hi! How can I help you today?",
    options: [
      "Track my package",
      "Serviceable Zip codes",
      "Refund Policies",
      "Contact Us",
      "Quick FAQ",
    ],
    responses: {
      "Track my package":
        "Please share your tracking number and I'll look it up for you right away! 📦",
      "Serviceable Zip codes":
        "We currently service 15,000+ zip codes across the country. Enter your zip code to check availability.",
      "Refund Policies":
        "Refunds are processed within 5-7 business days. Items must be returned in original condition. Need help with a specific order?",
      "Contact Us":
        "You can reach us at support@manvi.com or call +91 70 70 50 60 70 (Mon-Sat, 9am-6pm).",
      "Quick FAQ":
        "Here are our top FAQs:\n• Delivery takes 3-7 days\n• Free shipping on orders ₹500+\n• Returns accepted within 30 days",
    },
    input_placeholder: "Type your query here...",
    default_response: "Let me connect you with a specialist for that!",
    send_fallback: "Thanks for your message! Our team will get back to you shortly.",
  },
  hi: {
    bot_title: "मानवी चैट बॉट",
    online: "ऑनलाइन",
    welcome: "नमस्ते! आज मैं आपकी क्या सहायता कर सकता हूँ?",
    options: [
      "मेरा पैकेज ट्रैक करें",
      "सेवा योग्य पिनकोड",
      "रिफंड नीतियां",
      "संपर्क करें",
      "त्वरित प्रश्न",
    ],
    responses: {
      "मेरा पैकेज ट्रैक करें":
        "कृपया अपना ट्रैकिंग नंबर साझा करें और मैं इसे तुरंत खोजूँगा! 📦",
      "सेवा योग्य पिनकोड":
        "हम वर्तमान में देश भर में 15,000+ पिनकोड पर सेवा प्रदान करते हैं। उपलब्धता जांचने के लिए अपना पिनकोड दर्ज करें।",
      "रिफंड नीतियां":
        "रिफंड 5-7 कार्य दिवसों के भीतर संसाधित किए जाते हैं। सामान मूल स्थिति में लौटाया जाना चाहिए।",
      "संपर्क करें":
        "आप हमसे support@manvi.com पर संपर्क कर सकते हैं या +91 70 70 50 60 70 (सोम-शनि, सुबह 9 बजे से शाम 6 बजे तक) पर कॉल कर सकते हैं।",
      "त्वरित प्रश्न":
        "यहाँ हमारे मुख्य प्रश्न हैं:\n• डिलीवरी में 3-7 दिन लगते हैं\n• ₹500+ के ऑर्डर पर मुफ्त शिपिंग\n• 30 दिनों के भीतर रिटर्न स्वीकार्य है",
    },
    input_placeholder: "अपनी पूछताछ यहाँ लिखें...",
    default_response: "मुझे इसके लिए आपको एक विशेषज्ञ से जोड़ने दें!",
    send_fallback: "आपके संदेश के लिए धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी।",
  },
  pa: {
    bot_title: "ਮਾਨਵੀ ਚੈਟ ਬੋਟ",
    online: "ਔਨਲਾਈਨ",
    welcome: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    options: [
      "ਮੇਰਾ ਪੈਕੇਜ ਟ੍ਰੈਕ ਕਰੋ",
      "ਸੇਵਾ ਯੋਗ ਪਿੰਨ ਕੋਡ",
      "ਰਿਫੰਡ ਨੀਤੀਆਂ",
      "ਸੰਪਰਕ ਕਰੋ",
      "ਤੁਰੰਤ ਸਵਾਲ",
    ],
    responses: {
      "ਮੇਰਾ ਪੈਕੇਜ ਟ੍ਰੈਕ ਕਰੋ":
        "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਟ੍ਰੈਕਿੰਗ ਨੰਬਰ ਸਾਂਝਾ ਕਰੋ ਅਤੇ ਮੈਂ ਇਸਨੂੰ ਤੁਰੰਤ ਲੱਭਾਂਗਾ! 📦",
      "ਸੇਵਾ ਯੋਗ ਪਿੰਨ ਕੋਡ":
        "ਅਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ ਦੇਸ਼ ਭਰ ਵਿੱਚ 15,000+ ਪਿੰਨ ਕੋਡਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ। ਉਪਲਬਧਤਾ ਦੀ ਜਾਂਚ ਕਰਨ ਲਈ ਆਪਣਾ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ।",
      "ਰਿਫੰਡ ਨੀਤੀਆਂ":
        "ਰਿਫੰਡ 5-7 ਕਾਰੋਬਾਰੀ ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਪ੍ਰੋਸੈਸ ਕੀਤੇ ਜਾਂਦੇ ਹਨ। ਚੀਜ਼ਾਂ ਅਸਲ ਸਥਿਤੀ ਵਿੱਚ ਵਾਪਸ ਕੀਤੀਆਂ ਜਾਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ।",
      "ਸੰਪਰਕ ਕਰੋ":
        "ਤੁਸੀਂ support@manvi.com 'ਤੇ ਸਾਡੇ ਤੱਕ ਪਹੁੰਚ ਸਕਦੇ ਹੋ ਜਾਂ +91 70 70 50 60 70 (ਸੋਮ-ਸ਼ਨੀ, ਸਵੇਰੇ 9 ਵਜੇ ਤੋਂ ਸ਼ਾਮ 6 ਵਜੇ ਤੱਕ) 'ਤੇ ਕਾਲ ਕਰ ਸਕਦੇ ਹੋ।",
      "ਤੁਰੰਤ ਸਵਾਲ":
        "ਇੱਥੇ ਸਾਡੇ ਮੁੱਖ ਸਵਾਲ ਹਨ:\n• ਡਿਲਿਵਰੀ ਲਈ 3-7 ਦਿਨ ਲੱਗਦੇ ਹਨ\n• ₹500+ ਦੇ ਆਰਡਰਾਂ 'ਤੇ ਮੁਫ਼ਤ ਸ਼ਿਪਿੰਗ\n• 30 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਵਾਪਸੀ ਸਵੀਕਾਰਯੋਗ ਹੈ",
    },
    input_placeholder: "ਆਪਣੀ ਪੁੱਛਗਿੱਛ ਇੱਥੇ ਲਿਖੋ...",
    default_response: "ਮੈਨੂੰ ਇਸਦੇ ਲਈ ਤੁਹਾਨੂੰ ਇੱਕ ਮਾਹਰ ਨਾਲ ਜੋੜਨ ਦਿਓ!",
    send_fallback: "ਤੁਹਾਡੇ ਸੰਦੇਸ਼ ਲਈ ਧੰਨਵਾਦ! ਸਾਡੀ ਟੀਮ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੇਗੀ।",
  },
  fr: {
    bot_title: "Chat Bot Manvi",
    online: "En ligne",
    welcome: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    options: [
      "Suivre mon colis",
      "Codes postaux desservis",
      "Politiques de remboursement",
      "Contactez-nous",
      "FAQ rapide",
    ],
    responses: {
      "Suivre mon colis":
        "Veuillez partager votre numéro de suivi et je le chercherai tout de suite ! 📦",
      "Codes postaux desservis":
        "Nous desservons actuellement plus de 15 000 codes postaux à travers le pays. Entrez votre code postal pour vérifier.",
      "Politiques de remboursement":
        "Les remboursements sont traités sous 5 à 7 jours ouvrables. Les articles doivent être retournés dans leur état d'origine.",
      "Contactez-nous":
        "Vous pouvez nous joindre à support@manvi.com ou appeler le +91 70 70 50 60 70 (Lun-Sam, 9h-18h).",
      "FAQ rapide":
        "Voici nos principales FAQ :\n• La livraison prend 3 à 7 jours\n• Livraison gratuite dès 500 ₹\n• Retours acceptés sous 30 jours",
    },
    input_placeholder: "Tapez votre requête ici...",
    default_response: "Laissez-moi vous mettre en relation avec un spécialiste !",
    send_fallback: "Merci pour votre message ! Notre équipe reviendra vers vous sous peu.",
  },
  es: {
    bot_title: "Chat Bot de Manvi",
    online: "En línea",
    welcome: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    options: [
      "Rastrear mi paquete",
      "Códigos postales disponibles",
      "Políticas de reembolso",
      "Contáctanos",
      "Preguntas frecuentes rápidas",
    ],
    responses: {
      "Rastrear mi paquete":
        "¡Por favor comparte tu número de seguimiento y lo buscaré de inmediato! 📦",
      "Códigos postales disponibles":
        "Actualmente servimos a más de 15,000 códigos postales en todo el país. Introduce tu código postal para verificar.",
      "Políticas de reembolso":
        "Los reembolsos se procesan dentro de 5 a 7 días hábiles. Los artículos deben devolverse en su estado original.",
      "Contáctanos":
        "Puedes escribirnos a support@manvi.com o llamar al +91 70 70 50 60 70 (Lun-Sáb, 9am-6pm).",
      "Preguntas frecuentes rápidas":
        "Aquí están nuestras principales preguntas frecuentes:\n• La entrega demora de 3 a 7 días\n• Envío gratis en pedidos de ₹500+\n• Se aceptan devoluciones dentro de los 30 días",
    },
    input_placeholder: "Escribe tu consulta aquí...",
    default_response: "¡Permíteme conectarte con un especialista para eso!",
    send_fallback: "¡Gracias por tu mensaje! Nuestro equipo se pondrá en contacto contigo pronto.",
  },
};

export default function ManviChatBot() {
  const { language } = useLanguage();
  const lang: Language = language || "en";
  const t = chatbotTranslations[lang] || chatbotTranslations.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: t.welcome, sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initial message when language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 0) {
        return [{ id: 0, text: t.welcome, sender: "bot" }];
      }
      return prev;
    });
  }, [lang, t.welcome]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const addMessage = (text: string, sender: "bot" | "user") => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender }]);
  };

  const handleQuickOption = (option: string) => {
    addMessage(option, "user");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(
        t.responses[option] ?? t.default_response,
        "bot"
      );
    }, 900);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addMessage(trimmed, "user");
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(
        t.send_fallback,
        "bot"
      );
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const showQuickOptions = messages.length === 1;

  return (
    <>
      {/* ── Floating trigger button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 50,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
            boxShadow: `0 6px 24px rgba(199,100,69,0.45)`,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.18s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
            <circle cx="8" cy="11" r="1.2" fill={BRAND} />
            <circle cx="12" cy="11" r="1.2" fill={BRAND} />
            <circle cx="16" cy="11" r="1.2" fill={BRAND} />
          </svg>
          {/* Online dot */}
          <span style={{
            position: "absolute", top: "4px", right: "4px",
            width: "12px", height: "12px", borderRadius: "50%",
            background: "#4ade80", border: "2px solid white",
          }} />
        </button>
      )}

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 50,
            width: "400px",
            height: "468px",
            borderRadius: "18px",
            padding: "8px",
            gap: "12px",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            animation: "chatPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            boxSizing: "border-box",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Avatar */}
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                border: "2px solid rgba(255,255,255,0.4)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <img
                  src="/chatbot-logo.png"
                  alt="Manvi Chat Bot"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: 0, lineHeight: 1.2 }}>
                  {t.bot_title}
                </p>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>{t.online}</span>
                </span>
              </div>
            </div>
            {/* Right icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button style={iconBtnStyle} aria-label="Options">
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                  <circle cx="2" cy="2" r="2" fill="white"/>
                  <circle cx="8" cy="2" r="2" fill="white"/>
                  <circle cx="14" cy="2" r="2" fill="white"/>
                </svg>
              </button>
              <button style={iconBtnStyle} onClick={() => setIsOpen(false)} aria-label="Close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages area ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "4px 2px",
              scrollbarWidth: "thin",
              scrollbarColor: `${BRAND}33 transparent`,
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: "8px",
                }}
              >
                {msg.sender === "bot" && (
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 900, fontSize: "11px", fontStyle: "italic",
                  }}>M</div>
                )}
                <div style={{
                  maxWidth: "72%",
                  padding: "9px 14px",
                  fontSize: "13px",
                  lineHeight: 1.55,
                  whiteSpace: "pre-line",
                  borderRadius: msg.sender === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                  background: msg.sender === "bot"
                    ? "#f4f4f4"
                    : `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                  color: msg.sender === "bot" ? "#1c1f2e" : "#fff",
                  boxShadow: msg.sender === "user"
                    ? `0 2px 8px rgba(199,100,69,0.22)`
                    : "0 1px 3px rgba(0,0,0,0.07)",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick option chips */}
            {showQuickOptions && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", paddingLeft: "34px", paddingTop: "2px" }}>
                {t.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleQuickOption(opt)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "999px",
                      fontSize: "11.5px",
                      fontWeight: 500,
                      border: `1.5px solid ${BRAND}`,
                      color: BRAND,
                      background: "#fff",
                      cursor: "pointer",
                      transition: "background 0.15s, box-shadow 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#fdf1ee";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(199,100,69,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 900, fontSize: "11px", fontStyle: "italic",
                }}>M</div>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: "4px 14px 14px 14px",
                  background: "#f4f4f4",
                  display: "flex", gap: "4px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#aaa", display: "inline-block",
                      animation: `typingDot 1.2s ${i * 0.2}s infinite ease-in-out`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input bar ── */}
          <div style={{
            borderRadius: "12px",
            border: "1.5px solid #ececec",
            background: "#fafafa",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 10px",
            flexShrink: 0,
          }}>
            {/* Hamburger */}
            <button style={{ background: "none", border: "none", padding: "2px", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }}>
              <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
                <rect y="0" width="17" height="1.8" rx="0.9" fill="currentColor"/>
                <rect y="5.6" width="17" height="1.8" rx="0.9" fill="currentColor"/>
                <rect y="11.2" width="17" height="1.8" rx="0.9" fill="currentColor"/>
              </svg>
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.input_placeholder}
              style={{
                flex: 1, border: "none", outline: "none",
                background: "transparent", fontSize: "13px",
                color: "#333",
              }}
            />

            {/* Mic */}
            <button style={{ background: "none", border: "none", padding: "2px", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center", transition: "color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = BRAND)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#aaa")}
            >
              <svg width="17" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Send */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                border: "none", cursor: inputValue.trim() ? "pointer" : "not-allowed",
                background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: inputValue.trim() ? 1 : 0.38,
                transition: "opacity 0.15s, transform 0.12s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { if (inputValue.trim()) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatPop {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes typingDot {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.35; }
          40%           { transform: translateY(-5px); opacity: 1;    }
        }
      `}</style>
    </>
  );
}

// ── Shared icon-button style ─────────────────────────────────
const iconBtnStyle: React.CSSProperties = {
  width: "28px", height: "28px", borderRadius: "50%",
  background: "rgba(255,255,255,0.15)",
  border: "none", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background 0.15s",
};