"use client";
import { RedexProvider } from "@/redex/provider";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RedexProvider>
      {children}
      <Toaster richColors={false} />
    </RedexProvider>
  );
}
