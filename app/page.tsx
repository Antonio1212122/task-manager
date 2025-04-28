import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="container">
      <h1>Bienvenido al Administrador de Tareas</h1>
      <p>Por favor inicia sesión o regístrate para continuar.</p>
      <div style={{ marginTop: "20px" }}>
        <a href="/login">
          <button style={{ marginRight: "10px" }}>Iniciar sesión</button>
        </a>
        <a href="/register">
          <button>Registrarse</button>
        </a>
      </div>
    </div>
  );
}
