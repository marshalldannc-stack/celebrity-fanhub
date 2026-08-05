import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const tierNames = ["Bronze", "Silver", "Gold", "VIP"];

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
    const prices = body.prices || [49, 99, 149, 199];
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description || "",
        date: new Date(body.date),
        time: body.time || "",
        venue: body.venue || "",
        city: body.city || "",
        image: body.image || null,
        ticketTypes: {
          create: prices.map((price, i) => ({
            name: tierNames[i],
            price: Number(price),
            quantity: 100,
          })),
        },
      },
      include: { ticketTypes: true },
    });
    return NextResponse.json(event);
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}