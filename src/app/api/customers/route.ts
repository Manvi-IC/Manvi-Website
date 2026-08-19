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
  console.log(`[/api/customers POST] Using API_URL: ${API_URL}`);
  try {
    const body = await request.json();
    const { action } = body;

    const forward = async (path: string, payload: any) => {
      const targetUrl = `${API_URL}${path}`;
      console.log(`[/api/customers POST] Forwarding to: ${targetUrl}`);
      let res: Response;
      try {
        res = await fetch(targetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (fetchErr: any) {
        console.error(`[/api/customers POST] Fetch failed:`, fetchErr.message);
        return NextResponse.json(
          {
            success: false,
            message: `Unable to reach backend server (${fetchErr.message}). Target: ${targetUrl}`,
          },
          { status: 502 },
        );
      }

      let data: any;
      try {
        data = await res.json();
      } catch {
        const text = await res.text().catch(() => "");
        console.error(`[/api/customers POST] Backend returned non-JSON (${res.status}):`, text);
        return NextResponse.json(
          {
            success: false,
            message: `Backend error (${res.status}): ${text.slice(0, 200)}`,
          },
          { status: res.status || 502 },
        );
      }

      console.log(`[/api/customers POST] Backend responded ${res.status}`);
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
    console.error(`[/api/customers POST] Unhandled error:`, error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
