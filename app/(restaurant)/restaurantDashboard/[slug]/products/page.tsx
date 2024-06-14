import { db } from "@/app/_lib/prisma";
import React from "react";
import RestaurantProductItem from "./_components/productItem";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface RestaurantProductPageProps {
  params: {
    slug: string;
  };
}
const RestaurantProductPage = async ({
  params: { slug },
}: RestaurantProductPageProps) => {
  const products = await db.restaurant.findUnique({
    where: {
      slug: slug,
    },
    include: {
      products: {
        include: {
          category: true,
          restaurant: true,
        },
      },
    },
  });
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="py-4 text-2xl font-semibold">
            Produtos do restaurante{" "}
            <span className="text-primary"> {products?.name}</span>
          </h2>
          <Link href={`/restaurantDashboard/${slug}/products/newProduct`}>
            <Button>
              <Plus size={24} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {products?.products.map((item, index) => (
            <RestaurantProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProductPage;
