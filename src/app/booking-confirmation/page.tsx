"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Package,
  ArrowRight,
  Home,
  Loader2,
  Truck,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  FileText,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BookingData {
  awbNo?: string;
  Awbno?: string;
  service?: string;
  destination?: string;
  status?: string;
  _id?: string;
  totalAmt?: number;
  amount?: number;
  chargeableWt?: number;
  createdAt?: string;
  paymentDetails?: {
    paymentMode?: string;
    paymentID?: string;
    txnID?: string;
    amount?: number;
  };
  [key: string]: any;
}

interface PaymentResponseData {
  success: boolean;
  data: {
    responseCode: string;
    respDescription: string;
    merchantTxnNo: string;
    txnID: string;
    paymentID: string;
    paymentMode: string;
    amount: number;
    isSuccess: boolean;
    shipmentId?: string;
    awbNo?: string;
    authCode?: string;
  };
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "failed" | "error" | "unknown">("loading");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentResponseData["data"] | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const statusParam = searchParams.get("status");
        const txnId = searchParams.get("txnId");
        const awb = searchParams.get("awb");
        const paymentDataParam = searchParams.get("paymentData");

        // If we have payment data in URL params (from the payment response)
        if (paymentDataParam) {
          try {
            const parsedData: PaymentResponseData["data"] = JSON.parse(decodeURIComponent(paymentDataParam));
            setPaymentData(parsedData);
            setStatus(parsedData.isSuccess ? "success" : "failed");
            
            if (parsedData.isSuccess) {
              // Fetch shipment details by AWB if available
              if (parsedData.awbNo) {
                const response = await fetch(`${API_URL}/shipment/tracking/${parsedData.awbNo}`);
                if (response.ok) {
                  const data = await response.json();
                  setBookingData(data.Data || data);
                }
              }
            }
            return;
          } catch (e) {
            console.error("Failed to parse payment data:", e);
          }
        }

