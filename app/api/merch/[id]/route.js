import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const item = await prisma.merchItem.update({
      where: { id },
      data: {
        name: body.name,
        price: Number(body.price),
        category: body.category || "",
        description: body.description || "",
        image: body.image || null,
      },
    });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.merchItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}