import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.paymentRequest.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Save to database
    await prisma.paymentRequest.create({
      data: {
        email: body.email || "guest",
        method: body.method || "unknown",
        amount: body.amount || 0,
        orderId: body.orderId || "",
        event: body.event || "",
        status: body.type === "request" ? "pending" : "completed",
      },
    });

    // Send Telegram notification
    const methodNames = { paypal: "PayPal", cashapp: "Cash App", zelle: "Zelle", venmo: "Venmo", applepay: "Apple Pay", chime: "Chime" };
    const typeText = body.type === "request" ? "🔔 New Payment Request" : "✅ Payment Completed";
    
    const msg = `${typeText}\n\n📧 ${body.email}\n💳 ${methodNames[body.method] || body.method}\n🎫 ${body.event}\n💵 $${body.amount}\n🆔 ${body.orderId}`;
    
    await fetch(`https://api.telegram.org/bot8900352650:AAEV26Bwk6_6KserA0t9l-_8Y9WaVr9QSeY/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: "6566228968", text: msg }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}