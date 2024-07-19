"use client";
import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, MapPin } from "lucide-react";
import { Banknote, CreditCard } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "../_context/address";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import AddressArea from "./addressArea";
import { Input } from "./ui/input";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [type, setType] = useState("card" || "cash");
  const [change, setChange] = useState("");

  const { data, status } = useSession();

  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  const { shippingAddress } = useAppContext();
  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    if (!shippingAddress) return toast.error("Escolha um endereço");
    if (!change || change === "")
      return toast.error("Preencha o campo de troco");

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: "CONFIRMED",
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
        address: {
          connect: { id: shippingAddress?.id },
        },
        payment: {
          create: {
            change: change,
            type: type,
          },
        },
      });

      clearCart();
      setIsOpen(false);

      toast.success("Pedido finalizado com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
      router.push("/my-orders");
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className=" mb-7 flex-auto  space-y-4 [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:block ">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>

            <Separator />
            {/* Area de endereços */}
            <h2 className="my-2 text-base font-semibold">
              Endereço de entrega
            </h2>
            {data?.user?.adresses ? (
              <>
                {shippingAddress ? (
                  <>
                    <Collapsible open={collapsibleOpen}>
                      <CollapsibleTrigger
                        onClick={() => setCollapsibleOpen(!collapsibleOpen)}
                      >
                        <div className="mb-2 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg py-2 hover:bg-background">
                          <div className="flex w-full items-center gap-2">
                            <div className="text-primary">
                              <MapPin size={24} />
                            </div>
                            <p className="line-clamp-1">
                              {shippingAddress.street}, {shippingAddress.number}{" "}
                              - {shippingAddress.city} - {shippingAddress.state}
                            </p>
                          </div>

                          <div className="text-primary">
                            <ChevronRight size={24} />
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className=" h-fit border-b border-muted py-2">
                          <div onClick={() => setCollapsibleOpen(false)}>
                            {data?.user.adresses.map((address) => (
                              <AddressArea address={address} key={address.id} />
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </>
                ) : (
                  <>
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-primary">
                              <MapPin />
                            </span>
                            <p className="text-base font-medium">
                              Selecione um endereço
                            </p>
                          </div>
                          <span className="text-primary">
                            <ChevronRight />
                          </span>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="my-2 h-fit rounded-lg border border-muted py-2">
                          <div>
                            {data?.user.adresses.map((address) => (
                              <AddressArea address={address} key={address.id} />
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </>
                )}
              </>
            ) : (
              <p className="py-4 text-sm font-medium">
                Você não tem nenhum endereço cadastrado.
              </p>
            )}

            <Separator />

            <div className="my-4">
              <p className="my-2 text-base font-semibold">
                Metódo de pagamento
              </p>
              <div>
                <div className="flex gap-2 ">
                  <Button
                    variant={"ghost"}
                    onClick={() => setType("cash")}
                    className={`${type === "cash" ? "bg-primary text-white" : "bg-background"} flex items-center gap-2 hover:bg-primary hover:text-white`}
                  >
                    <Banknote /> <span>Dinheiro</span>
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => setType("card")}
                    className={`${type === "card" ? "bg-primary text-white " : "bg-background"} flex items-center gap-2  hover:bg-primary hover:text-white`}
                  >
                    <CreditCard /> <span>Cartão</span>
                  </Button>
                </div>
                {type === "cash" && (
                  <div className="my-4 flex flex-col gap-y-2">
                    <label htmlFor="troco" className="text-sm font-semibold">
                      Troco:
                    </label>
                    <Input
                      type="text"
                      placeholder="0,00"
                      required
                      id="troco"
                      value={change}
                      onChange={(e) => setChange(e.target.value)}
                      maskType="money"
                      className="border-none"
                    />
                  </div>
                )}
              </div>
            </div>
            <Separator />

            {/* TOTAIS */}
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Entrega</span>

                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FINALIZAR PEDIDO */}
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <span className="animate-spin">
                  <Loader2 size={16} />
                </span>
              )}
              Finalizar pedido
            </Button>
          </>
        ) : (
          <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        {status === "authenticated" && (
          <AlertDialogContent className="w-[90%] rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
              <AlertDialogDescription>
                Ao finalizar seu pedido, você concorda com os termos e condições
                da nossa plataforma.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleFinishOrderClick}
                disabled={isSubmitLoading}
              >
                {isSubmitLoading && (
                  <span className="animate-spin">
                    <Loader2 size={16} />
                  </span>
                )}
                Finalizar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}

        {status === "unauthenticated" && (
          <AlertDialogContent className="w-[90%] rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
              <AlertDialogDescription>
                Para finalizar seu pedido primeiro é necessário fazer Login em
                nossa plataforma.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  router.push(`/login/signIn?callbackUrl=${pathName}`)
                }
                disabled={isSubmitLoading}
              >
                {isSubmitLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Fazer Login
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
};

export default Cart;
