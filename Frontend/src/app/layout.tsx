import type React from "react";
// import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BullKit - Indian Stock Market Dashboard",
  description: "Track Indian stock market data with Alpha Vantage API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
        {children}
        <Toaster position="top-right" closeButton richColors />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
