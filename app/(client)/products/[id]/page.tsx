import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";
import ComplementaryProducts from "./complementary-products";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="hidden lg:block">
        <Header isInput />
      </div>
      <div className="gap-2 lg:mt-[50px] lg:grid lg:h-[500px] lg:grid-cols-2 lg:items-center lg:px-5">
        {/* IMAGEM */}
        <ProductImage product={product} />

        {/* TITULO E PREÇO */}
        <ProductDetails product={product} />
      </div>
      <ComplementaryProducts complementaryProducts={juices} />
    </>
  );
};

export default ProductPage;
