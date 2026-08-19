import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "ALL";
  try {
    const res = await fetch(`${API_URL}/admin/customers?status=${status}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to reach server" },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    const forward = async (path: string, payload: any) => {
      const res = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    };

    if (action === "book_shipment")
      return forward("/portal/create-shipment", body.bookingData || body);

    return NextResponse.json(
      {
        success: false,
        message:
          "Customer login and registration are disabled. Bookings are processed under account 1270.",
      },
      { status: 410 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
