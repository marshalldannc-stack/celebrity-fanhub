import prisma from "@/lib/prisma";
import EventSearch from "./EventSearch";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function EventsPage() {
  let events = [];
  try {
    events = await prisma.event.findMany({ include: { ticketTypes: true }, orderBy: { date: "asc" } });
  } catch {}

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tour Dates</h1>
      <EventSearch events={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}