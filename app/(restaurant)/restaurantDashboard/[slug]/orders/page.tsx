import { db } from "@/app/_lib/prisma";
import React from "react";
import OrderItem from "./_components/OrderItem";

interface RestaurantOrdersPageProps {
  params: {
    slug: string;
  };
}
const RestaurantOrdersPage = async ({
  params: { slug },
}: RestaurantOrdersPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      orders: {
        include: {
          address: true,
          products: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <div>
        <h2 className="my-2 px-4 text-2xl font-semibold">Meus pedidos</h2>
        <div className="gap-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {restaurant?.orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrdersPage;
