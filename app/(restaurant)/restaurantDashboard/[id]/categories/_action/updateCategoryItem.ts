"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const updateCategoryItem = async (
  id: string,
  data: Prisma.CategoryCreateInput,
) => {
  await db.category.update({
    where: {
      id: id,
    },
    data: data,
  });
};
