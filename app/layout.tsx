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
          <Header />
            {/* Background */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                {/* Large pink glow */}
                <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F50DB4]/15 text-white blur-[220px]" />

                {/* Brighter center */}
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" />
            </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
