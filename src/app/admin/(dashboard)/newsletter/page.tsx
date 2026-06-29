// app/admin/(dashboard)/newsletter/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail,
  Users,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Trash2,
  Clock,
  ChevronLeft,
  Plus,
  X,
  AlignLeft,
  Heading1,
  Lightbulb,
  Star,
  Link2,
  Eye,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface Subscriber {
  _id: string;
  email: string;
  firstName: string;
  source: string;
  brevoSynced: boolean;
  createdAt: string;
}

interface SendHistory {
  subject: string;
  sentAt: string;
  count: number;
  status: "success" | "error";
  template: string;
}

type TemplateId =
  | "manvi-classic"
  | "manvi-premium"
  | "promotional"
  | "tips"
  | "news"
  | "blossom"
  | "sky"
  | "clay"
  | "dune"
  | "olive"
  | "gallery"
  | "nordic";

type BlockType = "heading" | "paragraph" | "tip" | "highlight";
type Step = "template" | "edit";

interface ContentBlock {
  id: string;
  type: BlockType;
  title?: string;
  text: string;
}

interface EmailContent {
  blocks: ContentBlock[];
  ctaText: string;
  ctaUrl: string;
  heroImageUrl?: string;
}

// ─────────────────────────────────────────────────────────────────
// DEFAULT CONTENT PER TEMPLATE
// ─────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function defaultContent(t: TemplateId): EmailContent {
  switch (t) {
    case "manvi-classic":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Welcome to Manvi Logistics" },
          {
            id: uid(),
            type: "paragraph",
            text: "Hi there,\n\nWe make shipping simple, reliable, and transparent. Thank you for being a part of our logistics community. Here are our top updates for this week.",
          },
        ],
        ctaText: "Track Your Shipment →",
        ctaUrl: "https://manvilogistics.com/track",
      };
    case "manvi-premium":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Shipping Simplified" },
          {
            id: uid(),
            type: "paragraph",
            text: "At Manvi, we believe in premium care for every cargo. We handle your logistics from pickup to final delivery with expert planning and tracking.",
          },
          {
            id: uid(),
            type: "highlight",
            text: "Reliable logistics. Nationwide coverage. Simplified for your business.",
          },
        ],
        ctaText: "Get a Free Quote",
        ctaUrl: "https://manvilogistics.com/quote",
      };
    case "promotional":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Special Offer Just for You! ✨" },
          {
            id: uid(),
            type: "paragraph",
            text: "Hi there,\n\nWe have an exciting offer just for you. We're committed to making your shipping experience seamless and affordable — and this month we're going even further.",
          },
        ],
        ctaText: "Get Started →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "tips":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "This Month's Shipping Tips" },
          {
            id: uid(),
            type: "paragraph",
            text: "Hi there,\n\nHere are some expert tips to help you ship smarter and save more this month:",
          },
          {
            id: uid(),
            type: "tip",
            title: "Pack Smart",
            text: "Use the right box size to avoid excess dimensional weight charges.",
          },
          {
            id: uid(),
            type: "tip",
            title: "Track Everything",
            text: "Always request a tracking number and share it with your recipients in advance.",
          },
        ],
        ctaText: "Read More Tips →",
        ctaUrl: "https://manvilogistics.com/blog",
      };
    case "news":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Exciting News from Manvi Logistics" },
          {
            id: uid(),
            type: "paragraph",
            text: "We're thrilled to share some exciting updates with our valued community. Our team has been working hard to bring you even better shipping solutions.",
          },
          {
            id: uid(),
            type: "highlight",
            text: "We're expanding our services to serve you better than ever before.",
          },
        ],
        ctaText: "Learn More →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "blossom":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Creative Space & Inspiration 🌸" },
          {
            id: uid(),
            type: "paragraph",
            text: "Welcome to our new pastel collection. We believe that delivery and logistics can be both beautiful and simple. Here is a curated selection of designs and ideas to inspire your week.",
          },
        ],
        ctaText: "Explore Collection →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "sky":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Breathe Easy, Ship Simple ☁️" },
          {
            id: uid(),
            type: "paragraph",
            text: "Hello friend,\n\nTake a moment to relax. Our new pastel sky digest is here to bring a sense of calm and clarity to your business logistics and shipping needs.",
          },
          {
            id: uid(),
            type: "highlight",
            text: "Simplicity is the ultimate sophistication.",
          },
        ],
        ctaText: "Discover More →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "clay":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Artisanal Spaces & Organic Growth 🏺" },
          {
            id: uid(),
            type: "paragraph",
            text: "Welcome to Clay. We focus on earthy, warm aesthetics and curated experiences. Our team is dedicated to helping you ship your creations with the utmost care and style.",
          },
        ],
        ctaText: "Explore Artistry →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "dune":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Warm Minimalism & Design 🌾" },
          {
            id: uid(),
            type: "paragraph",
            text: "Welcome to Dune. We focus on clean layouts, soft natural tones, and premium design principles to bring warmth and clarity to your reading experience.",
          },
          {
            id: uid(),
            type: "highlight",
            text: "Simplicity is the key to elegant design.",
          },
        ],
        ctaText: "Explore Editorial →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "olive":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Eucalyptus Leaves & Serenity 🌿" },
          {
            id: uid(),
            type: "paragraph",
            text: "Greetings,\n\nInspired by forest sage and fresh woodland tones, this modern organic theme is designed to feel calm, balanced, and sustainable. Perfect for green businesses and mindful updates.",
          },
          {
            id: uid(),
            type: "tip",
            title: "Sustainable Shipping",
            text: "Consolidate shipments whenever possible to minimize carbon footprints and lower delivery costs.",
          },
        ],
        ctaText: "View Green Initiatives →",
        ctaUrl: "https://manvilogistics.com",
      };
    case "gallery":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "The Curated Space" },
          {
            id: uid(),
            type: "paragraph",
            text: "Welcome to the Gallery. In this edition, we explore the quiet intersections of design, space, and functionality. We create products that respect structural symmetry.",
          },
          {
            id: uid(),
            type: "highlight",
            text: "Design is not just what it looks like and feels like. Design is how it works.",
          },
        ],
        ctaText: "VIEW CATALOGUE",
        ctaUrl: "https://manvilogistics.com",
      };
    case "nordic":
      return {
        heroImageUrl: "",
        blocks: [
          { id: uid(), type: "heading", text: "Form, Function & Simplicity" },
          {
            id: uid(),
            type: "paragraph",
            text: "Hello,\n\nOur Nordic layout features high-quality functional geometry, muted concrete grey tones, and simple sans-serif typography. Designed to deliver information quickly and clearly.",
          },
          {
            id: uid(),
            type: "tip",
            title: "Functional Tip",
            text: "Declutter your workflow. Remove redundant fields and keep components focused.",
          },
        ],
        ctaText: "VIEW PROJECT",
        ctaUrl: "https://manvilogistics.com",
      };
  }
}

