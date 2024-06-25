import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import TopSelling from "./_components/TopSelling";
import BestCategories from "./_components/bestCategories";
import ShowQuantitys from "./_components/ShowQuantitys";
import Totals from "./_components/totals";

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
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
      orders: {
        select: {
          status: true,
        },
      },
    },
  });

  const totalVendidos = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      orders: {
        where: {
          status: "COMPLETED",
        },
        select: {
          status: true,
        },
      },
    },
  });

  const user = await db.user.findFirst({
    where: {
      restaurants: {
        some: {
          name: {
            equals: restaurant?.name,
          },
        },
      },
    },
  });
  console.log("usuarios---------" + user);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="w-full px-4 py-4">
      <div>{user?.name}</div>
      <Totals restaurant={restaurant} />
      <ShowQuantitys restaurant={restaurant} totalVendidos={totalVendidos!} />
      <div className="grid grid-cols-2 gap-4">
        <TopSelling id={restaurant.id} />
        <BestCategories id={restaurant.id} />
      </div>
    </div>
  );
};

export default RestaurantControlPage;
