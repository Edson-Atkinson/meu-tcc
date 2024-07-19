import { db } from "@/app/_lib/prisma";
import React from "react";

import { DataTable } from "./_components/data-table";
import { UserTable, columns } from "./_components/columns";

async function getData(): Promise<UserTable[]> {
  // Fetch data from your API here.
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      role: true,
      restaurants: {
        select: {
          name: true,
        },
      },
    },
  });
  return users;
}

const AdminPage = async () => {
  const data = await getData();

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminPage;
