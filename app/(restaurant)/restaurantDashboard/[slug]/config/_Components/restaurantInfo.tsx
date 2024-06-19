"use client";
import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { updateRestaurantInfo } from "../_actions/updateRestaurantInfo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RestaurantInfoProps {
  restaurant: Prisma.RestaurantGetPayload<{}>;
}
const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const router = useRouter();
  const [name, setName] = useState(restaurant.name);
  const [image, setImage] = useState(restaurant.imageUrl);
  const [slug] = useState(restaurant.slug);
  const [description, setDescription] = useState(restaurant.description);
  const [deliveryFee, setDeliveryFee] = useState(
    Number(restaurant.deliveryFee),
  );
  const [deliveryMinutes, setDeliveryMinutes] = useState(
    restaurant.deliveryTimeMinutes,
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [alertEditDialog, setAlertEditDialog] = useState(false);

  const handleEditConfirmation = () => {
    setAlertEditDialog(false);
    setEditDialogOpen(true);
  };

  const handleUpdateInfo = async (id: string) => {
    try {
      await updateRestaurantInfo((id = id), {
        name: name,
        slug: slug,
        imageUrl: image,
        description: description,
        deliveryFee: deliveryFee,
        deliveryTimeMinutes: deliveryMinutes,
      });
      setEditDialogOpen(false);
      toast.success("Dados alterados com sucesso!");
    } catch (error) {
      console.error;
    } finally {
      router.refresh();
    }
  };
  return (
    <>
      <div>
        <h2 className="pt-4 text-2xl font-semibold">
          {" "}
          Informações do Estabelecimento
        </h2>
        <div className="mt-4">
          <div className="border-b py-4 ">
            <label htmlFor="name" className="font-bold">
              Nome:{" "}
            </label>
            <span id="name">{restaurant.name}</span>
          </div>
          <div className="border-b py-4 ">
            <label htmlFor="image" className="font-bold">
              Imagem:
            </label>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              width={150}
              height={150}
              className="h-[150px] w-[300px]"
            />
          </div>
          <div className="border-b py-4 ">
            <label htmlFor="description" className="font-bold">
              Descrição do estabelecimento:
            </label>
            <p id="description" className="mt-2">
              {restaurant.description}
            </p>
          </div>

          <p className="border-b py-4 ">
            <label htmlFor="deliveryfee" className="font-bold">
              Taxa de entrega:
            </label>
            <span id="deliveryfee">
              {" "}
              {formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </p>
          <p className="border-b py-4 ">
            <label htmlFor="deliverytTime" className="font-bold">
              Tempo de entrega:
            </label>
            <span id="deliveryTime">
              {" "}
              {restaurant.deliveryTimeMinutes} minutos
            </span>
          </p>
        </div>
        <Button
          className="my-2 w-full md:w-fit"
          onClick={() => setAlertEditDialog(true)}
        >
          Alterar dados
        </Button>
      </div>
      <Dialog open={editDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="mt-4">Alterar dados</DialogTitle>
          </DialogHeader>
          <div>
            <label htmlFor="name">Nome:</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-none bg-gray-200 outline-none"
            />
          </div>
          <div>
            <label htmlFor="iamgeUrl">Imagem:</label>
            <Input
              type="url"
              id="imageUrl"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border-none bg-gray-200 outline-none"
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none border-none bg-gray-200 outline-none"
            />
          </div>
          <div>
            <label htmlFor="deliveryFee">Taxa de entrega:</label>
            <Input
              type="number"
              id="deliveryFee"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
              className="border-none bg-gray-200 outline-none"
            />
          </div>
          <div>
            <label htmlFor="deliveryTime">Tempo de entrega:</label>
            <Input
              type="number"
              id="deliveryTime"
              value={deliveryMinutes}
              onChange={(e) => setDeliveryMinutes(Number(e.target.value))}
              className="border-none bg-gray-200 outline-none"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button onClick={() => handleUpdateInfo(restaurant.id)}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={alertEditDialog}>
        <AlertDialogContent className="w-[90%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja mesmo editar as informações desse estabelecimento?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Essa ação ocorrerá em mudanças
              nos dados do estabelecimento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setAlertEditDialog(false)}
              className="border-none outline-none "
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleEditConfirmation()}>
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RestaurantInfo;
