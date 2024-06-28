import { getServerSession } from "next-auth";
import { db } from "../../_lib/prisma";
import { authOptions } from "../../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../../_components/header";
import RestaurantItem from "../../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
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
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        {userFavoriteRestaurants.length > 0 ? (
          <div className="flex w-full flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))}
          </div>
        ) : (
          <h3 className="font-medium">
            Você ainda não marcou nenhum restaurante como favorito.
          </h3>
        )}
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
