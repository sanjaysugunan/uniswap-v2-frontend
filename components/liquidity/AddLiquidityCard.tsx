"use client";

import { useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { contracts, routerAbi } from "@/lib/constants";
import { ensureAllowance } from "@/lib/liquidity/approve";
import type { Token } from "@/lib/liquidity/tokens";
import { AmountField, MinField } from "./shared";

export default function AddLiquidityCard({
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

    const [amountA, setAmountA] = useState("");
    const [amountB, setAmountB] = useState("");
    const [minA, setMinA] = useState("");
    const [minB, setMinB] = useState("");

    async function handleAddLiquidity() {
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

        // NOTE: assumes 18 decimals. If any of your test tokens use a
        // different decimals() value, fetch it per-token before parsing.
        const parsedAmountA = parseUnits(amountA || "0", 18);
        const parsedAmountB = parseUnits(amountB || "0", 18);
        const parsedMinA = parseUnits(minA || "0", 18);
        const parsedMinB = parseUnits(minB || "0", 18);

        await ensureAllowance({
            config,
            writeContractAsync,
            owner: address,
            spender: router,
            token: tokenAddressA,
            amount: parsedAmountA,
        });

        alert(`Approval successful! ${tokenA.name} is ready to be swapped.`)

        await ensureAllowance({
            config,
            writeContractAsync,
            owner: address,
            spender: router,
            token: tokenAddressB,
            amount: parsedAmountB,
        });

        alert(`Approval successful! ${tokenB.name} is ready to be swapped.`)

        const deadline = BigInt(Math.floor(Date.now() / 1000) + 20 * 60);

        const hash = await writeContractAsync({
            abi: routerAbi,
            address: router,
            functionName: "addLiquidity",
            args: [
                tokenAddressA,
                tokenAddressB,
                parsedAmountA,
                parsedAmountB,
                parsedMinA,
                parsedMinB,
                address,
                deadline,
            ],
        });

        await waitForTransactionReceipt(config, { hash });

        alert(`Successfully added liquidity to the ${tokenA.name}/${tokenB.name} pool.`);
    }

    return (
        <>
            <AmountField
                label={`Amount ${tokenA.symbol} (max)`}
                value={amountA}
                onChange={setAmountA}
            />
            <AmountField
                label={`Amount ${tokenB.symbol} (max)`}
                value={amountB}
                onChange={setAmountB}
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
                onClick={handleAddLiquidity}
                disabled={isPending}
            >
                {isPending ? "Confirming..." : "Add Liquidity"}
            </button>
        </>
    );
}