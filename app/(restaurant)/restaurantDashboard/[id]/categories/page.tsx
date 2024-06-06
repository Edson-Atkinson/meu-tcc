import { db } from "@/app/_lib/prisma";
import React from "react";
import CategoryItem from "./_components/CategoryItem";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import NewCategoryItem from "./_components/NewCategoryItem";

interface CategoryRestaurantPageProps {
  params: {
    id: string;
  };
}
const CategoryRestaurantPage = async ({
  params: { id },
}: CategoryRestaurantPageProps) => {
  const restaurantCategories = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });

  return (
    <div>
      <div>{restaurantCategories?.name}</div>
      <div className="flex items-center justify-between">
        <h2>Categorias</h2>
        <NewCategoryItem restaurantId={id} />
      </div>
      <div className="mt-10 gap-4 lg:grid lg:grid-cols-3">
        {restaurantCategories?.categories.map((item, index) => (
          <CategoryItem category={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryRestaurantPage;
