"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { FaUserCog } from "react-icons/fa";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MapPin,
  MenuIcon,
  ScrollTextIcon,
  ShoppingBag,
  Store,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Search from "./search";
import { useState } from "react";
import Cart from "./cart";

interface HeaderProps {
  isInput?: boolean;
}

const Header = ({ isInput }: HeaderProps) => {
  const { data } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  const restaurant = data?.user.restaurants[0];

  return (
    <div className="flex h-[80px] items-center justify-between border-b border-[#eeeeee] px-5 py-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>
      {isInput && (
        <div className="w-[600px]">
          <Search />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent hover:bg-primary hover:text-white"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag />
            </Button>
          </SheetTrigger>
          <SheetContent className="h-[100%] w-[100%]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent hover:bg-primary hover:text-white"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <>
                <div className="flex justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={data?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {data?.user?.name?.split(" ")[0][0]}
                        {data?.user?.name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{data?.user?.name}</h3>
                      <span className="block text-xs text-muted-foreground">
                        {data?.user?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pt-10">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" onClick={handleSignInClick}>
                    <LogInIcon />
                  </Button>
                </div>
              </>
            )}
            <div className="py-6">
              <Separator />
            </div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                asChild
              >
                <Link href="/">
                  <HomeIcon size={16} />
                  <span className="block">Início</span>
                </Link>
              </Button>

              {data?.user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                    asChild
                  >
                    <Link href="/my-orders">
                      <ScrollTextIcon size={16} />
                      <span className="block">Meus Pedidos</span>
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                    asChild
                  >
                    <Link href="/my-adresses">
                      <MapPin size={16} />
                      <span className="block">Meus Endereços</span>
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                    asChild
                  >
                    <Link href="/my-favorite-restaurants">
                      <HeartIcon size={16} />
                      <span className="block">Restaurantes Favoritos</span>
                    </Link>
                  </Button>
                </>
              )}
              {data?.user.role === "RESTAURANT" && (
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href={`/restaurantDashboard/${restaurant?.slug}`}>
                    <Store size={16} />
                    <span className="block">Vendedor </span>
                  </Link>
                </Button>
              )}
              {data?.user.role === "ADMIN" && (
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href={`/restaurantDashboard/${restaurant?.slug}`}>
                    <Store size={16} />
                    <span className="block">Vendedor </span>
                  </Link>
                </Button>
              )}
              {data?.user.role === "ADMIN" && (
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href={`/admin`}>
                    <FaUserCog size={16} />
                    <span className="block">Administrador</span>
                  </Link>
                </Button>
              )}
            </div>
            <div className="py-6">
              <Separator />
            </div>
            {data?.user && (
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                onClick={handleSignOutClick}
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
