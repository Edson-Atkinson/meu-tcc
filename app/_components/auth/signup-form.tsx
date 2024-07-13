"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { passwordStrength } from "check-password-strength";

import GoogleButtonSignin from "./google-button-signin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import PasswordStrength from "./password-strength";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Icons from "../icons";
import { SpinnerIcon } from "../icons/";

import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/app/_components/ui/use-toast";

import { registerUser } from "@/app/_actions/auth-actions";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "O nome do usuário é obrigatório!",
      })
      .min(2, "O nome do usuário deve possuir no mínimo 2 caracteres")
      .max(12, "O nome de usuário deve ter até 12 caracteres")
      .regex(
        new RegExp("^[a-zA-Z0-9]+$"),
        "Caracteres especiais não são permitidos!",
      ),
    name: z
      .string({
        required_error: "O nome  é obrigatório!",
      })
      .min(2, "O nome deve possuir no mínimo 2 caracteres")
      .max(30, "O nome de usuário deve ter até 30 caracteres"),

    email: z
      .string({ required_error: "O Email é obrigatório" })
      .email("Por favor insira um endereço de e-mail válido"),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(32, "A senha deve ter até 32 caracteres")
      // pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial
      .regex(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$",
        ),
        "A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial",
      ),
    confirmPassword: z
      .string({ required_error: "Este campo é obrigatório" })
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(20, "A senha deve ter até 20 caracteres"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof formSchema>;

export function SignUpForm() {
  const [passStrength, setPassStrength] = useState(0);
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelect, setIsSelect] = useState(false);

  // const baseUrl = getBaseUrl()

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  const { password } = form.watch();
  useEffect(() => {
    setPassStrength(passwordStrength(password).id);
  }, [password]);

  async function onSubmit(values: InputType) {
    try {
      setIsLoading(true);
      const { confirmPassword, ...user } = values;

      const response = await registerUser(user);

      if ("error" in response) {
        toast({
          title: "Algo deu errado!",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sua conta foi criada! ",
          description: "Verifique seu e-mail para verificá-la.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Algo deu errado!",
        description: `Não conseguimos criar sua conta.\nPor favor tente novamente mais tarde!`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.push("/login/signIn");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Icons.user
                      className={`${form.formState.errors.username ? "text-destructive" : "text-muted-foreground"} `}
                    />
                    <Input
                      onFocus={() => setIsSelect(false)}
                      placeholder="Nome de usuário"
                      className={`${form.formState.errors.username && "border-destructive bg-destructive/30"} border-none focus-visible:ring-transparent`}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Icons.user
                      className={`${form.formState.errors.name ? "text-destructive" : "text-muted-foreground"} `}
                    />
                    <Input
                      onFocus={() => setIsSelect(false)}
                      placeholder="Nome completo"
                      className={`${form.formState.errors.name && "border-destructive bg-destructive/30"} border-none focus-visible:ring-transparent`}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.email
                        className={`${form.formState.errors.email ? "text-destructive" : "text-muted-foreground"} `}
                      />
                      <Input
                        onFocus={() => setIsSelect(false)}
                        type="email"
                        placeholder="Seu Email"
                        className={`${form.formState.errors.email && "border-destructive bg-destructive/30"} border-none focus-visible:ring-transparent`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.key
                        className={`${form.formState.errors.password ? "text-destructive" : "text-muted-foreground"} `}
                      />
                      <div
                        onClick={() => setIsSelect(true)}
                        className={`${form.formState.errors.password && "border-destructive bg-destructive/30"} ${isSelect && "outline-none ring-2 ring-background ring-offset-0"} focus-visible::ring-transparent relative flex w-full items-center gap-2 rounded-lg border-muted bg-background px-2`}
                        {...field}
                      >
                        <Input
                          type={isVisiblePass ? "text" : "password"}
                          placeholder="Sua senha"
                          className={` border-none bg-transparent focus-visible:ring-transparent focus-visible:ring-offset-0`}
                        />
                        {isVisiblePass ? (
                          <Icons.eyeOff
                            onClick={toggleVisblePass}
                            className={`${
                              form.formState.errors.password
                                ? "text-destructive"
                                : "text-muted-foreground"
                            } `}
                          />
                        ) : (
                          <Icons.eye
                            onClick={toggleVisblePass}
                            className={`${
                              form.formState.errors.password
                                ? "text-destructive"
                                : "text-muted-foreground"
                            } `}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {passStrength > 0 && (
            <div className="flex w-full items-center justify-end gap-2">
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Nivel da senha:
                </span>

                <PasswordStrength
                  passStrength={passStrength}
                  className="   w-[130px]  "
                />
              </div>
            </div>
          )}
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.key
                        className={`${
                          form.formState.errors.confirmPassword
                            ? "text-destructive"
                            : "text-muted-foreground"
                        } `}
                      />
                      <Input
                        onFocus={() => setIsSelect(false)}
                        type={isVisiblePass ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        className={`${form.formState.errors.confirmPassword && "border-destructive bg-destructive/30"} border-none focus-visible:ring-transparent`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <Button className="mt-4 text-white" disabled={isLoading}>
              {isLoading && (
                <span className="animate-spin">
                  <SpinnerIcon size={16} />
                </span>
              )}
              Cadastrar
            </Button>
            <GoogleButtonSignin
              typeSubmit="signup"
              // callbackUrl={callbackUrl}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
