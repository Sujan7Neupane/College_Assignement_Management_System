import bcrypt from "bcrypt";
import prisma from "./client";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const teacherEmail = process.env.TEACHER_EMAIL;
  const teacherPassword = process.env.TEACHER_PASSWORD;

  // Validate environment variables
  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env");
  }

  if (!teacherEmail || !teacherPassword) {
    throw new Error(
      "TEACHER_EMAIL and TEACHER_PASSWORD must be defined in .env",
    );
  }

  // Create Admin
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      password: hashedAdminPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
    create: {
      name: "Admin",
      email: adminEmail,
      password: hashedAdminPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  console.log(`Admin user created: ${admin.email}`);

  // Create Teacher
  const hashedTeacherPassword = await bcrypt.hash(teacherPassword, 10);

  const teacher = await prisma.user.upsert({
    where: {
      email: teacherEmail,
    },
    update: {
      password: hashedTeacherPassword,
      role: "TEACHER",
      status: "ACTIVE",
    },
    create: {
      name: "John Teacher",
      email: teacherEmail,
      password: hashedTeacherPassword,
      role: "TEACHER",
      status: "ACTIVE",
    },
  });

  console.log(`Teacher user created: ${teacher.email}`);

  // Create Dummy Assignments
  const assignments = [
    {
      title: "JavaScript Fundamentals",
      description:
        "Explain variables, data types, functions, and control flow in JavaScript. Provide suitable examples.",
      dueDate: new Date("2026-09-05T23:59:59"),
    },
    {
      title: "React Components and Props",
      description:
        "Create a React application demonstrating reusable components and the use of props.",
      dueDate: new Date("2026-09-12T23:59:59"),
    },
    {
      title: "REST API with Express",
      description:
        "Build a simple REST API using Node.js and Express with CRUD operations.",
      dueDate: new Date("2026-09-20T23:59:59"),
    },
  ];

  for (const assignment of assignments) {
    await prisma.assignment.upsert({
      where: {
        teacherId_title: {
          teacherId: teacher.id,
          title: assignment.title,
        },
      },
      update: {
        description: assignment.description,
        dueDate: assignment.dueDate,
      },
      create: {
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        teacherId: teacher.id,
      },
    });
  }

  console.log(`${assignments.length} assignments seeded`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
