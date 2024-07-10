import EmailCheckIcon from "@/app/_components/icons/email-check-icon";
import EmailWarningIcon from "@/app/_components/icons/email-warning-icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { db as prisma } from "@/app/_lib/prisma";
import Link from "next/link";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  let message = "Verificando email...";
  let verified = false;
  if (searchParams.token) {
    const user = await prisma.user.findUnique({
      where: {
        emailVerificationToken: searchParams.token as string,
      },
    });

    if (!user) {
      message = "User not found. Check your email for the verification link.";
    } else {
      await prisma.user.update({
        where: {
          emailVerificationToken: searchParams.token as string,
        },
        data: {
          emailVerified: true,
          emailVerificationToken: null,
        },
      });

      message = `Email verificado!\n${user.email}`;
      verified = true;
    }
  } else {
    message =
      "Nenhum token de verificação de e-mail encontrado. Verifique seu e-mail.";
  }

  return (
    <div className="grid place-content-center py-40">
      <Card className="max-w-sm text-center">
        <CardHeader>
          <CardTitle>Verificação de email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full place-content-center py-4">
            {verified ? (
              <EmailCheckIcon size={56} />
            ) : (
              <EmailWarningIcon size={56} />
            )}
          </div>
          <p
            className="text-lg text-muted-foreground"
            style={{ textWrap: "balance" }}
          >
            {message}
          </p>
        </CardContent>
        <CardFooter className="">
          {verified && (
            <Link
              className="h-10 w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary/90"
              href={"/login/signIn"}
            >
              Entrar
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
