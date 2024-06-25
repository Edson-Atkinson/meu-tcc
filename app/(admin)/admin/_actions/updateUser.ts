"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const updateUser = async (id: string, data: Prisma.UserCreateInput) => {
  await db.user.update({
    where: {
      id: id,
    },
    data: data,
  });
};
