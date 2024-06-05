"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteAddressItem = async (id: string) => {
  await db.address.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/my-adresses");
};
