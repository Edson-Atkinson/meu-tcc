import { Prisma } from "@prisma/client";

export type UserRestaurants = {
  restaurants: Prisma.RestaurantGetPayload<{}>[];
};
