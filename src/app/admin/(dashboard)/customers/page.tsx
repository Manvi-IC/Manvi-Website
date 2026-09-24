"use client";

import { ShieldCheck } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Customer Registration Approval Removed</h1>
        <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
          Customer login and registration approval flows have been disabled. All shipment bookings now use the default account code 1270 and are managed through the normal admin shipment workflow.
        </p>
      </div>
    </div>
  );
}