// ─────────────────────────────────────────────────────────────────
// TEMPLATE CONFIGURATION
// Template 1: "Manvi Classic" — Brand Colors (Navy/Orange, Light Clean background)
// Template 2: "Manvi Premium" — Brand Colors (Navy Header Card styling)
// Template 3: "Aurora"   — Indigo / Violet  (Promotional)
// Template 4: "Sage"     — Emerald / Teal   (Tips & Insights)
// Template 5: "Obsidian" — Navy / Gold      (Company News)
// Template 6: "Blossom"  — Pastel Sakura    (Artistic & Floral)
// Template 7: "Sky"      — Pastel Dream     (Airy Sky Blue)
// Template 8: "Clay"     — Warm Terracotta  (Artisanal Earthy)
// Template 9: "Dune"     — Minimalist Sand  (Warm Sand)
// Template 10: "Olive"    — Serene Woodland  (Organic Green Leaf)
// Template 11: "Gallery"  — Modern Gallery   (Art Gallery Editorial style)
// Template 12: "Nordic"  — Nordic Concrete  (Minimalist Scandinavian style)
// ─────────────────────────────────────────────────────────────────

const TEMPLATE_CONFIG = {
  "manvi-classic": {
    containerBg: "#ffffff",
    accent: "#f27a1a",
    heading: "#0d1527",
    body: "#475569",
    ctaBg: "#f27a1a",
    ctaColor: "#ffffff",
    tipBg: "#fff7ed",
    tipBorder: "#f27a1a",
    tipTitleColor: "#c2410c",
    tipTextColor: "#7c2d12",
    highlightBg: "#fff7ed",
    highlightAccentColor: "#f27a1a",
    highlightTextColor: "#0d1527",
    headerBg: "#0d1527",
    headerBorder: "#f27a1a",
    headerNameColor: "#ffffff",
    headerSubColor: "#94a3b8",
    footerBg: "#0d1527",
    footerBorder: "#1e293b",
    footerTextColor: "#94a3b8",
    footerLinkColor: "#f27a1a",
  },
  "manvi-premium": {
    containerBg: "#ffffff",
    accent: "#f27a1a",
    heading: "#0d1527",
    body: "#334155",
    ctaBg: "#f27a1a",
    ctaColor: "#ffffff",
    tipBg: "#fff7ed",
    tipBorder: "#f27a1a",
    tipTitleColor: "#c2410c",
    tipTextColor: "#7c2d12",
    highlightBg: "#0d1527",
    highlightAccentColor: "#f27a1a",
    highlightTextColor: "#ffffff",
    headerBg: "#ffffff",
    headerBorder: "#f27a1a",
    headerNameColor: "#0d1527",
    headerSubColor: "#f27a1a",
    footerBg: "#f8fafc",
    footerBorder: "#e2e8f0",
    footerTextColor: "#94a3b8",
    footerLinkColor: "#f27a1a",
  },
  promotional: {
    containerBg: "#ffffff",
    accent: "#6d28d9",
    heading: "#1e1b4b",
    body: "#4b5563",
    ctaBg: "#6d28d9",
    ctaColor: "#ffffff",
    tipBg: "#f5f3ff",
    tipBorder: "#7c3aed",
    tipTitleColor: "#5b21b6",
    tipTextColor: "#4c1d95",
    highlightBg: "#1e1b4b",
    highlightAccentColor: "#a78bfa",
    highlightTextColor: "#ede9fe",
    headerBg: "#ffffff",
    headerBorder: "#6d28d9",
    headerNameColor: "#1e1b4b",
    headerSubColor: "#94a3b8",
    footerBg: "#f5f3ff",
    footerBorder: "#ddd6fe",
    footerTextColor: "#94a3b8",
    footerLinkColor: "#6d28d9",
  },
  tips: {
    containerBg: "#ffffff",
    accent: "#059669",
    heading: "#064e3b",
    body: "#374151",
    ctaBg: "#059669",
    ctaColor: "#ffffff",
    tipBg: "#ecfdf5",
    tipBorder: "#10b981",
    tipTitleColor: "#065f46",
    tipTextColor: "#064e3b",
    highlightBg: "#064e3b",
    highlightAccentColor: "#6ee7b7",
    highlightTextColor: "#d1fae5",
    headerBg: "#f0fdf4",
    headerBorder: "#059669",
    headerNameColor: "#064e3b",
    headerSubColor: "#6b7280",
    footerBg: "#f0fdf4",
    footerBorder: "#d1fae5",
    footerTextColor: "#9ca3af",
    footerLinkColor: "#059669",
  },
  news: {
    containerBg: "#ffffff",
    accent: "#d97706",
    heading: "#0f172a",
    body: "#374151",
    ctaBg: "#d97706",
    ctaColor: "#0f172a",
    tipBg: "#fffbeb",
    tipBorder: "#d97706",
    tipTitleColor: "#92400e",
    tipTextColor: "#78350f",
    highlightBg: "#1e293b",
    highlightAccentColor: "#fbbf24",
    highlightTextColor: "#e2e8f0",
    headerBg: "#0f172a",
    headerBorder: "#d97706",
    headerNameColor: "#fbbf24",
    headerSubColor: "rgba(255,255,255,0.38)",
    footerBg: "#0f172a",
    footerBorder: "#1e293b",
    footerTextColor: "rgba(255,255,255,0.3)",
    footerLinkColor: "#d97706",
  },
  blossom: {
    containerBg: "#ffffff",
    accent: "#f43f5e",
    heading: "#4c0519",
    body: "#4f555d",
    ctaBg: "#fecdd3",
    ctaColor: "#9f1239",
    tipBg: "#fff1f2",
    tipBorder: "#fecdd3",
    tipTitleColor: "#9f1239",
    tipTextColor: "#881337",
    highlightBg: "#ffe4e6",
    highlightAccentColor: "#e11d48",
    highlightTextColor: "#4c0519",
    headerBg: "#fff1f2",
    headerBorder: "#fecdd3",
    headerNameColor: "#9f1239",
    headerSubColor: "#fda4af",
    footerBg: "#fff1f2",
    footerBorder: "#fecdd3",
    footerTextColor: "#fda4af",
    footerLinkColor: "#e11d48",
  },
  sky: {
    containerBg: "#ffffff",
    accent: "#0ea5e9",
    heading: "#0c4a6e",
    body: "#475569",
    ctaBg: "#e0f2fe",
    ctaColor: "#0369a1",
    tipBg: "#f0f9ff",
    tipBorder: "#bae6fd",
    tipTitleColor: "#0369a1",
    tipTextColor: "#075985",
    highlightBg: "#e0f2fe",
    highlightAccentColor: "#0284c7",
    highlightTextColor: "#0c4a6e",
    headerBg: "#f0f9ff",
    headerBorder: "#bae6fd",
    headerNameColor: "#0369a1",
    headerSubColor: "#7dd3fc",
    footerBg: "#f0f9ff",
    footerBorder: "#bae6fd",
    footerTextColor: "#bae6fd",
    footerLinkColor: "#0284c7",
  },
  clay: {
    containerBg: "#faf6f0",
    accent: "#c96f53",
    heading: "#4a271b",
    body: "#5c4e48",
    ctaBg: "#c96f53",
    ctaColor: "#faf6f0",
    tipBg: "#f2ece4",
    tipBorder: "#d8c6b6",
    tipTitleColor: "#8c3f2b",
    tipTextColor: "#4a271b",
    highlightBg: "#e8dfd3",
    highlightAccentColor: "#c96f53",
    highlightTextColor: "#4a271b",
    headerBg: "#efe8de",
    headerBorder: "#d8c6b6",
    headerNameColor: "#8c3f2b",
    headerSubColor: "#a38d7d",
    footerBg: "#efe8de",
    footerBorder: "#d8c6b6",
    footerTextColor: "#a38d7d",
    footerLinkColor: "#c96f53",
  },
  dune: {
    containerBg: "#f7f5f0",
    accent: "#8c7853",
    heading: "#2b2925",
    body: "#5c5954",
    ctaBg: "#8c7853",
    ctaColor: "#f7f5f0",
    tipBg: "#f2efe9",
    tipBorder: "#dfd9ce",
    tipTitleColor: "#8c7853",
    tipTextColor: "#4a453d",
    highlightBg: "#ece8df",
    highlightAccentColor: "#8c7853",
    highlightTextColor: "#2b2925",
    headerBg: "#f0ede5",
    headerBorder: "#dfd9ce",
    headerNameColor: "#8c7853",
    headerSubColor: "#a39987",
    footerBg: "#f0ede5",
    footerBorder: "#dfd9ce",
    footerTextColor: "#a39987",
    footerLinkColor: "#8c7853",
  },
  olive: {
    containerBg: "#ecefe6",
    accent: "#3d5a45",
    heading: "#1e3523",
    body: "#4a584e",
    ctaBg: "#3d5a45",
    ctaColor: "#ecefe6",
    tipBg: "#d5dec8",
    tipBorder: "#bac9a6",
    tipTitleColor: "#1e3523",
    tipTextColor: "#2a4030",
    highlightBg: "#dfe5d5",
    highlightAccentColor: "#3d5a45",
    highlightTextColor: "#1e3523",
    headerBg: "#dfe5d5",
    headerBorder: "#bac9a6",
    headerNameColor: "#1e3523",
    headerSubColor: "#7c8e7e",
    footerBg: "#dfe5d5",
    footerBorder: "#bac9a6",
    footerTextColor: "#7c8e7e",
    footerLinkColor: "#3d5a45",
  },
  gallery: {
    containerBg: "#faf9f6",
    accent: "#111111",
    heading: "#111111",
    body: "#333333",
    ctaBg: "#111111",
    ctaColor: "#faf9f6",
    tipBg: "#ffffff",
    tipBorder: "#111111",
    tipTitleColor: "#111111",
    tipTextColor: "#333333",
    highlightBg: "#f5f5f5",
    highlightAccentColor: "#111111",
    highlightTextColor: "#111111",
    headerBg: "#faf9f6",
    headerBorder: "#e5e5e5",
    headerNameColor: "#111111",
    headerSubColor: "#737373",
    footerBg: "#faf9f6",
    footerBorder: "#e5e5e5",
    footerTextColor: "#a3a3a3",
    footerLinkColor: "#111111",
  },
  nordic: {
    containerBg: "#f3f4f6",
    accent: "#4b5563",
    heading: "#1f2937",
    body: "#4b5563",
    ctaBg: "#1f2937",
    ctaColor: "#ffffff",
    tipBg: "#e5e7eb",
    tipBorder: "#d1d5db",
    tipTitleColor: "#1f2937",
    tipTextColor: "#374151",
    highlightBg: "#e5e7eb",
    highlightAccentColor: "#4b5563",
    highlightTextColor: "#1f2937",
    headerBg: "#e5e7eb",
    headerBorder: "#d1d5db",
    headerNameColor: "#1f2937",
    headerSubColor: "#6b7280",
    footerBg: "#e5e7eb",
    footerBorder: "#d1d5db",
    footerTextColor: "#9ca3af",
    footerLinkColor: "#4b5563",
  },
};

