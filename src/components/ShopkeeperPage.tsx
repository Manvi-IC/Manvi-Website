"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
  TrendingDown,
  Clock,
  Info,
  Loader2,
  Send,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const API_URL = process.env.NEXT_API_URL || "http://localhost:5000";
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || "manvi";

/* ── WhatsApp form HTML (unchanged) ── */
const zohoFormHtml = `
<div id='crmWebToEntityForm' class='zcwf_lblLeft crmWebToEntityForm' style='background-color: white;color: black;max-width: 600px;font-family: var(--font-sans), system-ui, -apple-system, sans-serif;'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <META HTTP-EQUIV='content-type' CONTENT='text/html;charset=UTF-8'>
  <form id='webform1394241000000604320' action='https://crm.zoho.in/crm/WebToLeadForm' name='WebToLeads1394241000000604320' method='POST' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory1394241000000604320()' accept-charset='UTF-8'>
    <input type='text' style='display:none;' name='xnQsjsdp' value='5d36fe4ccf2211a95a323ac159955263068b8121667a6497bffb393b6173e11b'>
    <input type='hidden' name='zc_gad' id='zc_gad' value=''>
    <input type='text' style='display:none;' name='xmIwtLD' value='f02ff563ef0a153f6056f8c0fa24d1af0d4ee55f0c9366b73786d5d47923b9417d30878160ae6a4ce3a766b78f2f5d78'>
    <input type='text' style='display:none;' name='actionType' value='TGVhZHM='>
    <input type='text' style='display:none;' name='returnURL' value='null'>
    <style>
      html,body{margin:0px;} .formsubmit.zcwf_button{color:white !important;background:transparent linear-gradient(0deg, #0279FF 0%, #00A3F3 100%);} #crmWebToEntityForm.zcwf_lblLeft{width:100%;padding:25px;margin:0 auto;box-sizing:border-box;font-family: inherit;} #crmWebToEntityForm.zcwf_lblLeft *{box-sizing:border-box;} #crmWebToEntityForm{text-align:left;font-family: inherit;} #crmWebToEntityForm *{direction:ltr;font-family: inherit;} .zcwf_lblLeft .zcwf_title{word-wrap:break-word;padding:0px 6px 10px;font-weight:bold;font-family: inherit;} .zcwf_lblLeft.cpT_primaryBtn:hover{background:linear-gradient(#02acff 0,#006be4 100%)no-repeat padding-box !important;box-shadow:0 -2px 0 0 #0159b9 inset !important;border:0 !important;color:#fff !important;outline:0 !important;} .zcwf_lblLeft .zcwf_col_fld input[ type = text], input[ type = password], .zcwf_lblLeft .zcwf_col_fld textarea{width:60%;border:1px solid #c0c6cc !important;resize:vertical;border-radius:2px;float:left;} .zcwf_lblLeft .zcwf_col_lab{width:30%;word-break:break-word;padding:0px 6px 0px;margin-right:10px;margin-top:5px;float:left;min-height:1px;font-family: inherit;} .zcwf_lblLeft .zcwf_col_fld{float:left;width:68%;padding:0px 6px 0px;position:relative;margin-top:5px;font-family: inherit;} .zcwf_lblLeft .zcwf_privacy{padding:6px;} .zcwf_lblLeft .wfrm_fld_dpNn{display:none;} .dIB{display:inline-block;} .zcwf_lblLeft .zcwf_col_fld_slt{width:60%;border:1px solid #ccc;background:#fff;border-radius:4px;font-size:12px;float:left;resize:vertical;padding:2px 5px;} .zcwf_lblLeft .zcwf_row:after, .zcwf_lblLeft .zcwf_col_fld:after{content:'';display:table;clear:both;} .zcwf_lblLeft .zcwf_col_help{float:left;margin-left:7px;font-size:12px;max-width:35%;word-break:break-word;} .zcwf_lblLeft .zcwf_help_icon{cursor:pointer;width:16px;height:16px;display:inline-block;background:#fff;border:1px solid #c0c6cc;color:#c1c1c1;text-align:center;font-size:11px;line-height:16px;font-weight:bold;border-radius:50%;} .zcwf_lblLeft .zcwf_row{margin:15px 0px;} .zcwf_lblLeft .formsubmit{margin-right:5px;cursor:pointer;color:#313949;font-size:12px;font-family: inherit;} .zcwf_lblLeft .zcwf_privacy_txt{width:90%;color:rgb(0, 0, 0);font-size:12px;font-family:Arial;display:inline-block;vertical-align:top;color:#313949;padding-top:2px;margin-left:6px;} .zcwf_lblLeft .zcwf_button{font-size:12px;color:#313949;border:1px solid #c0c6cc;padding:3px 9px;border-radius:4px;cursor:pointer;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;} .zcwf_lblLeft .zcwf_tooltip_over{position:relative;} .zcwf_lblLeft .zcwf_tooltip_ctn{position:absolute;background:#dedede;padding:3px 6px;top:3px;border-radius:4px;word-break:break-word;min-width:100px;max-width:150px;color:#313949;z-index:100;} .zcwf_lblLeft .zcwf_ckbox{float:left;} .zcwf_lblLeft .zcwf_file{width:55%;box-sizing:border-box;float:left;} .cBoth:after{content:'';display:block;clear:both;} @media all and (max-width: 600px){ .zcwf_lblLeft .zcwf_col_lab, .zcwf_lblLeft .zcwf_col_fld{width:auto;float:none !important;} .zcwf_lblLeft .zcwf_col_help{width:40%;} }
    </style>
    <div class='zcwf_title' style='max-width: 600px;color: black; font-family: inherit;'>WhatsApp Redirect Form</div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab' style='font-size:12px; font-family: inherit;'><label for='First_Name'>First Name</label></div>
      <div class='zcwf_col_fld'><input type='text' id='First_Name' aria-required='false' aria-label='First Name' name='First Name' aria-valuemax='40' maxlength='40'><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab' style='font-size:12px; font-family: inherit;'><label for='Last_Name'>Last Name <span style='color:red;'>*</span></label></div>
      <div class='zcwf_col_fld'><input type='text' id='Last_Name' aria-required='true' aria-label='Last Name' name='Last Name' aria-valuemax='80' maxlength='80'><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab' style='font-size:12px; font-family: inherit;'><label for='Mobile'>Mobile</label></div>
      <div class='zcwf_col_fld'><input type='text' id='Mobile' aria-required='false' aria-label='Mobile' name='Mobile' aria-valuemax='30' maxlength='30'><div class='zcwf_col_help'></div></div>
    </div>
    <input type='text' type='hidden' style='display: none;' name='aG9uZXlwb3Q' value='' />
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'></div>
      <div class='zcwf_col_fld'><input type='submit' id='formsubmit' role='button' class='formsubmit zcwf_button' value='Submit' aria-label='Submit' title='Submit'><input type='reset' class='zcwf_button' role='button' name='reset' value='Reset' aria-label='Reset' title='Reset'></div>
    </div>
    <script>
      function checkMandatory1394241000000604320(isAjax){
        var mndFileds = new Array('Last Name');
        var fldLangVal = new Array('Last Name');
        for (i = 0; i < mndFileds.length; i++ ) {
          var fieldObj = document.forms['WebToLeads1394241000000604320'] [mndFileds[i]];
          if (fieldObj) {
            if(((fieldObj.value) .replace (/^\s+|\s+$/g,'') ) .length == 0) {
              if (fieldObj.type == 'file') {
                alert('Please select a file to upload.');
                fieldObj.focus();
                return false;
              }
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            } else if (fieldObj.nodeName == 'SELECT') {
              if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                alert(fldLangVal[i] + ' cannot be none.');
                fieldObj.focus();
                return false;
              }
            } else if (fieldObj.type == 'checkbox') {
              if (fieldObj.checked == false) {
                alert('Please accept ' + fldLangVal[i]);
                fieldObj.focus();
                return false;
              }
            }
            try{
              if (fieldObj.name == 'Last Name') { name = fieldObj.value; }
            } catch (e){}
          }
        }
        var urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has ('service') && (urlparams.get ('service') === 'smarturl') ) {
          var webform = document.getElementById('webform1394241000000604320');
          var service = urlparams.get('service');
          var smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service);
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
      }
      _wFa_ajax_will_be_replaced = false;
      if (typeof _wfa_fstprtcken == 'undefined') {
        _wfa_fstprtcken = {};
      }
      _wfa_fstprtcken[1394241000000604320] = true;
      function tooltipShow1394241000000604320(el){
        var tooltip = el.nextElementSibling;
        var tooltipDisplay = tooltip.style.display;
        if (tooltipDisplay == 'none') {
          var allTooltip = document.getElementsByClassName('zcwf_tooltip_over');
          for (i = 0; i < allTooltip.length; i++ ) {
            allTooltip[i].style.display = 'none';
          }
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }
    </script>
    <script id='wf_anal' src='https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=d023568e1e3e6fa18f4c65deedbaf5bc7f1cd4b152b8e5a19ab6edcaef23b301e62ee712edde36cec4caa7ba4154a584gidacef6996ea9494b52c0598738546e612e2a0a5be6351888a2c61d75436d46e2dgidf646a7fe147ef8abef157542804ad5353ed0c88259c12374e1616665bee5deddgid9df265a27c59cea1a3209824dffe14bf32108b2470f9382cadb7d7c87376883a&tw=71ad78d900e1d4b8b9fc1253be7bad177119792698b6ee802bfee724b6dad136&version=v2'></script>
  </form>
</div>`;

