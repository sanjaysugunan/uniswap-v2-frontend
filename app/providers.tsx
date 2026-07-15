"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState, useEffect } from "react"
import { WagmiProvider } from "wagmi"
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import config from "@/lib/wagmi"
import "@rainbow-me/rainbowkit/styles.css"

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                                            accentColor: '#F50DB4',
                                            accentColorForeground: 'white',
                                            borderRadius: 'large',
                                            overlayBlur: 'small',
                                            })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}