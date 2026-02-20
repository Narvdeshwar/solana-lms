import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, SOLANA_RPC_URL } from '@/lib/constants';

// This will be generated from the IDL
// For now, we'll use a placeholder type
export type OnchainAcademy = any;

/**
 * Get Anchor program instance
 */
export function getProgram(wallet?: Wallet): Program<OnchainAcademy> {
    const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

    // Use a dummy wallet if none provided (for read-only operations)
    const dummyWallet = wallet || {
        publicKey: PublicKey.default,
        signTransaction: async (tx: any) => tx,
        signAllTransactions: async (txs: any[]) => txs,
    };

    const provider = new AnchorProvider(
        connection,
        dummyWallet as any,
        { commitment: 'confirmed' }
    );

    // In production, import the actual IDL
    // For now, return a mock program
    return {
        provider,
        programId: PROGRAM_ID,
    } as any;
}

/**
 * Get connection instance
 */
export function getConnection(): Connection {
    return new Connection(SOLANA_RPC_URL, 'confirmed');
}
