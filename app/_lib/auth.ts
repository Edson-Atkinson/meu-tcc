import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: "/login/signIn",
  },
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          isSubscribed: false,
          restaurants: profile.restaurants,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
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
            where: { email: credentials.email },
            include: { adresses: true, restaurants: true },
          });
          if (!user) throw new Error("email ou senha não estão corretos");
          if (!credentials?.password)
            throw new Error("Por favor forneça sua senha");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password as string,
          );

          if (!isPasswordCorrect)
            throw new Error("email ou senha não estão corretos");

          // if (!user.emailVerified) throw new Error("EmailNotVerified");

          const { password, ...userWithoutPass } = user;
          return userWithoutPass as any;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token as any;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
