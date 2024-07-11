import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";
import { SignInForm } from "@/app/_components/auth/signin-form";

import { isLogged } from "@/app/utils";

export const metadata: Metadata = {
  title: "Fazer Login",
  description:
    "Faça login em sua conta para acessar seu painel, gerenciar sua conta e muito mais. Se você não tem uma conta, cadastre-se hoje!",
};

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function SignInPage({ searchParams }: Props) {
  await isLogged(searchParams.callbackUrl as string);

  return (
    <>
      <div className="m-0 flex w-full justify-center lg:h-screen lg:flex-row">
        <div className="relative h-full  border-r  bg-muted lg:w-[60%] ">
          <div className="absolute inset-0 bg-slate-900">
            <Image
              alt="My Delivery - Autenticação"
              src={"/bg-01.png"}
              fill
              style={{ objectFit: "cover" }}
              className="opacity-60 "
            />
          </div>
        </div>
        <div className="relative grid min-h-screen w-auto place-content-center px-4 lg:w-[40%]">
          <div className="absolute right-6 top-6 hidden lg:block">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href="/login/signUp">Cadastre-se</Link>
            </Button>
          </div>
          <div className="w-full max-w-[360px] ">
            <div className="my-6 flex flex-col space-y-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                Faça login em sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com suas informações para realizar o login.
              </p>
            </div>
            <SignInForm callbackUrl={searchParams.callbackUrl} />
          </div>
          <div className="mt-4 text-center lg:hidden">
            <span className="text-sm font-semibold text-muted-foreground">
              ou
            </span>
            <div className="my-4 w-full">
              <Button variant={"secondary"} className="w-full" asChild>
                <Link href="/login/signUp">Cadastre-se</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
