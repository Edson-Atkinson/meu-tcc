"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCategoryItem } from "../_action/deleteCategoryItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { updateCategoryItem } from "../_action/updateCategoryItem";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

interface CategoryListProps {
  category: Prisma.CategoryGetPayload<{}>;
}

const CategoryItem = ({ category }: CategoryListProps) => {
  const [alertDeleteDialog, setAlertDeleteDialog] = useState(false);
  const [alertEditDialog, setAlertEditDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState(category.imageUrl);

  const router = useRouter();
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategoryItem(id);
      setAlertDeleteDialog(false);
      toast.success("Categoria removida com sucesso!");
    } catch (error) {
      console.error;
    } finally {
      router.refresh();
    }
  };

  const handleEditCategory = () => {
    setAlertEditDialog(false);
    setEditDialogOpen(true);
  };

  const handleUpdateCategory = async (id: string) => {
    try {
      await updateCategoryItem((id = id), {
        name: name,
        imageUrl: image,
      });
      setEditDialogOpen(false);
      toast.success("Categoria editada com sucesso!");
    } catch (error) {
      console.error;
    } finally {
      router.refresh();
    }
  };
  return (
    <>
      <div className=" relative flex min-h-[200px] w-full min-w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border border-muted shadow-md">
        <div className="flex flex-col items-center justify-center ">
          <Image
            src={category.imageUrl}
            width={80}
            height={80}
            alt={category.name}
          />
          <p>{category.name}</p>
          {/* <p>{item.createdAt as unknown as String}</p> */}
        </div>
        <div className=" absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg opacity-0 transition-colors hover:bg-slate-500 hover:opacity-100">
          <div className="flex items-center justify-center gap-4 text-white">
            <div
              className="flex flex-col items-center gap-2 rounded-lg p-4 hover:bg-red-700"
              onClick={() => setAlertDeleteDialog(true)}
            >
              <Trash2 size={24} />
              <span> Deletar</span>
            </div>
            <div
              className="flex flex-col items-center gap-2 rounded-lg p-4 hover:bg-yellow-600 "
              onClick={() => setAlertEditDialog(true)}
            >
              <Pencil />
              <span>Editar</span>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={alertDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja mesmo deletar essa categoria?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente
              essa categoria e todos os produtos relacionado a ela.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setAlertDeleteDialog(false)}
              className="border-none outline-none "
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteCategory(category.id)}
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={alertEditDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja mesmo editar essa categoria?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Essa ação ocorrerá em mudanças
              nos dados da categoria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setAlertEditDialog(false)}
              className="border-none outline-none "
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleEditCategory()}>
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Editar categoria</DialogTitle>
          </DialogHeader>
          <div>
            <label htmlFor="name">Nome da categoria:</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-none bg-gray-200 outline-none"
            />
          </div>
          <div>
            <label htmlFor="iamgeUrl">Url da imagem:</label>
            <Input
              type="url"
              id="imageUrl"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
                Fechar
              </Button>
            </DialogClose>
            <Button onClick={() => handleUpdateCategory(category.id)}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryItem;
