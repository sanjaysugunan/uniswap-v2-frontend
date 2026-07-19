"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { formatUnits } from "viem";
import { useChainId, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { contracts, factoryAbi, pairAbi } from "@/lib/constants";
import type { Token } from "@/lib/liquidity/tokens";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export type Pool = {
    tokenA: Token;
    tokenB: Token;
};

function truncateAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function PoolReserveRow({ pool }: { pool: Pool }) {
    const chainId = useChainId();
    const config = useConfig();
    const currentContracts = contracts[chainId];

    // Pair address is resolved once on mount so the row can show it (or
    // "Not deployed") without the user having to click anything first.
    const [pairAddress, setPairAddress] = useState<`0x${string}` | null>(null);
    const [resolvingAddress, setResolvingAddress] = useState(true);

    const [reserve0, setReserve0] = useState("0");
    const [reserve1, setReserve1] = useState("0");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function resolvePair() {
            if (!currentContracts) {
                setResolvingAddress(false);
                return;
            }
            setResolvingAddress(true);
            try {
                const tokenAddressA = currentContracts.tokens[
                    pool.tokenA.key
                ] as `0x${string}`;
                const tokenAddressB = currentContracts.tokens[
                    pool.tokenB.key
                ] as `0x${string}`;

                const address = (await readContract(config, {
                    abi: factoryAbi,
                    address: currentContracts.factory as `0x${string}`,
                    functionName: "getPair",
                    args: [tokenAddressA, tokenAddressB],
                })) as `0x${string}`;

                if (!cancelled) {
                    setPairAddress(
                        address.toLowerCase() === ZERO_ADDRESS ? null : address
                    );
                }
            } catch {
                if (!cancelled) setPairAddress(null);
            } finally {
                if (!cancelled) setResolvingAddress(false);
            }
        }

        resolvePair();
        return () => {
            cancelled = true;
        };
    }, [config, currentContracts, pool.tokenA.key, pool.tokenB.key]);

    async function handleViewReserves() {
        if (!currentContracts || !pairAddress) return;

        setLoading(true);
        try {
            const tokenAddressA = currentContracts.tokens[
                pool.tokenA.key
            ] as `0x${string}`;

            const [reserves, token0] = await Promise.all([
                readContract(config, {
                    abi: pairAbi,
                    address: pairAddress,
                    functionName: "getReserves",
                }) as Promise<[bigint, bigint, number]>,
                readContract(config, {
                    abi: pairAbi,
                    address: pairAddress,
                    functionName: "token0",
                }) as Promise<`0x${string}`>,
            ]);

            const [rawReserve0, rawReserve1] = reserves;

            // Pair contracts sort token0/token1 by address, which may not
            // match our tokenA/tokenB display order — realign here.
            const isTokenAFirst =
                token0.toLowerCase() === tokenAddressA.toLowerCase();

            const [aReserve, bReserve] = isTokenAFirst
                ? [rawReserve0, rawReserve1]
                : [rawReserve1, rawReserve0];

            // NOTE: assumes 18 decimals for both tokens.
            setReserve0(formatUnits(aReserve, 18));
            setReserve1(formatUnits(bReserve, 18));
        } catch (err) {
            alert(
                err instanceof Error ? err.message : "Failed to fetch reserves."
            );
        } finally {
            setLoading(false);
        }
    }

    const pairLabel = `${pool.tokenA.symbol}/${pool.tokenB.symbol}`;
    const deployed = pairAddress !== null;

    return (
        <div className="flex h-30 w-full items-center justify-between gap-4 rounded-full border border-white/10 bg-[#1b1b1b] px-6 text-white">
            {/* Pool identity */}
            <div className="flex min-w-0 flex-col">
                <span className="text-lg font-semibold">{pairLabel}</span>
                <span className="truncate font-mono text-sm text-zinc-500">
                    {resolvingAddress
                        ? "Resolving..."
                        : deployed
                        ? truncateAddress(pairAddress as string)
                        : "Not deployed"}
                </span>
            </div>

            {/* Reserves */}
            <div className="flex shrink-0 items-center gap-5">
                <div className="text-right">
                    <p className="text-sm text-zinc-500">
                        {pool.tokenA.symbol} reserve
                    </p>
                    <p className="text-lg font-semibold">{reserve0}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-zinc-500">
                        {pool.tokenB.symbol} reserve
                    </p>
                    <p className="text-lg font-semibold">{reserve1}</p>
                </div>
            </div>

            {/* Action */}
            <button
                onClick={handleViewReserves}
                disabled={loading || !deployed}
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#680047] px-4 py-2 text-md font-semibold transition hover:bg-[#F50DB4] disabled:opacity-60"
            >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Fetching" : deployed ? "View Pool Reserves" : "No Pool"}
            </button>
        </div>
    );
}