import { Suspense } from "react";
import PaymentRedirect from "@/components/PaymentRedirect";

export const metadata = {
  title: "Payment Processing | Manvi International",
  description: "Processing your payment for shipment booking",
};

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#f27a1a] border-t-transparent animate-spin" />
        </div>
      }
    >
      <PaymentRedirect />
    </Suspense>
  );
}