import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function recordReferralSale(email, amount, event) {
  try {
    const code = await prisma.referralCode.findFirst({
      where: { clicks: { gt: 0 } },
      orderBy: { createdAt: "desc" },
    });
    if (code) {
      await prisma.referralCode.update({
        where: { id: code.id },
        data: { sales: { increment: 1 }, revenue: { increment: amount } },
      });
      await prisma.referralSale.create({
        data: { code: code.code, amount, event: event || "", email: email || "" },
      });
    }
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
  try {
    const body = await request.json();
    await prisma.paymentRequest.create({
      data: {
        email: body.email || "guest",
        method: body.method || "unknown",
        amount: body.amount || 0,
        orderId: body.orderId || "",
        event: body.event || "",
        status: body.type === "completed" ? "completed" : "pending",
      },
    });

    if (body.type === "completed") {
      await recordReferralSale(body.email, body.amount, body.event);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}