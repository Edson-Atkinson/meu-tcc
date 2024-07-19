"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  await db.user.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/admin");
};
