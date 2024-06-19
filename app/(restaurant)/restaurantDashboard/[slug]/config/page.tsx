import { db } from "@/app/_lib/prisma";
import React from "react";
import RestaurantInfo from "./_Components/restaurantInfo";

interface RestaurantConfigPageProps {
  params: {
    slug: string;
  };
}

const RestaurantConfigPage = async ({
  params: { slug },
}: RestaurantConfigPageProps) => {
  const restaurantInfo = await db.restaurant.findUnique({
    where: {
      slug,
    },
  });
  return (
    <div className="px-4">
      <RestaurantInfo restaurant={restaurantInfo!} />
    </div>
  );
};

export default RestaurantConfigPage;
