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
    
    await prisma.paymentRequest.create({
      data: {
        email: body.email || "guest",
        method: body.method || "unknown",
        amount: body.amount || 0,
        orderId: body.orderId || "",
        event: body.event || "",
        status: "pending",
      },
    });

    // Record referral sale if referral code exists
    if (body.referral) {
      try {
        await prisma.referralCode.updateMany({
          where: { code: body.referral },
          data: { 
            sales: { increment: 1 }, 
            revenue: { increment: body.amount || 0 } 
          },
        });
        await prisma.referralSale.create({
          data: {
            code: body.referral,
            amount: body.amount || 0,
            event: body.event || "",
            email: body.email || "",
          },
        });
      } catch {}
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}