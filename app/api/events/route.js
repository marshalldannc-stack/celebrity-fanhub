export async function POST(request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        date: new Date(body.date),
        venue: body.venue || "",
        city: body.city || "",
        ticketTypes: {
          create: [
            { name: "General Admission", price: 49, quantity: 100 },
            { name: "VIP", price: 149, quantity: 50 },
          ],
        },
      },
      include: { ticketTypes: true },
    });
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}