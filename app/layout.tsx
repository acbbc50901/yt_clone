import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RedexProvider } from "@/redex/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "練習得斯",
  description: "這是一場練習",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RedexProvider>{children}</RedexProvider>
      </body>
    </html>
  );
}
