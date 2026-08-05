const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      { title: "World Tour 2026 - NYC", date: new Date("2026-09-15"), venue: "Madison Square Garden", city: "New York" },
      { title: "World Tour 2026 - LA", date: new Date("2026-09-22"), venue: "Hollywood Bowl", city: "Los Angeles" },
      { title: "World Tour 2026 - Chicago", date: new Date("2026-10-05"), venue: "United Center", city: "Chicago" },
    ],
    skipDuplicates: true,
  });

  await prisma.merchItem.createMany({
    data: [
      { name: "World Tour Hoodie", price: 65, category: "Clothing" },
      { name: "Signed Vinyl", price: 45, category: "Music" },
      { name: "Tour T-Shirt", price: 35, category: "Clothing" },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded!");
}

main();