"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface PaymentResponseData {
  success: boolean;
  data?: {
    respDescription?: string;
    txnID?: string;
    awbNo?: string;
    isSuccess?: boolean;
    [key: string]: unknown;
  };
}

interface PaymentStatusResponse {
  success: boolean;
  data: {
    isSuccess?: boolean;
    [key: string]: unknown;
  };
}

interface PaymentParams {
  responseCode?: string;
  merchantTxnNo?: string;
  [key: string]: string | null | undefined;
}

export default function PaymentRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "success" | "failed" | "error"
  >("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Get all parameters from URL
        const params: PaymentParams = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });

        console.log("[Payment] Response Params:", params);

        // Check if this is a payment response
        if (params.responseCode) {
          // FIX: Add /api prefix
          const response = await fetch(`${API_URL}/api/payment/response`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          });

          const data: PaymentResponseData = await response.json();

          const paymentSucceeded = data.success && data.data?.isSuccess !== false;

          if (paymentSucceeded) {
            setStatus("success");
            setMessage(
              data.data?.respDescription || "Payment completed successfully!",
            );

            setTimeout(() => {
              window.location.assign(
                `/booking-confirmation?txnId=${encodeURIComponent(data.data?.txnID || "")}&status=success&awb=${encodeURIComponent(data.data?.awbNo || "")}&paymentData=${encodeURIComponent(JSON.stringify(data.data || {}))}`,
              );
            }, 3000);
          } else {
            setStatus("failed");
            setMessage(
              data.data?.respDescription || "Payment failed. Please try again.",
            );

            setTimeout(() => {
              window.location.assign(
                `/booking-confirmation?status=failed&paymentData=${encodeURIComponent(JSON.stringify(data.data || {}))}`,
              );
            }, 3000);
          }
        } else {
          // Check if merchantTxnNo is provided
          const merchantTxnNo = searchParams.get("merchantTxnNo");
          if (merchantTxnNo) {
            // FIX: Add /api prefix
            const statusResponse = await fetch(
              `${API_URL}/api/payment/status?merchantTxnNo=${merchantTxnNo}`,
            );
            const statusData: PaymentStatusResponse =
              await statusResponse.json();

            if (statusData.success && statusData.data?.isSuccess) {
              setStatus("success");
              setMessage("Payment confirmed!");
            } else {
              setStatus("failed");
              setMessage("Payment status could not be verified.");
            }

            setTimeout(() => {
              window.location.assign(
                `/booking-confirmation?status=${statusData.data?.isSuccess ? "success" : "failed"}`,
              );
            }, 3000);
          } else {
            setStatus("error");
            setMessage("Invalid payment response received.");
            setTimeout(() => router.push("/book-shipment"), 3000);
          }
        }
      } catch (error) {
        console.error("[Payment] Processing Error:", error);
        setStatus("error");
        setMessage("An error occurred while processing your payment.");
        setTimeout(() => router.push("/book-shipment"), 3000);
      }
    };

    processPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-200/70 text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#f27a1a] animate-spin" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1c1f2e]">
              Processing Payment...
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1c1f2e]">
              Payment Successful!
            </h2>
            <p className="text-gray-500 text-sm mt-2">{message}</p>
            <p className="text-gray-400 text-xs mt-4">
              Redirecting to confirmation...
            </p>
          </>
        )}

        {(status === "failed" || status === "error") && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1c1f2e]">
              Payment {status === "error" ? "Error" : "Failed"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">{message}</p>
            <p className="text-gray-400 text-xs mt-4">
              Redirecting to booking page...
            </p>
          </>
        )}

        {status === "loading" && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f27a1a] animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-[#f27a1a] animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-[#f27a1a] animate-bounce delay-200" />
          </div>
        )}
      </div>
    </div>
  );
}