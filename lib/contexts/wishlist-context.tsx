'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (courseId: string) => void;
    removeFromWishlist: (courseId: string) => void;
    isInWishlist: (courseId: string) => boolean;
    toggleWishlist: (courseId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            setWishlist(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isLoaded]);

    const addToWishlist = (courseId: string) => {
        setWishlist((prev) => {
            if (prev.includes(courseId)) return prev;
            return [...prev, courseId];
        });
    };

    const removeFromWishlist = (courseId: string) => {
        setWishlist((prev) => prev.filter((id) => id !== courseId));
    };

    const isInWishlist = (courseId: string) => {
        return wishlist.includes(courseId);
    };

    const toggleWishlist = (courseId: string) => {
        if (isInWishlist(courseId)) {
            removeFromWishlist(courseId);
        } else {
            addToWishlist(courseId);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
