// this function utilizes next-auth for signin/signout and token/session generation

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from 'next-auth'

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorization started", credentials);

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("No user found with the email");
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          console.log("Password is incorrect");
          return null;
        }
        return { id: user.uid, name: user.uname, email: user.email, role: user.role };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn(fields) {
      console.log("SignIn attempt", fields);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      console.log("JWT callback", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback 1", session);
      session.user = token;
      console.log("Session callback", session);
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };