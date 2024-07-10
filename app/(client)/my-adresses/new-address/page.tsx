"use client";
import Header from "@/app/_components/header";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { createAddress } from "./_action/create-address";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewAddressPage = () => {
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [city, setCity] = useState("");
  const [neighborhood, setneighborhood] = useState("");
  const [state, setState] = useState("");
  const [complement, setComplement] = useState("");

  const { data } = useSession();

  const router = useRouter();

  const refreshSessionAndReload = async () => {
    await signIn("jwt", { redirect: false });
    router.push(`/my-adresses`);
  };

  const handleAddAdress = async () => {
    if (!data?.user) return;

    try {
      await createAddress({
        cep: cep,
        street: street,
        number: number,
        neighborhood: neighborhood,
        city: city,
        state: state,
        complement: complement,
        user: {
          connect: { id: data.user.id },
        },
      });

      refreshSessionAndReload();
      toast.success("Endereço adicionado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCleanAdress = () => {
    setCep("");
    setStreet("");
    setNumber(0);
    setCity("");
    setState("");
    setComplement("");
  };
  return (
    <div>
      <div>
        <div className="lg:hidden">
          <Header />
        </div>
        <div className="mb-6 hidden lg:block">
          <Header isInput />
        </div>
      </div>
      <div className="flex  flex-col p-4 md:m-auto md:mb-4 md:max-w-[500px] md:rounded-lg md:border md:border-muted">
        <h2 className="pb-2 text-center text-sm font-semibold md:text-lg">
          Novo Endereço
        </h2>
        <form action="" className="mb-4 flex-1 space-y-4">
          <div>
            <label htmlFor="cep">Cep:</label>
            <Input
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="border-none outline-none"
            />
          </div>
          <div className="flex gap-2 ">
            <div className="flex-1">
              <label htmlFor="street">Rua:</label>
              <Input
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="border-none outline-none"
              />
            </div>
            <div>
              <label htmlFor="number">Numero:</label>
              <Input
                id="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="border-none outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="neighborhood">Bairro:</label>
            <Input
              id="neighborhood"
              value={neighborhood}
              onChange={(e) => setneighborhood(e.target.value)}
              className="border-none outline-none"
            />
          </div>
          <div>
            <label htmlFor="city">Cidade:</label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-none outline-none"
            />
          </div>
          <div>
            <label htmlFor="state">Estado:</label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border-none outline-none"
            />
          </div>
          <div>
            <label htmlFor="complement">Complemento:</label>
            <Input
              id="complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="border-none outline-none"
            />
          </div>
        </form>
        <div className="flex gap-2">
          <Button onClick={handleAddAdress} className="w-full md:w-fit ">
            Cadastrar
          </Button>
          <Button
            variant={"ghost"}
            onClick={handleCleanAdress}
            className="w-full md:w-fit "
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewAddressPage;
