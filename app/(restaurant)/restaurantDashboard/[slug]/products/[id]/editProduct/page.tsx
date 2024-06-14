import { db } from "@/app/_lib/prisma";
import React from "react";
import EditItem from "./_components/editItem";

interface EditProductPageProps {
  params: {
    id: string;
    slug: string;
  };
}
const EditProductPage = async ({
  params: { id, slug },
}: EditProductPageProps) => {
  const product = await db.product.findFirst({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  const restaurantCategory = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      categories: true,
    },
  });

  return (
    <div className="w-full px-4">
      <div className="py-4 text-lg font-semibold">
        <h2>Editar produto{product?.name}</h2>
      </div>
      <div>
        <EditItem restaurant={restaurantCategory!} product={product!} />
      </div>
    </div>
  );
};

export default EditProductPage;
