import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, orderId } = await request.json();

  try {
    const res = await fetch("https://plisio.net/api/v1/invoices/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.PLISIO_API_KEY,
        order_number: orderId,
        order_name: "FanHub Order",
        source_currency: "USD",
        source_amount: amount,
      }),
    });
    const data = await res.json();
    
    if (data.data?.invoice_url) {
      return NextResponse.json({ invoice_url: data.data.invoice_url });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}