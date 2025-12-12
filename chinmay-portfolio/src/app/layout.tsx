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

          <footer className="w-full py-6 mt-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 px-4 sm:px-0">
              <div className="text-sm text-neutral-400">© {new Date().getFullYear()} Chinmay Kunhare</div>
              <div className="flex items-center gap-3">
                <a className="glass px-3 py-1 rounded-md text-sm" href="/privacy">Privacy</a>
                <a className="glass px-3 py-1 rounded-md text-sm" href="/terms">Terms</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
