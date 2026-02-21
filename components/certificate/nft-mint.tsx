'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NFTMintProps {
    certificateId: string;
    className?: string;
}

export function NFTMint({ certificateId, className }: NFTMintProps) {
    return (
        <Card className={cn('p-6', className)}>
            <h3 className="text-lg font-semibold mb-4">Mint as NFT</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Mint your certificate as an NFT on Solana blockchain
            </p>
            <Button className="w-full">
                <Coins className="h-4 w-4 mr-2" />
                Mint NFT Certificate
            </Button>
        </Card>
    );
}
