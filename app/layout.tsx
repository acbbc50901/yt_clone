import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/lib/ClientLayout";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
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
        {/* <StyledComponentsRegistry> */}
        <ClientLayout>{children}</ClientLayout>
        {/* </StyledComponentsRegistry> */}
      </body>
    </html>
  );
}
