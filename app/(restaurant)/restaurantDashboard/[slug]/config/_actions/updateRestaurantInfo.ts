"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const updateRestaurantInfo = async (
  id: string,
  data: Prisma.RestaurantCreateInput,
) => {
  await db.restaurant.update({
    where: {
      id: id,
    },
    data: data,
  });
};
