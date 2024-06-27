"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "@/app/_components/ui/separator";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    setHasError(false);
    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (request && request.ok) {
      const callbackUrl = searchParams.get("callbackUrl");
      console.log(callbackUrl);
      console.log(request.error);

      if (callbackUrl) {
        router.replace(`${callbackUrl}`);
      } else {
        router.replace("/");
      }
    } else {
      console.log(request?.error);
      setHasError(true);
    }
  };

  const handleSignUpGoogle = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="m-auto mt-6 rounded-lg border border-muted p-4 lg:max-w-[500px]">
      <div className="space-y-4">
        <div>
          <label htmlFor="email">E-mail:</label>
          <Input
            id="email"
            placeholder="Digite seu E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none outline-none"
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <Input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-none outline-none"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 md:flex-row">
        <Button onClick={handleLogin} className="w-full md:w-fit">
          Fazer Login
        </Button>

        <Link href="/createAccount">
          <Button variant="outline" className="w-full md:w-fit">
            Quero me cadastar
          </Button>
        </Link>
      </div>

      <div className="my-6 flex flex-col items-center justify-center gap-2 md:flex-row">
        <span> Esqueceu sua senha?</span>
        <Link legacyBehavior href={`/forget`}>
          <a className="font-semibold text-primary ">Clique aqui</a>
        </Link>
      </div>

      <Separator />

      <div>
        <Button
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-sm  p-5 font-semibold"
          onClick={handleSignUpGoogle}
          variant="ghost"
        >
          <FcGoogle /> Login com Google
        </Button>
      </div>
      {hasError && toast.error("Acesso negado!")}
    </div>
  );
};

export default LoginPage;
