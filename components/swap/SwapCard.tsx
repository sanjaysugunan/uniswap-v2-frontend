"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "wagmi/actions";
import { contracts, routerAbi, erc20Abi } from "@/lib/constants";
import { ensureAllowance } from "@/lib/liquidity/approve";
import { TOKENS, type Token } from "@/lib/liquidity/tokens";
import TokenDropdown from "./TokenDropdown";

// Basis-point slippage tolerance applied to the quoted output when
// setting amountOutMin for the swap (50 = 0.5%).
const SLIPPAGE_BPS = 50n;

export default function SwapCard() {
    const chainId = useChainId();
    const config = useConfig();
    const { address, isConnected } = useAccount();
    const { writeContractAsync, isPending } = useWriteContract();

    const currentContracts = contracts[chainId];

    const [sellToken, setSellToken] = useState<Token>(TOKENS[0]);
    const [buyToken, setBuyToken] = useState<Token>(TOKENS[1]);

    const [sellAmount, setSellAmount] = useState("");
    const [buyAmount, setBuyAmount] = useState("");
    const [quotedOut, setQuotedOut] = useState<bigint | null>(null);

    const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
    const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);

    const [calculating, setCalculating] = useState(false);

    // Any change to the inputs invalidates the last quote — force a
    // fresh "Calculate Output" before the user can swap again.
    useEffect(() => {
        setBuyAmount("");
        setQuotedOut(null);
    }, [sellAmount, sellToken, buyToken]);

    const selectSellToken = (token: Token) => {
        if (token.symbol === buyToken.symbol) setBuyToken(sellToken);
        setSellToken(token);
        setSellDropdownOpen(false);
    };

    const selectBuyToken = (token: Token) => {
        if (token.symbol === sellToken.symbol) setSellToken(buyToken);
        setBuyToken(token);
        setBuyDropdownOpen(false);
    };

    const flipTokens = () => {
        setSellToken(buyToken);
        setBuyToken(sellToken);
        setSellAmount(buyAmount);
    };

    async function handleCalculateOutput() {
        if (!currentContracts) {
            alert("No address found, please use a supported chain");
            return;
        }
        if (!sellAmount || Number(sellAmount) <= 0) {
            alert("Enter an amount to sell.");
            return;
        }

        const tokenIn = currentContracts.tokens[sellToken.key] as `0x${string}`;
        const tokenOut = currentContracts.tokens[buyToken.key] as `0x${string}`;
        const router = currentContracts.router as `0x${string}`;

        // NOTE: assumes 18 decimals — fetch decimals() per token if that
        // isn't always true for your test tokens.
        const parsedSellAmount = parseUnits(sellAmount, 18);

        setCalculating(true);
        try {
            const amounts = (await readContract(config, {
                abi: routerAbi,
                address: router,
                functionName: "getAmountsOut",
                args: [parsedSellAmount, [tokenIn, tokenOut]],
            })) as bigint[];

            const out = amounts[amounts.length - 1];
            setQuotedOut(out);
            setBuyAmount(formatUnits(out, 18));
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Couldn't fetch a quote for this pair — the pool may not exist yet."
            );
        } finally {
            setCalculating(false);
        }
    }

    async function handleSwap() {
        if (!isConnected || !address) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!currentContracts) {
            alert("No address found, please use a supported chain");
            return;
        }
        if (!quotedOut) {
            alert("Calculate the output before swapping.");
            return;
        }

        const tokenIn = currentContracts.tokens[sellToken.key] as `0x${string}`;
        const tokenOut = currentContracts.tokens[buyToken.key] as `0x${string}`;
        const router = currentContracts.router as `0x${string}`;

        const parsedSellAmount = parseUnits(sellAmount, 18);
        const amountOutMin =
            (quotedOut * (10000n - SLIPPAGE_BPS)) / 10000n;

        try {
            const balance = (await readContract(config, {
                abi: erc20Abi,
                address: tokenIn,
                functionName: "balanceOf",
                args: [address],
            })) as bigint;

            if (balance < parsedSellAmount) {
                throw new Error(
                    `Insufficient ${sellToken.symbol} balance: you have ${formatUnits(
                        balance,
                        18
                    )} but need ${sellAmount}.`
                );
            }

            await ensureAllowance({
                config,
                writeContractAsync,
                owner: address,
                spender: router,
                token: tokenIn,
                amount: parsedSellAmount,
            });

            const deadline = BigInt(Math.floor(Date.now() / 1000) + 20 * 60);

            const hash = await writeContractAsync({
                abi: routerAbi,
                address: router,
                functionName: "swapExactTokensForTokens",
                args: [
                    parsedSellAmount,
                    amountOutMin,
                    [tokenIn, tokenOut],
                    address,
                    deadline,
                ],
            });

            await waitForTransactionReceipt(config, { hash });

            setSellAmount("");
            setBuyAmount("");
            setQuotedOut(null);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Swap failed.");
        }
    }

    const hasQuote = quotedOut !== null && buyAmount !== "";

    return (
        <div className="w-full max-w-md rounded-3xl bg-[#131317] p-3 text-white shadow-2xl">
            {/* Sell */}
            <div className="rounded-3xl border border-white/10 bg-[#1b1b1b] p-5">
                <p className="mb-3 text-sm text-zinc-400">Sell</p>

                <div className="flex items-center justify-between gap-3">
                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="w-full min-w-0 bg-transparent text-5xl font-semibold outline-none placeholder:text-zinc-600"
                    />

                    <TokenDropdown
                        open={sellDropdownOpen}
                        onToggle={() => setSellDropdownOpen(!sellDropdownOpen)}
                        selected={sellToken}
                        onSelect={selectSellToken}
                    />
                </div>
            </div>

            {/* Swap Arrow */}
            <div className="-my-3 flex justify-center">
                <button
                    onClick={flipTokens}
                    className="z-10 rounded-2xl border-4 border-[#131313] bg-[#232323] p-3 transition hover:bg-[#2f2f2f]"
                >
                    <ArrowDown size={22} />
                </button>
            </div>

            {/* Buy */}
            <div className="rounded-3xl bg-[#1b1b1b] p-5">
                <p className="mb-3 text-sm text-zinc-400">Buy</p>

                <div className="flex items-center justify-between gap-3">
                    <input
                        type="text"
                        readOnly
                        placeholder="0"
                        value={buyAmount}
                        className="w-full min-w-0 bg-transparent text-5xl font-semibold text-zinc-200 outline-none placeholder:text-zinc-600"
                    />

                    <TokenDropdown
                        open={buyDropdownOpen}
                        onToggle={() => setBuyDropdownOpen(!buyDropdownOpen)}
                        selected={buyToken}
                        onSelect={selectBuyToken}
                    />
                </div>
            </div>

            {/* Action Button */}
            {hasQuote ? (
                <button
                    onClick={handleSwap}
                    disabled={isPending}
                    className="mt-3 w-full rounded-2xl bg-[#680047] py-4 text-2xl font-black tracking-tight transition hover:bg-[#F50DB4] hover:text-white disabled:opacity-60"
                >
                    {isPending ? "SWAPPING..." : "SWAP"}
                </button>
            ) : (
                <button
                    onClick={handleCalculateOutput}
                    disabled={calculating}
                    className="mt-3 w-full rounded-2xl bg-[#680047] py-4 text-2xl font-black tracking-tight transition hover:bg-[#F50DB4] hover:text-white disabled:opacity-60"
                >
                    {calculating ? "CALCULATING..." : "CALCULATE OUTPUT"}
                </button>
            )}
        </div>
    );
}