"use client";

import {
    ArrowLeftRight,
    Droplet,
    Layers,
    Minus,
    Plus,
    Repeat,
} from "lucide-react";
import type { ReactNode } from "react";

export default function ReadmePage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-14">
            <div className="text-center">
                <h1 className="text-4xl font-semibold text-white">
                    README
                </h1>

                <p className="mt-3 text-lg text-zinc-400">
                    A minimal guide to this Uniswap V2 demo.
                </p>
            </div>

            <Section title="What is this?">
                <p>
                    This project is a simplified implementation of Uniswap V2
                    built with Solidity, Foundry, Next.js, wagmi and
                    RainbowKit.
                </p>

                <p>
                    Every action interacts directly with smart contracts on a
                    local test network. Before adding liquidity or swapping,
                    claim some test tokens from the Faucet.
                </p>
            </Section>

            <Section title="How Uniswap V2 works">
                <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                        Every trading pair has its own liquidity pool containing
                        two ERC-20 token reserves.
                    </div>

                    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                        Liquidity providers deposit both tokens and receive LP
                        tokens representing their share of the pool.
                    </div>

                    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                        Swaps follow the constant-product formula:
                        <div className="mt-2 font-mono text-lg text-white">
                            reserveA × reserveB = k
                        </div>
                        <p className="mt-2">
                            Larger trades move the price more, creating
                            slippage.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Pages">
                <Page
                    icon={<Droplet size={18} />}
                    title="Faucet"
                    description="Claim 10 test tokens (TKA, TKB and TKC). These tokens have no real value and are only used to interact with this demo."
                />

                <Page
                    icon={<Plus size={18} />}
                    title="Add Liquidity"
                >
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Maximum Token A</li>
                        <li>Maximum Token B</li>
                        <li>Minimum Token A</li>
                        <li>Minimum Token B</li>
                    </ul>

                    <p className="mt-3">
                        The router deposits tokens into the pool and mints LP
                        tokens representing your ownership.
                    </p>
                </Page>

                <Page
                    icon={<Minus size={18} />}
                    title="Remove Liquidity"
                >
                    <ul className="list-disc space-y-1 pl-5">
                        <li>LP token amount</li>
                        <li>Minimum Token A</li>
                        <li>Minimum Token B</li>
                    </ul>

                    <p className="mt-3">
                        Burning LP tokens returns your proportional share of the
                        pool reserves.
                    </p>
                </Page>

                <Page
                    icon={<ArrowLeftRight size={18} />}
                    title="Pools"
                    description="View the reserves of every liquidity pool. Pool reserves determine exchange rates and price impact."
                />

                <Page
                    icon={<Repeat size={18} />}
                    title="Swap"
                >
                    <ol className="list-decimal space-y-1 pl-5">
                        <li>Select two tokens.</li>
                        <li>Enter the input amount.</li>
                        <li>Calculate the output.</li>
                        <li>Approve (if required) and execute the swap.</li>
                    </ol>

                    <p className="mt-3">
                        The output amount is calculated from the current pool
                        reserves using the Uniswap V2 pricing formula.
                    </p>
                </Page>
            </Section>

            <Section title="Notes">
                <ul className="list-disc space-y-2 pl-5">
                    <li>Runs on a test(sepolia) network.</li>
                    <li>Test tokens have no real value.</li>
                    <li>ERC-20 approvals are required before the router can transfer tokens.</li>
                    <li>Built for learning and demonstration purposes.</li>
                </ul>
            </Section>
        </main>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">
                {title}
            </h2>

            <div className="mt-5 space-y-4 text-zinc-400 leading-7">
                {children}
            </div>
        </section>
    );
}

function Page({
    icon,
    title,
    description,
    children,
}: {
    icon: ReactNode;
    title: string;
    description?: string;
    children?: ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
            <div className="mb-3 flex items-center gap-2">
                <span className="text-[#F50DB4]">{icon}</span>
                <h3 className="font-semibold text-white">{title}</h3>
            </div>

            {description && <p>{description}</p>}

            {children}
        </div>
    );
}