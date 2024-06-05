import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";
import React from "react";

interface ComplementaryProductsProps {
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}
const ComplementaryProducts = ({
  complementaryProducts,
}: ComplementaryProductsProps) => {
  return (
    <div className="mt-6 space-y-3">
      <h3 className="px-5 font-semibold">Pedidos Recomendados</h3>
      <ProductList products={complementaryProducts} />
    </div>
  );
};

export default ComplementaryProducts;
