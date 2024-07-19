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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return (
    <div>
      <div className="w-full px-4">
        <div className="flex items-center justify-between">
          <h2 className="py-4 text-2xl font-semibold">Meus produtos</h2>
          <Link href={`/restaurantDashboard/${slug}/products/newProduct`}>
            <Button>
              <Plus size={24} />
            </Button>
          </Link>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {products?.products.map((item, index) => (
            <RestaurantProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProductPage;
