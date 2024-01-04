import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ]
};

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }