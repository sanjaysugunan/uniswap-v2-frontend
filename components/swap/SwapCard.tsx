"use client";

import { useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";

type Token = {
    symbol: string;
    name: string;
};

const TOKENS: Token[] = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "USDT", name: "Tether" },
    { symbol: "WBTC", name: "Wrapped BTC" },
    { symbol: "UNI", name: "Uniswap" },
];

export default function SwapCard() {
    const [sellToken, setSellToken] = useState(TOKENS[0]);
    const [buyToken, setBuyToken] = useState(TOKENS[1]);

    const [sellAmount, setSellAmount] = useState("");

    const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
    const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);

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
                        onSelect={(token) => {
                            setSellToken(token);
                            setSellDropdownOpen(false);
                        }}
                    />
                </div>
            </div>

            {/* Swap Arrow */}
            <div className="-my-3 flex justify-center">
                <button className="z-10 rounded-2xl border-4 border-[#131313] bg-[#232323] p-3 transition hover:bg-[#2f2f2f]">
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
                        value=""
                        className="w-full min-w-0 bg-transparent text-5xl font-semibold text-zinc-200 outline-none placeholder:text-zinc-600"
                    />

                    <TokenDropdown
                        open={buyDropdownOpen}
                        onToggle={() => setBuyDropdownOpen(!buyDropdownOpen)}
                        selected={buyToken}
                        onSelect={(token) => {
                            setBuyToken(token);
                            setBuyDropdownOpen(false);
                        }}
                    />
                </div>
            </div>

            {/* Action Button */}
            <button className="mt-3 w-full rounded-2xl bg-[#680047] py-4 text-2xl font-black tracking-tight transition hover:bg-[#F50DB4] hover:text-white">
                CALCULATE OUTPUT
            </button>
        </div>
    );
}

function TokenDropdown({
    open,
    onToggle,
    selected,
    onSelect,
}: {
    open: boolean;
    onToggle: () => void;
    selected: Token;
    onSelect: (token: Token) => void;
}) {
    return (
        <div className="relative shrink-0">
            <button
                onClick={onToggle}
                className="flex items-center gap-2 rounded-full bg-[#262626] px-4 py-2 font-semibold transition hover:bg-[#323232]"
            >
                <span>{selected.symbol}</span>
                <ChevronDown
                    size={18}
                    className={`transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 z-20 mt-2 w-30 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-xl">
                    <ul className="py-1">
                        {TOKENS.map((token) => (
                            <li key={token.symbol}>
                                <button
                                    onClick={() => onSelect(token)}
                                    className="flex w-full flex-col px-4 py-3 text-left transition hover:bg-white/5"
                                >
                                    <span className="font-semibold">
                                        {token.symbol}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        {token.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}