import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function sendWelcomeEmail(email, name) {
  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_41nqx3i",
        template_id: "template_kt8dpri",
        user_id: "jHdUTNuZpmLt2DbzF",
        template_params: {
          to_email: email,
          reply_text: `Welcome to the FanHub, ${superfan || "fan"}!\n\nYou're now an official member. Get exclusive access to events, merch, and fan cards.\n\nVisit: https://celebrity-fanhub.vercel.app`,
          subject: "Welcome to FanHub!",
        },
      }),
    });
  } catch {}
}

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    
    await prisma.user.create({ data: { email, password, name: name || "" } });
    
    await sendWelcomeEmail(email, name);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}