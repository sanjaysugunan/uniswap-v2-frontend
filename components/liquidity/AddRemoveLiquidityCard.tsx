"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TOKENS, type Token } from "@/lib/liquidity/tokens";
import { TokenPicker } from "./shared";
import AddLiquidityCard from "./AddLiquidityCard";
import RemoveLiquidityCard from "./RemoveLiquidityCard";

type Mode = "add" | "remove";

export default function AddRemoveLiquidityCard() {
    const [mode, setMode] = useState<Mode>("add");

    // Pool selection — shared between Add and Remove modes
    const [tokenA, setTokenA] = useState(TOKENS[0]);
    const [tokenB, setTokenB] = useState(TOKENS[1]);
    const [dropdownOpen, setDropdownOpen] = useState<"A" | "B" | null>(null);

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
                <AddLiquidityCard tokenA={tokenA} tokenB={tokenB} />
            ) : (
                <RemoveLiquidityCard tokenA={tokenA} tokenB={tokenB} />
            )}
        </div>
    );
}