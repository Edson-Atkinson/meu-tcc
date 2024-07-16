"use client";
import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { formatCurrency } from "@/app/_helpers/price";
import { Separator } from "@/app/_components/ui/separator";
import { updateStatusOrder } from "../_actions/updateStatusOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      address: true;
      payment: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}
const OrderItem = ({ order }: OrderItemProps) => {
  const [status, setStatus] = useState(order.status);

  const router = useRouter();

  const handleUpdateStatusOrder = async (id: string) => {
    try {
      await updateStatusOrder((id = id), {
        status: status,
        userId: order.userId,
        restaurantId: order.restaurantId,
        deliveryFee: order.deliveryFee,
        deliveryTimeMinutes: order.deliveryTimeMinutes,
        subtotalPrice: order.subtotalPrice,
        totalPrice: order.totalPrice,
        totalDiscounts: order.totalDiscounts,
      });

      toast.success("Status do pedido alterado com sucesso!");
    } catch (error) {
      console.error;
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="my-4 flex w-full flex-col rounded-xl border border-muted shadow-md lg:max-w-[360px]">
      <div className="rounded-t-lg bg-primary p-4 text-sm text-white">
        # {order.id}
      </div>
      <div className="  min-h-[250px] w-full rounded-b-lg  p-4 ">
        <div>
          <Select onValueChange={setStatus} value={status}>
            <SelectTrigger className="w-full border-none outline-none">
              <SelectValue
                placeholder={"Status"}
                id="status"
                defaultValue={order.status}
                className="placeholder:text-black"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
              <SelectItem value="CANCELED">CANCELED</SelectItem>
              <SelectItem value="PREPARING">PREPARING</SelectItem>
              <SelectItem value="DELIVERING">DELIVERING</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-6 flex-1 ">
          {order.products.map((product) => (
            <div key={product.id} className="flex flex-1 items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="block  text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
          <div className="mt-4">
            <div className=" text-muted-foreground">
              <p className="py-2 font-semibold">Endereço de entrega</p>

              <p>
                {" "}
                {order.address?.street}, {order.address?.number}
              </p>
              <p> {order.address?.neighborhood}</p>
              <p>
                {" "}
                {order.address?.city} - {order.address?.state}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <div className=" p-4 text-muted-foreground">
          {order?.payment?.type === "cash" && (
            <>
              <p className="py-2 font-semibold">Pagamento</p>
              <p>Dinheiro</p>
              <div>
                <p>
                  Troco: <span>R$ {order.payment.change}</span>
                </p>
              </div>
            </>
          )}

          {order?.payment?.type === "card" && (
            <div>
              <p className="py-2 font-semibold">Pagamento</p>
              <p>Cartão</p>
            </div>
          )}
        </div>
      </div>
      <Separator />
      <div className=" w-full p-4 ">
        <p className=" font-semibold  text-muted-foreground">
          Total: {formatCurrency(Number(order.totalPrice))}
        </p>
      </div>

      <div className={status === "CONFIRMED" ? "hidden" : "flex px-4 py-2"}>
        <Button className="" onClick={() => handleUpdateStatusOrder(order.id)}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
