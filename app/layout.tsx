import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";

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

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Large glow */}
        <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F50DB4]/15 blur-[220px]" />

        {/* Bright center */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      {/* App */}
      <div className="relative z-10">
        <Header />

        {children}

  
      </div>

    </Providers>
  </body>
</html>
  );
}