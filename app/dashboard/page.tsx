import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import TaskList from "@/components/TaskList";
import SignOutButton from "@/components/SignOutButton";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const tasks = await prisma.task.findMany({
    where: { user: { email: session.user?.email ?? '' } },
  });

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Your Tasks</h1>
        <SignOutButton />
      </div>
      <TaskList tasks={tasks} />
      <a href="/tasks/new">
        <button style={{ marginTop: "20px" }}>Create new task</button>
      </a>
    </div>
  );
}
