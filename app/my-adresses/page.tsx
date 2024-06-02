import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import AddressItem from "./_components/address-item";
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import Link from "next/link";

const MyAdressesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userAdresses = await db.address.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div>
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="hidden lg:block">
        <Header isInput />
      </div>

      <div className="px-4 pt-5">
        <h2 className="text-lg font-semibold">Meus endereços</h2>
        <div>
          {userAdresses.length > 0 ? (
            userAdresses.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não tem nenhum endereço cadastrado.
            </h3>
          )}
        </div>
        <div>
          <Link href="/my-adresses/new-address">
            <Button className="w-full bg-primary text-white ">
              Novo endereço
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAdressesPage;
