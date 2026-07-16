"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

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

type Mode = "add" | "remove";

export default function AddRemoveLiquidityCard() {
    const [mode, setMode] = useState<Mode>("add");

    // Pool selection
    const [tokenA, setTokenA] = useState(TOKENS[0]);
    const [tokenB, setTokenB] = useState(TOKENS[1]);
    const [dropdownOpen, setDropdownOpen] = useState<"A" | "B" | null>(null);

    // Add liquidity state
    const [amountA, setAmountA] = useState("");
    const [amountB, setAmountB] = useState("");
    const [minA, setMinA] = useState("");
    const [minB, setMinB] = useState("");

    // Remove liquidity state
    const [lpAmount, setLpAmount] = useState("");
    const [removeMinA, setRemoveMinA] = useState("");
    const [removeMinB, setRemoveMinB] = useState("");

    const selectToken = (side: "A" | "B", token: Token) => {
        if (side === "A") {
            if (token.symbol === tokenB.symbol) setTokenB(tokenA);
            setTokenA(token);
        } else {
            if (token.symbol === tokenA.symbol) setTokenA(tokenB);
            setTokenB(token);
        }
        setDropdownOpen(null);
    };

    return (
        <div className="w-full max-w-md rounded-3xl bg-[#131317] p-3 text-white shadow-2xl">
            {/* Mode switch */}
            <div className="mb-3 flex gap-1 rounded-2xl bg-[#1b1b1b] p-1">
                <button
                    onClick={() => setMode("add")}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
                        mode === "add"
                            ? "bg-[#262626] text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                    Add
                </button>
                <button
                    onClick={() => setMode("remove")}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
                        mode === "remove"
                            ? "bg-[#262626] text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                    Remove
                </button>
            </div>

            {/* Pool selector */}
            <div className="mb-2 flex items-center gap-2 rounded-3xl border border-white/10 bg-[#1b1b1b] p-3">
                <TokenPicker
                    open={dropdownOpen === "A"}
                    onToggle={() =>
                        setDropdownOpen(dropdownOpen === "A" ? null : "A")
                    }
                    selected={tokenA}
                    onSelect={(t) => selectToken("A", t)}
                />
                <Plus size={16} className="shrink-0 text-zinc-600" />
                <TokenPicker
                    open={dropdownOpen === "B"}
                    onToggle={() =>
                        setDropdownOpen(dropdownOpen === "B" ? null : "B")
                    }
                    selected={tokenB}
                    onSelect={(t) => selectToken("B", t)}
                />
            </div>

            {mode === "add" ? (
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

                    <button className="w-full rounded-2xl bg-[#680047] py-4 text-lg font-bold tracking-tight transition hover:bg-[#F50DB4]">
                        Add Liquidity
                    </button>
                </>
            ) : (
                <>
                    <AmountField
                        label={`LP tokens to burn (${tokenA.symbol}/${tokenB.symbol})`}
                        value={lpAmount}
                        onChange={setLpAmount}
                    />

                    <div className="mb-3 flex gap-2">
                        <MinField
                            label={`Min ${tokenA.symbol}`}
                            value={removeMinA}
                            onChange={setRemoveMinA}
                        />
                        <MinField
                            label={`Min ${tokenB.symbol}`}
                            value={removeMinB}
                            onChange={setRemoveMinB}
                        />
                    </div>

                    <button className="w-full rounded-2xl bg-[#680047] py-4 text-lg font-bold tracking-tight transition hover:bg-[#F50DB4]">
                        Remove Liquidity
                    </button>
                </>
            )}
        </div>
    );
}

function AmountField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="mb-2 rounded-3xl border border-white/10 bg-[#1b1b1b] p-4">
            <p className="mb-2 text-sm text-zinc-400">{label}</p>
            <input
                type="text"
                inputMode="decimal"
                placeholder="0.0"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-w-0 bg-transparent text-3xl font-semibold outline-none placeholder:text-zinc-600"
            />
        </div>
    );
}

function MinField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex-1 rounded-2xl bg-[#1b1b1b] px-4 py-3">
            <p className="mb-1 text-xs text-zinc-500">{label}</p>
            <input
                type="text"
                inputMode="decimal"
                placeholder="0.0"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-w-0 bg-transparent text-base font-semibold outline-none placeholder:text-zinc-600"
            />
        </div>
    );
}

function TokenPicker({
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
        <div className="relative flex-1">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-2 rounded-2xl bg-[#262626] px-4 py-2.5 font-semibold transition hover:bg-[#323232]"
            >
                <span>{selected.symbol}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute left-0 z-20 mt-2 w-full min-w-[160px] overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-xl">
                    <ul className="py-1">
                        {TOKENS.map((token) => (
                            <li key={token.symbol}>
                                <button
                                    onClick={() => onSelect(token)}
                                    className="flex w-full flex-col px-4 py-2.5 text-left transition hover:bg-white/5"
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