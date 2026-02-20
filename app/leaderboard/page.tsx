'use client';

import { useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { truncateAddress, formatNumber } from '@/lib/solana/helpers';
import { MOCK_LEADERBOARD } from '@/lib/mock-data';

type Period = 'weekly' | 'monthly' | 'all-time';

const periods = [
    { label: 'Weekly', value: 'weekly' as Period },
    { label: 'Monthly', value: 'monthly' as Period },
    { label: 'All Time', value: 'all-time' as Period },
];

export default function LeaderboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all-time');
    const [currentPage, setCurrentPage] = useState(1);

    const mockLeaderboard = MOCK_LEADERBOARD;
    const itemsPerPage = 20;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = mockLeaderboard.slice(startIndex, endIndex);
    const totalPages = Math.ceil(mockLeaderboard.length / itemsPerPage);

    const top3 = mockLeaderboard.slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold">Leaderboard</h1>
                <p className="text-lg text-muted-foreground">
                    Compete with developers worldwide and climb the ranks
                </p>
            </div>

            {/* Period Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
                {periods.map((period) => (
                    <Button
                        key={period.value}
                        variant={selectedPeriod === period.value ? 'default' : 'outline'}
                        onClick={() => setSelectedPeriod(period.value)}
                    >
                        {period.label}
                    </Button>
                ))}
            </div>

            {/* Top 3 */}
            <div className="mb-8 grid gap-4 md:grid-cols-3">
                {top3.map((entry, index) => {
                    const icons = [
                        <Trophy key="1" className="h-8 w-8 text-yellow-500" />,
                        <Medal key="2" className="h-8 w-8 text-gray-400" />,
                        <Award key="3" className="h-8 w-8 text-amber-600" />,
                    ];

                    return (
                        <Card
                            key={entry.userId}
                            className={`relative overflow-hidden ${index === 0 ? 'border-yellow-500/50 bg-yellow-500/5' : ''
                                }`}
                        >
                            <CardContent className="flex flex-col items-center p-6 text-center">
                                <div className="mb-4">{icons[index]}</div>
                                <div className="mb-2 text-2xl font-bold">#{entry.rank}</div>
                                <div className="mb-1 text-lg font-semibold">{entry.username}</div>
                                <div className="mb-3 text-sm text-muted-foreground">
                                    {truncateAddress(entry.walletAddress)}
                                </div>
                                <Badge variant="outline" className="text-lg">
                                    {formatNumber(entry.xpBalance)} XP
                                </Badge>
                                <div className="mt-2 text-sm text-muted-foreground">
                                    Level {entry.level}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Leaderboard Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Wallet</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold">XP</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold">Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((entry) => (
                                    <tr
                                        key={entry.userId}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">#{entry.rank}</span>
                                                {entry.rank <= 3 && (
                                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{entry.username}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm text-muted-foreground">
                                                {truncateAddress(entry.walletAddress)}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-semibold">
                                                {formatNumber(entry.xpBalance)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Badge variant="outline">Level {entry.level}</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t px-6 py-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {startIndex + 1} to {Math.min(endIndex, mockLeaderboard.length)} of{' '}
                                {mockLeaderboard.length} entries
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
