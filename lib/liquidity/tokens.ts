export type TokenKey = "tokenA" | "tokenB" | "tokenC";

export interface Token {
    symbol: string;
    name: string;
    key: TokenKey;
}

export const TOKENS: Token[] = [
    { symbol: "TKA", name: "Token A", key: "tokenA" },
    { symbol: "TKB", name: "Token B", key: "tokenB" },
    { symbol: "TKC", name: "Token C", key: "tokenC" },
];