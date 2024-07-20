import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { CartProvider } from "../_context/cart";
import AuthProvider from "../_providers/auth";
import { Toaster } from "@/app/_components/ui/sonner";
import { Provider as AppContextProvider } from "@/app/_context/address";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "My delivery",
  description:
    "Descubra o My Delivery, o sistema de delivery mais eficiente e intuitivo do mercado. Ideal para restaurantes, bares, lanchonetes e outros estabelecimentos do setor alimentício, o My Delivery transforma a gestão de pedidos e entregas em uma tarefa simples e organizada. Com uma plataforma fácil de usar, você pode gerenciar seu menu e acompanhar seus pedidos em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>
            <AppContextProvider>{children}</AppContextProvider>
          </CartProvider>
        </AuthProvider>

        <Toaster richColors />
      </body>
    </html>
  );
}
