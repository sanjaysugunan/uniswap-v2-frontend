"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { formatUnits } from "viem";
import { useAccount, useChainId, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { contracts, factoryAbi, erc20Abi } from "@/lib/constants";
import { TOKENS, type Token } from "@/lib/liquidity/tokens";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

type Pool = {
    tokenA: Token;
    tokenB: Token;
};

// Which pairs to show — add more combinations here as pools go live
const POOLS: Pool[] = [
    { tokenA: TOKENS[0], tokenB: TOKENS[1] }, // TKA / TKB
    { tokenA: TOKENS[1], tokenB: TOKENS[2] }, // TKB / TKC
    { tokenA: TOKENS[0], tokenB: TOKENS[2] }, // TKA / TKC
];

type PoolBalance = {
    pair: string;
    balance: string;
};

function pairLabel(pool: Pool) {
    return `${pool.tokenA.symbol} / ${pool.tokenB.symbol}`;
}

export default function LPTokenBalanceCard() {
    const chainId = useChainId();
    const config = useConfig();
    const { address, isConnected } = useAccount();

    const currentContracts = contracts[chainId];

    const [balances, setBalances] = useState<PoolBalance[]>(
        POOLS.map((pool) => ({ pair: pairLabel(pool), balance: "0" }))
    );
    const [loading, setLoading] = useState(false);

    async function handleViewBalances() {
        if (!isConnected || !address) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!currentContracts) {
            alert("No address found, please use a supported chain");
            return;
        }

        setLoading(true);
        try {
            const results = await Promise.all(
                POOLS.map(async (pool) => {
                    const tokenAddressA = currentContracts.tokens[
                        pool.tokenA.key
                    ] as `0x${string}`;
                    const tokenAddressB = currentContracts.tokens[
                        pool.tokenB.key
                    ] as `0x${string}`;

                    // Requires `factory` + `factoryAbi` exported from
                    // lib/constants (same as RemoveLiquidityCard).
                    const pairAddress = (await readContract(config, {
                        abi: factoryAbi,
                        address: currentContracts.factory as `0x${string}`,
                        functionName: "getPair",
                        args: [tokenAddressA, tokenAddressB],
                    })) as `0x${string}`;

                    if (pairAddress.toLowerCase() === ZERO_ADDRESS) {
                        // Pool doesn't exist yet — nothing to own an LP balance of.
                        return { pair: pairLabel(pool), balance: "0" };
                    }

                    const lpBalance = (await readContract(config, {
                        abi: erc20Abi,
                        address: pairAddress,
                        functionName: "balanceOf",
                        args: [address],
                    })) as bigint;

                    // NOTE: assumes 18 decimals for the LP token.
                    return {
                        pair: pairLabel(pool),
                        balance: formatUnits(lpBalance, 18),
                    };
                })
            );

            setBalances(results);
        } catch (err) {
            alert(
                err instanceof Error ? err.message : "Failed to fetch LP balances."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-[340px] rounded-3xl bg-[#131317] p-3 text-white shadow-2xl">
            <div className="rounded-3xl border border-white/10 bg-[#1b1b1b] p-5">
                <h2 className="mb-5 flex justify-center text-xl font-bold">
                    LP Token Balances
                </h2>

                <div className="space-y-3">
                    {balances.map((position) => (
                        <div
                            key={position.pair}
                            className="flex items-center justify-between rounded-2xl bg-[#232323] px-4 py-3"
                        >
                            <div>
                                <p className="font-semibold">{position.pair}</p>
                                <p className="text-xs text-zinc-500">
                                    Liquidity Pool
                                </p>
                            </div>

                            <p className="text-lg font-bold text-zinc-300">
                                {Number(position.balance).toLocaleString(undefined, {
                                    maximumFractionDigits: 4,
                                })}{" "}
                                LP
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleViewBalances}
                    disabled={loading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#680047] py-3 text-lg font-bold transition hover:bg-[#F50DB4] disabled:opacity-60"
                >
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? "Fetching..." : "View Balances"}
                </button>
            </div>
        </div>
    );
}