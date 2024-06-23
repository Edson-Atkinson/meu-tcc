import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";

interface TopSellingProps {
  id: string;
}
const TopSelling = async ({ id }: TopSellingProps) => {
  const categories2 = await db.orderProduct.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
  });

  const orders3 = await db.product.findMany({
    where: {
      restaurantId: id,
    },

    include: {
      category: true,
    },
  });

  const products = [];
  for (let i = 0; i < categories2.length; i++) {
    for (let j = 0; j < orders3.length; j++) {
      if (categories2[i].productId == orders3[j].id) {
        let element = {
          ...categories2[i],
          name: orders3[j].name,
          image: orders3[j].imageUrl,
          price: orders3[j].price,
          discount: orders3[j].discountPercentage,
          categoryName: orders3[j].category.name,
        };
        products.push(element);
      }
    }
  }
  return (
    <div className="rounded-lg border  border-muted p-4">
      <h2 className="pb-3 text-lg font-bold">Produtos mais vendidos</h2>

      <div>
        {products.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between"
          >
            <div className="flex gap-2 border-b border-muted py-2">
              <div className="relative h-[85px] w-[85px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="100%"
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
              <div>
                <div className="w-fit rounded-3xl border border-primary px-2 py-[2px] text-xs font-bold text-primary">
                  {product.categoryName}
                </div>
                <div className="truncate">{product.name}</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold">
                    {formatCurrency(
                      Number(product.price) -
                        Number(product.price) * (product.discount / 100),
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="text-sm font-semibold text-muted-foreground line-through">
                      {formatCurrency(Number(product.price))}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {product._sum.quantity} Vendidos
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
