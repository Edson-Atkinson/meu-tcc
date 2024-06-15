"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const updateStatusOrder = async (
  id: string,
  data: Prisma.OrderUncheckedCreateInput,
) => {
  await db.order.update({
    where: {
      id: id,
    },
    data: data,
  });
};
