import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Uniswap V2",
  description: "Decentralized cryptocurrency exchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#131313] text-white">
        <Providers>
          <Header />

          

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}