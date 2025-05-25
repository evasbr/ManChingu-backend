import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

const users = [
  { username: "eva", email: "eva@gmail.com" },
  { username: "ramadikha", email: "ramadhika@gmail.com" },
  { username: "ivan", email: "ivan@gmail.com" },
  { username: "seno", email: "seno@gmail.com" },
  { username: "ridan", email: "ridan@gmail.com" },
];

async function main() {
  const hashedPassword = await bcrypt.hash(
    "admin12345" + process.env.JWT_SECRET,
    10
  );

  await prisma.$transaction([
    ...genres.map((name) =>
      prisma.genre.create({
        data: { name },
      })
    ),
    ...users.map((user) =>
      prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: hashedPassword,
        },
      })
    ),
  ]);

  console.log("✅ Genres and users seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
