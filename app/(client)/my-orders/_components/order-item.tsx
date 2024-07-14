"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { getRelativeTimeString } from "@/app/_helpers/get-relative-time";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronRightIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Banknote, CreditCard } from "lucide-react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
      address: true;
      payment: true;
    };
  }>;
}

const getOrderStatusLabel = (status: string) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em Transporte";
    case "PREPARING":
      return "Preparando";
  }
};

const getOrderPaymentLabel = (type: string) => {
  switch (type) {
    case "card":
      return "Cartão";
    case "cash":
      return "Dinheiro";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity,
        },
      });
    }

    router.push(`/restaurants/${order.restaurantId}`);
  };

  const relativeTime = getRelativeTimeString(
    new Date(order.createdAt),
    "pt-br",
  );
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div
            className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
          >
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
          <div className="text-sm font-semibold">
            <span>{relativeTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant="link"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link
              href={`/restaurants/${order.restaurantId}`}
              className="hover:text-primary"
            >
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              <MapPin />
            </span>
            <p>{`${order.address?.street}, ${order.address?.number} - ${order.address?.city} - ${order.address?.state}`}</p>
          </div>
        </div>

        <div className="py-3">
          <Separator />
        </div>
        <div className=" text-xs font-medium">
          <div className="flex items-center gap-2 text-muted-foreground">
            {order.payment?.type === "cash" ? <Banknote /> : <CreditCard />}
            {getOrderPaymentLabel(order.payment?.type!)}
          </div>
          <div className="flex gap-2 text-muted-foreground ">
            {order.payment?.type === "cash" && <span>Troco para:</span>}
            {order.payment?.change}
          </div>
        </div>
        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">
            {formatCurrency(Number(order.totalPrice))}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
