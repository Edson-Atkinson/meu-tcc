import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { DollarSign, Landmark } from "lucide-react";
import React from "react";
interface RestaurantProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        orderBy: {
          createdAt: "desc";
        };
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true;
                };
              };
            };
          };
        };
      };
      products: {
        include: {
          restaurant: {
            select: {
              name: true;
            };
          };
        };
      };
      orders: {
        select: {
          status: true;
        };
      };
    };
  }>;
}

const Totals = async ({ restaurant }: RestaurantProps) => {
  const receita = await db.order.groupBy({
    by: ["status"],
    where: {
      restaurantId: restaurant?.id,
      status: "COMPLETED",
    },
    _sum: { totalPrice: true },
  });

  const receitaNow = await db.order.groupBy({
    by: ["status"],
    where: {
      restaurantId: restaurant?.id,
      status: "COMPLETED",
      createdAt: { equals: new Date() },
    },
    _sum: { totalPrice: true },
  });
  console.log(receitaNow);

  //   const totalToday: number[] = receitaNow.map((total) =>
  //     total.totalPrice.toNumber(),
  //   );
  //   const somaReceitaHoje = totalToday.reduce(function (accumulator, value) {
  //     return accumulator + value;
  //   }, 0);
  return (
    <div className=" grid w-full grid-cols-2 items-center justify-between gap-4">
      <div className="flex h-[157px]  flex-col  justify-center gap-2 rounded-lg bg-primary   px-4 text-white">
        <div className="flex items-center gap-2 text-lg">
          <Landmark /> <span>Total de receita</span>
        </div>
        {receita.length > 0 ? (
          <p className="text-2xl font-bold">
            R$ {receita.map((i) => i._sum.totalPrice?.toNumber())}
          </p>
        ) : (
          <p className="text-2xl font-bold">R$ 00,00</p>
        )}
      </div>
      <div className="flex h-[157px] flex-col  justify-center gap-2 rounded-lg bg-primary px-4 text-white">
        <div className="flex items-center gap-2 text-lg">
          <DollarSign /> <span>Receita Hoje</span>
        </div>
        {receitaNow.length > 0 ? (
          <p className="text-2xl font-bold">
            R$ {receitaNow.map((i) => i._sum.totalPrice?.toNumber())}
          </p>
        ) : (
          <p className="text-2xl font-bold">R$ 00,00</p>
        )}
      </div>
    </div>
  );
};

export default Totals;
