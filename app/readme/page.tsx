"use client";

import {
    ArrowLeftRight,
    Droplet,
    Layers,
    Minus,
    Plus,
    Repeat,
    Waves,
} from "lucide-react";
import type { ReactNode } from "react";

export default function ReadmePage() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] justify-center px-4 py-12">
            <div className="w-full max-w-3xl">
                <h1 className="flex justify-center text-4xl font-semibold text-white">README</h1>
                <p className="flex justify-center mt-2 text-xl text-zinc-400">
                    A quick guide to this demo and how Uniswap V2 actually works
                    under the hood.
                </p>

                {/* What is this */}
                <Section icon={<Waves size={20} />} title="What this site is">
                    <p className="flex justify-center mt-2 text-lg text-zinc-400">
                        This is a demo frontend for a Uniswap V2 clone. It talks
                        directly to a small set of smart contracts deployed on a
                        test chain: a Factory (creates and tracks pools), a
                        Router (the contract your wallet actually calls to add
                        liquidity, remove liquidity, and swap), and three test
                        ERC-20 tokens — TKA, TKB, and TKC.
                    </p>
                    <p className="flex justify-center mt-2 text-lg text-zinc-400">
                        Every action here — swapping, adding liquidity, removing
                        liquidity — sends a real transaction from your connected
                        wallet, so you&apos;ll need test tokens before anything
                        will work.
                    </p>
                </Section>

                {/* How Uniswap V2 works */}
                <Section icon={<Layers size={20} />} title="How Uniswap V2 works">
                    <p className="mt-2 text-lg text-zinc-400">
                        Uniswap V2 is an automated market maker (AMM). Instead of
                        matching buyers and sellers with an order book, every
                        pair of tokens (say TKA/TKB) has its own pool holding a
                        reserve of both tokens. Prices are set entirely by the
                        ratio of those two reserves.
                    </p>
                    <p className="mt-2 text-lg text-zinc-400">
                        Each pool enforces a simple invariant:{" "}
                        <span className="font-mono text-zinc-200">
                            reserveA × reserveB = k
                        </span>
                        . Whenever someone swaps, the contract keeps{" "}
                        <span className="font-mono text-zinc-200">k</span>{" "}
                        constant — so buying more of one token pushes its price
                        up along a curve, rather than at a fixed rate. Larger
                        trades relative to the pool size move the price more;
                        that difference between the quoted and executed price is
                        called <span className="text-zinc-200">slippage</span>.
                    </p>
                    <p className="flex justify-center mt-2 text-lg text-zinc-400">
                        Anyone can become a liquidity provider (LP) by depositing
                        an equal-value amount of both tokens into a pool. In
                        return, they receive LP tokens representing their share
                        of that pool. LP tokens can later be burned to withdraw
                        the underlying tokens — plus a cut of the trading fees
                        collected while they were deposited.
                    </p>
                </Section>

                {/* Faucet */}
                <Section icon={<Droplet size={20} />} title="1. Faucet">
                    <p className="mt-2 text-lg text-zinc-400">
                        Start here. Connect your wallet and claim 10 of each test
                        token — TKA, TKB, and TKC — sent directly to your
                        address. You&apos;ll need these to try anything else on
                        the site.
                    </p>
                </Section>

                {/* Liquidity */}
                <Section icon={<Plus size={20} />} title="2. Liquidity — Add">
                    <p className="mt-2 text-lg text-zinc-400">
                        Toggle which two tokens you want to pair (TKA/TKB,
                        TKB/TKC, or TKA/TKC), then fill in:
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-lg text-zinc-400">
                        <li>
                            <span className="text-zinc-200">Max Token 1 / Max Token 2</span>{" "}
                            — the most of each token you&apos;re willing to
                            deposit.
                        </li>
                        <li>
                            <span className="text-zinc-200">Min Token 1 / Min Token 2</span>{" "}
                            — the least you&apos;ll accept back if the pool ratio
                            shifts before your transaction confirms. This is your
                            slippage protection — the transaction reverts rather
                            than deposit at a worse ratio than you specified.
                        </li>
                    </ul>
                    <p className="mt-2 text-lg text-zinc-400">
                        If the pool already has liquidity, the contract deposits
                        both tokens in the pool&apos;s existing ratio (using as
                        much of your "max" amounts as it can) and mints you LP
                        tokens for that pair.
                    </p>
                </Section>

                <Section icon={<Minus size={20} />} title="3. Liquidity — Remove">
                    <p className="mt-2 text-lg text-zinc-400">
                        Toggle the same token pair, then specify how many LP
                        tokens to burn along with Min Token 1 / Min Token 2 — the
                        least of each underlying token you&apos;ll accept in
                        return. Burning LP tokens returns your share of both
                        reserves, proportional to how much of the pool your LP
                        tokens represent.
                    </p>
                </Section>

                {/* Pools */}
                <Section icon={<ArrowLeftRight size={20} />} title="4. Pools">
                    <p className="mt-2 text-lg text-zinc-400">
                        Browse every TKA/TKB, TKB/TKC, and TKA/TKC pool and check
                        its current reserves on demand. Reserves are what
                        determine the live exchange rate for that pair — the
                        bigger a pool relative to your trade, the less price
                        impact your swap will have.
                    </p>
                </Section>

                {/* Swap */}
                <Section icon={<Repeat size={20} />} title="5. Swap">
                    <p className="mt-2 text-lg text-zinc-400">
                        The main page. Toggle Token 1 and Token 2, enter an
                        amount of Token 1 to sell, then hit{" "}
                        <span className="text-zinc-200">Calculate Output</span>{" "}
                        — this reads the pool&apos;s reserves and quotes what
                        you&apos;d receive under the constant-product formula
                        above, including the trading fee. Once quoted, the
                        button becomes{" "}
                        <span className="text-zinc-200">Swap</span>, which
                        approves the router (if needed) and executes the trade.
                    </p>
                </Section>

                <p className="flex justify-center mt-10 text-sm text-zinc-500">
                    This is a test-chain demo — tokens have no real value.
                </p>
            </div>
        </main>
    );
}

function Section({
    icon,
    title,
    children,
}: {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="mt-4 rounded-3xl border border-white/10 bg-[#1b1b1b] p-6">
            <div className="mb-3 flex items-center gap-2 text-white">
                <span className="text-[#F50DB4]">{icon}</span>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
                {children}
            </div>
        </div>
    );
}