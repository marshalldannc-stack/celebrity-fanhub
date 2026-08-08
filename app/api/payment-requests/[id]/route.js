import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  await prisma.paymentRequest.update({
    where: { id },
    data: { status: body.status },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await prisma.paymentRequest.delete({ where: { id } });
  return NextResponse.json({ success: true });
}