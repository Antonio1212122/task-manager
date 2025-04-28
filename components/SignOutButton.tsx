'use client';
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      style={{
        backgroundColor: "#dc3545",
        color: "white",
        padding: "8px 12px",
        border: "none",
        borderRadius: "6px",
        marginLeft: "10px"
      }}
    >
      Log out
    </button>
  );
}
