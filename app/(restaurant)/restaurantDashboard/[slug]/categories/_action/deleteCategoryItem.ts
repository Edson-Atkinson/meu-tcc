"use server";

import { db } from "@/app/_lib/prisma";

export const deleteCategoryItem = async (id: string) => {
  await db.category.delete({
    where: {
      id: id,
    },
  });
};
