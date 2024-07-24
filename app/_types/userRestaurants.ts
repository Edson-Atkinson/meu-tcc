import { $Enums } from "@prisma/client";

export type UserRestaurants = {
  role: $Enums.Role;
  restaurants: {
    name: string | null;
    slug: string;
  }[];
};
