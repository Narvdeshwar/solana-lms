import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        '@solana/wallet-adapter-base',
        '@solana/wallet-adapter-react',
        '@solana/wallet-adapter-react-ui',
        '@solana/wallet-adapter-wallets',
    ],
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'arweave.net',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
        ],
    },
};

export default nextConfig;
