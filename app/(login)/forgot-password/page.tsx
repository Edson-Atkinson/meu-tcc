import { ForgotPasswordForm } from "@/app/_components/auth/forgot-password-form";
import ChangePasswordIcon from "@/app/_components/icons/change-password-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { isLogged } from "@/app/utils";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function ForgotPasswordPage({ searchParams }: Props) {
  await isLogged(searchParams.callbackUrl as string);

  return (
    <div className="grid place-content-center py-40">
      <Card className="w-80 max-w-sm text-center">
        <CardHeader>
          <CardTitle>Redefinir senha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full place-content-center py-4">
            <ChangePasswordIcon size={56} />
          </div>

          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
