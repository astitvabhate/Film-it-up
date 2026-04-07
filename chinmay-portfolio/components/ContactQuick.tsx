"use client";

import React, { useState } from "react";
import { FiInstagram, FiPhone } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";




// URL builders
function buildInstagramWebUrl(username: string) {
  return `https://www.instagram.com/${encodeURIComponent(username)}`;
}
function buildWhatsAppUrl(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "https://www.whatsapp.com/";
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
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
            <div className="text-xs uppercase tracking-widest text-amber-200 font-semibold">Let&apos;s Connect</div>
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
            src={resolveMediaUrl("/images/IMG_8632.jpg")}
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
