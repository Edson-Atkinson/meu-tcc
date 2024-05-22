"use client";

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { cn } from "@/app/_lib/utils";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
  className?: string;
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
  className,
}: RestaurantImageProps) => {
  const { data } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
    pathName: pathname,
  });

  const handleBackClick = () => router.back();

  return (
    <div className={cn("relative h-[250px] w-full", className)}>
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes="100%"
        className="object-cover lg:rounded-lg"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white lg:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
