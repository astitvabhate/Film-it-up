"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            {/* Rotating Lens Image */}
            <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <img
                    src="/images/lens2.png"
                    alt="Loading..."
                    className="w-20 h-20 sm:w-24 sm:h-24"
                />
            </motion.div>

            {/* Loading Text */}
            <motion.p
                className="absolute bottom-1/3 text-white/60 text-sm font-mono tracking-widest"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                LOADING...
            </motion.p>
        </div>
    );
}
