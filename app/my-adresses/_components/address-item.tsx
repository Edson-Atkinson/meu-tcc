"use client";
import { Address } from "@prisma/client";
import { EllipsisVertical, MapPin } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { deleteAddressItem } from "../_actions/deleteAddressItem";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppContext } from "@/app/_context/address";

interface AddressItemProps {
  address: Address;
}

const AddressItem = ({ address }: AddressItemProps) => {
  const router = useRouter();
  const { setShippingAddress } = useAppContext();
  const handleEditAdrress = () => {};
  const handleDeleteAdrress = async (id: string) => {
    try {
      await deleteAddressItem(id);
      router.refresh();
      toast.success("Endereço removido com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setShippingAddress(address); //salvar no contexto:
    toast.success("Endereço selecionado.");
  };
  return (
    <div
      className="flex items-center justify-between border-b border-muted py-4"
      onClick={() => handleAddressSelect(address)}
    >
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
            <DropdownMenuItem onClick={handleEditAdrress}>
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
  );
};

export default AddressItem;
