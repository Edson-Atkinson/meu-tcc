import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { UserFavoriteRestaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  userFavoriteRestaurants?: UserFavoriteRestaurant[];
  restaurantId: string;
  restaurantIsFavorited?: boolean;
  pathName: string;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
  pathName,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) {
      return toast(
        "Para fovoritar é necessário primeiro fazer Login.",

        {
          action: {
            label: "Fazer Login",
            onClick: () =>
              router.push(`/api/auth/signin?callbackUrl=${pathName}`),
          },
        },
      );
    }

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado.",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