// ─────────────────────────────────────────────────────────────────
// HTML GENERATORS
// ─────────────────────────────────────────────────────────────────

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getHeroHtml(template: TemplateId, heroImageUrl?: string): string {
  // If custom image URL provided, show it
  if (heroImageUrl && heroImageUrl.trim()) {
    return `<div style="line-height:0;"><img src="${escHtml(heroImageUrl)}" alt="Email header image" style="width:100%;max-height:280px;object-fit:cover;display:block;" /></div>`;
  }

  // ── Manvi Classic ─────────────────────────────────────────────
  if (template === "manvi-classic") {
    return `<div style="background:#0d1527;padding:56px 32px;text-align:center;border-bottom:4px solid #f27a1a;">
<div style="font-size:48px;margin-bottom:12px;line-height:1;">📦</div>
<p style="color:#ffffff;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Manvi Classic</p>
</div>`;
  }

  // ── Manvi Premium ─────────────────────────────────────────────
  if (template === "manvi-premium") {
    return `<div style="background:#ffffff;padding:56px 32px;text-align:center;border-bottom:2px solid #e2e8f0;">
<div style="font-size:48px;margin-bottom:12px;line-height:1;">⚓</div>
<p style="color:#0d1527;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Manvi Premium Curation</p>
</div>`;
  }

  // ── Aurora ────────────────────────────────────────────────────
  if (template === "promotional") {
    return `<div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 45%,#4c1d95 100%);padding:64px 32px;text-align:center;position:relative;overflow:hidden;">
<div style="font-size:54px;margin-bottom:14px;line-height:1;">✨</div>
<p style="color:rgba(255,255,255,0.5);margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Exclusive Offer</p>
</div>`;
  }

  // ── Sage ──────────────────────────────────────────────────────
  if (template === "tips") {
    return `<div style="background:linear-gradient(135deg,#064e3b 0%,#065f46 45%,#047857 100%);padding:56px 32px;text-align:center;">
<div style="font-size:50px;margin-bottom:14px;line-height:1;">💡</div>
<p style="color:rgba(255,255,255,0.55);margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Tips &amp; Insights</p>
</div>`;
  }

  // ── Obsidian ──────────────────────────────────────────────────
  if (template === "news") {
    return `<div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#0f172a 100%);padding:60px 32px;text-align:center;border-bottom:3px solid #d97706;">
<div style="font-size:50px;margin-bottom:14px;line-height:1;">📢</div>
<p style="color:rgba(255,255,255,0.45);margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Company Update</p>
</div>`;
  }

  // ── Blossom ───────────────────────────────────────────────────
  if (template === "blossom") {
    return `<div style="background:linear-gradient(135deg,#ffe4e6 0%,#fecdd3 100%);padding:64px 32px;text-align:center;">
<div style="font-size:54px;margin-bottom:14px;line-height:1;">🌸</div>
<p style="color:#9f1239;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Pastel Blossom</p>
</div>`;
  }

  // ── Sky ───────────────────────────────────────────────────────
  if (template === "sky") {
    return `<div style="background:linear-gradient(135deg,#e0f2fe 0%,#e0e7ff 100%);padding:64px 32px;text-align:center;">
<div style="font-size:54px;margin-bottom:14px;line-height:1;">☁️</div>
<p style="color:#0369a1;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Pastel Sky</p>
</div>`;
  }

  // ── Clay ──────────────────────────────────────────────────────
  if (template === "clay") {
    return `<div style="background:linear-gradient(135deg,#e9dcc9 0%,#d8c3a5 100%);padding:64px 32px;text-align:center;border-bottom:2px solid #c96f53;">
<div style="font-size:52px;margin-bottom:12px;line-height:1;">🏺</div>
<p style="color:#4a271b;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Artisanal Clay</p>
</div>`;
  }

  // ── Dune ──────────────────────────────────────────────────────
  if (template === "dune") {
    return `<div style="background:linear-gradient(135deg,#efebe0 0%,#dfd9ce 100%);padding:64px 32px;text-align:center;border-bottom:2px solid #8c7853;">
<div style="font-size:52px;margin-bottom:12px;line-height:1;">🌾</div>
<p style="color:#8c7853;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Pastel Dune</p>
</div>`;
  }

  // ── Olive ─────────────────────────────────────────────────────
  if (template === "olive") {
    return `<div style="background:linear-gradient(135deg,#bac9a6 0%,#8f9e7d 100%);padding:60px 32px;text-align:center;border-bottom:2px solid #3d5a45;">
<div style="font-size:52px;margin-bottom:12px;line-height:1;">🌿</div>
<p style="color:#1e3523;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif;">Woodland Sage</p>
</div>`;
  }

  // ── Gallery ───────────────────────────────────────────────────
  if (template === "gallery") {
    return `<div style="background:linear-gradient(135deg,#f5f5f5 0%,#e5e5e5 100%);padding:64px 32px;text-align:center;border-bottom:1px solid #111111;">
<div style="font-size:36px;font-family:Georgia,serif;font-style:italic;line-height:1;color:#111111;margin-bottom:10px;">✦</div>
<p style="color:#111111;margin:0;font-size:9px;text-transform:uppercase;letter-spacing:5px;font-weight:700;font-family:Arial,sans-serif;">The Curated Gallery</p>
</div>`;
  }

  // ── Nordic ────────────────────────────────────────────────────
  if (template === "nordic") {
    return `<div style="background:#e5e7eb;padding:56px 32px;text-align:center;">
<div style="font-size:40px;line-height:1;margin-bottom:10px;">🛋️</div>
<p style="color:#1f2937;margin:0;font-size:10px;text-transform:uppercase;letter-spacing:3px;font-weight:700;font-family:Arial,sans-serif;">Nordic Functionalist</p>
</div>`;
  }

  return "";
}

