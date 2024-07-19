import { db } from "@/app/_lib/prisma";
import React from "react";
import CategoryItem from "./_components/CategoryItem";
import NewCategoryItem from "./_components/NewCategoryItem";

interface CategoryRestaurantPageProps {
  params: {
    slug: string;
  };
}
const CategoryRestaurantPage = async ({
  params: { slug },
}: CategoryRestaurantPageProps) => {
  const restaurantCategories = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="px-4">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-bold">Categorias</h2>
        <NewCategoryItem restaurantSlug={slug} />
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