        if (statusParam === "success") {
          setStatus("success");
          
          if (awb) {
            // Fetch booking details by AWB
            const response = await fetch(`${API_URL}/shipment/tracking/${awb}`);
            if (response.ok) {
              const data = await response.json();
              setBookingData(data.Data || data);
            }
          } else if (txnId) {
            // Fetch by transaction ID
            const response = await fetch(
              `${API_URL}/api/payment/status?merchantTxnNo=${txnId}`
            );
            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                // Try to find shipment by merchantTxnNo or txnID
                const shipmentRes = await fetch(
                  `${API_URL}/admin/shipments?q=${data.data.merchantTxnNo || data.data.txnID}`
                );
                if (shipmentRes.ok) {
                  const shipmentData = await shipmentRes.json();
                  if (shipmentData.data && shipmentData.data.length > 0) {
                    setBookingData(shipmentData.data[0]);
                  }
                }
              }
            }
          }
        } else if (statusParam === "failed") {
          setStatus("failed");
          setError("Payment was not completed. Please try again.");
        } else {
          setStatus("unknown");
          setError("Unknown payment status received.");
        }
      } catch (err) {
        console.error("[Confirmation] Error:", err);
        setStatus("error");
        setError("Failed to fetch booking details.");
      }
    };

    fetchBookingDetails();
  }, [searchParams]);

  const getAwb = (): string => {
    return bookingData?.awbNo || bookingData?.Awbno || paymentData?.awbNo || "";
  };

  const getAmount = (): number => {
    return bookingData?.totalAmt || bookingData?.amount || paymentData?.amount || 0;
  };

  const getPaymentMode = (): string => {
    return paymentData?.paymentMode || bookingData?.paymentDetails?.paymentMode || "N/A";
  };

  const getPaymentId = (): string => {
    return paymentData?.paymentID || bookingData?.paymentDetails?.paymentID || "N/A";
  };

  const getTransactionId = (): string => {
    return paymentData?.txnID || bookingData?.paymentDetails?.txnID || "N/A";
  };

  const getShipmentStatus = (): string => {
    return bookingData?.status || "CONFIRMED";
  };

  const getDestination = (): string => {
    return bookingData?.destination || "N/A";
  };

  const getService = (): string => {
    return bookingData?.service || "N/A";
  };

  const getChargeableWeight = (): string => {
    return bookingData?.chargeableWt?.toString() || "N/A";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full">
        {/* Status Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200/70 p-8 sm:p-12 text-center">
          {status === "loading" && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-50 border-4 border-orange-200 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#f27a1a] animate-spin" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1c1f2e]">
                Loading Confirmation...
              </h2>
              <p className="text-gray-500 mt-2">Please wait a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              {/* Success Icon */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>

              {/* Success Message */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1f2e]">
                🎉 Booking Confirmed!
              </h2>
              <p className="text-gray-500 mt-2">
                Your shipment has been booked successfully.
              </p>

              {/* AWB Number - Highlighted */}
              {getAwb() && (
                <div className="mt-6 p-4 bg-[#f27a1a]/10 border-2 border-[#f27a1a] rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-[#f27a1a]" />
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        AWB Number
                      </p>
                      <p className="font-mono font-extrabold text-lg text-[#1c1f2e]">
                        {getAwb()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(getAwb())}
                    className="p-2 hover:bg-[#f27a1a]/20 rounded-xl transition-colors"
                    title="Copy AWB"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400 hover:text-[#f27a1a]" />
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Payment Details Section */}
        {(status === "success" && paymentData) && (
          <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-200/70 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <CreditCard className="w-5 h-5 text-[#f27a1a]" />
              <h3 className="text-base font-extrabold text-[#1c1f2e]">
                Payment Details
              </h3>
              <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                ✓ Paid
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </p>
                <p className="font-mono text-sm font-medium text-[#1c1f2e] truncate">
                  {getTransactionId()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Payment ID
                </p>
                <p className="font-mono text-sm font-medium text-[#1c1f2e] truncate">
                  {getPaymentId()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Payment Mode
                </p>
                <p className="font-semibold text-sm text-[#1c1f2e]">
                  {getPaymentMode()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Amount Paid
                </p>
                <p className="font-extrabold text-sm text-[#f27a1a]">
                  {formatCurrency(getAmount())}
                </p>
              </div>
            </div>

            {paymentData?.authCode && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Auth Code
                </p>
                <p className="font-mono text-sm font-medium text-[#1c1f2e]">
                  {paymentData.authCode}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Shipment Details Section */}
        {(status === "success" && (bookingData || paymentData)) && (
          <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-200/70 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <Truck className="w-5 h-5 text-[#f27a1a]" />
              <h3 className="text-base font-extrabold text-[#1c1f2e]">
                Shipment Details
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  AWB Number
                </p>
                <p className="font-mono font-bold text-sm text-[#f27a1a]">
                  {getAwb()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Service
                </p>
                <p className="font-medium text-sm text-[#1c1f2e]">
                  {getService()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Destination
                </p>
                <p className="font-medium text-sm text-[#1c1f2e]">
                  {getDestination()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </p>
                <p className="font-semibold text-sm text-emerald-600">
                  {getShipmentStatus()}
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Chargeable Weight
                </p>
                <p className="font-medium text-sm text-[#1c1f2e]">
                  {getChargeableWeight()} KG
                </p>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Booked On
                </p>
                <p className="font-medium text-sm text-[#1c1f2e]">
                  {formatDate(bookingData?.createdAt)}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mt-6 p-4 bg-[#f8f9fa] rounded-2xl border border-gray-200">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                Tracking Status
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-[#1c1f2e]">Booked</span>
                </div>
                <div className="flex-1 h-0.5 bg-emerald-300 mx-2" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <span className="text-xs font-medium text-gray-400">In Transit</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <span className="text-xs font-medium text-gray-400">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {status === "success" && (
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/track?awb=${getAwb()}`}
              className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" /> Track Shipment
            </Link>
            <Link
              href="/book-shipment"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" /> Book Another
            </Link>
            <Link
              href="/"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
          </div>
        )}

        {/* Failed/Error States */}
        {(status === "failed" || status === "error" || status === "unknown") && (
          <>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200/70 p-8 sm:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 border-4 border-red-200 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1c1f2e]">
                Payment {status === "error" ? "Error" : "Not Completed"}
              </h2>
              <p className="text-gray-500 mt-2">{error}</p>

              {paymentData && (
                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200 text-left">
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    Error Details
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {paymentData.respDescription || "Transaction failed"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    Code: {paymentData.responseCode}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book-shipment"
                className="bg-[#f27a1a] hover:bg-[#db660c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" /> Try Again
              </Link>
              <Link
                href="/"
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}