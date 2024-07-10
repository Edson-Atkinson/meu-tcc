import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";
import { SignInForm } from "@/app/_components/auth/signin-form";

import { isLogged } from "@/app/utils";

export const metadata: Metadata = {
  title: "Sign In for My SaaS",
  description:
    "Sign in to your account to access your dashboard, manage your account, and more. If you do not have an account, sign up today.",
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
      <div className="flex flex-col-reverse items-center justify-center px-0 lg:h-screen lg:flex-row">
        <div className="relative h-full flex-col border-r bg-muted p-10 text-white lg:flex lg:w-[80%]">
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
        <div className="relative grid min-h-screen w-auto place-content-center p-2 lg:w-[1000px]">
          <div className="absolute right-6 top-6">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href="/login/signUp">Cadastre-se</Link>
            </Button>
          </div>
          <div className="w-full max-w-[360px] ">
            <div className="my-6 flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Faça login em sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com suas informações para realizar o login.
              </p>
            </div>
            <SignInForm callbackUrl={searchParams.callbackUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
