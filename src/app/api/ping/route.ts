import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Lightweight endpoint to wake the Render backend from cold sleep.
// Call this before any heavy API operation when the server may be idle.
export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${API_URL}/health`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ success: true, backend: data }, { status: 200 });
  } catch (err: any) {
    const isTimeout = err.name === "AbortError";
    return NextResponse.json(
      {
        success: false,
        waking: isTimeout,
        message: isTimeout
          ? "Backend is waking up — try again in a few seconds"
          : err.message,
      },
      { status: 503 },
    );
  }
}
