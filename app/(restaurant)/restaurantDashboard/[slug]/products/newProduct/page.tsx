import Form from "./_components/form";
import { db } from "@/app/_lib/prisma";

interface NewProductPageProps {
  params: { slug: string };
}

const NewProductPage = async ({ params: { slug } }: NewProductPageProps) => {
  const restaurant = await db.restaurant.findUnique({
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
        <h2>Novo produto</h2>
      </div>
      <div>
        <Form restaurantSlug={slug} categories={restaurant?.categories!} />
      </div>
    </div>
  );
};

export default NewProductPage;
