"use server";

import { db } from "@/app/_lib/prisma";

export const deleteProductItem = async (id: string) => {
  await db.product.delete({
    where: {
      id: id,
    },
  });
};
