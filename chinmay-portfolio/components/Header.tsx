// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Portfolio" },
  { href: "/brandCollab", label: "My Work" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname.startsWith("/brandCollab")) return "/brandCollab";
    if (pathname.startsWith("/contact")) return "/contact";
    return "/";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-black/50 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 rounded-2xl px-1 py-1 transition hover:bg-white/5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sm font-black tracking-[0.2em] text-white">
              CK
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">Chinmay Kunhare</div>
              <div className="truncate text-xs uppercase tracking-[0.24em] text-white/45">Cinematographer</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white/80 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <a
              href="https://www.instagram.com/chinmayx"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/14"
            >
              Instagram
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((state) => !state)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white transition hover:bg-white/10 md:hidden"
          >
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {open && (
        <div
          className="fixed inset-0 z-60 flex items-start justify-center bg-black/65 px-4 pt-24 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-[26px] border border-white/10 bg-neutral-950/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">Menu</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-white transition hover:bg-white/10"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
