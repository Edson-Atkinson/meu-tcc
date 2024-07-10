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
      <div className="flex flex-col-reverse items-center justify-center px-0 lg:h-screen lg:flex-row">
        <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex lg:w-[80%]">
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
        <div className="relative grid min-h-screen w-auto place-content-center p-10 lg:w-[1000px]">
          <div className="absolute right-6 top-6">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href="/login/signIn">Entrar</Link>
            </Button>
          </div>
          <div className="w-full max-w-[360px]">
            <div className="my-6 flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira as informações abaixo para criar sua conta
              </p>
            </div>
            <SignUpForm />
            <p className="px-8 pb-2 pt-6 text-center text-sm text-muted-foreground">
              Ao clicar em cadastrar, você concorda com nossos{" "}
            </p>
            <div className="flex justify-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
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
