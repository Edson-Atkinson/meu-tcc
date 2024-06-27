import { Prisma } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Prisma.UserGetPayload<{
      include: { adresses: true; restaurants: true };
    }>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: Prisma.UserGetPayload<{
      include: { adresses: true; restaurants: true };
    }>;
  }
}
