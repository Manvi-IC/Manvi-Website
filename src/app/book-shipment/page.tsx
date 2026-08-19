"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  User,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  ShieldCheck,
  Truck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Package,
  CreditCard,
  Search,
  X,
  ChevronRight,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

// ============================================================
// PRODUCT DATABASE FOR HSN CODE AUTO-SUGGEST
// ============================================================
const PRODUCT_DATABASE = [
  {
    name: "ARTIFICIAL JEWELLERY",
    hsnCode: "71171100",
    keywords: ["artificial jewellery", "fake jewellery", "fashion jewellery"],
  },
  {
    name: "AUTO PARTS",
    hsnCode: "87080000",
    keywords: ["auto parts", "car parts", "vehicle parts"],
  },
  {
    name: "BAG",
    hsnCode: "63053300",
    keywords: ["bag", "carry bag", "hand bag", "shopping bag"],
  },
  {
    name: "BANGLE",
    hsnCode: "70181010",
    keywords: ["bangle", "bangles", "glass bangle", "chooda"],
  },
  {
    name: "BELT",
    hsnCode: "42033000",
    keywords: ["belt", "leather belt", "waist belt"],
  },
  {
    name: "BINDI",
    hsnCode: "33049940",
    keywords: ["bindi", "bindis", "forehead decoration"],
  },
  {
    name: "BLANKET",
    hsnCode: "63014000",
    keywords: ["blanket", "woolen blanket", "cotton blanket"],
  },
  {
    name: "BOOKS",
    hsnCode: "49011010",
    keywords: ["books", "book", "notebook", "copy"],
  },
  {
    name: "BRUSH",
    hsnCode: "85030090",
    keywords: ["brush", "hair brush", "paint brush"],
  },
  {
    name: "CANDY",
    hsnCode: "17040000",
    keywords: ["candy", "candies", "sweet", "toffee"],
  },
  {
    name: "CAP",
    hsnCode: "65050090",
    keywords: ["cap", "hat", "baseball cap"],
  },
  {
    name: "CLIP",
    hsnCode: "83059020",
    keywords: ["clip", "paper clip", "hair clip"],
  },
  { name: "COMB", hsnCode: "96151900", keywords: ["comb", "hair comb"] },
  {
    name: "COSMETIC",
    hsnCode: "33030000",
    keywords: ["cosmetic", "makeup", "beauty product"],
  },
  {
    name: "COTTON BABY DRESS",
    hsnCode: "61112000",
    keywords: ["cotton baby dress", "baby dress", "infant dress"],
  },
  {
    name: "COTTON BEDSHEET",
    hsnCode: "63023100",
    keywords: ["cotton bedsheet", "bedsheet", "bed sheet"],
  },
  {
    name: "COTTON CLOTH",
    hsnCode: "61142000",
    keywords: ["cotton cloth", "fabric", "textile"],
  },
  {
    name: "COTTON CURTAIN",
    hsnCode: "63039100",
    keywords: ["cotton curtain", "curtain", "window curtain"],
  },
  {
    name: "COTTON DUPATTA",
    hsnCode: "62171090",
    keywords: ["cotton dupatta", "dupatta", "scarf"],
  },
  {
    name: "COTTON HANKY",
    hsnCode: "62132000",
    keywords: ["cotton hanky", "handkerchief", "hanky"],
  },
  {
    name: "COTTON KURTA PAJAMA",
    hsnCode: "62031910",
    keywords: ["cotton kurta pajama", "kurta pajama", "kurta pyjama"],
  },
  {
    name: "COTTON LADIES SUIT",
    hsnCode: "62041290",
    keywords: ["cotton ladies suit", "ladies suit", "salwar suit"],
  },
  {
    name: "COTTON LOWER",
    hsnCode: "62046290",
    keywords: ["cotton lower", "lower", "pajama", "pyjama"],
  },
  {
    name: "COTTON NIGHT DRESS",
    hsnCode: "62082190",
    keywords: ["cotton night dress", "night dress", "nightgown"],
  },
  {
    name: "COTTON PANT",
    hsnCode: "62034290",
    keywords: ["cotton pant", "pant", "trousers", "pants"],
  },
  {
    name: "COTTON PILLOW COVER",
    hsnCode: "63049231",
    keywords: ["cotton pillow cover", "pillow cover", "pillow case"],
  },
  {
    name: "COTTON SHIRT",
    hsnCode: "62052090",
    keywords: ["cotton shirt", "shirt", "formal shirt"],
  },
  {
    name: "COTTON SHORTS",
    hsnCode: "62046290",
    keywords: ["cotton shorts", "shorts", "bermuda"],
  },
  {
    name: "COTTON T SHIRT",
    hsnCode: "61091000",
    keywords: ["cotton t shirt", "t-shirt", "tshirt", "tee"],
  },
  {
    name: "COTTON THREAD",
    hsnCode: "52041190",
    keywords: ["cotton thread", "thread", "sewing thread"],
  },
  {
    name: "COTTON TIE",
    hsnCode: "62159010",
    keywords: ["cotton tie", "tie", "necktie"],
  },
  {
    name: "COTTON TOP",
    hsnCode: "62063090",
    keywords: ["cotton top", "top", "blouse"],
  },
  {
    name: "COTTON TOWEL",
    hsnCode: "63049260",
    keywords: ["cotton towel", "towel", "bath towel"],
  },
  {
    name: "COTTON UNDERGARMENTS",
    hsnCode: "61071100",
    keywords: ["cotton undergarments", "undergarments", "innerwear"],
  },
  {
    name: "DENIM JEANS",
    hsnCode: "62034290",
    keywords: ["denim jeans", "jeans", "dungaree"],
  },
  {
    name: "DRY FRUITS",
    hsnCode: "8135020",
    keywords: ["dry fruits", "dry fruit", "nuts", "almonds"],
  },
  {
    name: "EMPTY BOX",
    hsnCode: "48191090",
    keywords: ["empty box", "box", "cardboard box"],
  },
  {
    name: "ENVELOPE",
    hsnCode: "48171000",
    keywords: ["envelope", "letter envelope"],
  },
  {
    name: "GIFT CARD",
    hsnCode: "49090010",
    keywords: ["gift card", "greeting card"],
  },
  {
    name: "GLOVES",
    hsnCode: "61169990",
    keywords: ["gloves", "glove", "hand gloves"],
  },
  {
    name: "GOGGLES",
    hsnCode: "90041000",
    keywords: ["goggles", "sunglasses", "eye protection"],
  },
  {
    name: "HAIR BAND",
    hsnCode: "40169920",
    keywords: ["hair band", "hairband", "headband"],
  },
  {
    name: "HOME DECORATIVE",
    hsnCode: "68159990",
    keywords: ["home decorative", "decoration", "home decor"],
  },
  {
    name: "HOMEMADE SWEET",
    hsnCode: "17049090",
    keywords: ["homemade sweet", "mithai", "sweets"],
  },
  {
    name: "HOUSEHOLD ITEMS",
    hsnCode: "39240000",
    keywords: ["household items", "houseware", "home items"],
  },
  {
    name: "LADIES PURSE",
    hsnCode: "42022110",
    keywords: ["ladies purse", "purse", "handbag"],
  },
  {
    name: "LEHENGA",
    hsnCode: "62041390",
    keywords: ["lehenga", "lehenga choli"],
  },
  {
    name: "MOBILE ACCESSORIES",
    hsnCode: "85170000",
    keywords: ["mobile accessories", "phone accessories"],
  },
  {
    name: "MOSQUITO NET",
    hsnCode: "63049270",
    keywords: ["mosquito net", "mosquito netting"],
  },
  {
    name: "OPTICAL",
    hsnCode: "90011000",
    keywords: ["optical", "spectacles", "glasses"],
  },
  {
    name: "PAPER",
    hsnCode: "48020000",
    keywords: ["paper", "sheets", "paper sheets"],
  },
  {
    name: "PEN DRIVE",
    hsnCode: "85230000",
    keywords: ["pen drive", "usb drive", "flash drive"],
  },
  {
    name: "POLYESTER COAT",
    hsnCode: "62014090",
    keywords: ["polyester coat", "coat", "overcoat"],
  },
  {
    name: "PRINTING CARD",
    hsnCode: "49090000",
    keywords: ["printing card", "printed card"],
  },
  {
    name: "SANITARY PAD",
    hsnCode: "96190010",
    keywords: ["sanitary pad", "sanitary napkin", "pad"],
  },
  {
    name: "SHOES",
    hsnCode: "64035119",
    keywords: ["shoes", "shoe", "footwear"],
  },
  {
    name: "SILK SAREE",
    hsnCode: "50072010",
    keywords: ["silk saree", "sari", "silk sari"],
  },
  {
    name: "SLIPPER",
    hsnCode: "64052000",
    keywords: ["slipper", "chappal", "sandals"],
  },
  {
    name: "SNACKS",
    hsnCode: "95049090",
    keywords: ["snacks", "chips", "namkeen"],
  },
  {
    name: "SOCKS",
    hsnCode: "61159500",
    keywords: ["socks", "sock", "foot socks"],
  },
  {
    name: "SPICES",
    hsnCode: "13019044",
    keywords: ["spices", "masala", "herbs"],
  },
  {
    name: "STICKERS",
    hsnCode: "48210000",
    keywords: ["stickers", "sticker", "decal"],
  },
  {
    name: "SYNTHETIC COAT",
    hsnCode: "62031200",
    keywords: ["synthetic coat", "raincoat", "jacket"],
  },
  {
    name: "TABLE COVER",
    hsnCode: "63071090",
    keywords: ["table cover", "table cloth"],
  },
  { name: "TOY", hsnCode: "95030099", keywords: ["toy", "toys", "plaything"] },
  {
    name: "UMBRELLA",
    hsnCode: "66010000",
    keywords: ["umbrella", "rain umbrella"],
  },
  {
    name: "UTENSILS",
    hsnCode: "73239990",
    keywords: ["utensils", "utensil", "kitchenware"],
  },
  {
    name: "WOOLEN BLANKET",
    hsnCode: "63012000",
    keywords: ["woolen blanket", "wool blanket"],
  },
  {
    name: "WOOLEN HOODIE",
    hsnCode: "61101120",
    keywords: ["woolen hoodie", "hoodie", "hoody"],
  },
  {
    name: "WOOLEN INNER",
    hsnCode: "61079920",
    keywords: ["woolen inner", "thermal wear"],
  },
  {
    name: "WOOLEN JACKET",
    hsnCode: "61101120",
    keywords: ["woolen jacket", "jacket", "wool jacket"],
  },
  {
    name: "WOOLEN MUFFLER",
    hsnCode: "62142090",
    keywords: ["woolen muffler", "muffler", "scarf"],
  },
  {
    name: "WOOLEN SHAWL",
    hsnCode: "62142010",
    keywords: ["woolen shawl", "shawl", "wool shawl"],
  },
  {
    name: "WOOLEN SWEATER",
    hsnCode: "61101120",
    keywords: ["woolen sweater", "sweater", "wool sweater"],
  },
  {
    name: "WOOLEN TRACK SUIT",
    hsnCode: "61121920",
    keywords: ["woolen track suit", "tracksuit", "sportswear"],
  },
  {
    name: "BANDAGE",
    hsnCode: "30059040",
    keywords: ["bandage", "gauze", "medical bandage"],
  },
  {
    name: "CERAMIC UTENSIL",
    hsnCode: "69111029",
    keywords: ["ceramic utensil", "ceramic ware"],
  },
  {
    name: "COTTON LONG DRESS",
    hsnCode: "62044290",
    keywords: ["cotton long dress", "long dress", "gown"],
  },
  {
    name: "COTTON NIGHT SUIT",
    hsnCode: "61083100",
    keywords: ["cotton night suit", "night suit", "pajama set"],
  },
  {
    name: "COTTON PILLOW",
    hsnCode: "94049099",
    keywords: ["cotton pillow", "pillow", "cushion"],
  },
  {
    name: "COTTON SAREE",
    hsnCode: "52085900",
    keywords: ["cotton saree", "cotton sari"],
  },
  {
    name: "COTTON STOLE",
    hsnCode: "62149099",
    keywords: ["cotton stole", "stole", "wrap"],
  },
  {
    name: "MEN PURSE",
    hsnCode: "42023120",
    keywords: ["men purse", "wallet", "money purse"],
  },
  {
    name: "PHOTO FRAME",
    hsnCode: "44149000",
    keywords: ["photo frame", "picture frame"],
  },
  {
    name: "PLASTIC UTENSILS",
    hsnCode: "39249090",
    keywords: ["plastic utensils", "plastic ware"],
  },
  {
    name: "RUBBER BAND",
    hsnCode: "40169920",
    keywords: ["rubber band", "elastic band"],
  },
  {
    name: "STATIONARY",
    hsnCode: "48209090",
    keywords: ["stationary", "stationery", "office supplies"],
  },
  {
    name: "STEEL UTENSILS",
    hsnCode: "73239990",
    keywords: ["steel utensils", "steel ware"],
  },
  {
    name: "SUN GLASS",
    hsnCode: "90041000",
    keywords: ["sun glass", "sunglasses", "shades"],
  },
  {
    name: "WOOLEN COAT",
    hsnCode: "62012010",
    keywords: ["woolen coat", "wool coat"],
  },
  {
    name: "COTTON FROCK",
    hsnCode: "62044290",
    keywords: ["cotton frock", "frock", "dress"],
  },
  {
    name: "COTTON HAIR BAND",
    hsnCode: "40169920",
    keywords: ["cotton hair band", "hair band"],
  },
  {
    name: "COTTON LACE",
    hsnCode: "58043000",
    keywords: ["cotton lace", "lace", "trimming"],
  },
  {
    name: "COTTON MAT",
    hsnCode: "57050042",
    keywords: ["cotton mat", "mat", "rug"],
  },
  {
    name: "COTTON SOCKS",
    hsnCode: "61159500",
    keywords: ["cotton socks", "socks"],
  },
  {
    name: "HAND GLOVES",
    hsnCode: "61169990",
    keywords: ["hand gloves", "gloves"],
  },
  {
    name: "KITCHENWARE",
    hsnCode: "39249090",
    keywords: ["kitchenware", "kitchen utensils"],
  },
  {
    name: "PAPER BAG",
    hsnCode: "48191090",
    keywords: ["paper bag", "carry bag"],
  },
  {
    name: "PHOTOFRAME",
    hsnCode: "44149000",
    keywords: ["photoframe", "frame"],
  },
  {
    name: "PLASTIC MOBILE COVER",
    hsnCode: "39269099",
    keywords: ["plastic mobile cover", "phone cover"],
  },
  {
    name: "SILK LEHENGA",
    hsnCode: "62042919",
    keywords: ["silk lehenga", "silk lehnga"],
  },
  { name: "TOWEL", hsnCode: "63049260", keywords: ["towel", "bath towel"] },
  {
    name: "WOOLEN LOWER",
    hsnCode: "61034990",
    keywords: ["woolen lower", "wool pajama"],
  },
  { name: "ALBUM", hsnCode: "48205000", keywords: ["album", "photo album"] },
  {
    name: "COTTON TRACK SUIT",
    hsnCode: "61121100",
    keywords: ["cotton track suit", "tracksuit"],
  },
  { name: "TEA", hsnCode: "21012010", keywords: ["tea", "chai"] },
  {
    name: "CRICKET BAT",
    hsnCode: "95069920",
    keywords: ["cricket bat", "bat"],
  },
  {
    name: "CRICKET BALL",
    hsnCode: "95066920",
    keywords: ["cricket ball", "ball"],
  },
  {
    name: "COTTON MASK",
    hsnCode: "63079090",
    keywords: ["cotton mask", "face mask"],
  },
  {
    name: "SYNTHETIC STONE",
    hsnCode: "68100000",
    keywords: ["synthetic stone", "artificial stone"],
  },
  {
    name: "COTTON SCARF",
    hsnCode: "62149040",
    keywords: ["cotton scarf", "scarf"],
  },
  { name: "POUCH", hsnCode: "39230000", keywords: ["pouch", "small bag"] },
  {
    name: "DOOR HANGING",
    hsnCode: "39269099",
    keywords: ["door hanging", "door decor"],
  },
  { name: "PAMPHLET", hsnCode: "49011020", keywords: ["pamphlet", "brochure"] },
  {
    name: "TAPE ROLL",
    hsnCode: "39190000",
    keywords: ["tape roll", "adhesive tape"],
  },
  {
    name: "RAINCOAT",
    hsnCode: "62011210",
    keywords: ["raincoat", "rain coat"],
  },
  {
    name: "MIRROR",
    hsnCode: "70090000",
    keywords: ["mirror", "looking glass"],
  },
  {
    name: "SHERWANI",
    hsnCode: "62031910",
    keywords: ["sherwani", "traditional wear"],
  },
  {
    name: "ADAPTER",
    hsnCode: "85366990",
    keywords: ["adapter", "electric adapter"],
  },
  { name: "ROPE", hsnCode: "56070000", keywords: ["rope", "cord"] },
  {
    name: "BATHWARE",
    hsnCode: "39220000",
    keywords: ["bathware", "bathroom ware"],
  },
  {
    name: "BUCKRAM",
    hsnCode: "59019090",
    keywords: ["buckram", "stiff cloth"],
  },
  {
    name: "PLASTIC PHONE COVER",
    hsnCode: "39269099",
    keywords: ["plastic phone cover", "mobile cover"],
  },
  {
    name: "ROTI MAKER",
    hsnCode: "85166000",
    keywords: ["roti maker", "chapati maker"],
  },
  {
    name: "STICKER",
    hsnCode: "48211010",
    keywords: ["sticker", "adhesive sticker"],
  },
  { name: "POUCHES", hsnCode: "39232990", keywords: ["pouches", "small bags"] },
  { name: "PLUG", hsnCode: "85360000", keywords: ["plug", "electric plug"] },
  { name: "ROLL", hsnCode: "48030000", keywords: ["roll", "paper roll"] },
  {
    name: "PILLOW COVER",
    hsnCode: "63040000",
    keywords: ["pillow cover", "pillow case"],
  },
  { name: "PILLOW", hsnCode: "94040000", keywords: ["pillow", "cushion"] },
  { name: "CABLE", hsnCode: "85440000", keywords: ["cable", "wire", "cord"] },
  {
    name: "GROCERIES",
    hsnCode: "19040000",
    keywords: ["groceries", "food items"],
  },
  {
    name: "RAIN COAT",
    hsnCode: "62011210",
    keywords: ["rain coat", "raincoat"],
  },
  { name: "BANGLES", hsnCode: "70181010", keywords: ["bangles", "bangle"] },
  {
    name: "POLY BAG",
    hsnCode: "39232100",
    keywords: ["poly bag", "plastic bag"],
  },
  {
    name: "CALENDAR",
    hsnCode: "49100000",
    keywords: ["calendar", "desk calendar"],
  },
  {
    name: "JUMP ROPE",
    hsnCode: "95069990",
    keywords: ["jump rope", "skipping rope"],
  },
  {
    name: "LUNCH BOX",
    hsnCode: "39240000",
    keywords: ["lunch box", "tiffin box"],
  },
  {
    name: "WOOLEN SCARF",
    hsnCode: "62140000",
    keywords: ["woolen scarf", "wool scarf"],
  },
  {
    name: "RUBBER PIPE",
    hsnCode: "40090000",
    keywords: ["rubber pipe", "hose"],
  },
  { name: "POSTER", hsnCode: "49111010", keywords: ["poster", "wall poster"] },
  {
    name: "MUSICAL INSTRUMENT",
    hsnCode: "92010000",
    keywords: ["musical instrument", "instrument"],
  },
  {
    name: "TISSUE PAPER",
    hsnCode: "48025450",
    keywords: ["tissue paper", "tissue"],
  },
  { name: "COTTON", hsnCode: "52010000", keywords: ["cotton", "raw cotton"] },
  { name: "STATUE", hsnCode: "97030020", keywords: ["statue", "sculpture"] },
  {
    name: "PARANDI",
    hsnCode: "63079090",
    keywords: ["parandi", "hair accessory"],
  },
  {
    name: "COOKER GASKET",
    hsnCode: "73219000",
    keywords: ["cooker gasket", "pressure cooker gasket"],
  },
  {
    name: "PLASTIC SHEET",
    hsnCode: "39200000",
    keywords: ["plastic sheet", "plastic film"],
  },
  {
    name: "KNEE SUPPORT",
    hsnCode: "90211000",
    keywords: ["knee support", "knee guard"],
  },
  {
    name: "TOOTH BRUSH",
    hsnCode: "96032100",
    keywords: ["tooth brush", "toothbrush"],
  },
  { name: "SCRUB", hsnCode: "33049990", keywords: ["scrub", "body scrub"] },
  { name: "MASK", hsnCode: "63079090", keywords: ["mask", "face mask"] },
  {
    name: "INHALER",
    hsnCode: "30040000",
    keywords: ["inhaler", "asthma inhaler"],
  },
  {
    name: "BRASS UTENSILS",
    hsnCode: "74181021",
    keywords: ["brass utensils", "brass ware"],
  },
  { name: "BUTTON", hsnCode: "96062100", keywords: ["button", "shirt button"] },
  { name: "CARPET", hsnCode: "57031010", keywords: ["carpet", "rug", "mat"] },
  {
    name: "COTTON APRON",
    hsnCode: "42034010",
    keywords: ["cotton apron", "apron"],
  },
  {
    name: "COTTON KITCHEN TOWEL",
    hsnCode: "63049260",
    keywords: ["cotton kitchen towel", "kitchen towel"],
  },
  {
    name: "COTTON KURTI",
    hsnCode: "61149090",
    keywords: ["cotton kurti", "kurti"],
  },
  {
    name: "COTTON SKIRT",
    hsnCode: "62045290",
    keywords: ["cotton skirt", "skirt"],
  },
  {
    name: "COTTON TABLE COVER",
    hsnCode: "63071090",
    keywords: ["cotton table cover", "table cloth"],
  },
  {
    name: "CRICKET HELMET",
    hsnCode: "65061090",
    keywords: ["cricket helmet", "helmet"],
  },
  {
    name: "CRICKET PAD",
    hsnCode: "95069920",
    keywords: ["cricket pad", "leg pad"],
  },
  { name: "CURTAIN", hsnCode: "63039990", keywords: ["curtain", "drape"] },
  {
    name: "DECORATIVE ITEMS",
    hsnCode: "69139000",
    keywords: ["decorative items", "decor"],
  },
  {
    name: "GLASS UTENSILS",
    hsnCode: "70131000",
    keywords: ["glass utensils", "glass ware"],
  },
  {
    name: "HANGER",
    hsnCode: "39269099",
    keywords: ["hanger", "clothes hanger"],
  },
  { name: "KEY RING", hsnCode: "42023120", keywords: ["key ring", "keychain"] },
  {
    name: "MUSIC INSTRUMENT TABLA",
    hsnCode: "92071000",
    keywords: ["music instrument tabla", "tabla"],
  },
  {
    name: "PLASTIC BAG",
    hsnCode: "39232100",
    keywords: ["plastic bag", "polythene bag"],
  },
  {
    name: "PLASTIC BASKET",
    hsnCode: "39249090",
    keywords: ["plastic basket", "basket"],
  },
  {
    name: "PLASTIC BOTTLE",
    hsnCode: "39233090",
    keywords: ["plastic bottle", "bottle"],
  },
  {
    name: "PLASTIC UTENSIL",
    hsnCode: "39249090",
    keywords: ["plastic utensil", "plastic spoon"],
  },
  {
    name: "TEMPERED GLASS",
    hsnCode: "70071900",
    keywords: ["tempered glass", "safety glass"],
  },
  {
    name: "WAX STRIPS",
    hsnCode: "48236900",
    keywords: ["wax strips", "hair removal strips"],
  },
  {
    name: "WOOLEN BABY DRESS",
    hsnCode: "61119090",
    keywords: ["woolen baby dress", "wool baby dress"],
  },
  {
    name: "WOOLEN SHRUG",
    hsnCode: "62114999",
    keywords: ["woolen shrug", "shrug"],
  },
  {
    name: "WOOLEN SOCKS",
    hsnCode: "61159400",
    keywords: ["woolen socks", "wool socks"],
  },
  {
    name: "WOOLEN SWEATSHIRT",
    hsnCode: "61059090",
    keywords: ["woolen sweatshirt", "sweatshirt"],
  },
  {
    name: "WRIST BAND",
    hsnCode: "40169920",
    keywords: ["wrist band", "wristband"],
  },
];

// ============================================================
// HSN SEARCH FUNCTION
// ============================================================
function searchProduct(query: string): { name: string; hsnCode: string }[] {
  if (!query || query.trim().length < 1) return [];

  const searchTerm = query.trim().toLowerCase();
  const results: { name: string; hsnCode: string; score: number }[] = [];

  PRODUCT_DATABASE.forEach((product) => {
    let score = 0;
    const productNameLower = product.name.toLowerCase();

    // Exact match on name
    if (productNameLower === searchTerm) {
      score = 100;
    }
    // Name starts with search term
    else if (productNameLower.startsWith(searchTerm)) {
      score = 80;
    }
    // Name includes search term
    else if (productNameLower.includes(searchTerm)) {
      score = 60;
    }
    // Check keywords
    else {
      for (const keyword of product.keywords) {
        const keywordLower = keyword.toLowerCase();
        if (keywordLower === searchTerm) {
          score = 70;
          break;
        } else if (
          keywordLower.includes(searchTerm) ||
          searchTerm.includes(keywordLower)
        ) {
          score = 50;
          break;
        }
      }
    }

    if (score > 0) {
      results.push({ name: product.name, hsnCode: product.hsnCode, score });
    }
  });

  // Sort by score descending and limit to 8 results
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8).map(({ name, hsnCode }) => ({ name, hsnCode }));
}
// ============================================================

const DESTINATIONS = [
  {
    label: "Australia",
    value: "AUSTRALIA",
    requiresZip: true,
    requiresSubCountry: false,
    flag: "🇦🇺",
  },
  {
    label: "Canada",
    value: "CANADA",
    requiresZip: true,
    requiresSubCountry: false,
    flag: "🇨🇦",
  },
  {
    label: "United Kingdom",
    value: "UK",
    requiresZip: false,
    requiresSubCountry: false,
    flag: "🇬🇧",
  },
  {
    label: "Europe",
    value: "EUROPE",
    requiresZip: false,
    requiresSubCountry: true,
    flag: "🇪🇺",
  },
  {
    label: "International",
    value: "INTERNATIONAL",
    requiresZip: false,
    requiresSubCountry: true,
    flag: "🌍",
  },
];

const EUROPE_COUNTRIES = [
  "GERMANY",
  "FRANCE",
  "ITALY",
  "NETHERLANDS",
  "SPAIN",
  "IRELAND",
  "PORTUGAL",
  "SWEDEN",
];
const INTERNATIONAL_COUNTRIES = [
  "USA",
  "UNITED ARAB EMIRATES",
  "SINGAPORE",
  "MALAYSIA",
  "THAILAND",
  "SAUDI ARABIA",
  "NEW ZEALAND",
];

