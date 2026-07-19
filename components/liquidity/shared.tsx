"use client";

import { ChevronDown } from "lucide-react";
import type { Token } from "@/lib/liquidity/tokens";
import { TOKENS } from "@/lib/liquidity/tokens";

export function AmountField({
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

export function MinField({
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

export function TokenPicker({
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
                                    <span className="font-semibold text-zinc-500">
                                        {token.symbol}
                                    </span>
                                    <span className="text-md text-zinc-100">
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