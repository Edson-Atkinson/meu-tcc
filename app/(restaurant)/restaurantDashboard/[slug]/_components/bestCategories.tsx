import { db } from "@/app/_lib/prisma";
import { cn } from "@/app/_lib/utils";
import React from "react";

interface BestCategoriesProps {
  id: string;
}
const BestCategories = async ({ id }: BestCategoriesProps) => {
  // const categories = await db.category.findMany({
  //   where: {
  //     restaurants: {
  //       every: {
  //         id,
  //       },
  //     },
  //   },
  //   include: {
  //     products: {
  //       include: {
  //         category: true,
  //       },
  //     },
  //   },
  // });
  // console.log(categories);
  const categories2 = await db.orderProduct.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
  });

  const orders3 = await db.restaurant.findMany({
    where: {
      id: id,
    },
    include: {
      categories: {
        distinct: ["name"],
        include: {
          products: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  const products = [];
  for (let i = 0; i < categories2.length; i++) {
    for (let j = 0; j < orders3.length; j++) {
      for (let l = 0; l < orders3[j].categories.length; l++) {
        for (let k = 0; k < orders3[j].categories[l].products.length; k++) {
          if (
            categories2[i].productId == orders3[j].categories[l].products[k].id
          ) {
            let element = {
              ...categories2[i],
              categoryName: orders3[j].categories[l].products[k].category.name,
            };
            products.push(element);
          }
        }
      }
    }
  }

  const calcPorcent = (quantity: number): number => {
    if (quantity <= 100) {
      return quantity;
    } else {
      return Number(quantity / 100);
    }
  };
  return (
    <div className="rounded-lg border border-muted p-4">
      <div>
        <h2 className="text-lg font-bold">Categorias mais vendidas</h2>
      </div>
      <div>
        {products.map((product) => (
          <div key={product.productId} className="border-b border-muted py-4">
            <div className="flex items-center justify-between">
              <div>
                <p>{product.categoryName}</p>
              </div>
              <div>
                <p className="font-bold">
                  {calcPorcent(product._sum.quantity!)} %
                </p>
              </div>
            </div>
            <div className="h-4 w-full rounded-3xl border border-muted">
              <div
                className={cn(
                  product._sum.quantity! >= 1 && "w-[10%]",
                  product._sum.quantity! >= 2 && "w-[20%]",
                  product._sum.quantity! >= 3 && "w-[30%]",
                  product._sum.quantity! > 4 && "w-[40%]",
                  product._sum.quantity! >= 5 && "w-[50%]",
                  product._sum.quantity! >= 6 && "w-[60%]",
                  product._sum.quantity! >= 7 && "w-[70%]",
                  product._sum.quantity! >= 8 && "w-[80%]",
                  product._sum.quantity! >= 9 && "w-[90%]",
                  product._sum.quantity! >= 10 && "w-[100%]",
                  `h-4 rounded-3xl bg-primary`,
                )}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestCategories;
