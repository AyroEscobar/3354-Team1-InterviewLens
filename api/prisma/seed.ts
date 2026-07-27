import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Question categories
  const behavioral = await prisma.questionCategory.upsert({
    where: { name: "Behavioral" },
    update: {},
    create: { name: "Behavioral" },
  });
  await prisma.questionCategory.upsert({
    where: { name: "Leadership" },
    update: {},
    create: { name: "Leadership" },
  });

  // Demo admin who owns the seeded questions
  const adminHash = await bcrypt.hash("admin1234", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@interviewlens.app" },
    update: {},
    create: {
      name: "Site Admin",
      email: "admin@interviewlens.app",
      passwordHash: adminHash,
      role: "admin",
      admin: { create: { adminLevel: 1 } },
    },
  });

  // Demo student
  const studentHash = await bcrypt.hash("student1234", 10);
  await prisma.user.upsert({
    where: { email: "student@interviewlens.app" },
    update: {},
    create: {
      name: "Demo Student",
      email: "student@interviewlens.app",
      passwordHash: studentHash,
      role: "student",
      student: { create: { major: "Computer Science", gradYear: 2027 } },
    },
  });

  // Sample behavioral questions
  await prisma.question.createMany({
    data: [
      {
        categoryId: behavioral.id,
        text: "Tell me about a time you resolved a conflict on a team.",
        difficulty: "medium",
        createdById: admin.id,
      },
      {
        categoryId: behavioral.id,
        text: "Describe a project you are proud of and your specific role in it.",
        difficulty: "easy",
        createdById: admin.id,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
