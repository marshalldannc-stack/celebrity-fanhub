import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Delete old ticket types and create new ones
    await prisma.ticketType.deleteMany({ where: { eventId: id } });
    
    const event = await prisma.event.update({
      where: { id },
      data: {
        title: body.title,
        date: new Date(body.date),
        venue: body.venue || "",
        city: body.city || "",
        ticketTypes: {
          create: [
            { name: "General Admission", price: body.gaPrice || 49, quantity: 100 },
            { name: "VIP", price: body.vipPrice || 149, quantity: 50 },
          ],
        },
      },
      include: { ticketTypes: true },
    });
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.ticketType.deleteMany({ where: { eventId: id } });
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}