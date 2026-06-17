"use client";

import { useState, useEffect } from "react";
import { Save, Download, Upload, FileSpreadsheet } from "lucide-react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type CountryServiceMap = { country: string; services: string[] };

export default function ServiceMappingPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [mappings, setMappings] = useState<CountryServiceMap[]>([]);
  const [originalSettings, setOriginalSettings] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/site-settings");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success && data.data) {
        setOriginalSettings(data.data);
        setMappings(data.data.countryServiceMapping || []);
      }
    } catch (err) {
      console.warn("Failed to fetch site settings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Service Mapping");

    sheet.columns = [
      { header: "COUNTRY", key: "country", width: 25 },
      { header: "SERVICES (Comma Separated)", key: "services", width: 50 },
    ];

    // Style the header
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0B1220" }, // M5C dark theme color
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Add current mappings as rows, or defaults if none exist
    const rowsToAdd = mappings.length > 0 ? mappings : [
      { country: "Australia", services: ["DHL", "ARAMEX", "UPS", "FEDEX", "SELF - DUTY Paid"] },
      { country: "USA", services: ["DHL", "UPS", "FEDEX"] },
    ];

    rowsToAdd.forEach((m) => {
      sheet.addRow({
        country: m.country,
        services: m.services.join(", "),
      });
    });

    // Style all cells
    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        if (rowNumber > 1) {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }
        cell.border = {
          top: { style: "thin", color: { argb: "FFEEEEEE" } },
          left: { style: "thin", color: { argb: "FFEEEEEE" } },
          bottom: { style: "thin", color: { argb: "FFEEEEEE" } },
          right: { style: "thin", color: { argb: "FFEEEEEE" } },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "Service_Mapping_Template.xlsx");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      const sheet = workbook.worksheets[0];

      const newMappings: CountryServiceMap[] = [];

      let isFirstRow = true;
      sheet.eachRow((row, rowNumber) => {
        if (isFirstRow) {
          isFirstRow = false;
          return; // Skip header
        }

        const country = row.getCell(1).text?.trim();
        const servicesText = row.getCell(2).text?.trim();

        if (country) {
          const services = servicesText ? servicesText.split(",").map(s => s.trim()).filter(s => s) : [];
          newMappings.push({ country, services });
        }
      });

      setMappings(newMappings);
      setMessage({ type: "success", text: `Successfully parsed ${newMappings.length} countries from Excel. Click "Save Changes" to apply.` });
    } catch (err) {
      console.error("Excel parse error", err);
      setMessage({ type: "error", text: "Failed to parse the Excel file. Please ensure it matches the template format." });
    }

    // Reset file input
    e.target.value = '';
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const payload = {
        ...originalSettings,
        countryServiceMapping: mappings,
      };

      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Service mappings updated successfully!" });
        setOriginalSettings(payload);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update mappings." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading mappings...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Serviceable Zipcodes Mapping</h1>
          <p className="mt-1 text-sm text-gray-500">
            Map available shipping services to each country.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Download Excel Template
          </button>

          <div className="relative">
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Upload Excel File"
            />
            <button className="flex items-center gap-2 bg-[#0b1220] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#1a2333] text-sm font-medium transition-colors">
              <Upload size={16} />
              Bulk Upload Excel
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4 border-b pb-4">
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <FileSpreadsheet size={20} className="text-[#e77419]" />
              Current Mappings ({mappings.length})
            </div>
            <button
              type="button"
              onClick={() => setMappings(prev => [...prev, { country: "", services: ["DHL"] }])}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              + Add Row
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {mappings.map((mapping, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    value={mapping.country}
                    onChange={(e) => {
                      const newMap = [...mappings];
                      newMap[idx].country = e.target.value;
                      setMappings(newMap);
                    }}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#e77419] focus:border-[#e77419] sm:text-sm"
                    placeholder="e.g. Australia"
                  />
                </div>
                <div className="flex-[2] w-full">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Services (comma separated)</label>
                  <input
                    type="text"
                    value={mapping.services.join(", ")}
                    onChange={(e) => {
                      const newMap = [...mappings];
                      newMap[idx].services = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                      setMappings(newMap);
                    }}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#e77419] focus:border-[#e77419] sm:text-sm"
                    placeholder="e.g. DHL, FEDEX, UPS"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newMap = [...mappings];
                    newMap.splice(idx, 1);
                    setMappings(newMap);
                  }}
                  className="mt-5 text-red-500 hover:text-red-700 p-2 border border-red-200 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  title="Remove row"
                >
                  Remove
                </button>
              </div>
            ))}

            {mappings.length === 0 && (
              <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg">
                <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No mappings configured</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by downloading the template and uploading an Excel file, or add a row manually.</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-[#e77419] border border-transparent rounded-md shadow-sm py-2 px-6 inline-flex justify-center items-center text-sm font-medium text-white hover:bg-[#d06817] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e77419] disabled:opacity-50 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
