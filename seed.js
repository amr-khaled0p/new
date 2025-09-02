const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const cu = await db.university.upsert({
    where: { name: "Cairo University" },
    update: {},
    create: { name: "Cairo University" }
  });
  const cuEng = await db.college.create({
    data: { name: "Engineering", universityId: cu.id }
  });
  await db.program.create({
    data: { name: "Computer Engineering", collegeId: cuEng.id }
  });

  const mu = await db.university.upsert({
    where: { name: "Mansoura University" },
    update: {},
    create: { name: "Mansoura University" }
  });
  const muSci = await db.college.create({
    data: { name: "Science", universityId: mu.id }
  });
  await db.program.create({
    data: { name: "Biology", collegeId: muSci.id }
  });

  console.log("Seed done.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await db.$disconnect();
});
