import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.merchItem.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(request) {
  const body = await request.json();
  const item = await prisma.merchItem.create({
    data: {
      name: body.name,
      price: body.price,
      category: body.category || "",
    },
  });
  return NextResponse.json(item);
}