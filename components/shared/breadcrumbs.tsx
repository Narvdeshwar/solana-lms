'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav className={cn('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
            <Link
                href="/"
                className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={cn(
                                    isLast ? 'font-medium text-foreground' : 'text-muted-foreground'
                                )}
                            >
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

