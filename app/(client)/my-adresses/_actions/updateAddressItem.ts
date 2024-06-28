"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const updateAddressItem = async (
  id: string,
  data: Prisma.AddressCreateInput,
) => {
  await db.address.update({
    where: {
      id: id,
    },
    data: data,
  });
};