function blockToHtml(block: ContentBlock, template: TemplateId): string {
  const cfg = TEMPLATE_CONFIG[template];

  // Gallery style (Artistic Serif theme)
  if (template === "gallery") {
    switch (block.type) {
      case "heading":
        return `<h2 style="color:#111111;margin:0 0 20px;font-size:26px;font-weight:normal;font-style:italic;font-family:Georgia,serif;line-height:1.35;">${escHtml(block.text || "Heading")}</h2>`;
      case "paragraph": {
        const lines = (block.text || "").split("\n").filter((l) => l.trim());
        return `<p style="color:#333333;line-height:1.9;font-size:15px;margin:0 0 24px;font-family:Georgia,serif;">${lines.map(escHtml).join("<br>")}</p>`;
      }
      case "tip":
        return `<div style="background:${cfg.tipBg};border:1px solid #111111;padding:24px;margin:24px 0;text-align:left;">${
          block.title
            ? `<p style="color:#111111;margin:0 0 8px;font-weight:bold;font-size:12px;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:2px;">✦ ${escHtml(block.title)}</p>`
            : ""
        }<p style="color:#333333;margin:0;font-size:14px;line-height:1.75;font-family:Georgia,serif;font-style:italic;">${escHtml(block.text || "Tip content")}</p></div>`;
      case "highlight":
        return `<div style="border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;padding:24px 10px;margin:26px 0;text-align:center;"><p style="color:#111111;margin:0;font-size:18px;line-height:1.8;font-style:italic;font-family:Georgia,serif;">&ldquo;${escHtml(block.text || "Key message here")}&rdquo;</p></div>`;
      default:
        return "";
    }
  }

  // Nordic style (Scandinavian Clean Concrete theme)
  if (template === "nordic") {
    switch (block.type) {
      case "heading":
        return `<h2 style="color:${cfg.heading};margin:0 0 16px;font-size:24px;font-weight:700;font-family:Helvetica,Arial,sans-serif;letter-spacing:-0.5px;line-height:1.2;">${escHtml(block.text || "Heading")}</h2>`;
      case "paragraph": {
        const lines = (block.text || "").split("\n").filter((l) => l.trim());
        return `<p style="color:${cfg.body};line-height:1.75;font-size:14px;margin:0 0 22px;font-family:Helvetica,Arial,sans-serif;">${lines.map(escHtml).join("<br>")}</p>`;
      }
      case "tip":
        return `<div style="background:${cfg.tipBg};padding:20px;margin:20px 0;border-radius:4px;">${
          block.title
            ? `<p style="color:${cfg.tipTitleColor};margin:0 0 6px;font-weight:700;font-size:12px;font-family:Helvetica,Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;">${escHtml(block.title)}</p>`
            : ""
        }<p style="color:${cfg.tipTextColor};margin:0;font-size:13.5px;line-height:1.65;font-family:Helvetica,Arial,sans-serif;">${escHtml(block.text || "Tip content")}</p></div>`;
      case "highlight":
        return `<div style="background:#1f2937;border-radius:4px;padding:24px;margin:22px 0;"><p style="color:#ffffff;margin:0;font-size:15px;line-height:1.7;font-family:Helvetica,Arial,sans-serif;font-weight:500;">${escHtml(block.text || "Key message here")}</p></div>`;
      default:
        return "";
    }
  }

  // Standard renderer
  switch (block.type) {
    case "heading":
      return `<h2 style="color:${cfg.heading};margin:0 0 18px;font-size:26px;font-weight:800;font-family:Arial,sans-serif;line-height:1.25;">${escHtml(block.text || "Heading")}</h2>`;
    case "paragraph": {
      const lines = (block.text || "").split("\n").filter((l) => l.trim());
      return `<p style="color:${cfg.body};line-height:1.85;font-size:15px;margin:0 0 20px;font-family:Arial,sans-serif;">${lines.map(escHtml).join("<br>")}</p>`;
    }
    case "tip":
      return `<div style="background:${cfg.tipBg};border-left:4px solid ${cfg.tipBorder};padding:16px 20px;margin:16px 0;border-radius:0 10px 10px 0;">${
        block.title
          ? `<p style="color:${cfg.tipTitleColor};margin:0 0 6px;font-weight:700;font-size:13px;font-family:Arial,sans-serif;">💡 ${escHtml(block.title)}</p>`
          : ""
      }<p style="color:${cfg.tipTextColor};margin:0;font-size:14px;line-height:1.7;font-family:Arial,sans-serif;">${escHtml(block.text || "Tip content")}</p></div>`;
    case "highlight":
      return `<div style="background:${cfg.highlightBg};border-radius:12px;padding:26px 28px;margin:22px 0;"><p style="color:${cfg.highlightAccentColor};margin:0 0 10px;font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:700;font-family:Arial,sans-serif;">✦ Highlight</p><p style="color:${cfg.highlightTextColor};margin:0;font-size:16px;line-height:1.75;font-style:italic;font-family:Arial,sans-serif;">&ldquo;${escHtml(block.text || "Key message here")}&rdquo;</p></div>`;
    default:
      return "";
  }
}

