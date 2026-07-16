"use client";

type Position = {
    pair: string;
    balance: string;
};

const POSITIONS: Position[] = [
    {
        pair: "ETH / USDC",
        balance: "12.4821",
    },
    {
        pair: "WBTC / ETH",
        balance: "0.0912",
    },
];

export default function LPTokenBalanceCard() {
    return (
        <div className="w-[340px] rounded-3xl bg-[#131317] p-3 text-white shadow-2xl">
            <div className="rounded-3xl border border-white/10 bg-[#1b1b1b] p-5">
                <h2 className="flex justify-center mb-5 text-xl font-bold">
                    LP Token Balances
                </h2>

                <div className="space-y-3">
                    {POSITIONS.map((position) => (
                        <div
                            key={position.pair}
                            className="flex items-center justify-between rounded-2xl bg-[#232323] px-4 py-3"
                        >
                            <div>
                                <p className="font-semibold">
                                    {position.pair}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Liquidity Pool
                                </p>
                            </div>

                            {/* Initially this will be 0 LP.
                                Later you'll replace it with the real balance. */}
                            <p className="text-lg font-bold text-zinc-300">
                                0 LP
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-5 w-full rounded-2xl bg-[#680047] py-3 text-lg font-bold transition hover:bg-[#F50DB4]"
                >
                    View Balances
                </button>
            </div>
        </div>
    );
}