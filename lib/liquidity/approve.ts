import type { Config } from "wagmi";
import { readContract, waitForTransactionReceipt } from "wagmi/actions";
import { erc20Abi } from "@/lib/constants";

type WriteContractAsync = (args: {
    abi: typeof erc20Abi;
    address: `0x${string}`;
    functionName: "approve";
    args: [`0x${string}`, bigint];
}) => Promise<`0x${string}`>;

/**
 * Checks the current allowance for `spender` and, if it's below `amount`,
 * sends an approve tx and waits for it to confirm before returning.
 * Used by both add and remove liquidity so the approve-if-needed logic
 * only lives in one place.
 */
export async function ensureAllowance({
    config,
    writeContractAsync,
    owner,
    spender,
    token,
    amount,
}: {
    config: Config;
    writeContractAsync: WriteContractAsync;
    owner: `0x${string}`;
    spender: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
}) {
    const allowance = (await readContract(config, {
        abi: erc20Abi,
        address: token,
        functionName: "allowance",
        args: [owner, spender],
    })) as bigint;

    if (allowance >= amount) return;

    const hash = await writeContractAsync({
        abi: erc20Abi,
        address: token,
        functionName: "approve",
        args: [spender, amount],
    });

    await waitForTransactionReceipt(config, { hash });
}