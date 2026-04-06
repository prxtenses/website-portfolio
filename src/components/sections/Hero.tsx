"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import dynamic from "next/dynamic";
import { FlipWords } from "@/components/ui/FlipWords";

const BackgroundGradientAnimation = dynamic(
  () => import("@/components/ui/BackgroundGradientAnimation").then((mod) => mod.BackgroundGradientAnimation),
  { ssr: false }
);

import HeroPortrait from "./HeroPortrait";

function SplitText({
  text,
  className,
  elementClass,
}: {
  text: string;
  className?: string;
  elementClass?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`split-char inline-block ${elementClass ?? ""}`}
          aria-hidden="true"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

const ROLES = [
  "Full Stack Developer",
  "Reverse Engineer",
  "Systems Programmer",
  "Assembly Specialist",
];

function RoleText() {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const state = useRef({ roleIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { roleIdx, charIdx, deleting } = state.current;
      const full = ROLES[roleIdx];

      if (deleting) {
        const next = charIdx - 1;
        if (textRef.current) textRef.current.textContent = full.slice(0, next);
        state.current.charIdx = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.roleIdx = (roleIdx + 1) % ROLES.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 28);
      } else {
        const next = charIdx + 1;
        if (textRef.current) textRef.current.textContent = full.slice(0, next);
        state.current.charIdx = next;
        if (next === full.length) {
          state.current.deleting = true;
          timeout = setTimeout(tick, 2400);
          return;
        }
        timeout = setTimeout(tick, 70 + Math.random() * 35);
      }
    };

    timeout = setTimeout(tick, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="inline-flex items-center gap-0 min-h-[1.5em] whitespace-nowrap">
      <span ref={textRef} />
      <span
        ref={cursorRef}
        className="inline-block w-px h-[1.1em] bg-[var(--lavender)] ml-0.5 align-middle self-center"
        style={{
          animation: "cursor-blink 1s step-end infinite",
        }}
      />
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
  }, []);

  useGSAP(
    () => {
      const mobile = isMobile.current;
      const tl = gsap.timeline({ delay: mobile ? 0.1 : 0.25 });

      tl.from(".hero-label", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
      }, "-=1.4");

      tl.from(".hero-chars .split-char", {
        y: "110%",
        opacity: 0,
        rotateX: -40,
        stagger: mobile ? 0.015 : 0.028,
        duration: 0.9,
        ease: "power4.out",
      }, "-=0.9");

      tl.from([".hero-role", ".hero-desc"], {
        opacity: 0,
        y: 22,
        stagger: mobile ? 0.1 : 0.2,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      tl.from(".hero-cta", {
        opacity: 0,
        y: 18,
        stagger: 0.1,
        duration: 0.65,
        ease: "power2.out",
        clearProps: "all" 
      }, "-=0.4");

      tl.from(".hero-scroll", {
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
      }, "-=0.1");

    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-svh min-h-[680px] w-full items-center overflow-x-clip z-10"
    >
      {}
      <div className="absolute inset-0 z-0">
        {}
        <BackgroundGradientAnimation
          containerClassName="absolute inset-0"
        />
        
        {}
        <div className="absolute inset-0 z-10 liquid-blur glass-noise opacity-50 hidden md:block" />

        {}
        <div
          className="absolute inset-x-0 bottom-0 h-[400px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(to top, #0a0a0c 0%, transparent 100%)",
          }}
        />
      </div>

      {}
      <div className="relative z-30 w-full section-wrap pointer-events-none">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          
          {}
          <div className="relative z-10 flex flex-col justify-center text-left order-last md:order-first">
            {}
            <div className="hero-label mb-8 inline-flex items-center gap-3 liquid-blur glass-noise px-4 py-2 border border-primary/20 rounded-full bg-white/5 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 bg-green-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Available for opportunities
              </span>
            </div>

            <h1 className="font-heading hero-chars mb-5 select-none overflow-hidden"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "var(--foreground)",
                whiteSpace: "nowrap"
              }}
            >
              <SplitText
                text="Pedro Sonka"
                className="block"
                elementClass="perspective-[600px]"
              />
            </h1>

            {}
            <p className="hero-role mb-6 font-heading italic font-semibold min-h-[1.5em] flex items-center drop-shadow-md"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                color: "var(--lavender)", textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                letterSpacing: "-0.01em",
              }}
            >
              <RoleText />
            </p>

            {}
            <div className="hero-desc mb-10 max-w-2xl font-sans text-base leading-relaxed md:text-lg readable-overlay text-foreground/90"
            >
              <p>
                Specialist in low-level software development and{""}
                <FlipWords 
                  words={["Distributed Systems", "Kernel Modules", "Reverse Engineering", "Security Audits", "Low-Level Exploits"]} 
                  className="text-[#bd93f9] font-bold whitespace-nowrap"
                />
              </p>
              <p className="mt-4 text-balance leading-relaxed">
                Solid experience in creating loaders, internal cheats, and tools
                for Source Engine and Valorant.
              </p>
            </div>

            {}
            <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
              <button
                id="hero-projects-btn"
                className="hero-cta group inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-sans text-base font-semibold transition-opacity duration-300 bg-primary text-primary-foreground hover:opacity-90 glow-primary"
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View my work
              </button>

              <button
                id="hero-contact-btn"
                className="hero-cta inline-flex items-center gap-2.5 rounded-xl border border-white/10 px-8 py-4 font-sans text-base font-semibold transition-all duration-300 hover:border-primary/40 liquid-blur glass-noise bg-white/5 text-foreground hover:shadow-hover"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get in touch
              </button>
            </div>
          </div>

          {}
          <div className="hero-video relative flex w-full justify-center pointer-events-auto md:justify-end order-first md:order-last mb-8 md:mb-0">
             <div className="relative w-full max-w-[400px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[760px] h-auto">
                <HeroPortrait />
             </div>
          </div>
          
        </div>
      </div>

      {}
      <div
        className="hero-scroll absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-3 cursor-pointer pointer-events-auto"
        onClick={() =>
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span
          className="writing-mode-vertical font-sans text-xs uppercase tracking-[0.18em]"
          style={{
            color: "var(--muted-foreground)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          className="flex h-10 w-px items-end overflow-hidden"
          style={{ backgroundColor: "var(--border)" }}
        >
          <div
            className="h-1/2 w-full"
            style={{
              backgroundColor: "var(--lavender)",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes scroll-line {
            0%   { transform: translateY(-100%); }
            40%  { transform: translateY(0); }
            80%  { transform: translateY(100%); }
            100% { transform: translateY(100%); }
          }
        `}</style>
        <ArrowDown size={12} style={{ color: "var(--muted-foreground)" }} />
      </div>
    </section>
  );
}
