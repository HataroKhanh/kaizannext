// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// ...your adapter if used (avoid in middleware)
import { MongoClient } from "mongodb";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [Google({ clientId: process.env.GOOGLE_ID!, clientSecret: process.env.GOOGLE_SECRET! }), GitHub({
    clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET!
  })],
  session: { strategy: "jwt" },
  callbacks: {
    // When JWT is created/updated, sync role from DB -> token
    async jwt({ token, user, trigger }) {
      if (user?.email || trigger === "update") {
        // look up user role once and store it on the token
        const client = new MongoClient(process.env.MONGODB_URI!);
        await client.connect();
        const db = client.db("kaizanshop");
        const dbUser = await db.collection("users").findOne({ email: token.email });
        await client.close();

        token.role = (dbUser?.role ?? "customer") as "admin"|"seller"|"customer";
        token.permissions = dbUser?.permissions ?? [];
      }
      return token;
    },
    async session({ session, token }) {
      // expose role/permissions to client components
      (session.user as any).role = token.role;
      (session.user as any).permissions = token.permissions;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
