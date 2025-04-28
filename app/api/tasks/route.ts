import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// CREATE Task
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();

  const task = await prisma.task.create({
    data: {
      title,
      user: {
        connect: { email: session.user?.email ?? '' }
      }
    }
  });

  return NextResponse.json(task);
}

// UPDATE Task
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title } = await req.json();

  const updated = await prisma.task.update({
    where: { id },
    data: { title },
  });

  return NextResponse.json(updated);
}

// DELETE Task
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted" });
}
