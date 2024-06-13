"use client";
import React from "react";
import { LayoutGrid, LayoutList, List, Pizza, Settings } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  const slug = pathname.split("/");
  console.log(slug[2]);

  return (
    <div className="w-full  border-r border-muted  lg:h-screen lg:max-w-[270px]">
      <nav className="">
        <ul className="flex flex-col gap-4 px-4 py-4">
          <Link href={`/restaurantDashboard/${slug[2]}/dashboard`}>
            <li className="flex cursor-pointer items-center gap-2 rounded-3xl p-2 text-lg hover:bg-primary hover:text-white">
              <LayoutGrid size={18} /> Dashboard
            </li>
          </Link>
          <Link href={`/restaurantDashboard/${slug[2]}/products`}>
            <li className="flex cursor-pointer items-center gap-2 rounded-3xl p-2 text-lg hover:bg-primary hover:text-white">
              <Pizza size={18} /> Produtos
            </li>
          </Link>
          <Link href={`/restaurantDashboard/${slug[2]}/orders`}>
            <li className="flex cursor-pointer items-center gap-2 rounded-3xl p-2 text-lg hover:bg-primary hover:text-white">
              <List size={18} /> Pedidos
            </li>
          </Link>
          <Link href={`/restaurantDashboard/${slug[2]}/categories`}>
            <li className="flex cursor-pointer items-center gap-2 rounded-3xl p-2 text-lg hover:bg-primary hover:text-white">
              <LayoutList size={18} />
              Categorias
            </li>
          </Link>
          <Link href={`/restaurantDashboard/${slug[2]}/config`}>
            <li className="flex cursor-pointer items-center gap-2 rounded-3xl p-2 text-lg hover:bg-primary hover:text-white">
              <Settings size={18} />
              Configurações
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