function generateEmailHtml(template: TemplateId, content: EmailContent): string {
  const cfg = TEMPLATE_CONFIG[template];
  const bodyHtml = content.blocks.map((b) => blockToHtml(b, template)).join("");

  let ctaHtml = "";
  if (content.ctaText) {
    if (template === "gallery") {
      ctaHtml = `<div style="text-align:center;margin:38px 0 10px;"><a href="${escHtml(content.ctaUrl || "https://manvilogistics.com")}" style="background:${cfg.ctaBg};color:${cfg.ctaColor};padding:15px 44px;border:1px solid #111111;text-decoration:none;font-weight:bold;font-size:13px;display:inline-block;font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">${escHtml(content.ctaText)}</a></div>`;
    } else if (template === "nordic") {
      ctaHtml = `<div style="text-align:center;margin:38px 0 10px;"><a href="${escHtml(content.ctaUrl || "https://manvilogistics.com")}" style="background:${cfg.ctaBg};color:${cfg.ctaColor};padding:15px 40px;border-radius:4px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;font-family:Helvetica,Arial,sans-serif;letter-spacing:0.5px;">${escHtml(content.ctaText)}</a></div>`;
    } else {
      ctaHtml = `<div style="text-align:center;margin:38px 0 10px;"><a href="${escHtml(content.ctaUrl || "https://manvilogistics.com")}" style="background:${cfg.ctaBg};color:${cfg.ctaColor};padding:16px 46px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;font-family:Arial,sans-serif;letter-spacing:0.4px;">${escHtml(content.ctaText)}</a></div>`;
    }
  }

  let signoff = "";
  if (template === "gallery") {
    signoff = `<p style="color:#737373;line-height:1.8;font-size:14px;margin:30px 0 0;font-family:Georgia,serif;font-style:italic;">Warmly,<br><strong style="color:#111111;font-weight:normal;font-style:normal;">— The Design Team</strong></p>`;
  } else if (template === "nordic") {
    signoff = `<p style="color:${cfg.body};line-height:1.7;font-size:13.5px;margin:30px 0 0;font-family:Helvetica,Arial,sans-serif;font-weight:500;">Med venlig hilsen,<br><strong style="color:${cfg.heading};">— Manvi Team</strong></p>`;
  } else {
    signoff = `<p style="color:${cfg.body};line-height:1.8;font-size:14px;margin:30px 0 0;font-family:Arial,sans-serif;">With warm regards,<br><strong style="color:${cfg.heading};">— The Manvi Team</strong></p>`;
  }

  let headerHtml = "";
  if (template === "gallery") {
    headerHtml = `<div style="background:${cfg.headerBg};padding:24px 32px;border-bottom:1px solid ${cfg.headerBorder};text-align:center;"><h1 style="color:${cfg.headerNameColor};margin:0;font-size:20px;font-family:Georgia,serif;font-weight:normal;letter-spacing:3px;text-transform:uppercase;">Manvi</h1><p style="color:${cfg.headerSubColor};margin:4px 0 0;font-size:10px;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:2px;">Design &amp; Curation</p></div>`;
  } else if (template === "nordic") {
    headerHtml = `<div style="background:${cfg.headerBg};padding:20px 32px;border-bottom:1px solid ${cfg.headerBorder};"><h1 style="color:${cfg.headerNameColor};margin:0;font-size:20px;font-family:Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:-0.5px;">Manvi Logistics</h1><p style="color:${cfg.headerSubColor};margin:4px 0 0;font-size:11.5px;font-family:Helvetica,Arial,sans-serif;">EST. 2026 // NORDIC OFFICE</p></div>`;
  } else {
    headerHtml = `<div style="background:${cfg.headerBg};padding:20px 32px;border-bottom:2px solid ${cfg.headerBorder};"><h1 style="color:${cfg.headerNameColor};margin:0;font-size:22px;font-family:Arial,sans-serif;font-weight:800;letter-spacing:-0.3px;">Manvi Logistics</h1><p style="color:${cfg.headerSubColor};margin:5px 0 0;font-size:12px;font-family:Arial,sans-serif;">Your trusted shipping partner</p></div>`;
  }

  let footerHtml = "";
  if (template === "gallery") {
    footerHtml = `<div style="background:${cfg.footerBg};padding:24px 32px;text-align:center;border-top:1px solid ${cfg.footerBorder};"><p style="color:${cfg.footerTextColor};font-size:11px;margin:0;font-family:Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;">You are receiving this digest as a curated subscriber.<br><a href="https://manvilogistics.com" style="color:${cfg.footerLinkColor};text-decoration:none;border-bottom:1px solid #111111;">MANVI CO.</a></p></div>`;
  } else if (template === "nordic") {
    footerHtml = `<div style="background:${cfg.footerBg};padding:22px 32px;text-align:center;border-top:1px solid ${cfg.footerBorder};"><p style="color:${cfg.footerTextColor};font-size:11.5px;margin:0;font-family:Helvetica,Arial,sans-serif;">Copyright &copy; Manvi Logistics. All rights reserved.<br><a href="https://manvilogistics.com" style="color:${cfg.footerLinkColor};text-decoration:none;font-weight:bold;">[ manvilogistics.com ]</a></p></div>`;
  } else {
    footerHtml = `<div style="background:${cfg.footerBg};padding:22px 32px;text-align:center;border-top:1px solid ${cfg.footerBorder};"><p style="color:${cfg.footerTextColor};font-size:12px;margin:0;font-family:Arial,sans-serif;">You are receiving this because you subscribed on our blog.<br><a href="https://manvilogistics.com" style="color:${cfg.footerLinkColor};text-decoration:none;">Manvi Logistics</a> &mdash; Making Shipping Simple</p></div>`;
  }

  const containerStyle = `font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:${cfg.containerBg || "#ffffff"};border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);`;

  return `<div style="${containerStyle}">
${headerHtml}
${getHeroHtml(template, content.heroImageUrl)}
<div style="padding:40px 36px;">
${bodyHtml}
${ctaHtml}
${signoff}
</div>
${footerHtml}
</div>`;
}

