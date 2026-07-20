"use client";

import PoolReserveRow, { Pool } from "@/components/pools/PoolReserveRow";
import { TOKENS } from "@/lib/liquidity/tokens";

// Every unique pair from the configured token list — add tokens in
// lib/liquidity/tokens.ts and new pools show up here automatically.
const POOLS: Pool[] = TOKENS.flatMap((tokenA, i) =>
    TOKENS.slice(i + 1).map((tokenB) => ({ tokenA, tokenB }))
);

export default function PoolsPage() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] flex-col items-center px-4 pt-20 pb-10">
            <div className="mb-8 w-full max-w-3xl text-center">
                <h1 className="text-4xl font-semibold text-white">
                    Pools
                </h1>

                <p className="mt-2 text-xl text-zinc-400">
                    Select a pool and view its current reserves.
                </p>
            </div>

            <div className="flex w-full max-w-5xl flex-col gap-4">
                {POOLS.map((pool) => (
                    <PoolReserveRow
                        key={`${pool.tokenA.key}-${pool.tokenB.key}`}
                        pool={pool}
                    />
                ))}
            </div>
        </main>
    );
}