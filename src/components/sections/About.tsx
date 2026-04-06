"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const BIO_PARAGRAPHS = [
  `I'm Sonka — a developer specialized in low-level systems. While most developers 
  focus on surface layers, I dive into the core: compiled binaries, memory layouts, and raw machine code.`,
  `My portfolio includes the development of sophisticated internal cheats, modular loaders with anti-debug protection, 
  and DMA hardware utilities for competitive games like Valorant.`,
  `My motivation is the obsession with understanding how systems work from end to end, allowing 
  the creation of tools that operate where others cannot see.`,
];

const SKILLS = [
  {
    area: "Game Cheats",
    color: "#6366f1",
    items: ["Internal Cheats", "DLL Injection", "Memory Patching", "Hooking (IAT/EAT)", "Raycasting ESP"],
  },
  {
    area: "Security & RE",
    color: "#8b5cf6",
    items: ["Reverse Engineering", "IDA Pro", "x64dbg", "Ghidra", "Anti-Debug", "Binary Analysis"],
  },
  {
    area: "Low Level",
    color: "#ec4899",
    items: ["C++", "Assembly x86/x64", "Win32 API", "DMA/FPGA", "Kernel Drivers"],
  },
  {
    area: "Full Stack",
    color: "#6366f1",
    items: ["React", "Next.js", "Node.js", "TypeScript", "WebSockets", "Secure Loaders"],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      
      gsap.from(".about-heading .split-line", {
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        yPercent: 108,
        opacity: 0,
        stagger: 0.13,
        duration: 0.95,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".bio-para").forEach((para) => {
        gsap.from(para, {
          scrollTrigger: {
            trigger: para,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 32,
          scale: 0.98,
          duration: 0.7,
          delay: (i % 2) * 0.1, 
          ease: "power3.out",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-wrap relative"
    >
      {}
      <span className="section-label">About</span>

      {}
      <div className="about-heading mb-14 overflow-hidden">
        <h2 className="font-heading"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
        >
          <span className="clip-line">
            <span className="split-line block">I speak both human</span>
          </span>
          <span className="clip-line">
            <span className="split-line block italic" style={{ color: "var(--lavender)" }}>
              and machine.
            </span>
          </span>
        </h2>
      </div>

      {}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {}
        <div className="space-y-6">
          {BIO_PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className="bio-para font-sans leading-relaxed"
              style={{
                color: i === 0 ? "var(--foreground)" : "var(--muted-foreground)",
                fontSize: i === 0 ? "1.1rem" : "1rem",
              }}
            >
              {para}
            </p>
          ))}

          {}
          <div
            className="mt-10 grid grid-cols-2 gap-4 border-t pt-10"
            style={{ borderColor: "var(--border)" }}
          >
            {[
              { label: "Coding Since", value: "2017" },
              { label: "DMA Specialist", value: "Since 2024" },
              { label: "Source Engine", value: "Flagship Area" },
              { label: "Status", value: "Open to Collaborate" },
            ].map((fact) => (
              <div key={fact.label}>
                <div className="font-sans text-xs uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}>
                  {fact.label}
                </div>
                <div className="mt-1 font-heading text-lg font-semibold"
                  style={{ color: "var(--foreground)" }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <div
              key={skill.area}
              className="skill-card rounded-2xl p-6 liquid-blur glass-noise bg-[#0a0a0c]/40 border border-white/10 transition-all duration-300 hover:shadow-hover hover:border-white/20 group"
            >
              {}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                />
                <span
                  className="font-sans text-xs font-medium uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {skill.area}
                </span>
              </div>

              {}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Badge
                    key={item}
                    className="cursor-default rounded-full border px-3 py-0.5 font-sans text-xs font-medium transition-colors hover:border-primary/50 text-muted-foreground bg-white/5 border-white/10"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
