import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { GoogleIcon, SpinnerIcon } from "../icons/index";

interface Props {
  typeSubmit: "signin" | "signup";
  callbackUrl?: string;
}

export default function GoogleButtonSignin({ typeSubmit, callbackUrl }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="flex items-center justify-center gap-2 border-muted-foreground text-muted-foreground "
      onClick={() => {
        setIsLoading(true);
        signIn("google", { callbackUrl });
      }}
    >
      {isLoading ? (
        <span className="animate-spin">
          <SpinnerIcon size={16} />
        </span>
      ) : (
        <GoogleIcon size={16} />
      )}{" "}
      {typeSubmit === "signup" ? "Cadastre-se com Google" : "Entrar com Google"}
    </Button>
  );
}
