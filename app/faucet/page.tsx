"use client";

import { useChainId, useWriteContract, useConfig, useAccount } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"
import { useState } from "react";
import { contracts, erc20Abi } from "@/lib/constants"

const tokens = [
    {
        symbol: "A",
        name: "Token A",
        key: "tokenA",
    },
    {
        symbol: "B",
        name: "Token B",
        key: "tokenB",
    },
    {
        symbol: "C",
        name: "Token C",
        key: "tokenC",
    },
] as const


export default function FaucetPage() {

    const chainId = useChainId()
    const config = useConfig()
    const { isConnected } = useAccount()
    const [pendingToken, setPendingToken] = useState<string | null>(null)

    const { writeContractAsync } = useWriteContract()

    const currentContracts = contracts[chainId]

    async function requestTokens( tokenKey: string, tokenAddress: `0x${string}`) {
        if (!isConnected) {
            alert("Please connect your wallet first.")
            return
        }

        try {
            setPendingToken(tokenKey)

            const hash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress,
                functionName: "mint",
            })

            await waitForTransactionReceipt(config, { hash })

            alert("Successfully minted 10 test tokens!")
        } finally {
            setPendingToken(null)
        }
}

    return (
        <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-6 py-12">
            <div className="w-full">
                <div className="mb-14 text-center">
                    <h1 className="text-4xl font-black text-white">
                        ERC-20 Test Token Faucet
                    </h1>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-zinc-400">
                        Need tokens to test the DEX? Request free ERC-20 test
                        tokens for your connected wallet. Each request mints{" "}
                        <span className="font-bold text-white">10 tokens</span>{" "}
                        (18 decimals) that you can use to explore swaps, provide
                        liquidity, and interact with the protocol. These tokens
                        are for development purposes only and have{" "}
                        <span className="font-bold text-white">
                            no monetary value
                        </span>.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {tokens.map((token) => (
                        <div
                            key={token.symbol}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1F]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#F50DB4]/30 hover:shadow-[0_0_40px_rgba(245,13,180,0.15)]"
                        >
                            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#F50DB4]/10 blur-3xl transition-all duration-300 group-hover:bg-[#F50DB4]/20" />

                            <div className="relative flex flex-col items-center text-center">
                                <div className="mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-[#F50DB4]/10 text-5xl font-black text-[#F50DB4]">
                                    {token.symbol}
                                </div>

                                <h2 className="text-2xl font-black text-white">
                                    {token.name}
                                </h2>

                                <p className="mt-4 text-sm leading-6 text-zinc-400">
                                    Mint{" "}
                                    <span className="font-bold text-white">
                                        10 test tokens
                                    </span>{" "}
                                    to your wallet and start experimenting with
                                    swaps, liquidity pools, and other DEX
                                    functionality.
                                </p>

                                <button
                                    onClick={() => requestTokens(token.key, currentContracts.tokens[token.key]) }
                                    className="mt-8 w-full rounded-2xl bg-[#F50DB4] py-3 text-md font-black text-white transition-colors duration-200 hover:bg-[#E000A1]"
                                >
                                    {pendingToken === token.key ? "Requesting..." : "Request Test Tokens"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}