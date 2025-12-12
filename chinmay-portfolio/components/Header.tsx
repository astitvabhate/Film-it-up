// components/Header.tsx
"use client";
import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-white/5">
            <span className="sr-only">Chinmay</span>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-95">
             <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="white"
                font-size="12"
                font-weight="bold"
                onClick={() => { window.location.href = '/'; }}
                style={{ cursor: 'pointer' }}
              >
                CK
              </text>

            </svg>
          </div>

          <div className="hidden sm:block">
            <div className="text-sm font-semibold">Chinmay Kunhare</div>
            <div className="text-xs text-neutral-400">Photography & Video</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a href="/" className="px-3 py-1 rounded-md text-sm bg-white/5">Portfolio</a>
          <a href="/brandCollab" className="px-3 py-1 rounded-md text-sm bg-white/5">Brand Collab</a>
          <a href="/contact" className="px-3 py-1 rounded-md text-sm bg-white/5">Contact</a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setOpen(s => !s)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-md bg-white/5"
          >
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* small mobile panel */}
      {open && (
        <div className="md:hidden mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-2">
            <a href="/" className="px-3 py-2 rounded-md text-sm bg-white/5" onClick={() => setOpen(false)}>Portfolio</a>
            <a href="/brandCollab" className="px-3 py-2 rounded-md text-sm bg-white/5" onClick={() => setOpen(false)}>Brand Collab</a>
            <a href="/contact" className="px-3 py-2 rounded-md text-sm bg-white/5" onClick={() => setOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