const stripScriptTags = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");

/* ── Destination / network data ── */
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
  "AUSTRIA",
  "BELGIUM",
  "LUXEMBOURGE",
  "NETHERLANDS",
  "CZECH REPUBLIC",
  "DENMARK",
  "LIECHTENSTEIN",
  "FRANCE",
  "MONACO",
  "HUNGARY",
  "ITALY",
  "POLAND",
  "SLOVAKIA",
  "SLOVENIA",
  "SPAIN",
  "IRELAND",
  "PORTUGAL",
  "SWEDEN",
  "ESTONIA",
  "FINLAND",
  "CROATIA",
  "LATVIA",
  "LITHUANIA",
  "BULGARIA",
  "ROMANIA",
  "GREECE",
  "ICELAND",
];

const INTERNATIONAL_COUNTRIES = [
  "USA",
  "BANGLADESH",
  "BHUTAN",
  "MALDIVES",
  "NEPAL",
  "SRI LANKA",
  "UNITED ARAB EMIRATES",
  "HONG KONG",
  "MALAYSIA",
  "SINGAPORE",
  "THAILAND",
  "CHINA, PEOPLE'S REPUBLIC",
  "BAHRAIN",
  "JORDAN",
  "KUWAIT",
  "OMAN",
  "PAKISTAN",
  "QATAR",
  "SAUDI ARABIA",
  "BRUNEI",
  "CAMBODIA",
  "INDONESIA",
  "JAPAN",
  "KOREA, REPUBLIC OF",
  "MACAU",
  "MYANMAR",
  "PHILIPPINES, THE",
  "TAIWAN",
  "VIETNAM",
  "NEW ZEALAND",
  "SOUTH AFRICA",
  "NIGERIA",
  "KENYA",
  "EGYPT",
  "GHANA",
];

const NETWORK_LABELS: Record<string, string> = {
  SELF: "Self Network",
  ARA: "Aramex",
  DHL: "DHL",
  UPS: "UPS",
  FED: "FedEx",
};
const NETWORK_COLORS: Record<string, string> = {
  SELF: "bg-orange-100 text-orange-700",
  ARA: "bg-purple-100 text-purple-700",
  DHL: "bg-yellow-100 text-yellow-800",
  UPS: "bg-amber-100 text-amber-800",
  FED: "bg-blue-100 text-blue-700",
};

const getShippingRestrictions = (network: string, t: any) => {
  const restrictions: Record<
    string,
    { blocked: string[]; warning: string[]; allowed: string[]; note?: string }
  > = {
    DHL: {
      blocked: [
        t.restriction_medicine,
        t.restriction_herbal_medicine,
        t.restriction_liquid_medicine,
        t.restriction_ghee,
        t.restriction_oil,
        t.restriction_pickle,
        t.restriction_silver,
        t.restriction_supplements,
        t.restriction_memory_cards,
      ],
      warning: [
        t.restriction_homemade_sweets,
        t.restriction_cosmetics,
        t.restriction_branded_eatables,
        t.restriction_spices,
        t.restriction_electronics,
        t.restriction_wooden_items,
      ],
      allowed: [
        t.restriction_sim_cards,
        t.restriction_turban_items,
        t.restriction_accessories,
        t.restriction_phone_accessories,
      ],
      note: t.restriction_dhl_note,
    },
    UPS: {
      blocked: [
        t.restriction_medicine,
        t.restriction_herbal_medicine,
        t.restriction_liquid_medicine,
        t.restriction_ghee,
        t.restriction_oil,
        t.restriction_pickle,
        t.restriction_silver,
        t.restriction_supplements,
        t.restriction_memory_cards,
      ],
      warning: [
        t.restriction_homemade_sweets,
        t.restriction_cosmetics,
        t.restriction_branded_eatables,
        t.restriction_spices,
        t.restriction_electronics,
      ],
      allowed: [
        t.restriction_sim_cards,
        t.restriction_turban_items,
        t.restriction_accessories,
        t.restriction_phone_accessories,
      ],
      note: t.restriction_ups_note,
    },
    FED: {
      blocked: [
        t.restriction_medicine,
        t.restriction_ghee,
        t.restriction_oil,
        t.restriction_pickle,
        t.restriction_silver,
        t.restriction_supplements,
        t.restriction_memory_cards,
      ],
      warning: [
        t.restriction_homemade_sweets,
        t.restriction_cosmetics,
        t.restriction_branded_eatables,
        t.restriction_spices,
        t.restriction_electronics,
      ],
      allowed: [
        t.restriction_sim_cards,
        t.restriction_turban_items,
        t.restriction_accessories,
        t.restriction_phone_accessories,
      ],
      note: t.restriction_fedex_note,
    },
    SELF: {
      blocked: [t.restriction_self_blocked],
      warning: [t.restriction_self_uk, t.restriction_self_usa],
      allowed: [t.restriction_self_allowed],
      note: t.restriction_self_note,
    },
  };
  return restrictions[network] || { blocked: [], warning: [], allowed: [] };
};

interface Quote {
  service: string;
  network: string;
  chargeableWt: number;
  volWt: number;
  zone: string;
  rateType: string;
  totalPrice: number;
  tat: string;
}

type FilterType = "all" | "cheapest" | "fastest";

