"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export type Pool = {
    address: string;
    pair: string;
    // mock reserves this pool would return on-chain
    mockReserve0: string;
    mockReserve1: string;
};

function truncateAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function PoolReserveRow({ pool }: { pool: Pool }) {
    const [reserve0, setReserve0] = useState("0");
    const [reserve1, setReserve1] = useState("0");
    const [loading, setLoading] = useState(false);

    const handleViewReserves = () => {
        setLoading(true);
        // Replace with an actual getReserves() contract read
        setTimeout(() => {
            setReserve0(pool.mockReserve0);
            setReserve1(pool.mockReserve1);
            setLoading(false);
        }, 700);
    };

    const [tokenA, tokenB] = pool.pair.split("/");

    return (
        <div className="flex h-16 w-full items-center justify-between gap-4 rounded-full border border-white/10 bg-[#1b1b1b] px-6 text-white">
            {/* Pool identity */}
            <div className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold">{pool.pair}</span>
                <span className="truncate font-mono text-xs text-zinc-500">
                    {truncateAddress(pool.address)}
                </span>
            </div>

            {/* Reserves */}
            <div className="flex shrink-0 items-center gap-5">
                <div className="text-right">
                    <p className="text-xs text-zinc-500">{tokenA} reserve</p>
                    <p className="text-sm font-semibold">{reserve0}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-zinc-500">{tokenB} reserve</p>
                    <p className="text-sm font-semibold">{reserve1}</p>
                </div>
            </div>

            {/* Action */}
            <button
                onClick={handleViewReserves}
                disabled={loading}
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#262626] px-4 py-2 text-xs font-semibold transition hover:bg-[#323232] disabled:opacity-60"
            >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Fetching" : "View Pool Reserves"}
            </button>
        </div>
    );
}