// ─────────────────────────────────────────────────────────────────
// TEMPLATE THUMBNAIL PREVIEW
// ─────────────────────────────────────────────────────────────────

function TemplateThumbnail({ template }: { template: TemplateId }) {
  const sampleContent = defaultContent(template);
  const html = generateEmailHtml(template, sampleContent);

  return (
    <div
      style={{
        width: "100%",
        height: "180px",
        overflow: "hidden",
        position: "relative",
        borderRadius: "8px",
        background: "#f8fafc",
        pointerEvents: "none",
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "600px",
          transformOrigin: "top center",
          transform: "scale(0.35)",
          marginTop: "12px",
          flexShrink: 0,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// BLOCK ICON + LABEL HELPERS
// ─────────────────────────────────────────────────────────────────

const BLOCK_META: Record<BlockType, { label: string; icon: React.ReactNode; color: string }> = {
  heading: { label: "Heading", icon: <Heading1 size={14} />, color: "text-violet-600 bg-violet-50 border-violet-200" },
  paragraph: { label: "Paragraph", icon: <AlignLeft size={14} />, color: "text-slate-600 bg-slate-50 border-slate-200" },
  tip: { label: "Tip Card", icon: <Lightbulb size={14} />, color: "text-amber-600 bg-amber-50 border-amber-200" },
  highlight: { label: "Highlight", icon: <Star size={14} />, color: "text-blue-600 bg-blue-50 border-blue-200" },
};

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  const [step, setStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("manvi-classic");
  const [content, setContent] = useState<EmailContent>(defaultContent("manvi-classic"));

  const [subject, setSubject] = useState("");
  const [senderName, setSenderName] = useState("Manvi Logistics");
  const [senderEmail, setSenderEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [history, setHistory] = useState<SendHistory[]>([]);
  const [activeTab, setActiveTab] = useState<"compose" | "subscribers">("compose");
  const [addBlockOpen, setAddBlockOpen] = useState(false);
  const addBlockRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (addBlockRef.current && !addBlockRef.current.contains(e.target as Node)) {
        setAddBlockOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSubscribers = useCallback(async () => {
    setLoadingSubscribers(true);
    try {
      const res = await fetch(`${API_URL}/api/subscribers`);
      const data = await res.json();
      if (data.success) setSubscribers(data.data);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoadingSubscribers(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
    const saved = localStorage.getItem("newsletter_history_v2");
    if (saved) setHistory(JSON.parse(saved));
  }, [fetchSubscribers]);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_URL}/admin/upload-image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setContent((c) => ({ ...c, heroImageUrl: data.url }));
      } else {
        alert(data.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("An error occurred while uploading the image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // ── Block editing helpers ────────────────────────────────────

  function updateBlock(id: string, patch: Partial<ContentBlock>) {
    setContent((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }

  function removeBlock(id: string) {
    setContent((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
  }

  // ── Select template ──────────────────────────────────────────

  function selectTemplate(t: TemplateId) {
    setSelectedTemplate(t);
    setContent(defaultContent(t));
    setSubject("");
    setSendResult(null);
    setStep("edit");
  }

  function addBlock(type: BlockType) {
    const defaults: Record<BlockType, Partial<ContentBlock>> = {
      heading: { text: "New Section" },
      paragraph: { text: "" },
      tip: { title: "Pro Tip", text: "" },
      highlight: { text: "" },
    };
    setContent((prev) => ({
      ...prev,
      blocks: [...prev.blocks, { id: uid(), type, ...defaults[type] } as ContentBlock],
    }));
    setAddBlockOpen(false);
  }

  // ── Send ─────────────────────────────────────────────────────

  async function handleSend() {
    if (!subject.trim() || !senderEmail.trim()) {
      setSendResult({ type: "error", message: "Please fill in the Subject and Sender Email." });
      return;
    }
    if (content.blocks.length === 0) {
      setSendResult({ type: "error", message: "Add at least one content block." });
      return;
    }
    setSending(true);
    setSendResult(null);
    try {
      const htmlContent = generateEmailHtml(selectedTemplate, content);
      const res = await fetch(`${API_URL}/admin/newsletter/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          htmlContent,
          senderName: senderName.trim() || "Manvi Logistics",
          senderEmail: senderEmail.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSendResult({
          type: "success",
          message: `Campaign "${subject}" sent successfully to ${subscribers.length} subscriber(s)!`,
        });
        const entry: SendHistory = {
          subject,
          sentAt: new Date().toISOString(),
          count: subscribers.length,
          status: "success",
          template: selectedTemplate,
        };
        const updated = [entry, ...history].slice(0, 10);
        setHistory(updated);
        localStorage.setItem("newsletter_history_v2", JSON.stringify(updated));
        setSubject("");
        setContent(defaultContent(selectedTemplate));
      } else {
        setSendResult({ type: "error", message: data.error || "Failed to send campaign. Check Brevo settings." });
      }
    } catch {
      setSendResult({ type: "error", message: "Network error. Make sure the server is running." });
    } finally {
      setSending(false);
    }
  }

  // ────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {step === "edit" && (
            <button
              onClick={() => setStep("template")}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="text-[#f27a1a]" size={26} />
              Newsletter
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {step === "template"
                ? "Choose a template to start your campaign"
                : "Compose your email and send to all subscribers"}
            </p>
          </div>
        </div>

        <div className="bg-[#0D1527] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Users size={15} className="text-[#f27a1a]" />
          <span className="font-bold text-[#f27a1a]">{subscribers.length}</span>
          <span className="text-slate-400">subscriber{subscribers.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("compose")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "compose"
              ? "border-[#f27a1a] text-[#f27a1a]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Compose &amp; Send
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "subscribers"
              ? "border-[#f27a1a] text-[#f27a1a]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════
          COMPOSE TAB
      ════════════════════════════════════════════════════════ */}
      {activeTab === "compose" && (
        <>
          {/* ── STEP 1: Template Picker ── */}
          {step === "template" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {(
                  [
                    {
                      id: "manvi-classic" as TemplateId,
                      name: "Manvi Classic",
                      theme: "Brand Identity",
                      desc: "Clean light layout utilizing corporate navy text structures and custom bright orange callouts and buttons",
                      badge: "📦",
                    },
                    {
                      id: "manvi-premium" as TemplateId,
                      name: "Manvi Premium",
                      theme: "Brand Editorial",
                      desc: "Sleek slate-blue layout with corporate navy framing, white content cards, and crisp brand details",
                      badge: "⚓",
                    },
                    {
                      id: "promotional" as TemplateId,
                      name: "Aurora",
                      theme: "Promotional",
                      desc: "Bold indigo-violet gradient with a modern look — perfect for offers &amp; announcements",
                      badge: "✨",
                    },
                    {
                      id: "tips" as TemplateId,
                      name: "Sage",
                      theme: "Tips &amp; Insights",
                      desc: "Fresh emerald theme with clean tip cards — ideal for educational content",
                      badge: "💡",
                    },
                    {
                      id: "news" as TemplateId,
                      name: "Obsidian",
                      theme: "Company News",
                      desc: "Sophisticated dark navy with gold accents — for premium company updates",
                      badge: "📢",
                    },
                    {
                      id: "blossom" as TemplateId,
                      name: "Blossom",
                      theme: "Pastel Sakura",
                      desc: "Elegant and artistic pastel pink theme — perfect for creative visual storytelling",
                      badge: "🌸",
                    },
                    {
                      id: "sky" as TemplateId,
                      name: "Sky",
                      theme: "Pastel Dream",
                      desc: "Serene lavender and soft blue pastel gradient — modern, clean, and airy styling",
                      badge: "☁️",
                    },
                    {
                      id: "clay" as TemplateId,
                      name: "Clay",
                      theme: "Warm Terracotta",
                      desc: "Artisanal sienna tones with sand accents — warm, earthy, and organic editorial layouts",
                      badge: "🏺",
                    },
                    {
                      id: "dune" as TemplateId,
                      name: "Dune",
                      theme: "Minimalist Sand",
                      desc: "Serene desert sand and beige palette — clean, warm minimalist typography and spacious design",
                      badge: "🌾",
                    },
                    {
                      id: "olive" as TemplateId,
                      name: "Olive",
                      theme: "Serene Sage Leaf",
                      desc: "Soothing forest olive and green tea tones — natural, ecological aesthetic for calm and mindful updates",
                      badge: "🌿",
                    },
                    {
                      id: "gallery" as TemplateId,
                      name: "Gallery",
                      theme: "Art Gallery Curation",
                      desc: "Serif-focused layout with thin margins, framing borders, and offset block signatures mimicking an art catalog",
                      badge: "🖼️",
                    },
                    {
                      id: "nordic" as TemplateId,
                      name: "Nordic",
                      theme: "Scandinavian Functionalist",
                      desc: "Muted concrete grey tones, sharp grid headers, and tight geometry optimized for simple project showcases",
                      badge: "🛋️",
                    },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => selectTemplate(t.id)}
                    className="group text-left bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                  >
                    {/* Thumbnail */}
                    <div>
                      <div className="relative">
                        <TemplateThumbnail template={t.id} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-slate-100">
                            Use Template →
                          </span>
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{t.badge}</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-none">{t.name}</p>
                            <p
                              className="text-[10px] text-slate-400 font-medium mt-0.5"
                              dangerouslySetInnerHTML={{ __html: t.theme }}
                            />
                          </div>
                        </div>
                        <p
                          className="text-xs text-slate-500 leading-relaxed mt-2"
                          dangerouslySetInnerHTML={{ __html: t.desc }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Send History */}
              {history.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Clock size={15} className="text-slate-400" />
                      Recent Campaigns
                    </p>
                    <button
                      onClick={() => {
                        setHistory([]);
                        localStorage.removeItem("newsletter_history_v2");
                      }}
                      className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={12} /> Clear
                    </button>
                  </div>
                  <div className="space-y-2">
                    {history.map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={15} className="text-green-500 flex-none" />
                          <div>
                            <p className="text-sm font-medium text-slate-700 truncate max-w-xs">{h.subject}</p>
                            <p className="text-xs text-slate-400">
                              {h.template} · {h.count} recipients ·{" "}
                              {new Date(h.sentAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Sent
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Editor + Preview ── */}
          {step === "edit" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* ── LEFT: Editor ── */}
              <div className="space-y-4">
                {/* Template badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Template:</span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full capitalize">
                    {selectedTemplate === "manvi-classic"
                      ? "📦 Manvi Classic"
                      : selectedTemplate === "manvi-premium"
                      ? "⚓ Manvi Premium"
                      : selectedTemplate === "promotional"
                      ? "✨ Aurora"
                      : selectedTemplate === "tips"
                      ? "💡 Sage"
                      : selectedTemplate === "news"
                      ? "📢 Obsidian"
                      : selectedTemplate === "blossom"
                      ? "🌸 Blossom"
                      : selectedTemplate === "sky"
                      ? "☁️ Sky"
                      : selectedTemplate === "clay"
                      ? "🏺 Clay"
                      : selectedTemplate === "dune"
                      ? "🌾 Dune"
                      : selectedTemplate === "olive"
                      ? "🌿 Olive"
                      : selectedTemplate === "gallery"
                      ? "🖼️ Gallery"
                      : "🛋️ Nordic"}
                  </span>
                </div>

                {/* ── Hero Image ── */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <ImageIcon size={15} className="text-[#f27a1a]" />
                      Top Hero Image
                      <span className="text-slate-400 font-normal text-xs">(optional)</span>
                    </p>
                    
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="hero-image-upload"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                      <label
                        htmlFor="hero-image-upload"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                          uploadingImage
                            ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {uploadingImage ? (
                          <>
                            <RefreshCw size={12} className="animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Plus size={12} />
                            Upload Image
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={content.heroImageUrl || ""}
                      onChange={(e) => setContent((c) => ({ ...c, heroImageUrl: e.target.value }))}
                      placeholder="https://example.com/your-banner.jpg"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                    />
                    <p className="text-xs text-slate-400 mt-1.5">
                      Upload an image or paste a URL to use as the top banner. Leave blank to use the default template hero.
                    </p>
                  </div>
                  {content.heroImageUrl && content.heroImageUrl.trim() && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.heroImageUrl}
                        alt="Hero preview"
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <button
                        onClick={() => setContent((c) => ({ ...c, heroImageUrl: "" }))}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Blocks */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <p className="text-sm font-semibold text-slate-700">Email Content</p>

                  {content.blocks.map((block, idx) => {
                    const meta = BLOCK_META[block.type];
                    return (
                      <div key={block.id} className="group relative">
                        {/* Block header */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md border ${meta.color}`}
                          >
                            {meta.icon}
                            {meta.label}
                          </span>
                          <div className="flex-1" />
                          {idx > 0 || content.blocks.length > 1 ? (
                            <button
                              onClick={() => removeBlock(block.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 hover:text-red-500 text-slate-300 transition-all"
                            >
                              <X size={13} />
                            </button>
                          ) : null}
                        </div>

                        {/* Block fields */}
                        {block.type === "heading" && (
                          <input
                            type="text"
                            value={block.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            placeholder="Enter heading..."
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a] text-slate-900"
                          />
                        )}

                        {block.type === "paragraph" && (
                          <textarea
                            value={block.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            rows={4}
                            placeholder="Write your paragraph... (press Enter for new lines)"
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a] resize-y text-slate-700 leading-relaxed"
                          />
                        )}

                        {block.type === "tip" && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={block.title || ""}
                              onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                              placeholder="Tip title (e.g. Pack Smart)"
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 text-slate-800"
                            />
                            <textarea
                              value={block.text}
                              onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                              rows={2}
                              placeholder="Tip description..."
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 resize-none text-slate-700"
                            />
                          </div>
                        )}

                        {block.type === "highlight" && (
                          <textarea
                            value={block.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            rows={2}
                            placeholder="Key message or quote to highlight..."
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 resize-none text-slate-700 italic"
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Add Block dropdown */}
                  <div className="relative" ref={addBlockRef}>
                    <button
                      onClick={() => setAddBlockOpen((o) => !o)}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-[#f27a1a] hover:text-[#f27a1a] text-slate-400 rounded-xl py-2.5 text-sm font-medium transition-colors"
                    >
                      <Plus size={15} /> Add Block
                      <ChevronDown size={13} className={`transition-transform ${addBlockOpen ? "rotate-180" : ""}`} />
                    </button>
                    {addBlockOpen && (
                      <div className="absolute z-10 top-full mt-1 left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                        {(Object.entries(BLOCK_META) as [BlockType, (typeof BLOCK_META)[BlockType]][]).map(([type, meta]) => (
                          <button
                            key={type}
                            onClick={() => addBlock(type)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 text-left transition-colors"
                          >
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md border ${meta.color}`}>
                              {meta.icon}
                              {meta.label}
                            </span>
                            <span className="text-slate-500 text-xs">
                              {type === "heading" && "A large section title"}
                              {type === "paragraph" && "Body text / message"}
                              {type === "tip" && "Callout box with a tip"}
                              {type === "highlight" && "Dark box for key quotes"}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Link2 size={15} className="text-[#f27a1a]" />
                    Call-to-Action Button
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={content.ctaText}
                        onChange={(e) => setContent((c) => ({ ...c, ctaText: e.target.value }))}
                        placeholder="Get Started →"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Button URL</label>
                      <input
                        type="url"
                        value={content.ctaUrl}
                        onChange={(e) => setContent((c) => ({ ...c, ctaUrl: e.target.value }))}
                        placeholder="https://manvilogistics.com"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Sender + Subject */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                  <p className="text-sm font-semibold text-slate-700">Campaign Details</p>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">
                      Subject Line <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Special offer from Manvi Logistics!"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                    />
                    <p className="text-xs text-slate-400 mt-1">{subject.length}/150 characters</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">From Name</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Manvi Logistics"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">
                        From Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="info@manvilogistics.com"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f27a1a]/30 focus:border-[#f27a1a]"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                    ⚠️ The sender email must be verified in Brevo (Settings → Senders, domains, IPs)
                  </p>
                </div>

                {/* Send Result */}
                {sendResult && (
                  <div
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${
                      sendResult.type === "success"
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {sendResult.type === "success" ? (
                      <CheckCircle size={17} className="mt-0.5 flex-none" />
                    ) : (
                      <AlertCircle size={17} className="mt-0.5 flex-none" />
                    )}
                    <p className="text-sm">{sendResult.message}</p>
                  </div>
                )}

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={sending || subscribers.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-[#f27a1a] hover:bg-[#db660c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm shadow-lg shadow-orange-200"
                >
                  {sending ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Sending campaign...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send to All {subscribers.length} Subscriber{subscribers.length !== 1 ? "s" : ""}
                    </>
                  )}
                </button>
              </div>

              {/* ── RIGHT: Live Preview ── */}
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye size={15} className="text-[#f27a1a]" />
                    <p className="text-sm font-semibold text-slate-700">Live Preview</p>
                    <span className="text-xs text-slate-400 ml-auto">Updates as you type</span>
                  </div>

                  {/* Email client chrome */}
                  <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                    {/* Fake email client header */}
                    <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-medium text-slate-600">From:</span>
                        <span>
                          {senderName || "Manvi Logistics"}{" "}
                          {senderEmail ? `<${senderEmail}>` : "<info@manvilogistics.com>"}
                        </span>
                      </div>
                      {subject && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="font-medium text-slate-600">Subject:</span>
                          <span className="font-medium text-slate-700">{subject}</span>
                        </div>
                      )}
                    </div>

                    {/* Email body preview */}
                    <div
                      className="overflow-auto max-h-[600px] bg-slate-50"
                      dangerouslySetInnerHTML={{
                        __html: generateEmailHtml(selectedTemplate, content),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════
          SUBSCRIBERS TAB
      ════════════════════════════════════════════════════════ */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-700">All Subscribers ({subscribers.length})</p>
            <button
              onClick={fetchSubscribers}
              disabled={loadingSubscribers}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <RefreshCw size={13} className={loadingSubscribers ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {loadingSubscribers ? (
            <div className="py-14 text-center text-slate-400 text-sm">Loading subscribers...</div>
          ) : subscribers.length === 0 ? (
            <div className="py-14 text-center text-slate-400 text-sm">No subscribers yet. Share your blog!</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {subscribers.map((sub) => (
                <div
                  key={sub._id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0D1527] text-[#f27a1a] flex items-center justify-center text-xs font-bold uppercase flex-none">
                      {sub.email[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{sub.email}</p>
                      <p className="text-xs text-slate-400">
                        {sub.firstName || "—"} · via {sub.source} ·{" "}
                        {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      sub.brevoSynced ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {sub.brevoSynced ? "Brevo synced" : "Pending sync"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
