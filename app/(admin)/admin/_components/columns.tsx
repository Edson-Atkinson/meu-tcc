"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
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
import { $Enums } from "@prisma/client";

import { updateUser } from "../_actions/updateUser";
import { toast } from "sonner";
import { deleteUser } from "../_actions/deleteUser";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserTable = {
  id: string;
  name: string | null;
  email: string | null;
  active: boolean;
  role: $Enums.Role;
  restaurants: { name: string }[];
};

const handleChangeActive = (user: UserTable) => {
  const handleUpdateUser = async (id: string) => {
    try {
      await updateUser(id, {
        active: !user.active,
      });
      toast.success("Usuário alterado com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };
  handleUpdateUser(user.id);
};

const handleDeleteUser = async (user: UserTable) => {
  try {
    await deleteUser(user.id);
  } catch (error) {
    console.log(error);
  } finally {
    toast.success("Usuário deletado com sucesso!");
  }
};
export const columns: ColumnDef<UserTable>[] = [
  {
    id: "Selecione",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "active",
    header: "Ativo",
    id: "Ativo",
  },
  {
    accessorKey: "name",
    id: "Nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Tipo",
    id: "Tipo",
  },
  {
    accessorKey: "email",
    id: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="text-right">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"));
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  {
    accessorFn: (restaurants) =>
      restaurants.restaurants.map((restaurant) => restaurant.name),
    id: "Restaurante",
    header: "Restaurante",
  },
  {
    id: "ações",
    header: "Ações",
    cell: ({ row }) => {
      const id = row.original;
      const [openAlert, setOpenAlert] = useState(false);
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleChangeActive(id)}>
                Ativar / Desativar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Salvar modificações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                Deletar usuário
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={openAlert}>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Você tem quer mesmo deletar esse usuário?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso irá deletar
                  permanentemente a conta e remover todos os seus dados do nosso
                  servidor.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => setOpenAlert(false)}
                  className="border-none "
                >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteUser(id)}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
