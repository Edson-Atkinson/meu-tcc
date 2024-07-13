import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { SignUpForm } from "@/app/_components/auth/signup-form";
import { Button } from "@/app/_components/ui/button";

import { isLogged } from "@/app/utils";

export const metadata: Metadata = {
  title: "Cadastre-se no My Delivery - Comece agora",
  description:
    "Inscreva-se hoje no My Delivery para acessar uma experiência personalizada [tipo de serviço ou produto]. Aproveite recursos exclusivos como realizar pedidos, favoritar restaurantes e administrar seus estabelecimentos. Junte-se à nossa comunidade e comece a aproveitar todos os benefícios da associação desde o primeiro dia - criar sua conta é rápido, fácil e seguro!",
};

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function signUpPage({ searchParams }: Props) {
  await isLogged(searchParams.callbackUrl as string);

  return (
    <>
      <div className="m-0 flex w-full justify-center lg:h-screen lg:flex-row">
        <div className="relative h-full  border-r  bg-muted lg:w-[60%]">
          <div className="absolute inset-0 bg-slate-900">
            <Image
              alt="My Delivery - Autenticação"
              src={"/bg-01.png"}
              fill
              style={{ objectFit: "cover" }}
              className="opacity-60"
            />
          </div>
        </div>
        <div className="relative grid min-h-screen w-auto  px-4 lg:w-[40%]">
          <div className="absolute right-6 top-6 hidden  lg:block">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href="/login/signIn">Entrar</Link>
            </Button>
          </div>
          <div className="max-w-[360 px] mt-10 w-full">
            <div className="my-6 flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira as informações abaixo para criar sua conta
              </p>
            </div>
            <SignUpForm />
            <div className="mt-4 text-center lg:hidden">
              <span className="text-sm font-semibold text-muted-foreground">
                ou
              </span>
              <div className="my-4 w-full">
                <Button variant={"secondary"} className="w-full" asChild>
                  <Link href="/login/signUp">Entre</Link>
                </Button>
              </div>
            </div>
            <p className="px-8 pb-2 pt-6 text-center text-sm text-muted-foreground">
              Ao clicar em cadastrar, você concorda com nossos{" "}
            </p>
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground md:flex-row">
              <Link
                href="/terms"
                className="text-sm underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary "
              >
                Política de Privacidade
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
