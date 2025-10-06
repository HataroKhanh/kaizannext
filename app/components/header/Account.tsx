"use client";
import { useSession, signIn } from "next-auth/react";

export default function Account() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div className="text-gray-950">Loading...</div>;
  }
  
  return (
    <>
      {!session ? (
        <button onClick={() => signIn("github")} className="text-gray-950">
          Login
        </button>
      ) : (
        <div className="text-gray-950">
          {session.user?.name || "User"}
        </div>
      )}
    </>
  );
}
