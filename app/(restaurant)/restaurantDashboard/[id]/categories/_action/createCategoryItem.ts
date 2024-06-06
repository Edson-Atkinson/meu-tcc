"use server";

import { Prisma } from "@prisma/client";
import { db } from "@/app/_lib/prisma";

export const createCategoryItem = async (
  id: string,
  data: Prisma.CategoryCreateInput,
) => {
  await db.category.create({ data });
};
