import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Trophy, Zap } from 'lucide-react';
import { EnhancedCourseCard } from '@/components/course/enhanced-course-card';
import { MOCK_COURSES } from '@/lib/mock-data';

export default function HomePage() {
    const featuredCourses = MOCK_COURSES.slice(0, 3);
    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-solana-purple/10 to-transparent" />

                <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                    Learn Solana Development
                    <span className="block bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
                        Earn On-Chain Credentials
                    </span>
                </h1>

                <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                    Interactive courses, coding challenges, and verifiable NFT credentials.
                    Build production-ready dApps while earning XP and achievements.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/courses">
                            Explore Courses <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/dashboard">View Dashboard</Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="flex flex-col items-center">
                        <div className="mb-2 text-3xl font-bold">10+</div>
                        <div className="text-sm text-muted-foreground">Active Courses</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mb-2 text-3xl font-bold">500+</div>
                        <div className="text-sm text-muted-foreground">Students Learning</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mb-2 text-3xl font-bold">1000+</div>
                        <div className="text-sm text-muted-foreground">Credentials Issued</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-20">
                <div className="container mx-auto">
                    <h2 className="mb-12 text-center text-3xl font-bold">Why Superteam Academy?</h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-solana-purple/10 p-4">
                                <BookOpen className="h-8 w-8 text-solana-purple" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Interactive Learning</h3>
                            <p className="text-muted-foreground">
                                Learn by doing with integrated code editors, real-time feedback, and hands-on challenges.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-solana-green/10 p-4">
                                <Trophy className="h-8 w-8 text-solana-green" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">On-Chain Credentials</h3>
                            <p className="text-muted-foreground">
                                Earn verifiable NFT credentials that prove your skills and live in your wallet forever.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-solana-purple/10 p-4">
                                <Zap className="h-8 w-8 text-solana-purple" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Gamified Progress</h3>
                            <p className="text-muted-foreground">
                                Track XP, maintain streaks, unlock achievements, and compete on the leaderboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="px-4 py-20 bg-muted/30">
                <div className="container mx-auto">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">Featured Courses</h2>
                            <p className="mt-2 text-muted-foreground">
                                Start your Solana journey with our most popular courses
                            </p>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/courses">
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredCourses.map((course) => (
                            <EnhancedCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-20">
                <div className="container mx-auto">
                    <div className="rounded-lg bg-gradient-to-r from-solana-purple to-solana-green p-8 text-center text-white md:p-12">
                        <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
                        <p className="mb-6 text-lg opacity-90">
                            Join hundreds of developers building on Solana
                        </p>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/courses">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
