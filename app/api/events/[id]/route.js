import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
  await prisma.event.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}