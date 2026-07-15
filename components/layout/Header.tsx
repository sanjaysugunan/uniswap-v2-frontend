"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-transparent">
            <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left */}
                <div className="flex items-center gap-10">
                    <Link
                        href="/"
                        className="transition duration-200 hover:scale-[1.02] hover:opacity-95"
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
                    <nav className="hidden items-center gap-1 rounded-full bg-[#17181D]/55 p-2 backdrop-blur-xl md:flex">
                         <NavLink href="/">Swap</NavLink>
                         <NavLink href="/liquidity">Liquidity</NavLink>
                        <NavLink href="/pools">Pools</NavLink>
                        <NavLink href="/faucet">Faucet</NavLink>
                    </nav>
                </div>

                {/* Right */}
                <div className="flex items-center">
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