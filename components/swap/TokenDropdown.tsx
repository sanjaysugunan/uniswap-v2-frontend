"use client";

import { ChevronDown } from "lucide-react";
import { TOKENS, type Token } from "@/lib/liquidity/tokens";

export default function TokenDropdown({
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
                <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-xl">
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