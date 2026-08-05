import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { events } = await request.json();
    
    for (const ev of events) {
      await prisma.event.create({
        data: {
          title: ev.title || "Matt Rife: Stay Golden World Tour",
          date: new Date(ev.date),
          time: ev.time || "",
          venue: ev.venue || "",
          city: ev.city || "",
          ticketTypes: {
            create: [
              { name: "Bronze", price: ev.p1 || 49, quantity: 100 },
              { name: "Silver", price: ev.p2 || 99, quantity: 100 },
              { name: "Gold", price: ev.p3 || 149, quantity: 100 },
              { name: "VIP", price: ev.p4 || 199, quantity: 100 },
            ],
          },
        },
      });
    }
    
    return NextResponse.json({ success: true, count: events.length });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}