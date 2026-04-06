"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const generateHexLine = () => {
  const addr = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0').toUpperCase();
  const bytes = Array.from({ length: 8 }, () => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
  ).join(' ');
  const ascii = bytes.split(' ').map(b => {
    const charCode = parseInt(b, 16);
    return charCode >= 32 && charCode <= 126 ? String.fromCharCode(charCode) : '.';
  }).join('');
  return `0x${addr}  ${bytes}  |${ascii}|`;
};

const PHRASES = [
  "It looks like you've stumbled into the raw memory. Don't worry, even the best debuggers get lost sometimes.",
  "The bytes you're looking for are in another castle. Let's get you back to the safe zone.",
  "Congratulations! You found a hidden feature. It's called 'Nothing'. Let's find something real.",
  "This path is currently under construction. Or maybe I just deleted it by accident... who knows?",
  "A wild 404 appeared! Use 'Go Back'. It's super effective!",
  "The page has left the chat. Don't worry, even the best systems need a reboot sometimes.",
  "Oops! Your link is as broken as my sleep schedule. Let's try a different route.",
  "You've reached the end of the internet. Or at least the end of this branch. Turning back recommended.",
];

function HexBackground() {
  const [mounted, setMounted] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [phrase, setPhrase] = useState(PHRASES[0]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const maskX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const maskY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setLines(Array.from({ length: 240 }, generateHexLine));
    setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return <div className="absolute inset-0 -z-10 bg-[#0a0a0c]" />;

  return (
    <div className="absolute inset-0 -z-10 bg-[#0a0a0c]">
      <div 
        className="pointer-events-none absolute inset-0 select-none font-mono text-[10px] sm:text-[11px] leading-tight"
        style={{
          color: 'var(--muted-foreground)',
          opacity: 0.12,
          maskImage: `radial-gradient(circle 250px at var(--mask-x) var(--mask-y), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 250px at var(--mask-x) var(--mask-y), black 0%, transparent 100%)`,
        } as any}
      >
        <motion.div 
          animate={{
            y: [0, -40],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-wrap gap-x-12 gap-y-2 p-4 h-[120%] w-full justify-center overflow-hidden"
          style={{ 
            '--mask-x': `${maskX.get()}px`, 
            '--mask-y': `${maskY.get()}px` 
          } as any}
        >
          {lines.map((line, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.random() * 0.4 + 0.2 }}
              transition={{ delay: Math.random() * 1.5, duration: 1 }}
              className="whitespace-nowrap"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}

export default function NotFound() {
  const [phrase, setPhrase] = useState("");
  const [targetPhrase, setTargetPhrase] = useState(PHRASES[0]);

  useEffect(() => {
    const selected = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setTargetPhrase(selected);
    
    let i = 0;
    const interval = setInterval(() => {
      setPhrase(selected.slice(0, i));
      i++;
      if (i > selected.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6">
      <HexBackground />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading mb-4 block text-xs font-medium uppercase tracking-[0.4em] text-primary"
          >
            404 // ROUTE_NOT_FOUND
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading mb-6"
            style={{ 
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--foreground)"
            }}
          >
            Wait, this isn&apos;t <br />
            <span className="italic text-[var(--lavender)]">the right page.</span>
          </motion.h1>
          <div className="mx-auto mb-10 h-20 max-w-lg">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-sans text-lg text-muted-foreground/80"
            >
              {phrase}
              <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-primary" />
            </motion.p>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 font-sans text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-90 glow-primary"
          >
            <Home size={16} />
            Back to Portfolio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-sans text-sm font-medium text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/20 liquid-blur glass-noise"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>
      </div>
    </main>
  );
}
