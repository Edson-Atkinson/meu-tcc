"use server";

import { Prisma } from "@prisma/client";
import { db } from "@/app/_lib/prisma";

export const createProductItem = async (
  id: string,
  data: Prisma.ProductCreateInput,
) => {
  await db.product.create({ data });
};
