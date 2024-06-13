import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface RestaurantControlPageProps {
  params: {
    slug: string;
  };
}
const RestaurantControlPage = async ({
  params: { slug },
}: RestaurantControlPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <h1>Pagina do restaurante {restaurant.name}</h1>
      <p>{restaurant.description}</p>
    </div>
  );
};

export default RestaurantControlPage;
