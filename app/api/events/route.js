import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({ include: { ticketTypes: true }, orderBy: { date: "asc" } });
  return NextResponse.json(events);
}