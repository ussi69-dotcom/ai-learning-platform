'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Disable browser's default scroll restoration to prevent "jumping"
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
        }

        // Delay check to allow hash to be set by async navigation (e.g., setTimeout in teasers)
        // This fixes race condition where hash is set AFTER pathname change
        const scrollTimeout = setTimeout(() => {
            // Skip scroll-to-top if there's a hash in the URL (e.g., /about#cycle-49)
            if (typeof window !== 'undefined' && window.location.hash) {
                return;
            }

            // Only scroll to top if no hash is present
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(scrollTimeout);
    }, [pathname]);

    return null;
}
