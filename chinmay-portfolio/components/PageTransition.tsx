"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        // Show loader when route changes
        setIsLoading(true);

        // Simulate minimum loading time for visual effect
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsLoading(false);
        }, 800); // Show loader for at least 800ms

        return () => clearTimeout(timer);
    }, [pathname, children]);

    return (
        <>
            {/* Loading Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                    >
                        {/* Rotating Lens */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <img
                                src="/images/lens2.png"
                                alt="Loading..."
                                className="w-16 h-16 sm:w-20 sm:h-20"
                            />
                        </motion.div>

                        {/* Loading Text */}
                        <motion.p
                            className="mt-6 text-white/60 text-xs font-mono tracking-widest"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            LOADING
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content */}
            {displayChildren}
        </>
    );
}
