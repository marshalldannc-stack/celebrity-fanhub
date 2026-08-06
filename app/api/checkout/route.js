import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, orderId } = await request.json();

  try {
    const apiKey = process.env.PLISIO_API_KEY || "VfLghHlS3OtAitmT2KuEbw6HzNWc5735_wl6U8Ym-b8LtCC5n55WAJQrTMwnQe62";
    const url = `https://plisio.net/api/v1/invoices/new?api_key=${apiKey}&order_number=${orderId}&order_name=FanHub+Order&source_currency=USD&source_amount=${amount}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.data?.invoice_url) {
      return NextResponse.json({ invoice_url: data.data.invoice_url });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}