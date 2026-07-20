<div align="center">

# 🦄 Uniswap V2 Clone — Frontend

**A full swap, liquidity, and pool explorer interface for a from-scratch Uniswap V2 clone**, built with Next.js, TypeScript, wagmi, and RainbowKit.

Contracts (AMM, liquidity pools, flash swaps, TWAP oracle, full Foundry test suite) live in the companion repo: [**uniswap-v2-clone**](https://github.com/sanjaysugunan/uniswap-v2-clone)

**[🚀 Live Demo](https://uniswap-v2-clone-sanjay-sugunan.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![wagmi](https://img.shields.io/badge/wagmi-black?style=for-the-badge)
![RainbowKit](https://img.shields.io/badge/RainbowKit-1E1E1E?style=for-the-badge&logo=rainbow&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🚧 Status

End-to-end functional on testnet. Every core AMM action — claiming test tokens, adding/removing liquidity, swapping, and inspecting pool reserves — is wired up to live contract calls, not mocked data. Remaining work is mostly polish: see [Roadmap](#️-roadmap).

## ✨ Features

- **Wallet connection** via RainbowKit — connect, switch networks, view account
- **Swap** — enter an amount, pick tokens from dropdown selectors, get a live quote from the pool's reserves via `getAmountsOut`, then execute with a single confirm (auto-approves the router if needed)
- **Liquidity — Add** — pick a token pair, set max deposit amounts for each side plus min-received floors for slippage protection, and supply liquidity in one flow
- **Liquidity — Remove** — burn LP tokens for a pair and specify minimum amounts of each underlying token to receive back
- **Pools** — browse every configured token pair and fetch its live on-chain reserves on demand
- **Faucet** — claim test tokens (TKA, TKB, TKC) to a connected wallet, no funds required
- **In-app README page** — a plain-language explainer of the constant-product formula, slippage, and LP tokens, plus a walkthrough of how to use each page
- **Token selection dropdowns** that prevent picking the same token on both sides of a pair, with a one-click swap/flip control
- Clean, dark, Uniswap-inspired UI built with Tailwind — floating header nav and a minimal transparent footer with author/repo/social links

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| UI | React, Tailwind CSS, lucide-react icons |
| Wallet / Web3 | wagmi, RainbowKit, viem |
| Deployment | Vercel |
| Contracts consumed | [uniswap-v2-clone](https://github.com/sanjaysugunan/uniswap-v2-clone) (Foundry, Solidity) |

## 📁 Project Structure

```
uniswap-v2-frontend/
├── app/
│   ├── page.tsx            # Swap (home)
│   ├── liquidity/          # Add / Remove liquidity
│   ├── pools/               # Pool reserve explorer
│   ├── faucet/              # Test token faucet
│   └── readme/              # In-app README / how-it-works page
├── components/
│   ├── layout/               # Header, Footer
│   ├── swap/                 # SwapCard, TokenDropdown
│   ├── liquidity/            # Add/Remove liquidity cards, LP balance card
│   └── pools/                 # PoolReserveRow
├── lib/
│   ├── constants.ts          # Contract addresses + ABIs per chain
│   └── liquidity/            # Shared token list, allowance helper
├── public/                    # Static assets (logo, icons)
└── ...config files
```

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/sanjaysugunan/uniswap-v2-frontend.git
cd uniswap-v2-frontend
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Environment Variables

You'll need a WalletConnect / RainbowKit project ID and your deployed contract addresses. Create a `.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_A_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_B_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_C_ADDRESS=0x...
```

## 🗺️ Pages

| Route | What it does |
|---|---|
| `/` | Swap between TKA, TKB, and TKC with a live quote before you confirm |
| `/liquidity` | Add liquidity to a pair, or burn LP tokens to remove it |
| `/pools` | View live reserves for every TKA/TKB, TKB/TKC, and TKA/TKC pool |
| `/faucet` | Claim test tokens to try everything else on the site |
| `/readme` | A short explainer of Uniswap V2 mechanics and how to use this app |

## 🗺️ Roadmap

- [x] Header + wallet connect
- [x] Swap — token dropdowns, live quote via `getAmountsOut`, approve + `swapExactTokensForTokens`
- [x] Liquidity — add flow with min/max fields and allowance handling
- [x] Liquidity — remove flow with LP burn and min-received fields
- [x] Pools overview with on-demand reserve reads
- [x] Testnet faucet page
- [x] In-app README / onboarding page
- [ ] Fetch per-token `decimals()` instead of assuming 18 across all tokens
- [ ] Adjustable slippage tolerance in the UI (currently a fixed default)
- [ ] Transaction status toasts instead of `alert()` for pending/success/error states
- [ ] LP position value in underlying-token terms, not just raw LP balance

## 🔗 Related

- Contracts: [uniswap-v2-clone](https://github.com/sanjaysugunan/uniswap-v2-clone)
- Live demo: [uniswap-v2-clone-sanjay-sugunan.vercel.app](https://uniswap-v2-clone-sanjay-sugunan.vercel.app/)

## 👤 Author

**Sanjay** — DeFi Protocol Engineer

[![Twitter](https://img.shields.io/badge/-@s4njyy-1DA1F2?style=flat-square&logo=x&logoColor=white)](https://x.com/s4njyy)
[![LinkedIn](https://img.shields.io/badge/-sanjaysugunan-0077B5?logo=linkedin)](https://www.linkedin.com/in/sanjaysugunan/)