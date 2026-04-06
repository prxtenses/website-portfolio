"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="relative w-full max-w-[400px] sm:max-w-[550px] md:max-w-[300px] lg:max-w-[450px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative aspect-square w-full"
      >
        <Image
          src="/images/logo.webp"
          alt="Hero Logo"
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 70vw, (max-width: 1200px) 50vw, 450px"
          className="object-contain drop-shadow-2xl pointer-events-none select-none"
          priority
          quality={90}
          onContextMenu={(e) => e.preventDefault()}
        />
      </motion.div>
    </div>
  );
}
