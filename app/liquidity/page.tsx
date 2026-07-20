"use client";

import AddRemoveLiquidityCard from "@/components/liquidity/AddRemoveLiquidityCard";
import LPTokenBalanceCard from "@/components/liquidity/LPTokenBalanceCard";

export default function LiquidityPage() {
    return (
        <main className="relative min-h-[calc(100vh-80px)]">
             {/* Center content */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <h1 className="text-4xl font-semibold text-white">
                    Liquidity
                </h1>

                <p className="mt-2 text-center text-xl text-zinc-400">
                    Add or remove liquidity in pair contracts.
                </p>

                <div className="mt-8">
                    <AddRemoveLiquidityCard />
                </div>
            </div>

            {/* LP balance card */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2">
                <LPTokenBalanceCard />
            </div>
    </main>
    );
}