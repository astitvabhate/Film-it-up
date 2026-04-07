// app/layout.tsx
import "./globals.css";
import React from "react";
import Header from "../../components/Header";

export const metadata = {
  title: "Chinmay Kunhare — Portfolio",
  description: "Cinematic photography & reels",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-from-black via-neutral-900 to-black text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 w-full">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
          </main>

          {/* <section className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.32em] text-white/45">Before You Go</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Open for My Works, travel stories, and creative campaigns.</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  If you want visuals with a cinematic, natural feel, let&apos;s connect.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/brandCollab"
                  className="rounded-full border border-white/15 bg-white px-5 py-2 text-center text-sm font-medium text-black transition hover:bg-white/90"
                >
                  My Work
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/20 bg-white/8 px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-white/14"
                >
                  Contact
                </Link>
                <a
                  href="https://www.instagram.com/chinmayx"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-white/8 px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-white/14"
                >
                  Instagram
                </a>
              </div>
            </div>
          </section> */}

          <footer className="w-full py-6 mt-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 px-4 sm:px-0">
              <div className="text-sm text-neutral-400">© {new Date().getFullYear()} Chinmay Kunhare</div>
              <div className="flex items-center gap-3">
                <a className="glass px-3 py-1 rounded-md text-sm">Thank You</a>
                <a className="glass px-3 py-1 rounded-md text-sm" href="https://www.instagram.com/chinmayx" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
