import { db } from "@/app/_lib/prisma";
import React from "react";
import UserItem from "./_components/usersItem";

const AdminPage = async () => {
  const users = await db.user.findMany({
    where: {
      password: { not: null },
    },
    include: {
      restaurants: true,
    },
  });
  return (
    <div>
      <div className="container pt-8">
        <h2 className="mb-4 text-sm font-semibold md:text-lg">
          Página do Administrador
        </h2>
        <table className="w-full">
          <thead className="border-b border-muted text-lg font-semibold">
            <tr className="text-center">
              <td>Ativo</td>
              <td>Nome</td>
              <td>E-mail</td>
              <td>Senha</td>
              <td>Restaurante</td>
              <td>Salvar</td>
            </tr>
          </thead>
          <tbody className="py-4">
            {users.map((user) => (
              <UserItem user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
