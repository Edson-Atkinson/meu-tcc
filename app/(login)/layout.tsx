import Header from "@/app/_components/header";
import AuthProvider from "@/app/_providers/auth";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { Toaster as Toaster2 } from "@/app/_components/ui/toaster";

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
          <div className="px-4">{children}</div>

          <Toaster2 />
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