/* ── Apply Now Modal ── */
function ApplyModal({
  open,
  onClose,
  quote,
  destination,
  destLabel,
  zoningCountry,
  zipcode,
  actualWt,
  volWt,
  length,
  breadth,
  height,
  chargeableWt,
}: {
  open: boolean;
  onClose: () => void;
  quote: Quote | null;
  destination: string;
  destLabel: string;
  zoningCountry: string;
  zipcode: string;
  actualWt: string;
  volWt: string | null;
  length: string;
  breadth: string;
  height: string;
  chargeableWt: number;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open || !quote) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (
        typeof window !== "undefined" &&
        (window as any)._wfa_track &&
        (window as any)._wfa_track.wfa_submit
      ) {
        (window as any)._wfa_track.wfa_submit(e);
      }
      const res = await fetch("https://crm.zoho.in/crm/WebToLeadForm", {
        method: "POST",
        body: formData,
        cache: "no-cache",
      });
      const contentType = res.headers.get("Content-Type");
      const data =
        contentType && contentType.includes("application/json")
          ? await res.json()
          : await res.text();
      if (typeof data === "object") {
        if (
          data.actionsubmit === "error_msg" ||
          data.actionsubmit === "captcha_error"
        ) {
          throw new Error(data.message || "Submission failed");
        }
      }
      setSubmitted(true);
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form_enquiry_success" });
        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-16880308122/jB3TCL-RwNccEJqflPE-",
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setError("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <script
        id="wf_anal"
        src="https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=35f6149cd4f21e4a45325993c4badb496bbff539e80a590d876efcc0473696f60c2ec3e80d2110a98e2dcc635ca8aeddgid14c49147eca089aa13008d713fef50e6c20e786337446d3f4e26d826b72f26e3gid977b9ca74605539e64e70acb1f8f2ab744682e0ee4dd585040a014e20cb32f55gide95ceeeacfd3215343280dd1fffc20591e601b303c86ab08381dd51ea75c3240&tw=eec3b02e1df12dbc38ecb4c4546e48954c77ac0a1744f3d5cc68d3bca26e4c9f&version=v2"
        async
      ></script>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-[#0D1527] px-6 py-5 flex items-start justify-between">
          <div>
            <p className="text-[#f27a1a] text-[11px] font-extrabold tracking-widest uppercase mb-1">
              Confirm Your Interest
            </p>
            <h3 className="text-white font-extrabold text-lg leading-tight">
              Apply Now
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-colors mt-0.5"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <div>
              <p className="font-extrabold text-[#1c1f2e] text-lg">
                Enquiry Submitted!
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Our team will reach out to you shortly.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-2 bg-[#f27a1a] hover:bg-orange-600 text-white font-bold text-sm py-3 px-8 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="bg-orange-50 border-b border-orange-100 px-6 py-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">
                Selected Service
              </p>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#1c1f2e]">
                    {quote.service}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {destLabel}
                    {zoningCountry && ` — ${zoningCountry}`}
                    {zipcode && ` · ${zipcode}`}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{quote.tat}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-extrabold text-[#f27a1a]">
                    ₹{Math.round(quote.totalPrice).toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {chargeableWt} kg chargeable
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-5 flex flex-col gap-4"
            >
              <input
                type="hidden"
                name="xnQsjsdp"
                value="3469cc92f353f141a975c84fed6da89424f1095353c0090e640e892f8f1ae05c"
                readOnly
              />
              <input type="hidden" name="zc_gad" value="" readOnly />
              <input
                type="hidden"
                name="xmIwtLD"
                value="2b1f8115908998ce3f2920a24b04f5580069559bde7bd38e39a6aad3eeb09e1746a031c38fbcb9ee32b83cd1f6946796"
                readOnly
              />
              <input
                type="hidden"
                name="actionType"
                value="TGVhZHM="
                readOnly
              />
              <input type="hidden" name="returnURL" value="null" readOnly />
              <input type="hidden" name="aG9uZXlwb3Q" value="" readOnly />
              <input
                type="hidden"
                name="Designation"
                value={quote.totalPrice}
                readOnly
              />
              <input type="hidden" name="Fax" value={quote.service} readOnly />

              <p className="text-sm text-gray-500 font-medium">
                Fill in your details and our team will contact you to finalise
                the shipment.
              </p>

              <div className="relative">
                <User
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="Last Name"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8f9fa] text-[#333] text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-orange-300 transition-colors"
                />
              </div>

              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  name="Phone"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f8f9fa] text-[#333] text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-orange-300 transition-colors"
                />
              </div>

              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="Email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f9fa] text-[#333] text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 focus:outline-none border border-gray-200 placeholder:text-gray-400 focus:border-orange-300 transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#f27a1a] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 mt-1"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit Enquiry <Send size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Quotes Modal ── */
function QuotesModal({
  quotes,
  destLabel,
  zoningCountry,
  selectedService,
  onSelect,
  onClose,
  onApplyNow,
}: {
  quotes: Quote[];
  destLabel: string;
  zoningCountry: string;
  selectedService: string | null;
  onSelect: (key: string) => void;
  onClose: () => void;
  onApplyNow: () => void;
}) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [expandedRestrictions, setExpandedRestrictions] = useState<
    string | null
  >(null);

  const getTATDays = (tat: string): number => {
    const match = tat.match(/(\d+)/);
    return match ? parseInt(match[0]) : 999;
  };

  const displayedQuotes = useMemo<Quote[]>(() => {
    const filtered = [...quotes];
    switch (filter) {
      case "cheapest":
        filtered.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case "fastest":
        filtered.sort((a, b) => getTATDays(a.tat) - getTATDays(b.tat));
        break;
      default:
        break;
    }
    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, filter]);

  useEffect(() => {
    if (isManualSelection) {
      setIsManualSelection(false);
      return;
    }
    if (displayedQuotes.length > 0) {
      const firstQuote = displayedQuotes[0];
      onSelect(`${firstQuote.service}__${firstQuote.rateType}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, quotes]);

  useEffect(() => {
    if (selectedService && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(
        `[data-service-key="${selectedService}"]`,
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedService]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleServiceSelect = (key: string) => {
    setIsManualSelection(true);
    onSelect(key);
  };

  const toggleRestrictions = (key: string) => {
    setExpandedRestrictions(expandedRestrictions === key ? null : key);
  };

  const selectedQuote =
    quotes.find((q) => `${q.service}__${q.rateType}` === selectedService) ??
    null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0D1527] rounded-2xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] min-h-[380px] flex flex-col shadow-2xl border border-white/10">
        <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-white/10 shrink-0">
          <div className="min-w-0">
            <p className="text-white font-bold text-sm sm:text-base truncate">
              {destLabel}
              {zoningCountry && ` — ${zoningCountry}`}
            </p>
            <p className="text-zinc-400 text-[11px] sm:text-[12px] mt-0.5">
              {quotes.length} {t.form_services_found_text}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1 mt-0.5 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 sm:px-5 py-3 border-b border-white/10 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-zinc-400 shrink-0" />
            <span className="text-zinc-400 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">
              Sort by:
            </span>
            <div className="flex gap-1.5 ml-1 flex-wrap">
              <button
                onClick={() => {
                  setIsManualSelection(false);
                  setFilter("all");
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all ${
                  filter === "all"
                    ? "bg-[#e77419] text-white"
                    : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                }`}
              >
                Default
              </button>
              <button
                onClick={() => {
                  setIsManualSelection(false);
                  setFilter("cheapest");
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center gap-1 ${
                  filter === "cheapest"
                    ? "bg-[#e77419] text-white"
                    : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                }`}
              >
                <TrendingDown size={12} />
                <span className="hidden xs:inline">Most Affordable</span>
                <span className="xs:hidden">Cheapest</span>
              </button>
              <button
                onClick={() => {
                  setIsManualSelection(false);
                  setFilter("fastest");
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center gap-1 ${
                  filter === "fastest"
                    ? "bg-[#e77419] text-white"
                    : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                }`}
              >
                <Clock size={12} /> Fastest
              </button>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-x-auto overflow-y-auto p-3 sm:p-5 gap-3 sm:gap-5 flex items-start scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3f3f46 transparent",
          }}
        >
          {displayedQuotes.map((q, index) => {
            const key = `${q.service}__${q.rateType}`;
            const isSelected = selectedService === key;
            const networkColor =
              NETWORK_COLORS[q.network] ?? "bg-gray-100 text-gray-700";
            const networkLabel = NETWORK_LABELS[q.network] ?? q.network;
            const dutyPaid = q.network === "SELF";
            const restrictions = getShippingRestrictions(q.network, t);
            const isExpanded = expandedRestrictions === key;

            let badge = "";
            if (filter === "cheapest" && index === 0) badge = "🏆 Best Price";
            else if (filter === "fastest" && index === 0) badge = "⚡ Fastest";

            return (
              <div
                key={key}
                data-service-key={key}
                onClick={() => handleServiceSelect(key)}
                className={`relative rounded-xl border-2 cursor-pointer transition-all min-w-[82vw] xs:min-w-[300px] sm:min-w-[300px] max-w-[340px] flex-shrink-0 flex flex-col max-h-full ${
                  isSelected
                    ? "border-[#e77419] bg-[#e77419]/10"
                    : "border-zinc-700 bg-zinc-800/60 hover:border-zinc-500"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 left-3 z-10 bg-[#e77419] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {t.form_selected}
                  </div>
                )}
                {badge && (
                  <div className="absolute -top-2.5 right-3 z-10 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {badge}
                  </div>
                )}

                <div className="flex flex-col gap-3 h-full p-4 sm:p-5 overflow-y-auto rounded-xl">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${networkColor}`}
                    >
                      {q.service}
                    </span>
                    {q.zone && (
                      <span className="text-[10px] bg-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full font-mono">
                        {t.form_zone} {q.zone}
                      </span>
                    )}
                    <span className="text-[10px] bg-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full">
                      {q.rateType === "S" ? t.form_slab : t.form_per_kg}
                    </span>
                    {dutyPaid ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 size={10} strokeWidth={2} />{" "}
                        {t.form_duty_paid}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20">
                        <AlertCircle size={10} strokeWidth={2} />{" "}
                        {t.form_duty_unpaid}
                      </span>
                    )}
                  </div>

                  <div className="flex">
                    <p className="text-[18px] sm:text-[20px] font-semibold text-white leading-snug tracking-wide">
                      {networkLabel}
                    </p>
                  </div>

                  <div className="flex-1 border-t border-white/10 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRestrictions(key);
                      }}
                      className="flex items-center gap-2 text-[11px] sm:text-[12px] text-zinc-400 hover:text-white transition-colors font-medium group w-full"
                    >
                      <Info
                        size={15}
                        className="text-zinc-500 group-hover:text-white transition-colors shrink-0"
                      />
                      <span className="truncate">
                        {t.restriction_view_details}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`ml-auto shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2.5 text-[10.5px] sm:text-[11px] bg-white/5 rounded-lg p-3 sm:p-3.5 border border-white/10">
                        {restrictions.blocked.length > 0 && (
                          <div>
                            <p className="text-rose-400 font-semibold flex items-center gap-2 text-[11px] sm:text-[12px]">
                              <span>❌</span> {t.restriction_blocked}:
                            </p>
                            <ul className="text-zinc-300 ml-6 sm:ml-7 list-disc space-y-0.5 mt-1">
                              {restrictions.blocked.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {restrictions.warning.length > 0 && (
                          <div>
                            <p className="text-amber-400 font-semibold flex items-center gap-2 text-[11px] sm:text-[12px]">
                              <span>⚠️</span> {t.restriction_warning}:
                            </p>
                            <ul className="text-zinc-300 ml-6 sm:ml-7 list-disc space-y-0.5 mt-1">
                              {restrictions.warning.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {restrictions.allowed.length > 0 && (
                          <div>
                            <p className="text-emerald-400 font-semibold flex items-center gap-2 text-[11px] sm:text-[12px]">
                              <span>✅</span> {t.restriction_allowed}:
                            </p>
                            <ul className="text-zinc-300 ml-6 sm:ml-7 list-disc space-y-0.5 mt-1">
                              {restrictions.allowed.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {restrictions.note && (
                          <p className="text-zinc-400 italic mt-2 text-[10px] sm:text-[10.5px] border-t border-white/5 pt-2">
                            {restrictions.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <p className="text-[11px] sm:text-[12px] text-zinc-400 font-medium">
                      {q.tat}
                    </p>
                    <div className="text-right">
                      <p className="text-[20px] sm:text-[22px] font-extrabold text-[#e77419] leading-none tracking-tight">
                        ₹{Math.round(q.totalPrice).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-0.5 font-medium tracking-wide uppercase">
                        {t.form_gst_inc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedService && selectedQuote && (
          <div className="px-4 sm:px-5 pt-3 shrink-0">
            <div className="bg-white/5 rounded-2xl border-2 border-[#e77419] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-400 font-medium">
                  Ready to ship with
                </p>
                <p className="text-sm font-extrabold text-white mt-0.5 leading-tight">
                  {selectedQuote.service}
                </p>
                <p className="text-[#e77419] font-extrabold text-lg mt-0.5">
                  ₹
                  {Math.round(selectedQuote.totalPrice).toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={onApplyNow}
                className="shrink-0 bg-[#e77419] hover:bg-orange-600 text-white font-extrabold text-sm py-3.5 px-7 rounded-xl transition-all active:scale-98 flex items-center gap-2 shadow-md shadow-orange-900/30 w-full sm:w-auto justify-center"
              >
                Enquire Now <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-5 py-3 border-t border-white/10 text-center shrink-0">
          <p className="text-[10px] sm:text-[11px] text-zinc-500">
            {t.form_final_rates_msg}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Quote Calculator — now styled to match Hero's orange form card ── */
function QuoteCalculator({
  onApplyQuote,
}: {
  onApplyQuote: (data: {
    quote: Quote;
    destination: string;
    destLabel: string;
    zoningCountry: string;
    zipcode: string;
    actualWt: string;
    volWt: string | null;
    length: string;
    breadth: string;
    height: string;
    chargeableWt: number;
  }) => void;
}) {
  const { t } = useLanguage();

  const [destination, setDestination] = useState("");
  const [zoningCountry, setZoningCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [actualWt, setActualWt] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const destObj = DESTINATIONS.find((d) => d.value === destination);
  const requiresZip = destObj?.requiresZip ?? false;
  const requiresSubCountry = destObj?.requiresSubCountry ?? false;
  const subCountryOptions =
    destination === "EUROPE" ? EUROPE_COUNTRIES : INTERNATIONAL_COUNTRIES;

  const volWt =
    parseFloat(length) && parseFloat(breadth) && parseFloat(height)
      ? (
          (parseFloat(length) * parseFloat(breadth) * parseFloat(height)) /
          5000
        ).toFixed(2)
      : null;
  const chargeableWt = volWt
    ? Math.ceil(Math.max(parseFloat(actualWt) || 0, parseFloat(volWt)))
    : Math.ceil(parseFloat(actualWt) || 0);

  const selectedQuoteObj =
    quotes.find((q) => `${q.service}__${q.rateType}` === selectedService) ??
    null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !actualWt) {
      alert("Please select a destination and enter actual weight");
      return;
    }
    if (requiresZip && !zipcode.trim()) {
      alert("Please enter the zipcode/postcode for this destination.");
      return;
    }
    if (requiresSubCountry && !zoningCountry) {
      alert(`Please select a specific country within ${destObj?.label}.`);
      return;
    }
    setLoading(true);
    setQuotes([]);
    setSelectedService(null);
    try {
      const params = new URLSearchParams({ actualWt, country: destination });
      if (length) params.append("length", length);
      if (breadth) params.append("breadth", breadth);
      if (height) params.append("height", height);
      if (zipcode) params.append("zipcode", zipcode);
      if (zoningCountry) params.append("zoningCountry", zoningCountry);
      const res = await fetch(`${API_URL}/rates/quote?${params}`, {
        headers: { "x-database": DB_NAME },
      });
      const data = await res.json();
      if (data.success && data.quotes?.length > 0) {
        setQuotes(data.quotes);
        setSelectedService(
          `${data.quotes[0].service}__${data.quotes[0].rateType}`,
        );
        setShowModal(true);
      } else {
        alert(
          data.message ||
            "No services available for this destination/weight combination.",
        );
      }
    } catch (err: any) {
      alert("Failed to get quote: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyNow = () => {
    if (!selectedQuoteObj) return;
    onApplyQuote({
      quote: selectedQuoteObj,
      destination,
      destLabel: destObj?.label ?? destination,
      zoningCountry,
      zipcode,
      actualWt,
      volWt,
      length,
      breadth,
      height,
      chargeableWt,
    });
  };

  // White inputs on the orange card — matching Hero's form styling
  const inputCls =
    "w-full bg-white text-[#333] text-[13.5px] font-medium rounded-xl px-3.5 py-3 border border-transparent focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/60 transition-all";
  const labelCls =
    "block text-white/85 text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5 pl-1";

  return (
    <>
      {showModal && quotes.length > 0 && (
        <QuotesModal
          quotes={quotes}
          destLabel={destObj?.label ?? destination}
          zoningCountry={zoningCountry}
          selectedService={selectedService}
          onSelect={setSelectedService}
          onClose={() => setShowModal(false)}
          onApplyNow={handleApplyNow}
        />
      )}

      {/* Orange form card — matches Hero page's left card */}
      <div className="bg-[#f27a1a] rounded-[22px] p-5 sm:p-6 shadow-[0_18px_45px_-18px_rgba(242,122,26,0.55)] flex flex-col">
        {/* Header — mirrors the WhatsApp card's header structure */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/25">
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-white/90">
              Get a quote
            </p>
            <h3 className="mt-2 text-[22px] sm:text-[26px] font-extrabold text-white leading-tight">
              Instant rate calculator
            </h3>
            <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
              Enter your shipment details and see live rates across all our
              carriers.
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white border border-white/40 shadow-sm shrink-0">
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="pt-5 flex-1 flex flex-col gap-4"
        >
          {/* Destination */}
          <div>
            <label className={labelCls}>Destination Country</label>
            <div className="relative">
              <select
                aria-label={t.form_select_dest}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setZipcode("");
                  setZoningCountry("");
                  setQuotes([]);
                }}
                className={`${inputCls} appearance-none pr-10 cursor-pointer ${
                  destination ? "" : "text-gray-400"
                }`}
              >
                <option value="">Select destination country</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.value} value={d.value} className="text-[#333]">
                    {d.flag} {d.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Sub-country (Europe / International) */}
          {requiresSubCountry && (
            <div>
              <label className={labelCls}>
                {destination === "EUROPE"
                  ? "Select European country"
                  : "Select country"}
              </label>
              <div className="relative">
                <select
                  aria-label={
                    destination === "EUROPE"
                      ? t.form_select_euro
                      : t.form_select_country
                  }
                  value={zoningCountry}
                  onChange={(e) => {
                    setZoningCountry(e.target.value);
                    setQuotes([]);
                  }}
                  className={`${inputCls} appearance-none pr-10 cursor-pointer ${
                    zoningCountry ? "" : "text-gray-400"
                  }`}
                >
                  <option value="">
                    {destination === "EUROPE"
                      ? "Select European country"
                      : "Select country"}
                  </option>
                  {subCountryOptions.map((c) => (
                    <option key={c} value={c} className="text-[#333]">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          )}

          {/* Zipcode (Australia / Canada) */}
          {requiresZip && (
            <div>
              <label className={labelCls}>Zipcode / Postcode</label>
              <input
                aria-label={`${t.form_zipcode} (required for ${destObj?.label})`}
                type="text"
                placeholder={`Required for ${destObj?.label}`}
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                className={inputCls}
              />
            </div>
          )}

          {/* Actual weight */}
          <div>
            <label className={labelCls}>Actual Weight (kg)</label>
            <input
              aria-label={t.form_actual_wt || "Actual Weight"}
              type="number"
              placeholder="e.g. 2.5"
              value={actualWt}
              onChange={(e) => setActualWt(e.target.value)}
              min="0.001"
              step="0.001"
              className={inputCls}
            />
          </div>

          {/* Volume dimensions */}
          <div>
            <label className={labelCls}>
              Volume Weight Dimensions (cm) — Optional
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: length, setter: setLength, label: "Length" },
                { val: breadth, setter: setBreadth, label: "Breadth" },
                { val: height, setter: setHeight, label: "Height" },
              ].map(({ val, setter, label }) => (
                <input
                  key={label}
                  aria-label={label}
                  type="number"
                  placeholder={label}
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  min="0"
                  className="w-full bg-white text-[#333] text-[13px] font-medium rounded-xl px-3 py-3 border border-transparent focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/60 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Calculated weights strip */}
          {(actualWt || volWt) && (
            <div className="bg-white/20 rounded-xl px-4 py-3 flex justify-between text-white text-xs font-bold">
              {volWt && <span>Vol. weight: {volWt} kg</span>}
              <span>Chargeable: {chargeableWt} kg</span>
            </div>
          )}

          {/* Submit — orange-tinted button matching site theme (dark on orange, same as Hero's) */}
          <button
            type="submit"
            disabled={loading}
            className="mt-auto bg-[#0D1527] hover:bg-slate-800 text-white font-bold text-[13.5px] py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Calculating…
              </>
            ) : (
              <>
                Get quote <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

/* ── Shopkeeper Page ── */
export default function ShopkeeperPage() {
  const [applyModalData, setApplyModalData] = useState<{
    quote: Quote;
    destination: string;
    destLabel: string;
    zoningCountry: string;
    zipcode: string;
    actualWt: string;
    volWt: string | null;
    length: string;
    breadth: string;
    height: string;
    chargeableWt: number;
  } | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptText = `
      function checkMandatory1394241000000604320(isAjax){
        var mndFileds = new Array('Last Name');
        var fldLangVal = new Array('Last Name');
        for (i = 0; i < mndFileds.length; i++ ) {
          var fieldObj = document.forms['WebToLeads1394241000000604320'] [mndFileds[i]];
          if (fieldObj) {
            if(((fieldObj.value) .replace (/^\\s+|\\s+$/g,'') ) .length == 0) {
              if (fieldObj.type == 'file') {
                alert('Please select a file to upload.');
                fieldObj.focus();
                return false;
              }
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            } else if (fieldObj.nodeName == 'SELECT') {
              if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                alert(fldLangVal[i] + ' cannot be none.');
                fieldObj.focus();
                return false;
              }
            } else if (fieldObj.type == 'checkbox') {
              if (fieldObj.checked == false) {
                alert('Please accept ' + fldLangVal[i]);
                fieldObj.focus();
                return false;
              }
            }
            try{
              if (fieldObj.name == 'Last Name') { name = fieldObj.value; }
            } catch (e){}
          }
        }
        var urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has ('service') && (urlparams.get ('service') === 'smarturl') ) {
          var webform = document.getElementById('webform1394241000000604320');
          var service = urlparams.get('service');
          var smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service);
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
      }
      _wFa_ajax_will_be_replaced = false;
      if (typeof _wfa_fstprtcken == 'undefined') {
        _wfa_fstprtcken = {};
      }
      _wfa_fstprtcken[1394241000000604320] = true;
      function tooltipShow1394241000000604320(el){
        var tooltip = el.nextElementSibling;
        var tooltipDisplay = tooltip.style.display;
        if (tooltipDisplay == 'none') {
          var allTooltip = document.getElementsByClassName('zcwf_tooltip_over');
          for (i = 0; i < allTooltip.length; i++ ) {
            allTooltip[i].style.display = 'none';
          }
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }
    `;

    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.textContent = scriptText;
    document.body.appendChild(inlineScript);

    const analyticsScript = document.createElement("script");
    analyticsScript.id = "wf_anal_shopkeeper";
    analyticsScript.src =
      "https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=d023568e1e3e6fa18f4c65deedbaf5bc7f1cd4b152b8e5a19ab6edcaef23b301e62ee712edde36cec4caa7ba4154a584gidacef6996ea9494b52c0598738546e612e2a0a5be6351888a2c61d75436d46e2dgidf646a7fe147ef8abef157542804ad5353ed0c88259c12374e1616665bee5deddgid9df265a27c59cea1a3209824dffe14bf32108b2470f9382cadb7d7c87376883a&tw=71ad78d900e1d4b8b9fc1253be7bad177119792698b6ee802bfee724b6dad136&version=v2";
    analyticsScript.async = true;
    document.body.appendChild(analyticsScript);

    return () => {
      inlineScript.remove();
      analyticsScript.remove();
    };
  }, []);

  return (
    <div className="w-full font-sans bg-[#f8f9fa] text-[#0f172a] antialiased overflow-x-hidden">
      {/* Keyframe animation helpers */}
      <style>{`
        @keyframes skDraw { to { stroke-dashoffset: 0; } }
        @keyframes skPop { from { opacity: 0; } to { opacity: 1; } }
        @keyframes skSpin { to { transform: rotate(360deg); } }
        .sk-draw { stroke-dashoffset: 600; animation: skDraw 2.4s ease forwards; }
        .sk-draw-d2 { animation-delay: 0.35s; }
        .sk-draw-d3 { animation-delay: 0.7s; }
        .sk-draw-d4 { animation-delay: 1.05s; }
        .sk-pop-1 { opacity: 0; animation: skPop 0.5s ease 1.5s forwards; }
        .sk-pop-2 { opacity: 0; animation: skPop 0.5s ease 1.75s forwards; }
        .sk-pop-3 { opacity: 0; animation: skPop 0.5s ease 2s forwards; }
        .sk-pop-4 { opacity: 0; animation: skPop 0.5s ease 2.25s forwards; }
        .sk-yarn { transform-box: fill-box; transform-origin: center; animation: skSpin 30s linear infinite; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* Apply Modal */}
      {applyModalData && (
        <ApplyModal
          open={applyModalOpen}
          onClose={() => {
            setApplyModalOpen(false);
            setApplyModalData(null);
          }}
          quote={applyModalData.quote}
          destination={applyModalData.destination}
          destLabel={applyModalData.destLabel}
          zoningCountry={applyModalData.zoningCountry}
          zipcode={applyModalData.zipcode}
          actualWt={applyModalData.actualWt}
          volWt={applyModalData.volWt}
          length={applyModalData.length}
          breadth={applyModalData.breadth}
          height={applyModalData.height}
          chargeableWt={applyModalData.chargeableWt}
        />
      )}

      {/* ── 1. HERO CONTAINER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-2">
        {/* ── DESKTOP HERO ── */}
        <div className="hidden md:flex relative overflow-hidden rounded-[28px] lg:rounded-[32px] text-white border border-white/10 shadow-2xl min-h-[460px] lg:min-h-[500px] flex-col justify-center">
          <Image
            src="/laptop banner.webp"
            alt="Export From India - Manvi International Courier"
            fill
            priority
            unoptimized
            className="object-cover object-right lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent" />

          <div className="relative z-10 px-8 lg:px-12 py-6 lg:py-8 max-w-3xl flex flex-col justify-center">
            <div className="mb-3 overflow-hidden" style={{ height: "36px" }}>
              <img
                src="/logo-png.png"
                alt="Manvi International Courier"
                style={{
                  height: "100px",
                  marginTop: "-30px",
                  width: "auto",
                  display: "block",
                }}
              />
            </div>

            <h1 className="text-[36px] lg:text-[44px] xl:text-[50px] font-extrabold text-white leading-[1.15] tracking-tight mt-1">
              You already ship from India.{" "}
              <span className="text-[#ff7a00]">
                Let&apos;s ship it smarter.
              </span>
            </h1>

            <p className="mt-4 lg:mt-5 text-[15px] lg:text-[16.5px] text-slate-200 leading-relaxed max-w-xl font-medium">
              Garments, utensils, handicrafts, food or machine parts. Whatever
              you export, Manvi picks it up directly from your doorstep, packs
              it export-ready, clears customs and delivers worldwide through
              DHL, FedEx, UPS and Aramex at competitive rates.
            </p>

            <div className="flex flex-row gap-4 mt-7 lg:mt-8">
              <a
                href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20to%20compare%20my%20shipping%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] lg:text-[16px] px-7 py-3.5 lg:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all"
              >
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                </svg>
                <span>Compare your rate</span>
              </a>
              <a
                href="tel:+917070506070"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] lg:text-[16px] px-7 py-3.5 lg:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                Call +91 70 70 50 60 70
              </a>
            </div>

            <div className="flex gap-10 mt-7 lg:mt-8 pt-5 lg:pt-6 border-t border-white/15">
              <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                <div className="text-[22px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-none">
                  1M+
                </div>
                <div className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                  Shipments
                </div>
              </div>
              <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                <div className="text-[22px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-none">
                  100K+
                </div>
                <div className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                  Customers
                </div>
              </div>
              <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                <div className="text-[22px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-none">
                  200+
                </div>
                <div className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                  Countries
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE HERO ── */}
        <div className="md:hidden relative overflow-hidden rounded-[20px] text-white border border-white/10 shadow-2xl w-full aspect-[398/485] min-h-[485px] flex flex-col">
          <Image
            src="/shopkeeper-hero-mobile.jpg"
            alt="Export From India - Manvi International Courier"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 398px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/15" />

          <div className="relative z-10 px-5 pt-5 pb-5 flex flex-col justify-between flex-grow">
            <div>
              <div className="mb-3 overflow-hidden" style={{ height: "30px" }}>
                <img
                  src="/logo-png.png"
                  alt="Manvi International Courier"
                  style={{
                    height: "80px",
                    marginTop: "-20px",
                    width: "auto",
                    display: "block",
                  }}
                />
              </div>

              <h1 className="text-3xl font-extrabold text-white leading-[1.2] tracking-tight">
                You already ship from India.{" "}
                <span className="text-[#ff7a00]">
                  Let&apos;s ship it smarter.
                </span>
              </h1>
              <div className="w-[50vw]">
                <p className="mt-3 text-sm text-slate-200 leading-relaxed font-medium">
                  Manvi picks up from your doorstep, packs it export-ready,
                  clears customs and delivers worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20to%20compare%20my%20shipping%20rates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-bold text-[14px] px-5 py-2.5 rounded-full bg-[#23c961]/90 text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] transition-all text-center"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                  </svg>
                  <span>Compare your rate on WhatsApp</span>
                </a>
                <a
                  href="tel:+917070506070"
                  className="inline-flex items-center justify-center gap-2 font-bold text-[14px] px-5 py-2.5 rounded-full bg-black/45 text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all text-center"
                >
                  Call +91 70 70 50 60 70
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 bg-black/45 backdrop-blur-sm rounded-2xl pb-3 pl-3 pr-2 border border-white/15">
                <div className="border-l-2 border-[#ff7a00] pl-2">
                  <div className="text-[18px] font-extrabold text-white leading-none">
                    1M+
                  </div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                    Shipments
                  </div>
                </div>
                <div className="border-l-2 border-[#ff7a00] pl-2">
                  <div className="text-[18px] font-extrabold text-white leading-none">
                    100K+
                  </div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                    Customers
                  </div>
                </div>
                <div className="border-l-2 border-[#ff7a00] pl-2">
                  <div className="text-[18px] font-extrabold text-white leading-none">
                    200+
                  </div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-300 mt-1">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PARTNERS ── */}
      <div className="w-full bg-[#0f172a] text-white py-5 sm:py-7 border-y border-white/10 mt-4 sm:mt-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 text-center sm:text-left">
          <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-slate-300">
            One partner, every major carrier
          </span>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center sm:justify-end gap-3.5 sm:gap-8 items-center font-extrabold text-[15px] sm:text-[18px] md:text-[20px] text-white/90">
            <span>DHL</span>
            <span>FedEx</span>
            <span>UPS</span>
            <span>Aramex</span>
            <span>DPD</span>
            <span>Courier&nbsp;Please</span>
          </div>
        </div>
      </div>

      {/* ── 2.5 LEAD / QUOTE FORM CONTAINER ── */}
      <section
        className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-6 sm:py-10"
        id="quote"
      >
        <div className="bg-[#0f172a] text-white border border-white/10 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#ff7a00]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
                <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
                Get your quote
              </div>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold text-white leading-tight">
                Tell us what you ship.{" "}
                <span className="text-[#ff7a00]">
                  Get a rate that beats your current one.
                </span>
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[16px] text-slate-300 leading-relaxed">
                Fill this in and we will send a clear quote on WhatsApp, usually
                within a few hours. No obligation and no switching hassle.
              </p>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                {[
                  "Free rate comparison against what you pay today",
                  "Customs, packing and documentation handled for you",
                  "Doorstep pickup across North and West India",
                  "One dedicated logistics contact on WhatsApp",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[14px] sm:text-[15px] text-slate-200 font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* WhatsApp form (form 1 — unchanged logic, restyled shell) */}
              <div className="bg-white text-slate-900 rounded-[22px] p-5 sm:p-6 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.55)] border border-slate-200 flex flex-col">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#ff7a00]">
                      WhatsApp
                    </p>
                    <h3 className="mt-2 text-[22px] sm:text-[26px] font-extrabold text-[#0f172a] leading-tight">
                      Quick enquiry
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                      Drop your name and number — we&apos;ll call you back on
                      WhatsApp.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 shrink-0">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                    </svg>
                  </div>
                </div>

                <div className="pt-5 flex-1">
                  <div
                    className="relative z-10 [&_.zcwf_title]:!hidden [&_.zcwf_lblLeft]:!w-full [&_.zcwf_lblLeft]:!max-w-none [&_.zcwf_lblLeft]:!p-0 [&_.zcwf_lblLeft]:!bg-transparent [&_.zcwf_lblLeft]:!text-slate-900 [&_.zcwf_row]:!mt-4 [&_.zcwf_row:first-child]:!mt-0 [&_.zcwf_col_lab]:!w-full [&_.zcwf_col_lab]:!float-none [&_.zcwf_col_lab]:!text-[11px] [&_.zcwf_col_lab]:!font-bold [&_.zcwf_col_lab]:!tracking-[0.12em] [&_.zcwf_col_lab]:!uppercase [&_.zcwf_col_lab]:!text-slate-500 [&_.zcwf_col_lab]:!mb-1.5 [&_.zcwf_col_fld]:!w-full [&_.zcwf_col_fld]:!float-none [&_.zcwf_col_fld]:!p-0 [&_input[type='text']]:!w-full [&_input[type='text']]:!rounded-xl [&_input[type='text']]:!border [&_input[type='text']]:!border-slate-300 [&_input[type='text']]:!bg-white [&_input[type='text']]:!px-3.5 [&_input[type='text']]:!py-3 [&_input[type='text']]:!text-slate-900 [&_input[type='text']]:!text-[14.5px] [&_input[type='text']]:focus:!border-[#ff7a00] [&_input[type='text']]:focus:!ring-2 [&_input[type='text']]:focus:!ring-[#ff7a00]/20 [&_input[type='text']]:!transition-all [&_#formsubmit]:!mt-5 [&_#formsubmit]:!w-full [&_#formsubmit]:!bg-[#f27a1a] [&_#formsubmit]:!bg-none [&_#formsubmit]:!text-white [&_#formsubmit]:!rounded-xl [&_#formsubmit]:!border-0 [&_#formsubmit]:!px-6 [&_#formsubmit]:!py-3.5 [&_#formsubmit]:!font-bold [&_#formsubmit]:!text-[14px] [&_#formsubmit]:!tracking-wide [&_#formsubmit]:!cursor-pointer [&_#formsubmit]:hover:!bg-[#e66c00] [&_#formsubmit]:!transition-all [&_input[type='reset']]:!hidden"
                    style={{ fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif" }}
                    dangerouslySetInnerHTML={{
                      __html: stripScriptTags(zohoFormHtml),
                    }}
                  />
                </div>
              </div>

              {/* ── Instant Rate Calculator (Hero-style, orange card) ── */}
              <QuoteCalculator
                onApplyQuote={(data) => {
                  setApplyModalData(data);
                  setApplyModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE SHIP ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Whatever you export
          </div>
          <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            If you send it abroad, we move it.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-[14.5px] sm:text-[16px] md:text-[17px] text-[#555555] leading-relaxed">
            No matter what you sell, we can ship it. From a single sample to a
            full bulk consignment- packed export-ready and delivered worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: "👕",
              title: "Garments & textiles",
              desc: "Apparel, fabrics, home linen and made-ups in retail quantities or bulk cartons.",
            },
            {
              icon: "🍽️",
              title: "Utensils & kitchenware",
              desc: "Steel, brass, cookware and small appliances, packed carefully to arrive dent-free.",
            },
            {
              icon: "🪔",
              title: "Handicrafts & home décor",
              desc: "Fragile, artisan and decorative goods, export-packed to survive the global journey.",
            },
            {
              icon: "🫙",
              title: "Food & packaged goods",
              desc: "Spices, snacks, dry foods and FMCG, shipped with proper export documentation.",
            },
            {
              icon: "⚙️",
              title: "Parts, tools & samples",
              desc: "Components, machinery parts and commercial samples for your buyers overseas.",
            },
            {
              icon: "📦",
              title: "Not on this list?",
              desc: "Send us a photo on WhatsApp. We will confirm if we can ship it, how to pack it and what it costs.",
              tag: "Anything else?",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all"
            >
              {c.tag && (
                <span className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#ff7a00] bg-[#fff5ed] border border-orange-200 px-2.5 py-1 rounded-full">
                  {c.tag}
                </span>
              )}
              <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">
                {c.icon}
              </span>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-4 sm:py-6">
        <div className="bg-[#0f172a] text-white rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              How it works
            </div>
            <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-white leading-tight">
              You run the business. We run the logistics.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[16px] text-slate-300 leading-relaxed">
              No juggling carriers and no customs forms to fill. Send your
              shipment details on WhatsApp and we handle it end to end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 lg:gap-6 relative">
            {[
              {
                n: "1",
                title: "Send your shipment details",
                desc: "WhatsApp what you are sending, the weight and the destination. We reply with a clear quote.",
              },
              {
                n: "2",
                title: "We pick up from your door",
                desc: "Collection from your shop, factory or godown anywhere in North and West India, with pan-India pickup on request.",
              },
              {
                n: "3",
                title: "We pack, ship & clear customs",
                desc: "Export-grade packing plus all documentation and clearance, handled for you across our carrier network.",
              },
              {
                n: "4",
                title: "Delivered & tracked",
                desc: "Door delivery to your buyer abroad with live tracking. Set up recurring pickups for regular orders anytime.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="relative p-4 sm:p-0 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none border border-white/10 sm:border-0"
              >
                <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[18px] sm:text-[20px] grid place-items-center mb-4 sm:mb-5">
                  {s.n}
                </div>
                <h3 className="text-[17px] sm:text-[19px] font-bold text-white mb-1.5 sm:mb-2">
                  {s.title}
                </h3>
                <p className="text-[13.5px] sm:text-[15px] text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. RATE COMPARE HIGHLIGHT BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[#0f172a] text-white p-5 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.25),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-12 items-center">
            <div>
              <h2 className="text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold text-white leading-tight">
                Already paying for shipping? Let&apos;s beat it.
              </h2>
              <p className="mt-2.5 sm:mt-3.5 text-[14px] sm:text-[16px] text-slate-300 leading-relaxed max-w-xl">
                Send us a recent invoice or your typical weight, destination and
                volume. We will come back with a quote and show you the
                difference, with no obligation and no switching hassle.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-3.5">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00]">
                Free rate comparison
              </span>
              <a
                href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20here%20are%20my%20current%20export%20shipping%20details%20to%20compare%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
              >
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                </svg>
                <span>Send my details</span>
              </a>
              <a
                href="tel:+917070506070"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
              >
                Call +91 70 70 50 60 70
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY EXPORTERS SWITCH ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Why exporters switch to Manvi
          </div>
          <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            A logistics partner that protects your margins.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-slate-200 border border-slate-200 rounded-[18px] sm:rounded-[20px] overflow-hidden shadow-sm">
          {[
            {
              n: "01",
              t: "Rates that beat the market",
              d: "Transparent per-kg pricing by weight, destination and transit speed. Share your current bill and we will try to beat it.",
            },
            {
              n: "02",
              t: "Every major carrier, one desk",
              d: "DHL, FedEx, UPS and Aramex under one account. We pick the best route for each shipment.",
            },
            {
              n: "03",
              t: "Customs & paperwork done",
              d: "Commercial invoices, packing lists and clearance handled so your goods never get stuck at the border.",
            },
            {
              n: "04",
              t: "Doorstep pickup, pan-India",
              d: "From your shop, factory or godown across North and West India, with pan-India pickup on request.",
            },
            {
              n: "05",
              t: "Bulk & recurring shipments",
              d: "From a single sample carton to scheduled weekly, monthly and seasonal exports for your regular buyers.",
            },
            {
              n: "06",
              t: "A dedicated point of contact",
              d: "A real logistics specialist on WhatsApp who knows your account and your orders, not a frustrating call center queue.",
            },
          ].map((c) => (
            <div
              key={c.n}
              className="bg-white p-5 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">
                  {c.n}
                </div>
                <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">
                  {c.t}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                  {c.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. WHO IT'S FOR ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-5 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              Built for exporters like you
            </div>
            <h2 className="text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold text-[#0f172a] leading-tight">
              If you are already shipping out of India, this is for you.
            </h2>
            <p className="mt-2 sm:mt-2.5 text-[14px] sm:text-[16px] text-[#555555] leading-relaxed">
              Whatever your product and whatever your consignment volume, we
              have moved similar goods across global borders.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              "Garment & apparel exporters",
              "Utensil & kitchenware exporters",
              "Handicraft & décor exporters",
              "Food & spice exporters",
              "Wholesale traders & suppliers",
              "Online sellers shipping abroad",
              "Manufacturers & sample shippers",
            ].map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 bg-[#f8f9fa] border border-slate-200 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[15px] font-semibold text-[#0f172a] shadow-sm hover:border-[#ff7a00] transition-colors"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff7a00]" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="w-full max-w-[1000px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Questions? Glad you asked
          </div>
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#0f172a] leading-tight">
            What exporters ask us first.
          </h2>
        </div>

        <div className="flex flex-col">
          {[
            {
              q: "Can you beat my current shipping rate?",
              a: "Often, yes. Share a recent invoice or your typical weight, destination and volume, and we will quote and show you the difference with no obligation.",
              defaultOpen: true,
            },
            {
              q: "Do you handle export documentation and customs?",
              a: "Yes. Commercial invoices, packing lists, clearance and all carrier paperwork are handled for you, so your goods keep moving across the border without delays.",
            },
            {
              q: "What is the minimum weight I can ship?",
              a: "Anything from a single parcel or sample to full bulk consignments. WhatsApp your details and we will advise the most cost-effective option.",
            },
            {
              q: "Which countries do you deliver to?",
              a: "Core lanes include the USA, UK, Canada, Australia and Europe, as well as worldwide delivery across 200+ countries through our carrier partners.",
            },
            {
              q: "Can you set up regular, recurring pickups?",
              a: "Yes. Many exporters run scheduled weekly, monthly or seasonal shipments with us tailored to their production and order flow.",
            },
            {
              q: "Where do you pick up from in India?",
              a: "Doorstep pickup is available across Punjab, Delhi NCR, Haryana. Further, with pan-India pickup arranged upon request.",
            },
            {
              q: "What items cannot be shipped?",
              a: "We do not ship hazardous chemicals, currency, precious stones or prohibited goods. If you are ever unsure about an item, send a photo on WhatsApp and we will confirm before booking.",
            },
            {
              q: "How do I get started?",
              a: "Send your shipment details on WhatsApp. You will receive a quote, we will schedule the pickup, and handle packing, customs and international delivery from there.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              open={faq.defaultOpen}
              className="group border-b border-slate-200 py-3.5 sm:py-4 transition-all"
            >
              <summary className="list-none cursor-pointer flex items-center justify-between text-[15.5px] sm:text-[18px] md:text-[19px] font-bold text-[#0f172a] select-none gap-2">
                <span>{faq.q}</span>
                <span className="text-[#ff7a00] font-bold text-[20px] sm:text-[24px] ml-2 shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15.5px] text-[#555555] leading-relaxed pr-2 sm:pr-6">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 pt-4 pb-12 sm:pb-16">
        <div className="rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[radial-gradient(120%_130%_at_15%_0%,#1e293b_0%,#0f172a_60%)] text-white text-center p-6 sm:p-10 lg:p-16 border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Ready when you are
          </div>

          <h2 className="text-[24px] sm:text-[34px] lg:text-[46px] font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Get a quote before your next shipment goes out.
          </h2>

          <p className="mt-3.5 sm:mt-4 text-[16px] sm:text-[19px] md:text-[20px] text-[#ff7a00] italic font-medium">
            &ldquo;Aap export karo, pickup, customs aur delivery hum sambhaal
            lenge.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20a%20shipping%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
            >
              <svg
                className="w-5 h-5 fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
              </svg>
              <span>WhatsApp us your details</span>
            </a>
            <a
              href="tel:+917070506070"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
            >
              Call +91 70 70 50 60 70
            </a>
          </div>

          <p className="mt-4 sm:mt-5 text-[12.5px] sm:text-[14px] text-slate-300">
            Standard doorstep pickup across Punjab, Delhi NCR, Haryana and
            Rajasthan. Gujarat, Mumbai and pan-India available on request.
            Delivered worldwide.
          </p>
        </div>
      </section>
    </div>
  );
}
