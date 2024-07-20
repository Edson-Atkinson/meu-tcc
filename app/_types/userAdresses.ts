import { Prisma } from "@prisma/client";

export type UserAdresses = {
  adresses: Prisma.AddressGetPayload<{}>[];
};
