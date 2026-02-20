'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { BookOpen, LayoutDashboard, Trophy, Settings, Menu, Heart } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navigation = [
    { name: 'Courses', href: ROUTES.COURSES, icon: BookOpen },
    { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Leaderboard', href: ROUTES.LEADERBOARD, icon: Trophy },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-solana-purple to-solana-green">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <span className="hidden sm:inline">Superteam Academy</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                                    isActive ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/wishlist" className="hidden md:block">
                        <Button variant="ghost" size="icon">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </Link>

                    <Link href={ROUTES.SETTINGS} className="hidden md:block">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </Link>

                    <WalletMultiButton className="!bg-primary !text-primary-foreground hover:!bg-primary/90" />

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t md:hidden">
                    <div className="container mx-auto space-y-1 px-4 py-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <Link
                            href={ROUTES.SETTINGS}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
