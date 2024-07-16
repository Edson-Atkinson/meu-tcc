"use client";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCategoryItem } from "../_action/createCategoryItem";

type RestaurantProps = {
  restaurantSlug: string;
};
const NewCategoryItem = ({ restaurantSlug }: RestaurantProps) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleAddCategory = async ({ restaurantSlug }: RestaurantProps) => {
    try {
      await createCategoryItem(restaurantSlug, {
        name: name,
        imageUrl: image,
        restaurants: {
          connect: { slug: restaurantSlug },
        },
      });
      setName("");
      setImage("");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDialogOpen(false);
      toast.success("Categoria criada com sucesso!");
    }
  };
  return (
    <div className="px-4">
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild>
          <Button className="" onClick={() => setDialogOpen(true)}>
            <Plus size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent className="px-4 ">
          <DialogHeader>
            <DialogTitle>Adicionar nova categoria</DialogTitle>
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
                onClick={() => setDialogOpen(false)}
              >
                Fechar
              </Button>
            </DialogClose>
            <Button onClick={() => handleAddCategory({ restaurantSlug })}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewCategoryItem;
