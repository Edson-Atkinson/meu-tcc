"use client";
import { Prisma } from "@prisma/client";
import { EllipsisVertical, MapPin } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { deleteAddressItem } from "../_actions/deleteAddressItem";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { updateAddressItem } from "../_actions/updateAddressItem";

interface AddressItemProps {
  address: Prisma.AddressGetPayload<{}>;
}

const AddressItem = ({ address }: AddressItemProps) => {
  const router = useRouter();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [cep, setCep] = useState(address.cep);
  const [street, setStreet] = useState(address.street);
  const [number, setNumber] = useState(address.number);
  const [city, setCity] = useState(address.city);
  const [neighborhood, setneighborhood] = useState(address.neighborhood);
  const [state, setState] = useState(address.state);
  const [complement, setComplement] = useState(address.complement);

  const handleEditAdrress = () => {
    setSheetOpen(true);
  };

  const handleUpdateAddress = async (id: string) => {
    try {
      await updateAddressItem((id = id), {
        street: street,
        cep: cep,
        number: number,
        neighborhood: neighborhood,
        city: city,
        state: state,
        complement: complement,
      });
      setSheetOpen(false);
      toast.success("Endereço editado com sucesso!");
    } catch (error) {
      console.error;
    } finally {
      router.refresh();
    }
  };

  const handleDeleteAdrress = async (id: string) => {
    try {
      await deleteAddressItem(id);
      router.refresh();
      toast.success("Endereço removido com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-muted py-4">
        <div className="text-primary">
          <MapPin size={24} />
        </div>
        <p className="line-clamp-1">
          {address.street},{address.number} - {address.city} - {address.state}
        </p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 text-muted-foreground outline-none hover:text-primary">
              {" "}
              <EllipsisVertical size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleEditAdrress()}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteAdrress(address.id)}>
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Sheet open={sheetOpen}>
        <SheetTrigger></SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Editar endereço</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1">
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
              <div className="flex gap-2">
                <div>
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
                  value={complement!}
                  onChange={(e) => setComplement(e.target.value)}
                  className="border-none outline-none"
                />
              </div>
            </form>
          </div>
          <SheetFooter>
            <div className=" flex w-full gap-2">
              <Button onClick={() => handleUpdateAddress(address.id)}>
                Salvar
              </Button>
              <Button variant={"ghost"} onClick={() => setSheetOpen(false)}>
                Fechar
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddressItem;
