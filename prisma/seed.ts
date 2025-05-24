// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const genres = [
  "action",
  "adventure",
  "comedy",
  "cooking",
  "demon",
  "drama",
  "fantasy",
  "fight",
  "game",
  "historical",
  "isekai",
  "magic",
  "martial arts",
  "medical",
  "murim",
  "mystery",
  "psychological",
  "revenge",
  "romance",
  "school life",
  "seinen",
  "shounen",
  "slice of life",
  "sports",
  "supernatural",
  "supranatural",
  "tragedy",
  "violence",
];

async function main() {
  for (const name of genres) {
    await prisma.genre.create({
      data: { name },
    });
  }

  console.log("✅ Genres seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
