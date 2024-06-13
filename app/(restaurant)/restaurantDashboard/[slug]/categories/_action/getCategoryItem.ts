"use server";

import { db } from "@/app/_lib/prisma";

export const getCategoryItem = async (id: string) => {
  await db.category.findUnique({
    where: {
      id: id,
    },
  });
};
