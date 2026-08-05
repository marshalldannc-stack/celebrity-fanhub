import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.merchItem.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const item = await prisma.merchItem.create({
      data: {
        name: body.name,
        price: Number(body.price),
        category: body.category || "",
      },
    });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}