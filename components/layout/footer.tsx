import Link from 'next/link';
import { BookOpen, Twitter, Github } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const footerLinks = {
    product: [
        { name: 'Courses', href: ROUTES.COURSES },
        { name: 'Dashboard', href: ROUTES.DASHBOARD },
        { name: 'Leaderboard', href: ROUTES.LEADERBOARD },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'GitHub', href: 'https://github.com/solanabr/superteam-academy' },
        { name: 'Discord', href: 'https://discord.gg/superteambrasil' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'License', href: '/license' },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-muted/50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-solana-purple to-solana-green">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <span>Superteam Academy</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Learn Solana development with interactive courses and earn on-chain credentials.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://twitter.com/SuperteamBR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/solanabr/superteam-academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} Superteam Brazil. Built for the Solana community.
                    </p>
                </div>
            </div>
        </footer>
    );
}
