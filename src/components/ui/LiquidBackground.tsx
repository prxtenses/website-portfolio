"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LiquidBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none">
      {}
      <div className="absolute inset-0 bg-[#0a0a0c]" />

      {}
      <motion.div
        animate={{
          x: [0, 400, -200, 0],
          y: [0, -300, 400, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[10%] -top-[10%] h-[80%] w-[80%] rounded-full opacity-[0.25] blur-[120px]"
        style={{ backgroundColor: "var(--liquid-blob-1)" }}
      />

      {}
      <motion.div
        animate={{
          x: [0, -400, 300, 0],
          y: [0, 500, -200, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[10%] -bottom-[10%] h-[75%] w-[75%] rounded-full opacity-[0.22] blur-[140px]"
        style={{ backgroundColor: "var(--liquid-blob-2)" }}
      />

      {}
      <motion.div
        animate={{
          x: [0, 200, -300, 0],
          y: [0, 300, 400, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[20%] top-[30%] h-[70%] w-[70%] rounded-full opacity-[0.18] blur-[160px]"
        style={{ backgroundColor: "var(--liquid-blob-3)" }}
      />

      {}
      <div 
        className="absolute inset-0"
        style={{ 
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 12, 0.6) 100%)" 
        }} 
      />
    </div>
  );
}
