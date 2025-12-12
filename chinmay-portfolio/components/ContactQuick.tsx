"use client";

import React, { useMemo, useState } from "react";
import { FiInstagram, FiExternalLink, FiClock, FiPhone } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import Image from "next/image";




// URL builders
function buildInstagramWebUrl(username: string) {
  return `https://www.instagram.com/${encodeURIComponent(username)}`;
}
function buildWhatsAppUrl(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "https://www.whatsapp.com/";
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

// Decorative QR SVG generator
function decorativeQrDataUrl(username: string) {
  const url = buildInstagramWebUrl(username);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220' width='440' height='440'>
    <rect rx='24' width='100%' height='100%' fill='#0f172a'/>
    <g fill='white' font-family='Inter, system-ui, sans-serif' text-anchor='middle'>
      <text x='50%' y='45%' font-size='14' opacity='0.9'>Open</text>
      <text x='50%' y='60%' font-size='20' font-weight='700'>Instagram</text>
      <text x='50%' y='80%' font-size='13' opacity='0.85'>@${username}</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function ContactQuick({
  phone = "+919111838314",
  insta = "chinmayx",
  showWhatsApp = true,
}: {
  phone?: string;
  insta?: string;
  showWhatsApp?: boolean;
}) {
  const instaUrl = buildInstagramWebUrl(insta);
  const waUrl = buildWhatsAppUrl(phone);
  const qr = useMemo(() => decorativeQrDataUrl(insta), [insta]);

  const [opening, setOpening] = useState<null | "instagram" | "whatsapp">(null);

  const openInstagram = () => {
    setOpening("instagram");
    window.location.href = `instagram://user?username=${insta}`;
    setTimeout(() => {
      window.open(instaUrl, "_blank", "noopener");
      setOpening(null);
    }, 900);
  };

  const openWhatsApp = () => {
    setOpening("whatsapp");
    window.open(waUrl, "_blank", "noopener");
    setOpening(null);
  };

  return (
    <aside className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col items-center gap-5 shadow-xl">

        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-200 font-semibold">Let's Connect</div>
            <div className="flex items-center gap-2 mt-1 text-sm font-bold text-white/90">
                <FiInstagram />
                @chinmayx
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm font-bold text-white/90">
                <FiPhone className="text-base" />
                <span>+91 91118 38314</span>
            </div>
            
          </div>
        </div>

        {/* QR */}
        <a
          href={instaUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl overflow-hidden border-white/10 shadow-sm hover:scale-[1.02] transition-transform"
        >
           <Image
            src="/images/IMG_8632.jpg"
            alt={`Open Instagram @${insta}`}
            width={160}
            height={160}
            className="w-40 h-40 object-cover block rounded-full"
            />
        </a>

        {/* CTAs */}
        <div className="w-full grid grid-cols-1 gap-4">

          {/* Instagram Button */}
        <button
        onClick={openInstagram}
        className="
            inline-flex items-center justify-center gap-3 
            py-3 rounded-lg 
            bg-white/10 
            hover:bg-gradient-to-r active:bg-gradient-to-r 
            from-pink-500 via-rose-500 to-amber-400 
            text-white font-semibold shadow-md 
            hover:scale-[1.02] active:scale-[0.98]
            transition-transform
        "
        >
        <FiInstagram className="text-xl" />
        {opening === "instagram" ? "Opening…" : "Message on Instagram"}
        </button>


          {/* WhatsApp Button */}
          {showWhatsApp && (
            <button
            onClick={openWhatsApp}
            className="
                inline-flex items-center justify-center gap-3 
                py-3 rounded-lg 
                bg-white/10 
                text-white font-semibold 
                hover:bg-green-500 active:bg-green-500
                hover:scale-[1.02] active:scale-[0.98]
                transition
            "
            >
            <IoLogoWhatsapp className="text-xl" />
            {opening === "whatsapp" ? "Opening…" : "Chat on WhatsApp"}
            </button>

          )}
        </div>
      </div>
    </aside>
  );
}
