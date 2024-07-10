"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { passwordStrength } from "check-password-strength";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Icons from "../icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";

import PasswordStrength from "./password-strength";

import { resetPassword } from "@/app/_actions/auth-actions";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Senha é obrigatória" })
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(32, "A senha deve ter no máximo 32 caracteres")
      // at least 1 small letter, 1 capital letter, 1 number and 1 special character
      .regex(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$",
        ),
        "A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial",
      ),
    confirmPassword: z
      .string({ required_error: "Este campo é obrigatório" })
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(32, "A senha deve ter no máximo 32 caracteres"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não coincidem!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof formSchema>;

interface Props {
  jwtUserId: string;
}

export function ResetPasswordForm({ jwtUserId }: Props) {
  const [passStrength, setPassStrength] = useState(0);
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const result = await resetPassword(jwtUserId, values.password);
      if (result === "success") {
        form.setValue("password", "");
        form.setValue("confirmPassword", "");

        toast({
          title: "Senha redefinida com sucesso!",
          description: `Você agora já pode fazer login com sua nova senha.`,
          variant: "success",
        });
      } else {
        toast({
          title: "Algo deu errado!",
          description: `Não conseguimos redefinir sua senha.\nTente novamente mais tarde!`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Algo deu errado!",
        description: `Não conseguimos redefinir sua senha.\nTente novamente mais tarde!`,
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
                      <Input
                        type={isVisiblePass ? "text" : "password"}
                        placeholder="Sua nova senha"
                        className={`${form.formState.errors.password && "border-destructive bg-destructive/30"}`}
                        {...field}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PasswordStrength passStrength={passStrength} />

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
                        type="password"
                        placeholder="Confirme sua nova senha"
                        className={`${form.formState.errors.confirmPassword && "border-destructive bg-destructive/30"}`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-4 text-white" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Alterar
          </Button>
        </div>
      </form>
    </Form>
  );
}
