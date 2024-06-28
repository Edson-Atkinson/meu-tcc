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
import { createProductItem } from "../../_actions/createProductItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormProps {
  restaurantSlug: string;
  categories: Prisma.CategoryGetPayload<{}>[];
}

interface RestaurantProps {
  id: string;
}

const Form = (
  { restaurantSlug, categories }: FormProps,
  { id }: RestaurantProps,
) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [category, setCategory] = useState<string | undefined>("");

  const router = useRouter();

  console.log(category);

  const handleAddProduct = async ({ id }: RestaurantProps) => {
    try {
      await createProductItem(id, {
        name: name,
        description: description,
        imageUrl: image,
        price: price,
        discountPercentage: discountPercentage,
        category: {
          connect: { id: category },
        },
        restaurant: {
          connect: { slug: restaurantSlug },
        },
      });

      router.push(`/restaurantDashboard/${restaurantSlug}/products`);
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("Produto adicionado com sucesso!");
      router.refresh();
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
              <SelectTrigger
                asChild
                className="w-full border-none outline-none"
              >
                <SelectValue placeholder="Categoria" id="category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem value={item.id} key={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <div className="flex justify-start gap-4 py-6">
          <Button onClick={() => handleAddProduct({ id })}>Adicionar</Button>
          <Button variant="ghost" onClick={handleClearForm}>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
