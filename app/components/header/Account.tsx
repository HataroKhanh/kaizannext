"use client";
import { signIn } from "next-auth/react";
export default function Account() {
  return (
    <button onClick={() => signIn("github")} className="text-white">
      Test
    </button>
  );
}
