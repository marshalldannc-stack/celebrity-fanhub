import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: { ticketTypes: true },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description || "",
        date: new Date(body.date),
        venue: body.venue || "",
        city: body.city || "",
        image: body.image || null,
        ticketTypes: {
          create: [
            { name: "General Admission", price: Number(body.gaPrice) || 49, quantity: 100 },
            { name: "VIP", price: Number(body.vipPrice) || 149, quantity: 50 },
          ],
        },
      },
      include: { ticketTypes: true },
    });
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}