"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import { updateUser } from "../_actions/updateUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
interface AdminPageProps {
  user: Prisma.UserGetPayload<{
    include: {
      restaurants: true;
    };
  }>;
}

const UserItem = ({ user }: AdminPageProps) => {
  const [active, setActive] = useState(user.active);

  const router = useRouter();

  const handleUpdateUser = async (id: string) => {
    try {
      await updateUser(id, {
        active: active,
      });
      toast.success("Usuário alterado com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  const handleChangeActive = (value: string) => {
    if (value == "SIM") {
      setActive(true);
      console.log(active);
    } else {
      setActive(false);
      console.log(active);
    }
  };

  const getUserActiveLabel = (value: boolean) => {
    switch (value) {
      case true:
        return "SIM";
      case false:
        return "NÃO";
    }
  };
  return (
    <tr className=" border-b border-muted py-6 text-center">
      <td className="flex items-center justify-center">
        <Select
          onValueChange={() => handleChangeActive(getUserActiveLabel(!active))}
          value={getUserActiveLabel(active)}
        >
          <SelectTrigger className="w-[180px] border-none bg-transparent focus:border-none">
            <SelectValue placeholder={getUserActiveLabel(active)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={getUserActiveLabel(true)}>SIM</SelectItem>
            <SelectItem value={getUserActiveLabel(false)}>NÃO</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.restaurants[0]?.name}</td>
      <td
        className=" flex cursor-pointer justify-center rounded-lg bg-primary p-2 text-white"
        onClick={() => handleUpdateUser(user.id)}
      >
        <span>
          <Check />
        </span>
      </td>
    </tr>
  );
};

export default UserItem;
