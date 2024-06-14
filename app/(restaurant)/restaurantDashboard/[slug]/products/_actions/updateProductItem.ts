"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const updateProductItem = async (
  id: string,
  data: Prisma.ProductCreateInput,
) => {
  await db.product.update({
    where: {
      id: id,
    },
    data: data,
  });
};
