import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from '../lib/edgestore';
 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online-Shop",
  description: "Created by alikashani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       
      <body className={inter.className}>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
