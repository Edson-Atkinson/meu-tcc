import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
// import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "Email" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await db.user.findFirst({
            where: { email: credentials.email, password: credentials.password },
            include: { adresses: true, restaurants: true },
          });
          if (!user) throw new Error("User name or password is not correct");
          if (!credentials?.password)
            throw new Error("Please Provide Your Password");

          // const isPasswordCorrect = await bcrypt.compare(
          //   credentials.password,
          //   user.password!,
          // );
          // if (!isPasswordCorrect)
          //   throw new Error("User name or password is not correct");
          const { password, ...userWithoutPass } = user;
          return userWithoutPass as any;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as any;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;

      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
