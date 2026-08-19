"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
      fetch("/api/ping").catch(() => {});
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
    { num: 1, label: "Destination" },
    { num: 2, label: "Shipper" },
    { num: 3, label: "Receiver" },
    { num: 4, label: "Package" },
    { num: 5, label: "Select Service" },
    { num: 6, label: "Done" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-border-color shadow-premium">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-2">
              <img src="/logo.png" alt="Logo" className="h-8 object-contain" />
              <span className="font-bold text-xl text-foreground tracking-tight">
                Manvi Courier Portal
              </span>
            </Link>
            <p className="text-xs text-slate-400">
              Create & Manage International Express Shipments
            </p>
          </div>
          <div className="text-right text-xs">
            <div className="text-slate-400">
              Account:{" "}
              <span className="text-brand-orange font-bold">
                {DEFAULT_ACCOUNT_CODE}
              </span>
            </div>
            <div className="text-slate-500">Booking Account: {DEFAULT_ACCOUNT_CODE}</div>
            <div className="text-slate-500">Balance: ₹0</div>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="bg-white p-4 rounded-xl border border-border-color overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] px-2">
            {stepsList.map((item, idx) => (
              <div
                key={item.num}
                className={`flex items-center gap-2 ${
                  step === item.num
                    ? "text-brand-orange font-bold"
                    : step > item.num
                      ? "text-emerald-500 font-medium"
                      : "text-slate-500"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === item.num
                      ? "bg-brand-orange text-white"
                      : step > item.num
                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/40"
                        : "bg-slate-100 text-slate-500 border border-border-color"
                  }`}
                >
                  {step > item.num ? "✓" : item.num}
                </div>
                <span className="text-xs whitespace-nowrap">{item.label}</span>
                {idx < stepsList.length - 1 && (
                  <span className="text-slate-300 mx-2">›</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" /> <span>{error}</span>
          </div>
        )}

        {/* Step 1: Destination */}
        {step === 1 && (
          <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border-color pb-4">
              <FileText className="text-brand-orange" /> Step 1: Destination
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Destination *
                </label>
                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setZipcode("");
                    setZoningCountry("");
                  }}
                  className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
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
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Country *
                  </label>
                  <select
                    value={zoningCountry}
                    onChange={(e) => setZoningCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                  >
                    <option value="">Select Country</option>
                    {subCountryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {destObj?.requiresZip && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Zipcode / Postcode *
                  </label>
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  if (destObj?.requiresZip && !zipcode.trim()) {
                    setError(`Zipcode is required for ${destObj.label}.`);
                    return;
                  }
                  if (destObj?.requiresSubCountry && !zoningCountry) {
                    setError(
                      `Please select a country within ${destObj.label}.`,
                    );
                    return;
                  }
                  setError("");
                  setReceiver((prev) => ({
                    ...prev,
                    receiverCountry:
                      zoningCountry || destObj?.label || destination,
                  }));
                  setStep(2);
                }}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm"
              >
                Next: Shipper Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipper */}
        {step === 2 && (
          <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border-color pb-4">
              <User className="text-brand-orange" /> Step 2: Shipper (Origin)
              Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  ["shipperName", "Full Name *"],
                  ["shipperPhone", "Mobile / Phone *"],
                  ["shipperEmail", "Email Address *"],
                  ["shipperGstin", "GSTIN / PAN"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs text-slate-300 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={(shipper as any)[key]}
                    onChange={(e) =>
                      setShipper({ ...shipper, [key]: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Address Line *
              </label>
              <input
                type="text"
                value={shipper.shipperAddress}
                onChange={(e) =>
                  setShipper({ ...shipper, shipperAddress: e.target.value })
                }
                className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(
                [
                  ["shipperCity", "City *"],
                  ["shipperState", "State *"],
                  ["shipperPincode", "Pincode *"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs text-slate-300 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={(shipper as any)[key]}
                    onChange={(e) =>
                      setShipper({ ...shipper, [key]: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-foreground transition-colors flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => {
                  if (
                    !shipper.shipperName ||
                    !shipper.shipperPhone ||
                    !shipper.shipperEmail ||
                    !shipper.shipperAddress ||
                    !shipper.shipperCity ||
                    !shipper.shipperState ||
                    !shipper.shipperPincode
                  ) {
                    setError("Please fill all required shipper fields.");
                    return;
                  }
                  setError("");
                  setStep(3);
                }}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm"
              >
                Next: Receiver Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Receiver */}
        {step === 3 && (
          <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border-color pb-4">
              <User className="text-brand-orange" /> Step 3: Receiver
              (Destination) Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  ["receiverName", "Receiver Name *"],
                  ["receiverPhone", "Receiver Phone *"],
                  ["receiverEmail", "Receiver Email"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs text-slate-300 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={(receiver as any)[key]}
                    onChange={(e) =>
                      setReceiver({ ...receiver, [key]: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  readOnly
                  value={receiver.receiverCountry}
                  className="w-full bg-slate-50/50 border border-border-color rounded-xl p-3 text-sm text-slate-400 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Receiver Address Line *
              </label>
              <input
                type="text"
                value={receiver.receiverAddress}
                onChange={(e) =>
                  setReceiver({ ...receiver, receiverAddress: e.target.value })
                }
                className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  ["receiverCity", "City *"],
                  ["receiverZipcode", "Zipcode / Postal Code *"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs text-slate-300 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={(receiver as any)[key]}
                    onChange={(e) =>
                      setReceiver({ ...receiver, [key]: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-foreground transition-colors flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => {
                  if (
                    !receiver.receiverName ||
                    !receiver.receiverPhone ||
                    !receiver.receiverAddress ||
                    !receiver.receiverCity ||
                    !receiver.receiverZipcode
                  ) {
                    setError("Please fill all required receiver fields.");
                    return;
                  }
                  setError("");
                  setStep(4);
                }}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm"
              >
                Next: Package Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Package - UPDATED WITH HSN AUTO-SUGGEST */}
        {step === 4 && (
          <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border-color pb-4">
              <Package className="text-brand-orange" /> Step 4: Shipment &
              Customs Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Overall Content Description *
                </label>
                <input
                  type="text"
                  value={contentDescription}
                  onChange={(e) => setContentDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Invoice value
                </label>
                <input
                  type="number"
                  readOnly
                  value={computedInvoiceValue || invoiceValue}
                  className="w-full bg-slate-50/50 border border-border-color rounded-xl p-3 text-sm text-slate-500 outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Auto-calculated from qty × unit rate below
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Invoice No.
                </label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm font-mono text-foreground focus:border-brand-orange outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Terms of Sale
                </label>
                <select
                  value={termsOfSale}
                  onChange={(e) => setTermsOfSale(e.target.value)}
                  className="w-full bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
                >
                  {TERMS_OF_SALE.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Reason for Export
              </label>
              <select
                value={reasonForExport}
                onChange={(e) => setReasonForExport(e.target.value)}
                className="w-full sm:w-1/3 bg-slate-50 border border-border-color rounded-xl p-3 text-sm text-foreground focus:border-brand-orange outline-none"
              >
                {REASONS_FOR_EXPORT.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-brand-orange uppercase tracking-wider">
                  Boxes, Dimensions & Customs Items
                </h3>
                <button
                  onClick={addBox}
                  className="inline-flex items-center gap-1 text-xs text-brand-orange hover:underline font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Box
                </button>
              </div>
              {boxes.map((box, idx) => (
                <div
                  key={box.id}
                  className="bg-slate-50 p-4 rounded-xl border border-border-color space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">
                      Box #{idx + 1}
                    </span>
                    {boxes.length > 1 && (
                      <button
                        onClick={() => removeBox(box.id)}
                        className="text-rose-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(
                      [
                        ["weightKg", "Actual Weight (KG)"],
                        ["lengthCm", "Length (CM)"],
                        ["widthCm", "Width (CM)"],
                        ["heightCm", "Height (CM)"],
                      ] as const
                    ).map(([field, label]) => (
                      <div key={field}>
                        <label className="block text-[11px] text-slate-400">
                          {label}
                        </label>
                        <input
                          type="number"
                          value={(box as any)[field]}
                          onChange={(e) =>
                            updateBox(
                              box.id,
                              field,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full bg-white border border-border-color rounded-lg p-2 text-xs text-foreground focus:border-brand-orange outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border-color">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Customs Item (for AdditionalDetails.ProductDetails)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2 relative">
                        <label className="block text-[11px] text-slate-400">
                          Item Description *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={box.productDescription}
                            placeholder="e.g. Cotton T-Shirt"
                            onChange={(e) =>
                              handleProductDescriptionChange(
                                box.id,
                                e.target.value,
                              )
                            }
                            onFocus={() => {
                              if (box.productDescription.trim().length > 0) {
                                const results = searchProduct(
                                  box.productDescription,
                                );
                                setHsnSuggestions((prev) => ({
                                  ...prev,
                                  [box.id]: results,
                                }));
                                setShowHsnDropdown((prev) => ({
                                  ...prev,
                                  [box.id]: results.length > 0,
                                }));
                              }
                            }}
                            className="w-full bg-white border border-border-color rounded-lg p-2 text-xs text-foreground focus:border-brand-orange outline-none pr-8"
                          />
                          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          {showHsnDropdown[box.id] &&
                            hsnSuggestions[box.id]?.length > 0 && (
                              <button
                                onClick={() => closeHsnDropdown(box.id)}
                                className="absolute right-8 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-full"
                              >
                                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                              </button>
                            )}
                        </div>
                        {/* HSN Suggestions Dropdown */}
                        {showHsnDropdown[box.id] && (
                          <HsnSuggestions
                            query={hsnQuery[box.id] || ""}
                            suggestions={hsnSuggestions[box.id] || []}
                            onSelect={(name, hsnCode) =>
                              handleHsnSelect(box.id, name, hsnCode)
                            }
                            onClose={() => closeHsnDropdown(box.id)}
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400">
                          HSN / HTS Code
                        </label>
                        <input
                          type="text"
                          value={box.hsnCode}
                          placeholder={
                            box.productDescription
                              ? "Select from dropdown"
                              : "Auto-detected"
                          }
                          onChange={(e) =>
                            updateBox(box.id, "hsnCode", e.target.value)
                          }
                          className="w-full bg-white border border-border-color rounded-lg p-2 text-xs text-foreground focus:border-brand-orange outline-none font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-slate-400">
                            Qty
                          </label>
                          <input
                            type="number"
                            value={box.qty}
                            onChange={(e) =>
                              updateBox(
                                box.id,
                                "qty",
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-full bg-white border border-border-color rounded-lg p-2 text-xs text-foreground focus:border-brand-orange outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">
                            Unit Rate
                          </label>
                          <input
                            type="number"
                            value={box.unitRate}
                            onChange={(e) =>
                              updateBox(
                                box.id,
                                "unitRate",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="w-full bg-white border border-border-color rounded-lg p-2 text-xs text-foreground focus:border-brand-orange outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Show HSN code hint if product selected */}
                    {box.productDescription && box.hsnCode && (
                      <div className="mt-2 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Product: {box.productDescription} → HSN: {box.hsnCode}
                      </div>
                    )}
                    {box.productDescription && !box.hsnCode && (
                      <div className="mt-2 text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Select a product from the dropdown to auto-fill HSN code
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-border-color flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
              <div>
                Actual Wt:{" "}
                <span className="font-bold text-foreground">
                  {totalActualWeight.toFixed(2)} KG
                </span>
              </div>
              <div>
                Volumetric Wt:{" "}
                <span className="font-bold text-foreground">
                  {totalVolumetricWeight.toFixed(2)} KG
                </span>
              </div>
              <div>
                Customs Value:{" "}
                <span className="font-bold text-foreground">
                  Rs. {computedInvoiceValue.toFixed(2)}
                </span>
              </div>
              <div className="text-sm font-bold text-brand-orange">
                Chargeable Wt: {chargeableWeight} KG
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-foreground transition-colors flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={fetchQuotes}
                disabled={quoting || totalActualWeight <= 0}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {quoting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Fetching
                    Rates...
                  </>
                ) : (
                  <>
                    Get Live Rates <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Select Service */}
        {step === 5 && (
          <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border-color pb-4">
              <Truck className="text-brand-orange" /> Step 5: Select a Service
            </h2>

            <div className="flex flex-col gap-3">
              {quotes.map((q) => {
                const key = `${q.service}__${q.rateType}`;
                const selected = selectedQuoteKey === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedQuoteKey(key)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selected
                        ? "bg-brand-orange/10 border-brand-orange"
                        : "bg-slate-50 border-border-color hover:border-brand-orange/40"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {q.service}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {NETWORK_LABELS[q.network] ?? q.network} · Zone{" "}
                          {q.zone} · {q.tat}
                        </p>
                      </div>
                      <p className="text-lg font-extrabold text-brand-orange shrink-0">
                        ₹{q.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedQuote && (
              <div className="bg-slate-50 p-5 rounded-xl border border-border-color space-y-2">
                <h3 className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">
                  Freight Charge Breakdown
                </h3>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Basic Freight</span>
                  <span className="font-mono text-foreground">
                    ₹{basicAmt.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>CGST (9%)</span>
                  <span className="font-mono text-foreground">
                    ₹{cgstAmt.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>SGST (9%)</span>
                  <span className="font-mono text-foreground">
                    ₹{sgstAmt.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border-color">
                  <span>Grand Total</span>
                  <span className="text-brand-orange font-mono">
                    ₹{selectedQuote.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-foreground transition-colors flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={onSubmitBooking}
                disabled={submitting || !selectedQuote}
                className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover font-bold rounded-xl text-white transition-colors flex items-center gap-2 text-sm shadow-premium-hover disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting
                    Shipment...
                  </>
                ) : (
                  <>
                    Confirm & Book Shipment <CreditCard className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Done */}
        {step === 6 && bookingResult && (
          <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-6 shadow-premium">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {bookingResult.isHold
                  ? "Shipment Created — On Hold"
                  : "Shipment Created Successfully!"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {bookingResult.isHold
                  ? "Your account balance was insufficient — this shipment is on hold pending admin review."
                  : "Your AWB and shipment details have been registered."}
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-border-color max-w-md mx-auto text-left space-y-3 text-sm font-mono">
              <div className="flex justify-between border-b border-border-color pb-2">
                <span className="text-slate-400">AWB Number:</span>
                <span className="font-bold text-brand-orange">
                  {bookingResult.awbNo}
                </span>
              </div>
              <div className="flex justify-between border-b border-border-color pb-2">
                <span className="text-slate-400">Invoice No:</span>
                <span className="text-foreground">
                  {bookingResult.invoiceNo}
                </span>
              </div>
              <div className="flex justify-between border-b border-border-color pb-2">
                <span className="text-slate-400">Chargeable Weight:</span>
                <span className="text-foreground">
                  {bookingResult.chargeableWt} KG
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grand Total:</span>
                <span className="font-bold text-emerald-500">
                  ₹ {Number(bookingResult.totalAmt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href={`/track?awb=${bookingResult.awbNo}`}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover font-bold rounded-xl text-white transition-colors text-sm"
              >
                Track AWB Status
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl text-foreground transition-colors text-sm"
              >
                Return to Website
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
