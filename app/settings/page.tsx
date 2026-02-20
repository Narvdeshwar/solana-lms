'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { User, Bell, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { truncateAddress } from '@/lib/solana/helpers';

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'privacy', label: 'Privacy', icon: Shield },
];

export default function SettingsPage() {
    const { connected, publicKey } = useWallet();
    const [activeTab, setActiveTab] = useState('profile');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [achievementNotifications, setAchievementNotifications] = useState(true);

    if (!connected) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="rounded-full bg-muted p-6">
                        <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
                        <p className="text-muted-foreground">
                            Connect your wallet to access settings
                        </p>
                    </div>
                    <WalletMultiButton />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-4">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>
                                        Update your profile information and connected accounts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Wallet Address
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm">
                                                {truncateAddress(publicKey?.toBase58() || '', 12)}
                                            </code>
                                            <Badge className="bg-green-500">Connected</Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your display name"
                                            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Bio</label>
                                        <textarea
                                            placeholder="Tell us about yourself"
                                            rows={4}
                                            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <Button>Save Changes</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Connected Accounts</CardTitle>
                                    <CardDescription>
                                        Link additional authentication methods
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">GitHub</div>
                                            <div className="text-sm text-muted-foreground">
                                                Not connected
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Connect
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Choose what notifications you want to receive
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Email Notifications</div>
                                        <div className="text-sm text-muted-foreground">
                                            Receive updates via email
                                        </div>
                                    </div>
                                    <Button
                                        className={emailNotifications ? '' : 'bg-transparent border'}
                                        size="sm"
                                        onClick={() => setEmailNotifications(!emailNotifications)}
                                    >
                                        {emailNotifications ? 'Enabled' : 'Disabled'}
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Achievement Notifications</div>
                                        <div className="text-sm text-muted-foreground">
                                            Get notified when you earn achievements
                                        </div>
                                    </div>
                                    <Button
                                        className={achievementNotifications ? '' : 'bg-transparent border'}
                                        size="sm"
                                        onClick={() =>
                                            setAchievementNotifications(!achievementNotifications)
                                        }
                                    >
                                        {achievementNotifications ? 'Enabled' : 'Disabled'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'language' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Language & Region</CardTitle>
                                <CardDescription>
                                    Choose your preferred language
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Display Language
                                    </label>
                                    <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                        <option value="en">English</option>
                                        <option value="pt-BR">Português (Brasil)</option>
                                        <option value="es">Español</option>
                                    </select>
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'privacy' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>
                                    Control your privacy and data preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Public Profile</div>
                                        <div className="text-sm text-muted-foreground">
                                            Allow others to view your profile
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        Public
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Show on Leaderboard</div>
                                        <div className="text-sm text-muted-foreground">
                                            Display your rank publicly
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        Enabled
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
