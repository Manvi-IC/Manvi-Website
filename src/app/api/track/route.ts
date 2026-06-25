import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const awb = searchParams.get('awb');

  if (!awb) {
    return NextResponse.json({ Status: false, Data: { ErrorMessage: "AWB is required" } }, { status: 400 });
  }

  try {
    const res = await fetch(`http://api.manvicourier.com/api/gettracking/${awb}`, {
        cache: 'no-store'
    });
    const data = await res.json();
    console.log(`[API Proxy] Response for AWB ${awb}:`, JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`[API Proxy] Error fetching AWB ${awb}:`, error);
    return NextResponse.json({ Status: false, Data: { ErrorMessage: error.message } }, { status: 500 });
  }
}
