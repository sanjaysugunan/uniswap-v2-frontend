"use client";

import PoolReserveRow, { Pool } from "@/components/pools/PoolReserveRow";

// Mock pool list — replace with pairs read from your Factory contract
const POOLS: Pool[] = [
    {
        address: "0x1f98431c8ad98523631ae4a59f267346ea31f84",
        pair: "ETH/USDC",
        mockReserve0: "182.4021",
        mockReserve1: "412,980.55",
    },
    {
        address: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
        pair: "WBTC/ETH",
        mockReserve0: "9.1120",
        mockReserve1: "154.3390",
    },
    {
        address: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
        pair: "USDT/USDC",
        mockReserve0: "1,204,880.00",
        mockReserve1: "1,198,340.12",
    },
    {
        address: "0xd3d2e2692501a5c9ca623199d38826e513033a1",
        pair: "UNI/ETH",
        mockReserve0: "58,201.77",
        mockReserve1: "41.209",
    },
];

export default function LiquidityPage() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] flex-col items-center gap-3 px-4 py-10">
            <div className="mb-2 w-full max-w-3xl">
                <h1 className="flex justify-center text-4xl font-semibold text-white">Pools</h1>
                <p className="flex justify-center text-sm text-zinc-500">
                    Select a pool and view its current reserves.
                </p>
            </div>

            <div className="flex justify-center w-full max-w-5xl flex-col gap-3">
                {POOLS.map((pool) => (
                    <PoolReserveRow key={pool.address} pool={pool} />
                ))}
            </div>
        </main>
    );
}