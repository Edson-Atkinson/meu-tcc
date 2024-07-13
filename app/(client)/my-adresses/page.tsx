import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../../_lib/prisma";
import AddressItem from "./_components/address-item";
import Header from "../../_components/header";
import { Button } from "../../_components/ui/button";
import Link from "next/link";

const MyAdressesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userAdresses = await db.address.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div>
      <div className="mb-6 lg:hidden">
        <Header />
      </div>
      <div className="mb-6 hidden lg:block">
        <Header isInput />
      </div>

      <div className="flex min-h-[500px] w-full flex-col p-4 md:m-auto md:max-w-[500px] md:rounded-lg md:border md:border-muted">
        <h2 className="text-base font-bold md:text-lg">Meus endereços</h2>
        {userAdresses.length > 0 ? (
          <div className="flex-1">
            {userAdresses.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </div>
        ) : (
          <h3 className="my-4 flex-1 font-medium">
            Você não possuí nenhum endereço cadastrado. Aproveite e cadastre um
            agora!
          </h3>
        )}

        <div>
          <Link href="/my-adresses/new-address">
            <Button className="my-4 w-full bg-primary text-white md:w-fit ">
              Novo endereço
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAdressesPage;
