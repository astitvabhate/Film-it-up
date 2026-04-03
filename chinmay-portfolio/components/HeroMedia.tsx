"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroMedia() {
  const prefersReduced = useReducedMotion();

  const motionProps = prefersReduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative w-full overflow-hidden rounded-2xl aspect-video ">

        {/* Static hero image */}
        <img
          src="/images/chinmay.jpg"
          alt="Chinmay Kunhare"
          className="w-full h-full object-cover absolute inset-0"
        />

        {/* Overlay text */}
        <motion.div
          {...motionProps}
          className="absolute inset-0 z-10 flex flex-col items-end justify-end px-4 pb-10 text-right text-gray-900"
        >
          <p className="absolute right-4 top-2 text-[8px] font-semibold tracking-widest text-amber-50 opacity-90 sm:text-xs">
            Shaping brand perception, frame by frame.
          </p>


          {/* SCALE ONLY ON MOBILE — SAME DESIGN, JUST SMALLER */}
          <div className="origin-bottom-right scale-[0.75] sm:scale-90 md:scale-100">
            <h1 className=" text-3xl sm:text-6xl md:text-6xl lg:text-6xl font-extrabold ">
              Chinmay Kunhare
            </h1>
            <p className=" opacity-100 text-2xl font-bold">Cinematographer</p>
          </div>
        </motion.div>
      </div>



<motion.h1
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="font-black pt-5 text-white uppercase 
  text-5xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
>
  <span>Enter a world of</span>
  <br />
  <span>cinematic storytelling</span>
  <br />
  <span>through my</span>
  <br />
  <span>lens</span>
</motion.h1>


        


<div className="relative mt-10 w-full">

  <div className="w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent
      backdrop-blur-md border-y border-white/10
      py-10 px-4 sm:px-8 md:px-12">

    <div className="max-w-6xl mx-auto">

      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4">
        Crafting Stories Through Motion
      </h3>

      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-200 space-y-5">

  <span className="block">
    I am <span className="font-semibold text-white">Chinmay Kunhare</span>, a professional cinematographer specializing in high-quality visual content for brands, businesses, and digital platforms. 
    My work is driven by a strong understanding of visual storytelling, brand communication, and modern content standards.
  </span>

  <span className="block">
    I manage the complete production process, including 
    <span className="text-white font-medium"> concept development</span>, 
    <span className="text-white font-medium"> shoot planning</span>, 
    <span className="text-white font-medium"> cinematography</span>, 
    <span className="text-white font-medium"> lighting</span>, 
    <span className="text-white font-medium"> direction</span>, 
    <span className="text-white font-medium"> editing</span>, and 
    <span className="text-white font-medium"> color grading</span> ensuring a consistent and premium visual output across every project.
  </span>

  <span className="block">
    I create brand films, commercial advertisements, product videos, fashion shoots, event coverage, and social media content designed to enhance brand presence and maintain a refined visual identity.
  </span>

  <span className="block">
    With a detail-oriented approach and experience handling multiple professional projects, my objective is to deliver cinematic content that strengthens brand positioning and creates lasting visual value.
  </span>

</p>

    </div>

  </div>

</div>





    </div>
  );
}
