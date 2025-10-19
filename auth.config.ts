// src/auth.config.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise, { databaseName: "kaizanshop" }),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = creds?.email?.toLowerCase().trim();
        const password = creds?.password ?? "";
        if (!email || !password) return null;

        const db = (await clientPromise).db("kaizanshop");
        const user = await db.collection("user_credentials").findOne(
          { email },
          { projection: { _id: 1, email: 1, name: 1, passwordHash: 1, role: 1 } }
        );
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: String(user._id), email: user.email, name: user.name ?? null, role: user.role ?? "user" } as any;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: { signIn: "/auth/signin", error: "/auth/signin" },

  callbacks: {
    async jwt({ token, user }) {
      // lần đăng nhập mới
      if (user) {
        token.uid = (user as any).id ?? token.uid;
        token.role = (user as any).role ?? token.role ?? "user";
      }
      // nếu thiếu role (OAuth lần đầu) → đọc từ adapter.users
      if (!token.role && token?.email) {
        const db = (await clientPromise).db("kaizanshop");
        const found = await db.collection("users").findOne(
          { email: token.email },
          { projection: { role: 1 } }
        );
        token.role = (found as any)?.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.uid;
        (session.user as any).role = token.role ?? "user";
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};
