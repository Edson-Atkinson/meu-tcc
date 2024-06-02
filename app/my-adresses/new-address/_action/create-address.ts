"use server";

import { Prisma } from "@prisma/client";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const createAddress = async (data: Prisma.AddressCreateInput) => {
  await db.address.create({ data });
  revalidatePath("/my-adresses");
};
