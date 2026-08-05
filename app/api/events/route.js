import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: "asc" } });
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
        date: new Date(body.date),
        venue: body.venue || "",
        city: body.city || "",
      },
    });
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}