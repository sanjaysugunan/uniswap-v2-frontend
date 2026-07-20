"use client";

import SwapCard from "@/components/swap/SwapCard";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <>
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold text-white">
                    Swap Tokens
                </h1>

                <p className="mt-2 text-center text-xl text-zinc-400">
                    Instantly swap between supported ERC-20 test tokens.
                </p>

                <div className="mt-8">
                    <SwapCard />
                </div>
            </div>
            <Footer />
        </main>
        </>
    );
}