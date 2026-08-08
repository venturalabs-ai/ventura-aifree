import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventura AI Free",
  description: "Descubra ferramentas de IA e encontre a opção certa para o seu objetivo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
