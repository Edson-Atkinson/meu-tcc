"use client";

import Image from "next/image";
import React, { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

const SearchDesktop = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <div className="relative  flex h-[500px] w-full gap-4 bg-primary">
      <div className="ml-20 flex h-[210px] flex-col gap-8 pt-[100px] lg:w-[550px] xl:w-[750px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-bold text-white">Está com fome?</h2>
          <p className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveies perto de
            você.
          </p>
        </div>
        <form
          className="flex gap-2 rounded-lg bg-white p-4 "
          onSubmit={handleSearchSubmit}
        >
          <Input
            placeholder="Buscar restaurantes"
            className="border-none"
            onChange={handleChange}
            value={search}
          />

          <Button size="icon" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </div>
      <div className="absolute bottom-0 right-20 block h-[300px] max-h-[250px] w-[300px] max-w-[300px] rounded-full shadow-xl">
        <Image
          src="/image-base.png"
          fill
          alt="Prato Feito"
          className="object-fit  relative"
        />
      </div>
    </div>
  );
};

export default SearchDesktop;
