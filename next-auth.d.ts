import { $Enums, Prisma, User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Prisma.UserGetPayload<{
      include: { adresses: true; restaurants: true };
    }>;
  }
  interface User {
    isSubscribed: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isSubscribed: boolean;
    user: Prisma.UserGetPayload<{
      include: { adresses: true; restaurants: true };
    }>;
  }
}
