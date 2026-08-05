import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const tierNames = ["Bronze", "Silver", "Gold", "VIP"];

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const prices = body.prices || [49, 99, 149, 199];
    
    await prisma.ticketType.deleteMany({ where: { eventId: id } });
    
    const event = await prisma.event.update({
      where: { id },
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
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.ticketType.deleteMany({ where: { eventId: id } });
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}