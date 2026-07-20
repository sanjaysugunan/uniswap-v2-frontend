"use client";

import { useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "wagmi/actions";
import { contracts, routerAbi, factoryAbi } from "@/lib/constants";
import { ensureAllowance } from "@/lib/liquidity/approve";
import type { Token } from "@/lib/liquidity/tokens";
import { AmountField, MinField } from "./shared";

export default function RemoveLiquidityCard({
    tokenA,
    tokenB,
}: {
    tokenA: Token;
    tokenB: Token;
}) {
    const chainId = useChainId();
    const config = useConfig();
    const { address, isConnected } = useAccount();
    const { writeContractAsync, isPending } = useWriteContract();

    const currentContracts = contracts[chainId];

    const [lpAmount, setLpAmount] = useState("");
    const [minA, setMinA] = useState("");
    const [minB, setMinB] = useState("");

    async function handleRemoveLiquidity() {
        if (!isConnected || !address) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!currentContracts) {
            alert("No address found, please use a supported chain");
            return;
        }

        const tokenAddressA = currentContracts.tokens[tokenA.key] as `0x${string}`;
        const tokenAddressB = currentContracts.tokens[tokenB.key] as `0x${string}`;
        const router = currentContracts.router as `0x${string}`;

        // Look up the pair (LP token) address for this token combo.
        // Requires `factory` + `factoryAbi` to be exported from lib/constants —
        // add them there if they aren't already.
        const pairAddress = (await readContract(config, {
            abi: factoryAbi,
            address: currentContracts.factory as `0x${string}`,
            functionName: "getPair",
            args: [tokenAddressA, tokenAddressB],
        })) as `0x${string}`;

        // NOTE: assumes 18 decimals for the LP token and both underlying tokens.
        const parsedLpAmount = parseUnits(lpAmount || "0", 18);
        const parsedMinA = parseUnits(minA || "0", 18);
        const parsedMinB = parseUnits(minB || "0", 18);

        // Router pulls the LP token from the user, so the LP token itself
        // needs to approve the router — same allowance check as an ERC20.
        await ensureAllowance({
            config,
            writeContractAsync,
            owner: address,
            spender: router,
            token: pairAddress,
            amount: parsedLpAmount,
        });

        alert(`LP tokens for the ${tokenA.name}/${tokenB.name} pool approved.`);

        const deadline = BigInt(Math.floor(Date.now() / 1000) + 20 * 60);

        const hash = await writeContractAsync({
            abi: routerAbi,
            address: router,
            functionName: "removeLiquidity",
            args: [
                tokenAddressA,
                tokenAddressB,
                parsedLpAmount,
                parsedMinA,
                parsedMinB,
                address,
                deadline,
            ],
        });

        await waitForTransactionReceipt(config, { hash });

        alert(`Successfully removed ${lpAmount} LP tokens from the ${tokenA.name}/${tokenB.name} pool.`);
    }

    return (
        <>
            <AmountField
                label={`LP tokens to burn (${tokenA.symbol}/${tokenB.symbol})`}
                value={lpAmount}
                onChange={setLpAmount}
            />

            <div className="mb-3 flex gap-2">
                <MinField
                    label={`Min ${tokenA.symbol}`}
                    value={minA}
                    onChange={setMinA}
                />
                <MinField
                    label={`Min ${tokenB.symbol}`}
                    value={minB}
                    onChange={setMinB}
                />
            </div>

            <button
                className="w-full rounded-2xl bg-[#680047] py-4 text-lg font-bold tracking-tight transition hover:bg-[#F50DB4] disabled:opacity-60"
                onClick={handleRemoveLiquidity}
                disabled={isPending}
            >
                {isPending ? "Confirming..." : "Remove Liquidity"}
            </button>
        </>
    );
}