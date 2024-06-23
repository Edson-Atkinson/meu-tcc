import { Prisma } from "@prisma/client";
import { CircleDollarSign, LayoutList, List, Pizza } from "lucide-react";
import React from "react";

interface ShowQuantitysProps {
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

  totalVendidos: Prisma.RestaurantGetPayload<{
    include: {
      orders: {
        where: {
          status: "COMPLETED";
        };
        select: {
          status: true;
        };
      };
    };
  }>;
}

const ShowQuantitys = ({ restaurant, totalVendidos }: ShowQuantitysProps) => {
  return (
    <div className="my-6 grid grid-cols-4 gap-4 ">
      <div className="flex h-[157px] flex-col items-center justify-center rounded-lg border border-muted">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-primary">
            <CircleDollarSign size={24} />
          </span>
          {totalVendidos.orders.length}
        </div>
        <p>Total de Vendidos</p>
      </div>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-lg border border-muted">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-primary">
            {" "}
            <List size={24} />{" "}
          </span>
          {restaurant.orders.length}
        </div>
        <p>Total de Pedidos</p>
      </div>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-lg border border-muted">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-primary">
            {" "}
            <Pizza size={24} />
          </span>
          {restaurant.products.length}
        </div>
        <p>Produtos</p>
      </div>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-lg border border-muted">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-primary">
            <LayoutList size={24} />
          </span>{" "}
          {restaurant.categories.length}
        </div>
        <p>Categorias</p>
      </div>
    </div>
  );
};

export default ShowQuantitys;
