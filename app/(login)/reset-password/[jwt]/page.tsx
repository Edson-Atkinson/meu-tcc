import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ResetPasswordForm } from "@/app/_components/auth/reset-password";

import ChangePasswordIcon from "@/app/_components/icons/change-password-icon";

import { verifyValidToken } from "@/app/_actions/auth-actions";

import { isLogged } from "@/app/utils";

interface Props {
  params: {
    jwt: string;
  };
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: Props) {
  await isLogged(searchParams.callbackUrl as string);

  const isTokenValid = await verifyValidToken(params.jwt);

  return (
    <div className="grid place-content-center py-40">
      <Card className="w-80 max-w-sm text-center">
        <CardHeader>
          <CardTitle className={`${!isTokenValid && "text-destructive"}`}>
            Redefinir senha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full place-content-center py-4">
            <ChangePasswordIcon
              size={56}
              color={`${!isTokenValid ? "#7F1D1D" : "currentColor"}`}
            />
          </div>

          {isTokenValid ? (
            <ResetPasswordForm jwtUserId={params.jwt} />
          ) : (
            <p className={`${!isTokenValid && "text-destructive"}`}>
              Esta URL não é válida!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
