"use client";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ArrowDownIcon, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
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

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProductItem } from "../_actions/deleteProductItem";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: true;
      restaurant: true;
    };
  }>;
}
const RestaurantProductItem = ({ product }: ProductItemProps) => {
  const [alertDeleteDialog, setAlertDeleteDialog] = useState(false);
  const [alertEditDialog, setAlertEditDialog] = useState(false);

  const router = useRouter();
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteProductItem(id);
      setAlertDeleteDialog(false);
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error;
    } finally {
      router.refresh();
    }
  };

  const handleEditProduct = () => {
    setAlertEditDialog(false);
    router.push(
      `/restaurantDashboard/${product.restaurant.slug}/products/${product.id}/editProduct`,
    );
  };
  return (
    <>
      <div>
        <div className="w-full space-y-2">
          <div className="relative aspect-square w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="100%"
              className="rounded-lg object-cover shadow-md"
            />

            {product.discountPercentage && (
              <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
                <ArrowDownIcon size={12} />
                <span className="text-xs font-semibold">
                  {product.discountPercentage}%
                </span>
              </div>
            )}
            <div className=" absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg opacity-0 transition-colors hover:bg-slate-500 hover:opacity-100">
              <div className="flex items-center justify-center gap-2 text-white">
                <div
                  className="flex  items-center gap-2 rounded-lg p-3 hover:bg-red-700"
                  onClick={() => setAlertDeleteDialog(true)}
                >
                  <Trash2 size={32} />
                </div>
                <div
                  className="flex  items-center gap-2 rounded-lg p-3 hover:bg-yellow-600 "
                  onClick={() => setAlertEditDialog(true)}
                >
                  <Pencil size={32} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="truncate text-sm">{product.name}</h2>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h3>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(Number(product.price))}
                </span>
              )}
            </div>
            <span className="block text-xs text-muted-foreground">
              {product.category.name}
            </span>
          </div>
        </div>
      </div>
      <AlertDialog open={alertDeleteDialog}>
        <AlertDialogContent className="w-[96%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja mesmo deletar esse produto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente
              todos os dados relacionados a esse produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setAlertDeleteDialog(false)}
              className="border-none outline-none "
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteCategory(product.id)}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={alertEditDialog}>
        <AlertDialogContent className="w-[96%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja mesmo editar esse produto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Essa ação ocorrerá em mudanças
              nos dados do produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setAlertEditDialog(false)}
              className="border-none outline-none "
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleEditProduct()}>
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RestaurantProductItem;
