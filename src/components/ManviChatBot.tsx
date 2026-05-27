"use client";

import { useState, useRef, useEffect } from "react";

// ── Brand color ──────────────────────────────────────────────
const BRAND = "#C76645";
const BRAND_DARK = "#a84f35";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const QUICK_OPTIONS = [
  "Track my package",
  "Serviceable Zip codes",
  "Refund Policies",
  "Contact Us",
  "Quick FAQ",
];

const BOT_RESPONSES: Record<string, string> = {
  "Track my package":
    "Please share your tracking number and I'll look it up for you right away! 📦",
  "Serviceable Zip codes":
    "We currently service 15,000+ zip codes across the country. Enter your zip code to check availability.",
  "Refund Policies":
    "Refunds are processed within 5–7 business days. Items must be returned in original condition. Need help with a specific order?",
  "Contact Us":
    "You can reach us at support@manvi.com or call 1-800-MANVI-00 (Mon–Sat, 9am–6pm).",
  "Quick FAQ":
    "Here are our top FAQs:\n• Delivery takes 3–7 days\n• Free shipping on orders ₹500+\n• Returns accepted within 30 days",
};

export default function ManviChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        BOT_RESPONSES[option] ?? "Let me connect you with a specialist for that!",
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
        "Thanks for your message! Our team will get back to you shortly.",
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
            /* Exact spec: 400 × 468, border-radius 18px, padding 8px, gap 12px */
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 50,
            width: "400px",
            height: "468px",
            borderRadius: "18px",
            padding: "8px",
            gap: "12px",               /* gap between inner sections */
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            animation: "chatPop 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            boxSizing: "border-box",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              borderRadius: "12px",          /* inner radius = outer - padding */
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
                  Manvi Chat Bot
                </p>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>Online</span>
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
                {QUICK_OPTIONS.map((opt) => (
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
              placeholder="Type your query here..."
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
          from { opacity: 0; transform: scale(0.82) translateY(18px); transform-origin: bottom right; }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
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