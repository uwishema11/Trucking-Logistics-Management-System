import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import ReactQueryClientProvider from "@/components/Providers/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logistic Tracking Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <SessionProvider>{children}</SessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
