"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Account() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-gray-950">Loading...</div>;
  }

  return (
    <>
      {!session ? (
        <button className="text-gray-950">
          <Link href="/login">Login</Link>
        </button>
      ) : (
        <>
          <div className="text-gray-950 ">{session.user?.name || "User"}</div>
          <button onClick={()=>signOut()} className="cursor-pointer">Logout</button>
        </>
      )}
    </>
  );
}
