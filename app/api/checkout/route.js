import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, orderId } = await request.json();
  
  try {
    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY || "3HN1BB6-FW3MQ7F-M2AGMJ0-H3CJGF4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        order_id: orderId,
        order_description: "FanHub Order",
      }),
    });
    const data = await res.json();
    return NextResponse.json({ invoice_url: data.invoice_url });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}