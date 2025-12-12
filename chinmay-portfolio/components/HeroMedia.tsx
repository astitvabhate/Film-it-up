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
          className="w-full h-full object-cover absolute inset-0 scale-x-[-1]"
        />

        {/* Overlay text */}
        <motion.div
          {...motionProps}
          className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-10 text-gray-900"
        >
          <p className="absolute text-[8px] sm:text-xs tracking-widest text-amber-50 top-2 left-4 opacity-90 font-semibold">
            *MAKING EVERY STORY UNFORGETTABLE
          </p>


          {/* SCALE ONLY ON MOBILE — SAME DESIGN, JUST SMALLER */}
          <div className="origin-bottom-left scale-[0.75] sm:scale-90 md:scale-100">
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

      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-200">
        I’m <span className="font-extrabold text-white">Chinmay Kunhare</span>,
        a videographer and cinematographer who believes in capturing moments that speak 
        beyond the frame. With a love for storytelling and a strong visual instinct, I create 
        films and visuals that feel immersive, expressive, and full of life. My work blends 
        creativity, emotion, and cinematic composition to deliver stories that stay with 
        the audience.
      </p>

    </div>

  </div>

</div>





    </div>
  );
}
