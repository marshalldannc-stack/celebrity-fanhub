import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function notifyTelegram(msg) {
  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: msg,
        parse_mode: "HTML",
      }),
    });
  } catch {}
}

export async function GET() {
  try {
    const requests = await prisma.paymentRequest.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  const body = await request.json();
  try {
    const req = await prisma.paymentRequest.create({
      data: {
        email: body.email || "",
        method: body.method || "",
        amount: body.amount || 0,
        orderId: body.orderId || "",
        event: body.event || "",
        status: "pending",
      },
    });

    const methodNames = {
      paypal: "PayPal", cashapp: "Cash App", zelle: "Zelle",
      venmo: "Venmo", applepay: "Apple Pay", chime: "Chime",
    };

    await notifyTelegram(
      `💰 <b>New Payment Request</b>\n\n` +
      `📧 Email: ${body.email || "Guest"}\n` +
      `💳 Method: ${methodNames[body.method] || body.method}\n` +
      `🎫 Event: ${body.event}\n` +
      `💵 Amount: $${body.amount}\n` +
      `🆔 Order: ${body.orderId}\n\n` +
      `<i>Send payment details to this customer</i>`
    );

    return NextResponse.json(req);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}