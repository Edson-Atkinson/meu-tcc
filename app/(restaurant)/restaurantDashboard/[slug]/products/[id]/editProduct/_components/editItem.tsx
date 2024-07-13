"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Prisma } from "@prisma/client";
import React, { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProductItem } from "../../../_actions/updateProductItem";
import { revalidatePath } from "next/cache";

interface FormProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { categories: true };
  }>;
  product: Prisma.ProductGetPayload<{
    include: { category: true };
  }>;
}

const EditItem = ({ restaurant, product }: FormProps) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.imageUrl);
  const [price, setPrice] = useState(Number(product.price));
  const [discountPercentage, setDiscountPercentage] = useState(
    Number(product.discountPercentage),
  );
  const [category, setCategory] = useState(product.category.id);

  const router = useRouter();

  const handleUpdateProduct = async (id: string) => {
    try {
      await updateProductItem((id = id), {
        name: name,
        description: description,
        imageUrl: image,
        price: price,
        discountPercentage: discountPercentage,
        category: {
          connect: { id: category },
        },
        restaurant: {
          connect: { slug: restaurant.slug },
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.push(`/restaurantDashboard/${restaurant.slug}/products`);
      router.refresh();
      toast.success("Produto editado com sucesso!");
    }
  };
  const handleClearForm = () => {
    setName("");
    setDescription("");
    setImage("");
    setPrice(0);
    setDiscountPercentage(0);
    setCategory("");
  };

  return (
    <div>
      <div className=" w-full">
        <form
          action=""
          className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 "
        >
          <div>
            <label htmlFor="name">Nome do produto:</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-none outline-none"
            />
          </div>
          <div>
            <label htmlFor="image">Imagem do produto:</label>
            <Input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border-none  outline-none"
            />
          </div>

          <div className="w-full">
            <label htmlFor="price">Preço:</label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border-none  outline-none"
            />
          </div>

          <div>
            <label htmlFor="image">Descrição:</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-none outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="discount">Porcentagem de Desconto:</label>
            <Input
              id="discount"
              type=""
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              className=" border-none  outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="category">Selecione uma categoria:</label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="w-full border-none outline-none">
                <SelectValue
                  placeholder={"categoria"}
                  id="category"
                  defaultValue={category}
                  className="placeholder:text-black"
                />
              </SelectTrigger>
              <SelectContent>
                {restaurant?.categories.map((item) => (
                  <SelectItem value={item.id} key={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <div className="flex justify-start gap-4 py-6">
          <Button onClick={() => handleUpdateProduct(product.id)}>
            Editar
          </Button>
          <Button variant="ghost" onClick={handleClearForm}>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
