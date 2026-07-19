"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-transparent">
            <div className="grid h-20 w-full grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
                {/* Left */}
                <div className="flex items-center gap-10">
                    <Link
                        href="/"
                        className="transition duration-200 hover:scale-[1.05] hover:opacity-95"
                    >
                        <Image
                            src="/uniswap.png"
                            alt="Uniswap"
                            width={180}
                            height={50}
                            priority
                        />
                    </Link>

                    {/* Navigation Container */}
                    <nav className="transition duration-200 hover:scale-[1.05] hidden items-center gap-1 rounded-full bg-[#17181D]/55 p-2 backdrop-blur-xl md:flex">
                         <NavLink href="/">Swap</NavLink>
                         <NavLink href="/liquidity">Liquidity</NavLink>
                        <NavLink href="/pools">Pools</NavLink>
                        <NavLink href="/faucet">Faucet</NavLink>
                    </nav>
                </div>

                {/* Center */}
                <div className="flex items-center justify-center">
                    <Link
                        href="/readme"
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#17181D]/55 px-5 py-2.5 text-sm font-bold text-zinc-300 backdrop-blur-xl transition duration-200 hover:scale-[1.05] hover:bg-[#262626] hover:text-white"
                    >
                        <BookOpen size={16} />
                        README
                    </Link>
                </div>

                {/* Right */}
                <div className="flex items-center justify-end">
                    <ConnectButton />
                </div>
            </div>
        </header>
    );
}

function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
                isActive
                    ? "bg-[#F50DB4] text-white"
                    : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
            }`}
        >
            {children}
        </Link>
    );
}