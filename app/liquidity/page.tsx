"use client";

import AddRemoveLiquidityCard from "@/components/liquidity/AddRemoveLiquidityCard";
import LPTokenBalanceCard from "@/components/liquidity/LPTokenBalanceCard";

export default function LiquidityPage() {
    return (
        <main className="relative min-h-[calc(100vh-80px)]">
            {/* Center of page */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <AddRemoveLiquidityCard />
            </div>

            {/* Right side, vertically centered */}
            <div className="absolute right-30 top-1/2 -translate-y-1/2">
                <LPTokenBalanceCard />
            </div>
        </main>
    );
}