const TERMS_OF_SALE = ["DAP", "DDP", "DDU", "EXW", "FOB"];
const REASONS_FOR_EXPORT = [
  "Sale",
  "Gift",
  "Sample",
  "Return/Repair",
  "Personal Effects",
];

const NETWORK_LABELS: Record<string, string> = {
  SELF: "Self Network",
  ARA: "Aramex",
  DHL: "DHL",
  UPS: "UPS",
  FED: "FedEx",
};

interface Quote {
  service: string;
  network: string;
  chargeableWt: number;
  zone: string;
  rateType: string;
  totalPrice: number;
  tat: string;
}

interface Box {
  id: number;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  productDescription: string;
  hsnCode: string;
  qty: number;
  unitRate: number;
}

// ============================================================
// HSN AUTO-SUGGEST DROPDOWN COMPONENT
// ============================================================
function HsnSuggestions({
  query,
  suggestions,
  onSelect,
  onClose,
}: {
  query: string;
  suggestions: { name: string; hsnCode: string }[];
  onSelect: (name: string, hsnCode: string) => void;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (suggestions.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 w-full mt-1 bg-white border border-border-color rounded-xl shadow-lg max-h-60 overflow-y-auto"
    >
      {suggestions.map((item) => (
        <button
          key={item.hsnCode + item.name}
          onClick={() => {
            onSelect(item.name, item.hsnCode);
            onClose();
          }}
          className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors border-b border-border-color last:border-0 flex justify-between items-center group"
        >
          <span className="text-sm font-medium text-foreground">
            {item.name}
          </span>
          <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded group-hover:bg-slate-200 transition-colors">
            {item.hsnCode}
          </span>
        </button>
      ))}
    </div>
  );
}
// ============================================================

const DEFAULT_ACCOUNT_CODE = "1270";

export default function BookShipmentPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [quoting, setQuoting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuoteKey, setSelectedQuoteKey] = useState<string | null>(null);

  const [destination, setDestination] = useState("AUSTRALIA");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [shipper, setShipper] = useState({
    shipperName: "",
    shipperPhone: "",
    shipperEmail: "",
    shipperAddress: "",
    shipperCity: "",
    shipperState: "",
    shipperPincode: "",
    shipperGstin: "",
  });

  const [receiver, setReceiver] = useState({
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverZipcode: "",
    receiverCountry: "",
  });

  const [contentDescription, setContentDescription] = useState(
    "Personal Effects & Commercial Samples",
  );
  const [invoiceValue, setInvoiceValue] = useState(250);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [termsOfSale, setTermsOfSale] = useState("DAP");
  const [reasonForExport, setReasonForExport] = useState("Sale");

  const [boxes, setBoxes] = useState<Box[]>([
    {
      id: 1,
      weightKg: 5,
      lengthCm: 30,
      widthCm: 25,
      heightCm: 20,
      productDescription: "",
      hsnCode: "",
      qty: 1,
      unitRate: 25,
    },
  ]);

  // HSN suggestion states
  const [hsnQuery, setHsnQuery] = useState<{ [key: number]: string }>({});
  const [hsnSuggestions, setHsnSuggestions] = useState<{
    [key: number]: { name: string; hsnCode: string }[];
  }>({});
  const [showHsnDropdown, setShowHsnDropdown] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const randomInv = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvoiceNo(randomInv);
  }, []);

  const destObj = DESTINATIONS.find((d) => d.value === destination);
  const subCountryOptions =
    destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const totalActualWeight = boxes.reduce(
    (sum, b) => sum + Number(b.weightKg || 0),
    0,
  );
  const totalVolumetricWeight = boxes.reduce(
    (sum, b) =>
      sum +
      (Number(b.lengthCm || 0) *
        Number(b.widthCm || 0) *
        Number(b.heightCm || 0)) /
      5000,
    0,
  );
  const chargeableWeight = Math.ceil(
    Math.max(totalActualWeight, totalVolumetricWeight),
  );

  const computedInvoiceValue = boxes.reduce(
    (sum, b) => sum + Number(b.qty || 0) * Number(b.unitRate || 0),
    0,
  );

  const addBox = () => {
    const newId = Date.now();
    setBoxes((prev) => [
      ...prev,
      {
        id: newId,
        weightKg: 1,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        productDescription: "",
        hsnCode: "",
        qty: 1,
        unitRate: 10,
      },
    ]);
    // Initialize suggestion state for new box
    setHsnQuery((prev) => ({ ...prev, [newId]: "" }));
    setHsnSuggestions((prev) => ({ ...prev, [newId]: [] }));
    setShowHsnDropdown((prev) => ({ ...prev, [newId]: false }));
  };

  const removeBox = (id: number) => {
    if (boxes.length <= 1) return;
    setBoxes((prev) => prev.filter((b) => b.id !== id));
    // Clean up suggestion states
    setHsnQuery((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setHsnSuggestions((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setShowHsnDropdown((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const updateBox = (id: number, field: keyof Box, value: any) => {
    setBoxes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    );
  };

  // Handle product description change with HSN suggestions
  const handleProductDescriptionChange = (id: number, value: string) => {
    setHsnQuery((prev) => ({ ...prev, [id]: value }));
    updateBox(id, "productDescription", value);

    // Get suggestions if there's input
    if (value.trim().length > 0) {
      const results = searchProduct(value);
      setHsnSuggestions((prev) => ({ ...prev, [id]: results }));
      setShowHsnDropdown((prev) => ({ ...prev, [id]: results.length > 0 }));
    } else {
      setHsnSuggestions((prev) => ({ ...prev, [id]: [] }));
      setShowHsnDropdown((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Handle HSN selection from dropdown
  const handleHsnSelect = (id: number, name: string, hsnCode: string) => {
    updateBox(id, "productDescription", name);
    updateBox(id, "hsnCode", hsnCode);
    setHsnQuery((prev) => ({ ...prev, [id]: name }));
    setShowHsnDropdown((prev) => ({ ...prev, [id]: false }));
  };

  // Close dropdown handler
  const closeHsnDropdown = (id: number) => {
    setShowHsnDropdown((prev) => ({ ...prev, [id]: false }));
  };

  const fetchQuotes = async () => {
    setError("");
    setQuoting(true);
    setQuotes([]);
    setSelectedQuoteKey(null);
    try {
      const params = new URLSearchParams({
        actualWt: String(totalActualWeight),
        country: destination,
      });
      const firstBox = boxes[0];
      if (firstBox) {
        params.append("length", String(firstBox.lengthCm));
        params.append("breadth", String(firstBox.widthCm));
        params.append("height", String(firstBox.heightCm));
      }
      if (zipcode) params.append("zipcode", zipcode);
      if (zoningCountry) params.append("zoningCountry", zoningCountry);

      const res = await fetch(`${API_URL}/rates/quote?${params}`, {
        headers: { "x-database": DB_NAME },
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to fetch rates");
      if (!data.quotes?.length)
        throw new Error(
          "No services available for this destination / weight combination.",
        );

      setQuotes(data.quotes);
      const first = data.quotes[0];
      setSelectedQuoteKey(`${first.service}__${first.rateType}`);
      setStep(5);
      // Silently warm the booking backend so it's ready when the user submits
      fetch("/api/ping").catch(() => { });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setQuoting(false);
    }
  };

  const selectedQuote =
    quotes.find((q) => `${q.service}__${q.rateType}` === selectedQuoteKey) ||
    null;
  const cgstAmt = selectedQuote
    ? Math.round(selectedQuote.totalPrice * 0.09)
    : 0;
  const sgstAmt = cgstAmt;
  const igstAmt = 0;
  const basicAmt = selectedQuote
    ? selectedQuote.totalPrice - cgstAmt - sgstAmt
    : 0;

  const onSubmitBooking = async () => {
    if (!selectedQuote) return;
    setSubmitting(true);
    setError("");
    try {
      // Format dates
      let formattedInvoiceDate;
      if (invoiceDate) {
        formattedInvoiceDate = invoiceDate + "T00:00:00";
      } else {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        formattedInvoiceDate = `${year}-${month}-${day}T00:00:00`;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const formattedShipDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      const payload = {
        action: "book_shipment",
        bookingData: {
          accountCode: DEFAULT_ACCOUNT_CODE,
          customerName: "Default Account",
          sector: destination,
          destination: zoningCountry || destObj?.label || destination,
          shipper,
          receiver: {
            ...receiver,
            receiverCountry:
              receiver.receiverCountry || zoningCountry || destObj?.label,
          },
          boxes,
          contentDescription,
          invoiceValue: computedInvoiceValue || invoiceValue,
          invoiceNo,
          invoiceDate: formattedInvoiceDate,
          shipDate: formattedShipDate,
          termsOfSale,
          reasonForExport,
          currency: "USD",
          service: selectedQuote.service,
          network: selectedQuote.network,
          chargeableWt: chargeableWeight,
          basicAmt,
          cgstAmt,
          sgstAmt,
          igstAmt,
          totalAmt: selectedQuote.totalPrice,
        },
      };

      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Safely parse response — empty body (e.g. Netlify timeout) would otherwise crash
      let data: any;
      try {
        data = await res.json();
      } catch {
        throw new Error(
          "The server took too long to respond. Please wait a moment and try again — the server may be waking up from idle.",
        );
      }

      if (!res.ok || !data.success)
        throw new Error(data.message || "Booking creation failed");

      setBookingResult(data.booking);
      setStep(6);

      // ============================================================
      // SEND EMAIL NOTIFICATION TO info@manvicourier.com
      // ============================================================
      try {
        // Build email HTML with all shipment details
        const emailHtml = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 700px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
              .header { background: #f7931e; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; }
              .header h2 { margin: 0; }
              .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 6px; }
              .section h3 { color: #f7931e; margin-top: 0; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
              .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee; }
              .row:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #666; }
              .value { color: #333; }
              .total-row { background: #f7931e; color: white; padding: 10px; border-radius: 4px; margin-top: 10px; font-weight: bold; }
              .box-item { background: white; padding: 10px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; }
              .box-item .box-header { font-weight: bold; color: #f7931e; }
              .footer { text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📦 New Shipment Booking Confirmed</h2>
                <p style="margin: 5px 0 0; font-size: 14px;">AWB: ${data.booking?.awbNo || 'N/A'}</p>
              </div>

              <!-- Shipper Details -->
              <div class="section">
                <h3>📍 Shipper Details</h3>
                <div class="row"><span class="label">Name:</span><span class="value">${shipper.shipperName || 'N/A'}</span></div>
                <div class="row"><span class="label">Phone:</span><span class="value">${shipper.shipperPhone || 'N/A'}</span></div>
                <div class="row"><span class="label">Email:</span><span class="value">${shipper.shipperEmail || 'N/A'}</span></div>
                <div class="row"><span class="label">Address:</span><span class="value">${shipper.shipperAddress || 'N/A'}</span></div>
                <div class="row"><span class="label">City:</span><span class="value">${shipper.shipperCity || 'N/A'}</span></div>
                <div class="row"><span class="label">State:</span><span class="value">${shipper.shipperState || 'N/A'}</span></div>
                <div class="row"><span class="label">Pincode:</span><span class="value">${shipper.shipperPincode || 'N/A'}</span></div>
                <div class="row"><span class="label">GSTIN:</span><span class="value">${shipper.shipperGstin || 'N/A'}</span></div>
              </div>

              <!-- Receiver Details -->
              <div class="section">
                <h3>📍 Receiver Details</h3>
                <div class="row"><span class="label">Name:</span><span class="value">${receiver.receiverName || 'N/A'}</span></div>
                <div class="row"><span class="label">Phone:</span><span class="value">${receiver.receiverPhone || 'N/A'}</span></div>
                <div class="row"><span class="label">Email:</span><span class="value">${receiver.receiverEmail || 'N/A'}</span></div>
                <div class="row"><span class="label">Address:</span><span class="value">${receiver.receiverAddress || 'N/A'}</span></div>
                <div class="row"><span class="label">City:</span><span class="value">${receiver.receiverCity || 'N/A'}</span></div>
                <div class="row"><span class="label">State:</span><span class="value">${receiver.receiverState || 'N/A'}</span></div>
                <div class="row"><span class="label">Zipcode:</span><span class="value">${receiver.receiverZipcode || 'N/A'}</span></div>
                <div class="row"><span class="label">Country:</span><span class="value">${receiver.receiverCountry || destination}</span></div>
              </div>

              <!-- Shipment Details -->
              <div class="section">
                <h3>📋 Shipment Details</h3>
                <div class="row"><span class="label">Destination:</span><span class="value">${destination}</span></div>
                <div class="row"><span class="label">Service:</span><span class="value">${selectedQuote.service}</span></div>
                <div class="row"><span class="label">Network:</span><span class="value">${selectedQuote.network}</span></div>
                <div class="row"><span class="label">Zone:</span><span class="value">${selectedQuote.zone}</span></div>
                <div class="row"><span class="label">Rate Type:</span><span class="value">${selectedQuote.rateType}</span></div>
                <div class="row"><span class="label">TAT:</span><span class="value">${selectedQuote.tat}</span></div>
                <div class="row"><span class="label">Invoice No:</span><span class="value">${invoiceNo}</span></div>
                <div class="row"><span class="label">Invoice Date:</span><span class="value">${invoiceDate}</span></div>
                <div class="row"><span class="label">Terms of Sale:</span><span class="value">${termsOfSale}</span></div>
                <div class="row"><span class="label">Reason for Export:</span><span class="value">${reasonForExport}</span></div>
                <div class="row"><span class="label">Content Description:</span><span class="value">${contentDescription}</span></div>
              </div>

              <!-- Boxes / Package Details -->
              <div class="section">
                <h3>📦 Package Details (${boxes.length} Box${boxes.length > 1 ? 'es' : ''})</h3>
                ${boxes.map((box, idx) => `
                  <div class="box-item">
                    <div class="box-header">Box #${idx + 1}</div>
                    <div class="row"><span class="label">Weight:</span><span class="value">${box.weightKg} KG</span></div>
                    <div class="row"><span class="label">Dimensions:</span><span class="value">${box.lengthCm} × ${box.widthCm} × ${box.heightCm} CM</span></div>
                    <div class="row"><span class="label">Product:</span><span class="value">${box.productDescription || 'N/A'}</span></div>
                    <div class="row"><span class="label">HSN Code:</span><span class="value">${box.hsnCode || 'N/A'}</span></div>
                    <div class="row"><span class="label">Quantity:</span><span class="value">${box.qty}</span></div>
                    <div class="row"><span class="label">Unit Rate:</span><span class="value">₹${box.unitRate}</span></div>
                    <div class="row"><span class="label">Total Value:</span><span class="value">₹${(box.qty * box.unitRate).toFixed(2)}</span></div>
                  </div>
                `).join('')}
              </div>

              <!-- Weight Summary -->
              <div class="section">
                <h3>⚖️ Weight Summary</h3>
                <div class="row"><span class="label">Actual Weight:</span><span class="value">${totalActualWeight.toFixed(2)} KG</span></div>
                <div class="row"><span class="label">Volumetric Weight:</span><span class="value">${totalVolumetricWeight.toFixed(2)} KG</span></div>
                <div class="row"><span class="label" style="color: #f7931e; font-size: 16px;">Chargeable Weight:</span><span class="value" style="color: #f7931e; font-size: 16px; font-weight: bold;">${chargeableWeight} KG</span></div>
              </div>

              <!-- Freight Breakdown -->
              <div class="section">
                <h3>💰 Freight Breakdown</h3>
                <div class="row"><span class="label">Basic Freight:</span><span class="value">₹${basicAmt.toLocaleString()}</span></div>
                <div class="row"><span class="label">CGST (9%):</span><span class="value">₹${cgstAmt.toLocaleString()}</span></div>
                <div class="row"><span class="label">SGST (9%):</span><span class="value">₹${sgstAmt.toLocaleString()}</span></div>
                ${igstAmt > 0 ? `<div class="row"><span class="label">IGST:</span><span class="value">₹${igstAmt.toLocaleString()}</span></div>` : ''}
                <div class="total-row" style="display: flex; justify-content: space-between; padding: 12px; background: #f7931e; color: white; border-radius: 4px; margin-top: 10px; font-weight: bold;">
                  <span>Grand Total</span>
                  <span>₹${selectedQuote.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <!-- Status -->
              <div class="section" style="background: ${data.booking?.isHold ? '#fff3cd' : '#d4edda'}; border-left: 4px solid ${data.booking?.isHold ? '#ffc107' : '#28a745'};">
                <h3 style="color: ${data.booking?.isHold ? '#856404' : '#155724'};">📌 Shipment Status</h3>
                <p style="margin: 0; font-weight: bold;">
                  ${data.booking?.isHold ? '⏳ ON HOLD — Insufficient balance' : '✅ CONFIRMED — Shipment booked successfully'}
                </p>
                <p style="margin: 5px 0 0; font-size: 13px;">
                  AWB: <strong>${data.booking?.awbNo || 'N/A'}</strong>
                  ${data.booking?.isHold ? '<br><span style="color: #856404;">This shipment is on hold pending admin review.</span>' : ''}
                </p>
              </div>

              <div class="footer">
                <p>This is an automated notification from Manvi Courier Portal.</p>
                <p>© ${new Date().getFullYear()} Manvi International — All Rights Reserved</p>
              </div>
            </div>
          </body>
        </html>
      `;

        // Send email to info@manvicourier.com
        await fetch(`${API_URL}/api/send-shipment-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: "info@manvicourier.com",
            subject: `📦 New Shipment Booked - AWB: ${data.booking?.awbNo || 'N/A'} - ${shipper.shipperName || 'Customer'}`,
            html: emailHtml,
            shipmentData: {
              awbNo: data.booking?.awbNo,
              customerName: shipper.shipperName || "Customer",
              destination: destination,
              service: selectedQuote.service,
              totalAmount: selectedQuote.totalPrice,
              isHold: data.booking?.isHold || false,
            },
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send shipment notification email:", emailErr);
        // Don't fail the booking if email fails
      }
      // ============================================================

    } catch (err: any) {
      setError(err.message || "An error occurred while creating shipment");
    } finally {
      setSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, label: "Destination", icon: "🌍" },
    { num: 2, label: "Shipper", icon: "📤" },
    { num: 3, label: "Receiver", icon: "📥" },
    { num: 4, label: "Package", icon: "📦" },
    { num: 5, label: "Select Service", icon: "🚚" },
    { num: 6, label: "Done", icon: "✅" },
  ];

  /* ─── shared input & label classes (matching website theme) ─── */
  const inp =
    "w-full bg-[#f8f9fa] text-[#1c1f2e] text-sm font-medium rounded-xl px-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/10 transition-all";
  const lbl = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans flex flex-col antialiased">
      {/* ─── Breadcrumb Navigation ─── */}
      <div className="py-3.5 px-4 sm:px-6 relative z-30">
        <div className="max-w-425 w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-light text-gray-800">
            <Link href="/" className="hover:text-[#f27a1a] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
            <span className="text-[#f27a1a] font-semibold underline underline-offset-4 decoration-[#f27a1a]">
              Book Shipment
            </span>
          </div>
          <Link
            href="/"
            className="text-xs font-bold text-gray-600 hover:text-[#f27a1a] transition-colors flex items-center gap-1.5"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* ─── Banner Section (consistent with Track/Services/Quote pages) ─── */}
      <section className="relative bg-[#0D1527] overflow-hidden py-10 sm:py-14 px-4 sm:px-6">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1527] via-[#0D1527]/95 to-[#162035]/80 z-0" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#f27a1a]/10 blur-3xl pointer-events-none" />

        <div className="max-w-425 w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f27a1a] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f27a1a] animate-pulse" />
              Booking Portal
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-white leading-tight tracking-tight">
              Book a Shipment
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
              Calculate live freight tariffs, complete customs documentation, and generate instant airway bills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl px-5 py-3 text-right">
              <div className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider">Account Active</div>
              <div className="text-white font-mono font-bold text-base flex items-center gap-2 justify-end">
                <ShieldCheck className="w-4 h-4 text-[#f27a1a]" />
                #{DEFAULT_ACCOUNT_CODE}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Area ─── */}
      <main className="flex-grow max-w-425 w-full mx-auto px-4 sm:px-6 py-8 sm:py-20">

        {/* ─── Step Progress Stepper ─── */}
        {step <= 5 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 border border-gray-200/70 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between min-w-[620px] px-2">
              {stepsList.slice(0, 5).map((item, idx) => {
                const isDone = step > item.num;
                const isActive = step === item.num;
                return (
                  <div key={item.num} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive
                          ? "bg-[#f27a1a] text-white shadow-lg shadow-orange-500/25 ring-4 ring-orange-100 scale-105"
                          : isDone
                            ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                            : "bg-gray-100 text-gray-400 border border-gray-200/80"
                          }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : item.num}
                      </div>
                      <div>
                        <div
                          className={`text-[10px] uppercase tracking-wider font-extrabold transition-colors ${isActive
                            ? "text-[#f27a1a]"
                            : isDone
                              ? "text-emerald-600"
                              : "text-gray-400"
                            }`}
                        >
                          Step {item.num}
                        </div>
                        <div
                          className={`text-xs whitespace-nowrap font-bold transition-colors ${isActive
                            ? "text-[#1c1f2e]"
                            : isDone
                              ? "text-gray-700"
                              : "text-gray-400"
                            }`}
                        >
                          {item.label}
                        </div>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div
                        className={`h-0.5 flex-1 mx-4 transition-colors duration-500 rounded-full ${isDone ? "bg-emerald-400" : "bg-gray-200"
                          }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium shadow-sm">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span>{error}</span>
          </div>
        )}

        {/* ─── STEP 1: Destination ─── */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/70">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f27a1a]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f2e] tracking-tight">
                    Select Destination
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    Where is your international parcel being shipped to?
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3.5 py-1.5 border border-gray-200/60">
                Step 1 of 5
              </span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={lbl}>Destination Region *</label>
                  <select
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setZipcode("");
                      setZoningCountry("");
                    }}
                    className={inp}
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.flag} {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {destObj?.requiresSubCountry && (
                  <div>
                    <label className={lbl}>Country *</label>
                    <select
                      value={zoningCountry}
                      onChange={(e) => setZoningCountry(e.target.value)}
                      className={inp}
                    >
                      <option value="">Select Country</option>
                      {subCountryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}

                {destObj?.requiresZip && (
                  <div>
                    <label className={lbl}>Zipcode / Postcode *</label>
                    <input
                      type="text"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                      placeholder="e.g. SW1A 1AA or 90210"
                      className={inp}
                    />
                  </div>
                )}
              </div>

              {/* Destination preview info card */}
              <div className="flex items-center gap-4 p-5 bg-[#f8f9fa] rounded-2xl border border-gray-200">
                <span className="text-4xl">{destObj?.flag}</span>
                <div>
                  <div className="text-base font-extrabold text-[#1c1f2e]">{destObj?.label}</div>
                  <div className="text-xs text-gray-500 font-medium">Selected international shipping sector</div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    if (destObj?.requiresZip && !zipcode.trim()) {
                      setError(`Zipcode is required for ${destObj.label}.`);
                      return;
                    }
                    if (destObj?.requiresSubCountry && !zoningCountry) {
                      setError(`Please select a country within ${destObj.label}.`);
                      return;
                    }
                    setError("");
                    setReceiver((prev) => ({
                      ...prev,
                      receiverCountry: zoningCountry || destObj?.label || destination,
                    }));
                    setStep(2);
                  }}
                  className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
                >
                  Next: Shipper Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Shipper ─── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/70">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f27a1a]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f2e] tracking-tight">
                    Shipper / Origin Details
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    Sender contact & pickup location in India
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3.5 py-1.5 border border-gray-200/60">
                Step 2 of 5
              </span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(
                  [
                    ["shipperName", "Full Name", "text", true, "e.g. Rahul Sharma"],
                    ["shipperPhone", "Mobile / Phone", "tel", true, "e.g. +91 98765 43210"],
                    ["shipperEmail", "Email Address", "email", true, "e.g. rahul@example.com"],
                    ["shipperGstin", "GSTIN / PAN (Optional)", "text", false, "e.g. 07AAAAA0000A1Z5"],
                  ] as const
                ).map(([key, label, type, required, placeholder]) => (
                  <div key={key}>
                    <label className={lbl}>
                      {label}{required && " *"}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={(shipper as any)[key]}
                      onChange={(e) => setShipper({ ...shipper, [key]: e.target.value })}
                      className={inp}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className={lbl}>Address Line *</label>
                <input
                  type="text"
                  value={shipper.shipperAddress}
                  onChange={(e) => setShipper({ ...shipper, shipperAddress: e.target.value })}
                  placeholder="House / Flat No., Building, Street address, landmark…"
                  className={inp}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {(
                  [
                    ["shipperCity", "City", "e.g. New Delhi"],
                    ["shipperState", "State", "e.g. Delhi"],
                    ["shipperPincode", "Pincode", "e.g. 110045"],
                  ] as const
                ).map(([key, label, ph]) => (
                  <div key={key}>
                    <label className={lbl}>{label} *</label>
                    <input
                      type="text"
                      placeholder={ph}
                      value={(shipper as any)[key]}
                      onChange={(e) => setShipper({ ...shipper, [key]: e.target.value })}
                      className={inp}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => {
                    if (
                      !shipper.shipperName || !shipper.shipperPhone ||
                      !shipper.shipperEmail || !shipper.shipperAddress ||
                      !shipper.shipperCity || !shipper.shipperState ||
                      !shipper.shipperPincode
                    ) {
                      setError("Please fill all required shipper fields.");
                      return;
                    }
                    setError("");
                    setStep(3);
                  }}
                  className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
                >
                  Next: Receiver Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Receiver ─── */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/70">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f27a1a]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f2e] tracking-tight">
                    Receiver / Destination Details
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    Consignee contact & delivery address abroad
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3.5 py-1.5 border border-gray-200/60">
                Step 3 of 5
              </span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(
                  [
                    ["receiverName", "Receiver Name", true, "e.g. John Doe"],
                    ["receiverPhone", "Receiver Phone", true, "e.g. +1 555 123 4567"],
                    ["receiverEmail", "Receiver Email (Optional)", false, "e.g. john@example.com"],
                  ] as const
                ).map(([key, label, required, ph]) => (
                  <div key={key}>
                    <label className={lbl}>{label}{required && " *"}</label>
                    <input
                      type="text"
                      placeholder={ph}
                      value={(receiver as any)[key]}
                      onChange={(e) => setReceiver({ ...receiver, [key]: e.target.value })}
                      className={inp}
                    />
                  </div>
                ))}
                <div>
                  <label className={lbl}>Country</label>
                  <input
                    type="text"
                    readOnly
                    value={receiver.receiverCountry}
                    className="w-full bg-gray-100 text-gray-500 text-sm font-medium rounded-xl px-4 py-3.5 border border-gray-200 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className={lbl}>Address Line *</label>
                <input
                  type="text"
                  value={receiver.receiverAddress}
                  onChange={(e) => setReceiver({ ...receiver, receiverAddress: e.target.value })}
                  placeholder="Street address, building, apartment, suite…"
                  className={inp}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(
                  [
                    ["receiverCity", "City", "e.g. Sydney / London"],
                    ["receiverZipcode", "Zipcode / Postal Code", "e.g. 2000 / W1A 1AA"],
                  ] as const
                ).map(([key, label, ph]) => (
                  <div key={key}>
                    <label className={lbl}>{label} *</label>
                    <input
                      type="text"
                      placeholder={ph}
                      value={(receiver as any)[key]}
                      onChange={(e) => setReceiver({ ...receiver, [key]: e.target.value })}
                      className={inp}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => {
                    if (
                      !receiver.receiverName || !receiver.receiverPhone ||
                      !receiver.receiverAddress || !receiver.receiverCity ||
                      !receiver.receiverZipcode
                    ) {
                      setError("Please fill all required receiver fields.");
                      return;
                    }
                    setError("");
                    setStep(4);
                  }}
                  className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
                >
                  Next: Package Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Package & Customs ─── */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/70">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f27a1a]">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f2e] tracking-tight">
                    Shipment & Customs Details
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    Package dimensions, declared goods, and commercial invoice data
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3.5 py-1.5 border border-gray-200/60">
                Step 4 of 5
              </span>
            </div>

            <div className="space-y-8">
              {/* Invoice / customs fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={lbl}>Overall Content Description *</label>
                  <input
                    type="text"
                    value={contentDescription}
                    onChange={(e) => setContentDescription(e.target.value)}
                    placeholder="e.g. Personal Effects, Garments & Gift Items"
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>Invoice Value (USD)</label>
                  <input
                    type="number"
                    readOnly
                    value={computedInvoiceValue || invoiceValue}
                    className="w-full bg-gray-100 text-gray-500 text-sm font-medium rounded-xl px-4 py-3.5 border border-gray-200 cursor-not-allowed font-mono"
                  />
                  <p className="text-[11px] text-gray-400 font-medium mt-1">Calculated automatically from items sum (Qty × Unit Rate)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className={lbl}>Invoice Number</label>
                  <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className={`${inp} font-mono`} />
                </div>
                <div>
                  <label className={lbl}>Invoice Date</label>
                  <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Terms of Sale</label>
                  <select value={termsOfSale} onChange={(e) => setTermsOfSale(e.target.value)} className={inp}>
                    {TERMS_OF_SALE.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="sm:w-1/3">
                <label className={lbl}>Reason for Export</label>
                <select value={reasonForExport} onChange={(e) => setReasonForExport(e.target.value)} className={inp}>
                  {REASONS_FOR_EXPORT.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Boxes List */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-extrabold text-[#1c1f2e] flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#f27a1a] rounded-full inline-block" />
                    Boxes & Customs Declarations
                  </h3>
                  <button
                    onClick={addBox}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f27a1a] bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl px-4 py-2 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Box
                  </button>
                </div>

                {boxes.map((box, idx) => (
                  <div
                    key={box.id}
                    className="bg-[#f8f9fa] p-5 sm:p-6 rounded-2xl border border-gray-200 space-y-5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-extrabold text-[#1c1f2e] flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#f27a1a]" />
                        Box #{idx + 1}
                      </span>
                      {boxes.length > 1 && (
                        <button
                          onClick={() => removeBox(box.id)}
                          className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(
                        [
                          ["weightKg", "Weight (KG)"],
                          ["lengthCm", "Length (CM)"],
                          ["widthCm", "Width (CM)"],
                          ["heightCm", "Height (CM)"],
                        ] as const
                      ).map(([field, label]) => (
                        <div key={field}>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
                          <input
                            type="number"
                            value={(box as any)[field]}
                            onChange={(e) => updateBox(box.id, field, parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1c1f2e] focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/10 outline-none transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-[11px] font-extrabold text-[#f27a1a] uppercase tracking-wider mb-3">Customs Item Declaration</p>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="sm:col-span-2 relative">
                          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Item Description *</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={box.productDescription}
                              placeholder="e.g. Cotton T-Shirt, Documents..."
                              onChange={(e) => handleProductDescriptionChange(box.id, e.target.value)}
                              onFocus={() => {
                                if (box.productDescription.trim().length > 0) {
                                  const results = searchProduct(box.productDescription);
                                  setHsnSuggestions((prev) => ({ ...prev, [box.id]: results }));
                                  setShowHsnDropdown((prev) => ({ ...prev, [box.id]: results.length > 0 }));
                                }
                              }}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1c1f2e] focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/10 outline-none transition-all pr-8"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            {showHsnDropdown[box.id] && hsnSuggestions[box.id]?.length > 0 && (
                              <button
                                onClick={() => closeHsnDropdown(box.id)}
                                className="absolute right-8 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full"
                              >
                                <X className="w-3.5 h-3.5 text-gray-400" />
                              </button>
                            )}
                          </div>
                          {showHsnDropdown[box.id] && (
                            <HsnSuggestions
                              query={hsnQuery[box.id] || ""}
                              suggestions={hsnSuggestions[box.id] || []}
                              onSelect={(name, hsnCode) => handleHsnSelect(box.id, name, hsnCode)}
                              onClose={() => closeHsnDropdown(box.id)}
                            />
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">HSN / HTS Code</label>
                          <input
                            type="text"
                            value={box.hsnCode}
                            placeholder={box.productDescription ? "Select from list" : "Auto-detected"}
                            onChange={(e) => updateBox(box.id, "hsnCode", e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#1c1f2e] focus:border-[#f27a1a] focus:ring-2 focus:ring-[#f27a1a]/10 outline-none transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Qty</label>
                            <input
                              type="number"
                              value={box.qty}
                              onChange={(e) => updateBox(box.id, "qty", parseInt(e.target.value) || 1)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1c1f2e] focus:border-[#f27a1a] outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Rate ($)</label>
                            <input
                              type="number"
                              value={box.unitRate}
                              onChange={(e) => updateBox(box.id, "unitRate", parseFloat(e.target.value) || 0)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1c1f2e] focus:border-[#f27a1a] outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {box.productDescription && box.hsnCode && (
                        <div className="mt-3 text-xs text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 inline-flex items-center gap-2 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{box.productDescription} — HSN <strong>{box.hsnCode}</strong></span>
                        </div>
                      )}
                      {box.productDescription && !box.hsnCode && (
                        <div className="mt-3 text-xs text-amber-700 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 inline-flex items-center gap-2 font-medium">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Select from the search dropdown to auto-fill verified HSN code
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Weight summary card */}
              <div className="bg-gradient-to-r from-[#0d1527] to-[#1c294a] rounded-2xl p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-md">
                <div className="p-2">
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Actual Weight</div>
                  <div className="text-white font-extrabold text-lg sm:text-xl mt-1">{totalActualWeight.toFixed(2)} KG</div>
                </div>
                <div className="p-2 border-l border-white/10">
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Volumetric Wt</div>
                  <div className="text-white font-extrabold text-lg sm:text-xl mt-1">{totalVolumetricWeight.toFixed(2)} KG</div>
                </div>
                <div className="p-2 border-l border-white/10">
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Customs Value</div>
                  <div className="text-white font-extrabold text-lg sm:text-xl mt-1">₹{computedInvoiceValue.toFixed(2)}</div>
                </div>
                <div className="p-2 border-l border-white/10">
                  <div className="text-orange-300 text-[11px] font-bold uppercase tracking-wider">Chargeable Wt</div>
                  <div className="text-[#f27a1a] font-extrabold text-xl sm:text-2xl mt-0.5">{chargeableWeight} KG</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(3)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={fetchQuotes}
                  disabled={quoting || totalActualWeight <= 0}
                  className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {quoting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Fetching Live Rates…</>
                  ) : (
                    <>Get Live Tariffs <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 5: Select Service ─── */}
        {step === 5 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/70">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#f27a1a]">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f2e] tracking-tight">
                    Select Shipping Service
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    Choose the best carrier rate and transit time for your shipment
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3.5 py-1.5 border border-gray-200/60">
                Step 5 of 5
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                {quotes.map((q) => {
                  const key = `${q.service}__${q.rateType}`;
                  const selected = selectedQuoteKey === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedQuoteKey(key)}
                      className={`p-5 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selected
                        ? "border-[#f27a1a] bg-orange-50/60 shadow-md shadow-orange-500/10"
                        : "border-gray-200 bg-[#f8f9fa] hover:border-orange-300 hover:bg-white"
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${selected ? "border-[#f27a1a] bg-[#f27a1a]" : "border-gray-300 bg-white"
                            }`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-extrabold text-[#1c1f2e]">{q.service}</span>
                              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                {NETWORK_LABELS[q.network] ?? q.network}
                              </span>
                              {q.zone && (
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700 font-mono">
                                  Zone {q.zone}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-1">
                              Estimated Delivery: <strong className="text-gray-700">{q.tat}</strong>
                            </p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <div className="text-2xl font-extrabold text-[#f27a1a]">₹{q.totalPrice.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">{q.rateType} · Tax Included</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedQuote && (
                <div className="bg-gradient-to-r from-[#0d1527] to-[#1c294a] rounded-2xl p-6 space-y-3 shadow-md">
                  <h3 className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">Freight Cost Breakdown</h3>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Basic Freight Tariff</span>
                    <span className="font-mono text-white font-semibold">₹{basicAmt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>CGST (9%)</span>
                    <span className="font-mono text-white font-semibold">₹{cgstAmt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>SGST (9%)</span>
                    <span className="font-mono text-white font-semibold">₹{sgstAmt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg font-extrabold pt-4 border-t border-white/15">
                    <span className="text-white">Total Amount</span>
                    <span className="text-[#f27a1a] font-mono">₹{selectedQuote.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(4)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={onSubmitBooking}
                  disabled={submitting || !selectedQuote}
                  className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Confirming Booking…</>
                  ) : (
                    <>Confirm & Book Shipment <CreditCard className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 6: Booking Confirmation ─── */}
        {step === 6 && bookingResult && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200/70 overflow-hidden max-w-3xl mx-auto">
            {/* Header banner */}
            <div
              style={{
                background: bookingResult.isHold
                  ? "linear-gradient(135deg, #78350f 0%, #92400e 100%)"
                  : "linear-gradient(135deg, #0d1527 0%, #1a2642 100%)",
              }}
              className="px-6 py-10 sm:py-12 text-center relative overflow-hidden"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-500/20 border border-emerald-500/40">
                <CheckCircle2 className={`w-10 h-10 ${bookingResult.isHold ? "text-amber-400" : "text-emerald-400"}`} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {bookingResult.isHold ? "Shipment On Hold" : "Shipment Booked Successfully!"}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                {bookingResult.isHold
                  ? "Insufficient account balance — your shipment is pending review."
                  : "Your Airway Bill has been generated and courier pickup is being scheduled."}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-2.5 backdrop-blur-sm">
                <Package className="w-4 h-4 text-[#f27a1a]" />
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">AWB Number:</span>
                <span className="text-[#f27a1a] font-extrabold text-sm sm:text-base font-mono">{bookingResult.awbNo}</span>
              </div>
            </div>

            {/* Summary Details */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "AWB Number", value: bookingResult.awbNo, highlight: true },
                  { label: "Invoice Number", value: bookingResult.invoiceNo, highlight: false },
                  { label: "Chargeable Wt", value: `${bookingResult.chargeableWt} KG`, highlight: false },
                  { label: "Total Amount", value: `₹${Number(bookingResult.totalAmt).toLocaleString()}`, highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="bg-[#f8f9fa] rounded-2xl p-4 border border-gray-200 text-center">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                    <div className={`font-bold text-sm font-mono ${highlight ? "text-[#f27a1a]" : "text-[#1c1f2e]"}`}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <Link
                  href={`/track?awb=${bookingResult.awbNo}`}
                  className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  Track AWB Status
                </Link>
                <Link
                  href="/book-shipment"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 px-6 rounded-xl transition-all text-center"
                >
                  Book Another Shipment
                </Link>
                <Link
                  href="/"
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm py-3.5 px-6 rounded-xl transition-all text-center"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── Site Footer ─── */}
      <Footer />
    </div>
  );
}

