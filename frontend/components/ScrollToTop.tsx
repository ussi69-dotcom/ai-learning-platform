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

        // Force scroll to top immediately
        window.scrollTo(0, 0);

        // Backup: Ensure it stays at top after any async rendering
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}
