'use client';

import { useParams } from 'next/navigation';
import { Award, ExternalLink, Download, Share2, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingPage } from '@/components/shared/loading-spinner';
import { truncateAddress } from '@/lib/solana/helpers';

// Mock certificate data
const mockCertificate = {
    id: 'cert-1',
    assetAddress: 'CertNFT123...XYZ789',
    trackId: 1,
    trackName: 'Solana Development',
    level: 1,
    name: 'Solana Fundamentals Certificate',
    description: 'Successfully completed the Solana Fundamentals course',
    imageUri: undefined,
    metadataUri: 'https://arweave.net/mock-metadata',
    coursesCompleted: 1,
    totalXp: 750,
    issuedAt: new Date('2024-01-15'),
    recipient: 'ABC123...XYZ789',
    recipientName: 'Developer42',
    collectionAddress: 'Collection123...XYZ',
    transactionSignature: 'TxSig123...XYZ789',
    courseName: 'Solana Fundamentals',
};

export default function CertificatePage() {
    const params = useParams();
    const certificateId = params.id as string;

    const certificate = mockCertificate; // In production, fetch by certificateId

    if (!certificate) {
        return <LoadingPage text="Loading certificate..." />;
    }

    const handleShare = (platform: 'twitter' | 'linkedin') => {
        const url = window.location.href;
        const text = `I just earned my ${certificate.name} on Superteam Academy! 🎓`;

        if (platform === 'twitter') {
            window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                '_blank'
            );
        } else {
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                '_blank'
            );
        }
    };

    const handleViewOnChain = () => {
        window.open(
            `https://explorer.solana.com/address/${certificate.assetAddress}?cluster=devnet`,
            '_blank'
        );
    };

    const handleDownload = () => {
        // In production, this would generate a PDF
        alert('Download functionality will be implemented');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-gradient-to-br from-solana-purple to-solana-green p-4">
                            <Award className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-2 text-4xl font-bold">Certificate of Completion</h1>
                    <p className="text-muted-foreground">
                        Verified on Solana blockchain
                    </p>
                </div>

                {/* Certificate Card */}
                <Card className="mb-8 overflow-hidden">
                    <div className="bg-gradient-to-br from-solana-purple/10 to-solana-green/10 p-12">
                        <div className="text-center">
                            <div className="mb-6">
                                <Badge variant="outline" className="mb-4">
                                    <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                                    Verified
                                </Badge>
                                <h2 className="mb-2 text-3xl font-bold">{certificate.name}</h2>
                                <p className="text-muted-foreground">{certificate.description}</p>
                            </div>

                            <div className="mb-6">
                                <p className="mb-2 text-sm text-muted-foreground">This certifies that</p>
                                <p className="mb-4 text-2xl font-bold">{certificate.recipientName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {truncateAddress(certificate.recipient, 12)}
                                </p>
                            </div>

                            <div className="mb-6">
                                <p className="mb-2 text-sm text-muted-foreground">has successfully completed</p>
                                <p className="text-xl font-semibold">{certificate.courseName}</p>
                            </div>

                            <div className="flex justify-center gap-8 text-sm">
                                <div>
                                    <div className="font-semibold">{certificate.totalXp}</div>
                                    <div className="text-muted-foreground">XP Earned</div>
                                </div>
                                <div>
                                    <div className="font-semibold">{certificate.coursesCompleted}</div>
                                    <div className="text-muted-foreground">Courses</div>
                                </div>
                                <div>
                                    <div className="font-semibold">Level {certificate.level}</div>
                                    <div className="text-muted-foreground">Track Level</div>
                                </div>
                            </div>

                            <div className="mt-8 text-sm text-muted-foreground">
                                Issued on {certificate.issuedAt.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Actions */}
                <div className="mb-8 flex flex-wrap justify-center gap-4">
                    <Button onClick={handleViewOnChain}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Solana Explorer
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Certificate
                    </Button>
                    <Button variant="outline" onClick={() => handleShare('twitter')}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share on Twitter
                    </Button>
                    <Button variant="outline" onClick={() => handleShare('linkedin')}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share on LinkedIn
                    </Button>
                </div>

                {/* Verification Details */}
                <Card>
                    <CardContent className="pt-6">
                        <h3 className="mb-4 text-lg font-semibold">Verification Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">NFT Address</span>
                                <code className="rounded bg-muted px-2 py-1 text-xs">
                                    {truncateAddress(certificate.assetAddress, 8)}
                                </code>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Collection</span>
                                <code className="rounded bg-muted px-2 py-1 text-xs">
                                    {truncateAddress(certificate.collectionAddress, 8)}
                                </code>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Transaction</span>
                                <code className="rounded bg-muted px-2 py-1 text-xs">
                                    {truncateAddress(certificate.transactionSignature, 8)}
                                </code>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Metadata URI</span>
                                <a
                                    href={certificate.metadataUri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    View Metadata
                                </a>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Network</span>
                                <Badge variant="outline">Solana Devnet</Badge>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg bg-muted p-4">
                            <p className="text-sm text-muted-foreground">
                                This certificate is a soulbound NFT stored on the Solana blockchain.
                                It cannot be transferred and serves as permanent proof of course completion.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
