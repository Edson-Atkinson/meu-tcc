"use client";
import { Address, Prisma } from "@prisma/client";
import React, { useState } from "react";
import { useAppContext } from "../_context/address";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { cn } from "../_lib/utils";

interface AddressAreaProps {
  address: Prisma.AddressGetPayload<{}>;
}

const AddressArea = ({ address }: AddressAreaProps) => {
  const { setShippingAddress } = useAppContext();
  const [select, setSelect] = useState(false);
  const handleAddressSelect = (address: Address) => {
    setShippingAddress(address); //salvar no contexto:
    setSelect(true);
    toast.success("Endereço selecionado.");
  };
  return (
    <>
      <div
        className={cn(
          select && "bg-green-200",
          "mb-2 flex cursor-pointer items-center gap-2 rounded-lg py-2 hover:bg-green-200",
        )}
        onClick={() => handleAddressSelect(address)}
      >
        <div className="text-primary">
          <MapPin size={24} />
        </div>
        <p className="line-clamp-1">
          {address.street}, {address.number} - {address.city} - {address.state}
        </p>
      </div>
    </>
  );
};

export default AddressArea;
