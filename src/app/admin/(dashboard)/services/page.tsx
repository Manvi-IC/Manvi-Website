"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Save,
  Check,
  AlertTriangle,
  RefreshCw,
  Power,
  PowerOff,
  Filter,
  Sparkles,
  Info,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ServiceItem {
  service: string;
  network: "DHL" | "FED" | "UPS" | "ARA" | "SELF" | string;
  destinations: string[];
  hasRates?: boolean;
  slabs?: number;
  enabled: boolean;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    service: "EX DEL AUS DIRECT",
    network: "SELF",
    destinations: ["AUSTRALIA"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED DHL DOX",
    network: "DHL",
    destinations: ["AUSTRALIA", "CANADA", "UK", "EUROPE", "INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED DHL NDOX",
    network: "DHL",
    destinations: ["AUSTRALIA", "CANADA", "UK", "EUROPE", "INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED UPS NDOX",
    network: "UPS",
    destinations: ["AUSTRALIA", "CANADA", "UK", "EUROPE", "INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED FEDEX NDOX",
    network: "FED",
    destinations: ["AUSTRALIA", "CANADA", "EUROPE", "INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED FEDEX IP",
    network: "FED",
    destinations: ["INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED LDH UPS",
    network: "UPS",
    destinations: ["AUSTRALIA", "CANADA", "UK", "EUROPE", "INTERNATIONAL"],
    hasRates: false,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED JAL FEDEX SPCL CONT",
    network: "FED",
    destinations: ["AUSTRALIA", "CANADA", "INTERNATIONAL"],
    hasRates: false,
    enabled: true,
  },
  {
    service: "EX DEL CAN YVR DDP",
    network: "SELF",
    destinations: ["CANADA"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL CAN YYZ DDP",
    network: "SELF",
    destinations: ["CANADA"],
    hasRates: false,
    enabled: true,
  },
  {
    service: "EX DEL PRE LHR UK DPD",
    network: "SELF",
    destinations: ["UK"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL VIA LHR FEDEX IE",
    network: "FED",
    destinations: ["UK"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL EUROPE DPD",
    network: "SELF",
    destinations: ["EUROPE"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL ARAMEX-PPX-NDOX",
    network: "ARA",
    destinations: ["INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL ARAMEX-GPX-NDOX",
    network: "ARA",
    destinations: ["INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED UPS DUTY FREE",
    network: "UPS",
    destinations: ["INTERNATIONAL"],
    hasRates: true,
    enabled: true,
  },
  {
    service: "EX DEL BRANDED FEDEX DUTY FREE",
    network: "FED",
    destinations: ["INTERNATIONAL"],
    hasRates: false,
    enabled: true,
  },
];

const NETWORK_LABELS: Record<
  string,
  { name: string; badgeBg: string; badgeBorder: string; badgeText: string; dotColor: string }
> = {
  DHL: {
    name: "DHL Express",
    badgeBg: "bg-amber-500/10",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-500",
    dotColor: "bg-[#D40511]",
  },
  FED: {
    name: "FedEx International",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-400",
    dotColor: "bg-[#4D148C]",
  },
  UPS: {
    name: "UPS Worldwide",
    badgeBg: "bg-yellow-500/10",
    badgeBorder: "border-yellow-500/30",
    badgeText: "text-yellow-500",
    dotColor: "bg-[#FFB500]",
  },
  ARA: {
    name: "Aramex Priority",
    badgeBg: "bg-red-500/10",
    badgeBorder: "border-red-500/30",
    badgeText: "text-red-400",
    dotColor: "bg-[#E31837]",
  },
  SELF: {
    name: "Manvi Direct / DPD",
    badgeBg: "bg-orange-500/10",
    badgeBorder: "border-orange-500/30",
    badgeText: "text-[#f27a1a]",
    dotColor: "bg-[#f27a1a]",
  },
};

const DESTINATION_FLAGS: Record<string, string> = {
  AUSTRALIA: "🇦🇺 Australia",
  CANADA: "🇨🇦 Canada",
  UK: "🇬🇧 UK",
  EUROPE: "🇪🇺 Europe",
  INTERNATIONAL: "🌍 International",
};

export default function ServicesManagementPage() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [disabledServices, setDisabledServices] = useState<string[]>([]);
  const [disabledShopkeeperServices, setDisabledShopkeeperServices] = useState<string[]>([]);
  const [initialDisabled, setInitialDisabled] = useState<string[]>([]);
  const [initialShopkeeperDisabled, setInitialShopkeeperDisabled] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ENABLED" | "DISABLED">("ALL");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      // 1. Fetch site settings to retrieve currently disabled services
      const settingsRes = await fetch("/api/site-settings");
      let currentDisabled: string[] = [];
      let currentShopkeeperDisabled: string[] = [];
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData.success && settingsData.data) {
          currentDisabled = settingsData.data.disabledServices || [];
          currentShopkeeperDisabled = settingsData.data.disabledShopkeeperServices || [];
        }
      }

      // 2. Fetch rates/services for comprehensive service list
      const servicesRes = await fetch(`${API_URL}/rates/services`);
      let loadedServices: ServiceItem[] = [];

      if (servicesRes.ok) {
        const servData = await servicesRes.json();
        if (servData.success && servData.data?.allServices?.length > 0) {
          loadedServices = servData.data.allServices.map((s: any) => ({
            service: s.service,
            network: s.network || "SELF",
            destinations: s.destinations || [],
            hasRates: s.hasRates,
            slabs: s.slabs,
            enabled: !currentDisabled.includes(s.service),
          }));
        }
      }

      if (loadedServices.length === 0) {
        // Fallback to DEFAULT_SERVICES with current disabled state
        loadedServices = DEFAULT_SERVICES.map((s) => ({
          ...s,
          enabled: !currentDisabled.includes(s.service),
        }));
      }

      setServices(loadedServices);
      setDisabledServices(currentDisabled);
      setInitialDisabled(currentDisabled);
      setDisabledShopkeeperServices(currentShopkeeperDisabled);
      setInitialShopkeeperDisabled(currentShopkeeperDisabled);
    } catch (err: any) {
      console.warn("Failed to load services:", err.message);
      showToast("Notice: Using localized services list. Backend might be syncing.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Check if there are unsaved modifications
  const hasUnsavedChanges = useMemo(() => {
    if (disabledServices.length !== initialDisabled.length) return true;
    const setA = new Set(disabledServices);
    if (initialDisabled.some((s) => !setA.has(s))) return true;

    if (disabledShopkeeperServices.length !== initialShopkeeperDisabled.length) return true;
    const setB = new Set(disabledShopkeeperServices);
    if (initialShopkeeperDisabled.some((s) => !setB.has(s))) return true;

    return false;
  }, [disabledServices, initialDisabled, disabledShopkeeperServices, initialShopkeeperDisabled]);

  const toggleService = (serviceName: string, type: 'customer' | 'shopkeeper') => {
    const setState = type === 'customer' ? setDisabledServices : setDisabledShopkeeperServices;
    setState((prev) => {
      const isCurrentlyDisabled = prev.includes(serviceName);
      if (isCurrentlyDisabled) {
        return prev.filter((s) => s !== serviceName);
      } else {
        return [...prev, serviceName];
      }
    });
  };

  const handleEnableAll = () => {
    setDisabledServices([]);
    setDisabledShopkeeperServices([]);
  };

  const handleDisableFiltered = () => {
    const filteredNames = filteredServices.map((s) => s.service);
    setDisabledServices((prev) => Array.from(new Set([...prev, ...filteredNames])));
    setDisabledShopkeeperServices((prev) => Array.from(new Set([...prev, ...filteredNames])));
  };

  const handleResetToSaved = () => {
    setDisabledServices(initialDisabled);
    setDisabledShopkeeperServices(initialShopkeeperDisabled);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const settingsRes = await fetch("/api/site-settings");
      let existingSettings = {};
      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        existingSettings = sData.data || {};
      }

      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...existingSettings,
          disabledServices,
          disabledShopkeeperServices,
        }),
      });

      // Also update dedicated endpoint
      fetch(`${API_URL}/rates/services/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabledServices, disabledShopkeeperServices }),
      }).catch(() => {});

      const data = await res.json();
      if (data.success) {
        setInitialDisabled(disabledServices);
        setInitialShopkeeperDisabled(disabledShopkeeperServices);
        showToast("Service statuses saved! Live quote engine & proposal updated successfully.");
      } else {
        showToast(data.message || "Failed to update service statuses", "error");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      showToast("Error updating service statuses. Please check network connection.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Filtered and searched list
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const isCustomerEnabled = !disabledServices.includes(s.service);
      const isShopkeeperEnabled = !disabledShopkeeperServices.includes(s.service);

      // Status filter
      if (statusFilter === "ENABLED" && !isCustomerEnabled && !isShopkeeperEnabled) return false;
      if (statusFilter === "DISABLED" && isCustomerEnabled && isShopkeeperEnabled) return false;

      // Network filter
      if (selectedNetwork !== "ALL" && s.network !== selectedNetwork) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.service.toLowerCase().includes(q);
        const matchesNetwork = (NETWORK_LABELS[s.network]?.name || s.network)
          .toLowerCase()
          .includes(q);
        const matchesDest = s.destinations.some((d) => d.toLowerCase().includes(q));
        if (!matchesName && !matchesNetwork && !matchesDest) return false;
      }

      return true;
    });
  }, [services, disabledServices, statusFilter, selectedNetwork, searchQuery]);

  // Statistics counts
  const totalCount = services.length;
  const disabledCount = disabledServices.length;
  const enabledCount = Math.max(0, totalCount - disabledCount);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success"
              ? "bg-emerald-950/90 text-emerald-200 border-emerald-800"
              : "bg-red-950/90 text-red-200 border-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0D1527] text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#f27a1a]/15 text-[#f27a1a] rounded-xl border border-[#f27a1a]/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                Courier Service Control
              </h1>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                Enable or disable individual courier services in Get Quote, Proposal Generator, and Public Calculators.
              </p>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={fetchServices}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            title="Refresh service status from server"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={handleResetToSaved}
              disabled={saving}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              hasUnsavedChanges
                ? "bg-[#f27a1a] hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-98 animate-pulse"
                : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-70"
            }`}
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{hasUnsavedChanges ? "Save Status Changes *" : "Saved & Synchronized"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Operational Notice Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950">
            How Service Disabling Works:
          </p>
          <p className="leading-relaxed text-amber-800">
            When a service is toggled <strong>Inactive</strong>, it is immediately excluded from all quote calculations on{" "}
            <strong>Get Quote</strong>, the <strong>Proposal generator</strong>, and public campaign calculators. Customers and sales agents will not see rates or be able to select that carrier service until you re-enable it.
          </p>
        </div>
      </div>

      {/* KPI Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Services
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{totalCount}</span>
            <span className="text-xs text-slate-500 font-medium">Mapped in Routing</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Active (Quoting)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">{enabledCount}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block mb-1">
            Disabled (Hidden)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-red-700">{disabledCount}</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                disabledCount > 0
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {disabledCount > 0 ? "Blocked" : "None"}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#f27a1a] block mb-1">
            Carrier Networks
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">5</span>
            <span className="text-xs text-slate-500 font-medium">DHL, FedEx, UPS, Aramex, Self</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service name or country..."
              className="w-full bg-slate-50 text-slate-900 text-xs pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#f27a1a] focus:ring-1 focus:ring-[#f27a1a]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "ALL"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("ENABLED")}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === "ENABLED"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "text-emerald-700 hover:text-emerald-800"
              }`}
            >
              <span>Enabled</span>
              <span className="text-[10px] opacity-80">({enabledCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("DISABLED")}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === "DISABLED"
                  ? "bg-red-600 text-white shadow-2xs"
                  : "text-red-700 hover:text-red-800"
              }`}
            >
              <span>Disabled</span>
              <span className="text-[10px] opacity-80">({disabledCount})</span>
            </button>
          </div>

          {/* Batch Toggles */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={handleEnableAll}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Enable all courier services"
            >
              <Power className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enable All</span>
            </button>

            <button
              type="button"
              onClick={handleDisableFiltered}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Disable currently filtered services"
            >
              <PowerOff className="w-3.5 h-3.5 text-red-600" />
              <span>Disable Filtered</span>
            </button>
          </div>
        </div>

        {/* Carrier Network Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 text-xs scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Carrier:
          </span>

          <button
            type="button"
            onClick={() => setSelectedNetwork("ALL")}
            className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedNetwork === "ALL"
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            All Carriers
          </button>

          {Object.entries(NETWORK_LABELS).map(([netKey, meta]) => {
            const countForNet = services.filter((s) => s.network === netKey).length;
            const isSelected = selectedNetwork === netKey;
            return (
              <button
                key={netKey}
                type="button"
                onClick={() => setSelectedNetwork(netKey)}
                className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${meta.dotColor}`}></span>
                <span>{meta.name}</span>
                <span className="text-[10px] opacity-70">({countForNet})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Table & Switch List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5 w-44">Carrier Network</th>
                <th className="py-3.5 px-5">Service Name & Identifier</th>
                <th className="py-3.5 px-5">Supported Destinations</th>
                <th className="py-3.5 px-5 text-center">Customer Status</th>
                <th className="py-3.5 px-5 text-center">Shopkeeper Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.map((s) => {
                const isCustomerEnabled = !disabledServices.includes(s.service);
                const isShopkeeperEnabled = !disabledShopkeeperServices.includes(s.service);
                const meta = NETWORK_LABELS[s.network] || {
                  name: s.network,
                  badgeBg: "bg-slate-100",
                  badgeBorder: "border-slate-300",
                  badgeText: "text-slate-800",
                  dotColor: "bg-slate-600",
                };

                return (
                  <tr
                    key={s.service}
                    className={`transition-colors ${
                      isCustomerEnabled || isShopkeeperEnabled ? "hover:bg-slate-50/80 bg-white" : "bg-slate-50/60 opacity-80"
                    }`}
                  >
                    {/* Carrier Network Badge */}
                    <td className="py-3.5 px-5 whitespace-nowrap align-middle">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${meta.dotColor}`}></span>
                        {meta.name}
                      </span>
                    </td>

                    {/* Service Name & Code */}
                    <td className="py-3.5 px-5 align-middle">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-extrabold ${
                            isCustomerEnabled || isShopkeeperEnabled ? "text-slate-900" : "text-slate-500 line-through"
                          }`}
                        >
                          {s.service}
                        </span>
                        {s.hasRates && (
                          <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">
                            Rates Configured
                          </span>
                        )}
                      </div>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Applicable to door-to-door courier quotes & proposals
                      </p>
                    </td>

                    {/* Supported Destinations */}
                    <td className="py-3.5 px-5 align-middle">
                      <div className="flex flex-wrap gap-1 max-w-sm">
                        {s.destinations && s.destinations.length > 0 ? (
                          s.destinations.map((dest) => (
                            <span
                              key={dest}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/80 whitespace-nowrap"
                            >
                              {DESTINATION_FLAGS[dest] || dest}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Global Routing</span>
                        )}
                      </div>
                    </td>

                    {/* Customer Toggle */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap align-middle border-l border-slate-100">
                      <div className="flex flex-col items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleService(s.service, 'customer')}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#f27a1a] focus:ring-offset-2 ${
                            isCustomerEnabled ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                          role="switch"
                          aria-checked={isCustomerEnabled}
                          title={isCustomerEnabled ? "Click to Disable Customer Rates" : "Click to Enable Customer Rates"}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              isCustomerEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className={`text-[10px] font-bold ${isCustomerEnabled ? "text-emerald-600" : "text-red-500"}`}>
                          {isCustomerEnabled ? "Active" : "Disabled"}
                        </span>
                      </div>
                    </td>

                    {/* Shopkeeper Toggle */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap align-middle border-l border-slate-100">
                      <div className="flex flex-col items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleService(s.service, 'shopkeeper')}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#f27a1a] focus:ring-offset-2 ${
                            isShopkeeperEnabled ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                          role="switch"
                          aria-checked={isShopkeeperEnabled}
                          title={isShopkeeperEnabled ? "Click to Disable Shopkeeper Rates" : "Click to Enable Shopkeeper Rates"}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              isShopkeeperEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className={`text-[10px] font-bold ${isShopkeeperEnabled ? "text-emerald-600" : "text-red-500"}`}>
                          {isShopkeeperEnabled ? "Active" : "Disabled"}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <p className="font-bold text-sm text-slate-800">No Services Found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      No services match your search or filter criteria. Try resetting the filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Save Drawer when there are Unsaved Changes */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-bold text-slate-200">
              You have unsaved service changes ({Math.abs(disabledServices.length - initialDisabled.length)} modified)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToSaved}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-[#f27a1a] hover:bg-orange-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-98"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
