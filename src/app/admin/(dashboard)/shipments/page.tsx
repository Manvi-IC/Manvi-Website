"use client";

import { AlertCircle, PackageCheck, RefreshCw, Truck } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ShipmentRecord = {
  _id?: string;
  id?: string;
  awbNo?: string;
  awbno?: string;
  Awbno?: string;
  awb?: string;
  accountCode?: string;
  customerName?: string;
  customer?: { name?: string };
  destination?: string;
  receiver?: { receiverCountry?: string; receiverName?: string; receiverCity?: string };
  shipper?: { shipperName?: string };
  status?: string;
  shipmentStatus?: string;
  currentStatus?: string;
  createdAt?: string;
  shipDate?: string;
  totalAmt?: number;
  totalAmount?: number;
  amount?: number;
};

const formatCurrency = (value: number | string | undefined) => {
  const toNum = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(toNum);
};

const getShipmentValue = <T,>(value: T | undefined, fallback: T): T =>
  value ?? fallback;

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<ShipmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchShipments = async () => {
    setLoading(true);
    setError("");

    try {
      const candidateUrls = [
        `${API_URL}/admin/shipments`,
        `${API_URL}/shipment/all`,
        `${API_URL}/admin/orders`,
        `${API_URL}/shipments`,
      ];

      let rows: ShipmentRecord[] = [];

      for (const url of candidateUrls) {
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!res.ok) continue;

          const payload = await res.json();
          const list = Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.data)
              ? payload.data
              : Array.isArray(payload?.shipments)
                ? payload.shipments
                : [];

          if (list.length) {
            rows = list;
            break;
          }
        } catch {
          // Try the next fallback endpoint.
        }
      }

      setShipments(rows);
      if (!rows.length) {
        setError("No shipments found in the database yet.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load shipments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
          <p className="mt-1 text-sm text-gray-500">
            View all shipments currently saved in the database.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchShipments}
          className="inline-flex items-center gap-2 bg-[#e77419] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d06817] transition-colors"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && !loading && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-700">
          <AlertCircle className="h-5 w-5 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <RefreshCw className="h-7 w-7 text-gray-400 mx-auto animate-spin" />
          <p className="mt-3 text-sm text-gray-500">Loading shipments...</p>
        </div>
      ) : shipments.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <Truck className="h-9 w-9 text-gray-400 mx-auto" />
          <p className="mt-3 text-gray-500">No shipment records found.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 min-w-[980px]">
              <thead className="bg-slate-50 text-gray-700 uppercase text-[11px] tracking-wide">
                <tr>
                  <th className="px-4 py-3 font-semibold">AWB</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Destination</th>
                  <th className="px-4 py-3 font-semibold">Account</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Booked</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment, index) => {
                  const awb =
                    shipment.awbNo ||
                    shipment.awbno ||
                    shipment.Awbno ||
                    shipment.awb ||
                    shipment._id ||
                    `SHIP-${index + 1}`;

                  const customerName =
                    shipment.customerName ||
                    shipment.customer?.name ||
                    shipment.shipper?.shipperName ||
                    "Default Account";

                  const destination =
                    shipment.destination ||
                    shipment.receiver?.receiverCountry ||
                    shipment.receiver?.receiverCity ||
                    "N/A";

                  const status =
                    shipment.status ||
                    shipment.shipmentStatus ||
                    shipment.currentStatus ||
                    "Booked";

                  const bookedAt =
                    shipment.createdAt || shipment.shipDate || "N/A";

                  const amount =
                    shipment.totalAmt ?? shipment.totalAmount ?? shipment.amount ?? 0;

                  return (
                    <tr key={`${awb}-${index}`} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <PackageCheck className="h-4 w-4 text-[#e77419]" />
                          <span>{String(awb)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{customerName}</td>
                      <td className="px-4 py-3">{destination}</td>
                      <td className="px-4 py-3">{shipment.accountCode || "1270"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {bookedAt !== "N/A"
                          ? new Date(bookedAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
