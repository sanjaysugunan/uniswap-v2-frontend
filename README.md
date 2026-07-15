<div align="center">

# 🦄 Uniswap V2 Clone — Frontend

**A swap interface for a from-scratch Uniswap V2 clone**, built with Next.js, TypeScript, wagmi, and RainbowKit.

Contracts (AMM, liquidity pools, flash swaps, TWAP oracle, full Foundry test suite) live in the companion repo: [**uniswap-v2-clone**](https://github.com/sanjaysugunan/uniswap-v2-clone)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![wagmi](https://img.shields.io/badge/wagmi-black?style=for-the-badge)
![RainbowKit](https://img.shields.io/badge/RainbowKit-1E1E1E?style=for-the-badge&logo=rainbow&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 🚧 Status

Actively in progress. Core UI (header, connect wallet, swap card with token selection) is built; on-chain read/write logic (quotes, approvals, swap execution) is being wired up next.

## ✨ Features

- **Wallet connection** via RainbowKit — connect, switch networks, view account
- **Swap interface** — enter an amount, pick a token to sell and a token to buy from dropdown selectors, with the output amount calculated automatically
- **Token selection dropdowns** with search-free quick-select lists, preventing the same token being picked on both sides
- **Responsive header/nav** across Swap, Liquidity, Pools, and Faucet pages
- Clean, dark, Uniswap-inspired UI built with Tailwind

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| UI | React, Tailwind CSS, lucide-react icons |
| Wallet / Web3 | wagmi, RainbowKit, viem |
| Contracts consumed | [uniswap-v2-clone](https://github.com/sanjaysugunan/uniswap-v2-clone) (Foundry, Solidity) |

## 📁 Project Structure

```
uniswap-v2-frontend/
├── app/            # Next.js App Router pages & layouts
├── components/     # UI components (Header, SwapCard, etc.)
├── lib/            # wagmi config, contract ABIs/addresses, helpers
├── public/         # static assets (logo, icons)
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
```

## 🗺️ Roadmap

- [x] Header + wallet connect
- [x] Swap card UI with token dropdowns and calculated output
- [ ] Hook up live reserves/quotes from the AMM contracts
- [ ] Token approval + swap execution flow
- [ ] Liquidity add/remove pages
- [ ] Pools overview page
- [ ] Testnet faucet page
- [ ] Transaction status toasts / slippage settings

## 🔗 Related

- Contracts: [uniswap-v2-clone](https://github.com/sanjaysugunan/uniswap-v2-clone)

## 👤 Author

**Sanjay** — DeFi Protocol Engineer

[![Twitter](https://img.shields.io/badge/-@s4njyy-1DA1F2?style=flat-square&logo=x&logoColor=white)](https://x.com/s4njyy)
[![LinkedIn](https://img.shields.io/badge/-sanjaysugunan-0077B5?logo=linkedin)](https://www.linkedin.com/in/sanjaysugunan/)