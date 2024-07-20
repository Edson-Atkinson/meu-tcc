import Header from "@/app/_components/header";
import AuthProvider from "@/app/_providers/auth";
import Menu from "../../_components/menu";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "My delivery",
  description:
    "Descubra o My Delivery, o sistema de delivery mais eficiente e intuitivo do mercado. Ideal para restaurantes, bares, lanchonetes e outros estabelecimentos do setor alimentício, o My Delivery transforma a gestão de pedidos e entregas em uma tarefa simples e organizada. Com uma plataforma fácil de usar, você pode gerenciar seu menu e acompanhar seus pedidos em tempo real",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    session?.user.role === "USER" ||
    session?.user.active === false
  ) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.className}>
          <AuthProvider>
            <div className="h-full w-full bg-slate-600">
              <AlertDialog open>
                <AlertDialogContent className="w-[90%] rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Acesso negado!</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você não tem permição para acessar essa área do sistema!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>
                      <Link href="/">Ok</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </AuthProvider>
        </body>
      </html>
    );
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <div className="lg:hidden">
            <Header />
          </div>
          <div className="hidden lg:block">
            <Header isInput />
          </div>
          <div className="gap-4 lg:flex">
            <Menu />
            {children}
          </div>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
