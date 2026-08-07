import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ventura AI Free | Find the right AI faster.",
  description:
    "Mapa curado de ferramentas de IA para encontrar a opção certa mais rápido.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
