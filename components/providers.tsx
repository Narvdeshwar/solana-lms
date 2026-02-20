'use client';

import { ThemeProvider } from 'next-themes';
import { WalletProvider } from './wallet-provider';
import { WishlistProvider } from '@/lib/contexts/wishlist-context';
import { Toaster } from './ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <WalletProvider>
                <WishlistProvider>
                    {children}
                    <Toaster />
                </WishlistProvider>
            </WalletProvider>
        </ThemeProvider>
    );
}
