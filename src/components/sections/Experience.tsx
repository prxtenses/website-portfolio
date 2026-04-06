"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "DMA Software & Hardware Researcher",
    company: "Advanced Security & Cheat Projects",
    description:
      "Design and implementation of DMA-based memory access solutions for Valorant. Focus on FPGA firmware customization and stealth hardware communication to bypass modern anti-cheat systems.",
    tags: ["C++", "DMA", "FPGA", "Valorant", "Bypass"],
  },
  {
    period: "2022 — 2024",
    role: "Reverse Engineering & Systems Researcher",
    company: "Low-Level Development",
    description:
      "Transitioned into sophisticated systems programming. Dedicated research into Windows NT internals, IAT/EAT hooking, and the development of modular loaders for CS:GO and CS2.",
    tags: ["C++", "IDA Pro", "x64dbg", "ASM", "Win32 API"],
  },
  {
    period: "2017 — 2022",
    role: "Full Stack Developer",
    company: "Initial Journey",
    description:
      "Started programming with a focus on web technologies and software architecture. Developed a strong foundation in C, Node.js, and React before moving into the world of game exploitation and low-level systems.",
    tags: ["C", "Node.js", "React", "TypeScript", "SQL"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      
      gsap.from(".exp-heading .split-line", {
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        yPercent: 110,
        opacity: 0,
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
      });

      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1.5,
        },
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
      });

      gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((entry) => {
        const dot = entry.querySelector(".exp-dot");

        gsap.from(entry, {
          scrollTrigger: {
            trigger: entry,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -32,
          duration: 0.85,
          ease: "power3.out",
        });

        if (dot) {
          gsap.to(dot, {
            scrollTrigger: {
              trigger: entry,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            boxShadow: "0 0 16px oklch(0.65 0.22 264 / 50%)",
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-wrap relative"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span className="section-label">Experience</span>

      {}
      <div className="exp-heading mb-16">
        <h2
          className="font-heading overflow-hidden"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
        >
          <span className="clip-line">
            <span className="split-line block">The path so far.</span>
          </span>
        </h2>
      </div>

      {}
      <div className="relative">
        {}
        <div
          className="timeline-line absolute top-0 bottom-0 w-px origin-top"
          style={{
            left: "6px",
            background: `linear-gradient(to bottom, var(--primary), var(--neon-violet), transparent)`,
          }}
        />

        <div className="space-y-14">
          {EXPERIENCE.map((item, i) => (
            <div key={i} className="exp-entry relative flex items-start gap-6">

              {}
              <div className="relative z-10 mt-1.5 flex w-3.5 flex-shrink-0 items-center justify-center">
                <div
                  className="exp-dot h-3 w-3 rounded-full border-2 bg-background transition-colors duration-300"
                  style={{
                    borderColor: "color-mix(in srgb, var(--border) 80%, white 20%)",
                  }}
                />
              </div>

              {}
              <div className="flex-1 min-w-0 pb-1">
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <span
                    className="font-sans text-xs uppercase tracking-[0.14em]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.period}
                  </span>
                  <span
                    className="h-px flex-1 min-w-[1rem]"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                </div>

                <h3
                  className="font-heading mb-0.5"
                  style={{
                    fontSize: "1.5rem",
                    letterSpacing: "-0.02em",
                    color: "var(--foreground)",
                  }}
                >
                  {item.role}
                </h3>

                <p className="font-sans text-sm font-medium mb-4 text-primary">
                  {item.company}
                </p>

                <p
                  className="font-sans text-sm leading-relaxed mb-5 max-w-xl"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-0.5 font-sans text-xs text-muted-foreground bg-white/5 border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
