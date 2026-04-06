"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  size: "large" | "medium" | "small";
  status: "wip" | "soon";
  github?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    id: "sonka-software",
    title: "Sonka Software",
    description:
      "A premium, invite-only internal cheat focused on CS:GO HvH. Engineered for maximum performance with hand-made resolver, backtrack system and highly customizable visuals.",
    tags: ["C++", "HvH", "Kernel", "Reverse Engineering", "Invite-Only"],
    accent: "#6366f1",
    size: "small",
    status: "wip",
  },
  {
    id: "aegis-loader",
    title: "Aegis",
    description:
      "A secure, multi-stage modular loader. Features advanced HWID-locking, server-side heartbeats, and anti-tamper measures to protect sensitive binary distribution.",
    tags: ["C++", "Remote", "Pe Injector", "Hwid-Auth", "Anti-Debug"],
    accent: "#8b5cf6",
    size: "small",
    status: "wip",
  },
  {
    id: "prisma-executor",
    title: "Prisma",
    description:
      "A high-performance DMA software/hardware specialized for Valorant. Engineered for total stealth through Direct Memory Access, bypassing traditional client-side detection vectors.",
    tags: ["C++", "DMA", "FPGA", "Valorant", "Bypass"],
    accent: "#ec4899",
    size: "small",
    status: "soon",
  },
  {
    id: "vortex-kernel",
    title: "Vortex",
    description:
      "Stealth kernel-mode driver for Windows memory synchronization. Designed to provide a low-latency read/write interface while remaining invisible to standard system traces.",
    tags: ["C", "Kernel", "Windows Internals", "ASM"],
    accent: "#6366f1",
    size: "small",
    status: "wip",
  },
  {
    id: "specter-packer",
    title: "Specter",
    description:
      "A polymorphic PE packer featuring advanced binary mutation and metadata stripping to defeat static analysis and signature-based detection.",
    tags: ["ASM", "C++", "PE Format", "Mutations"],
    accent: "#8b5cf6",
    size: "small",
    status: "soon",
  },
  {
    id: "repair-json-stream",
    title: "repair-json-stream",
    description:
      "A lightweight utility for repairing broken or partial JSON streams in real-time. Designed for high-performance data processing pipelines.",
    tags: ["TypeScript", "JSON", "Streaming", "Utility", "IA"],
    accent: "#6366f1",
    size: "small",
    status: "wip",
    github: "https://github.com/prxtenses/repair-json-stream",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<any>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 6, rotateY: x * 6 });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  const sizeClass =
    project.size === "large"
      ? "col-span-1 md:col-span-2 row-span-2"
      : project.size === "medium"
      ? "col-span-1 row-span-2"
      : "col-span-1 row-span-1";

  const isLink = !!(project.github || project.live);
  const Container = isLink ? motion.a : motion.div;

  return (
    <Container
      ref={cardRef}
      href={project.github || project.live}
      target={isLink ? "_blank" : undefined}
      rel={isLink ? "noopener noreferrer" : undefined}
      className={`project-card ${sizeClass} group relative overflow-hidden rounded-2xl p-7 liquid-blur glass-noise bg-[#0a0a0c]/40 border border-white/10 transition-all duration-300 hover:shadow-hover hover:border-white/20 ${isLink ? 'cursor-pointer block' : ''}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-[0.12] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.22]"
        style={{ backgroundColor: project.accent }}
      />

      {}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold font-sans"
          style={{
            backgroundColor: `color-mix(in oklch, ${project.accent} 18%, var(--background))`,
            color: project.accent,
          }}
        >
          {project.title.slice(0, 2)}
        </div>

        <div className="flex items-center gap-2">
          {project.status === "wip" ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium"
              style={{
                backgroundColor: "color-mix(in oklch, var(--sage) 15%, var(--background))",
                color: "var(--sage)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              In progress
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium"
              style={{
                backgroundColor: "color-mix(in oklch, var(--peach) 15%, var(--background))",
                color: "oklch(0.55 0.07 60)",
              }}
            >
              <Construction size={10} />
              Coming soon
            </span>
          )}
        </div>
      </div>

      {}
      <h3
        className="font-heading mb-3"
        style={{
          fontSize: project.size === "large" ? "clamp(1.5rem, 2.5vw, 2rem)" : "1.35rem",
          letterSpacing: "-0.02em",
          color: "var(--foreground)",
        }}
      >
        {project.title}
      </h3>

      <p
        className="font-sans text-sm leading-relaxed mb-6"
        style={{ color: "var(--muted-foreground)" }}
      >
        {project.description}
      </p>

      {}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            className="cursor-default rounded-full border px-2.5 py-0.5 font-sans text-xs text-muted-foreground bg-white/5 border-white/10 group-hover:border-primary/30 transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {}
      <div className="absolute bottom-7 right-7 opacity-0 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
        <ArrowUpRight
          size={20}
          style={{ color: project.accent }}
        />
      </div>
    </Container>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".projects-heading .split-line", {
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        yPercent: 110,
        opacity: 0,
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: (i % 2) * 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-wrap relative"
      style={{
        borderTop: "1px solid var(--border)",
      }}
    >
      {}
      <span className="section-label">Projects</span>

      {}
      <div className="projects-heading mb-14">
        <h2
          className="font-heading overflow-hidden"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
        >
          <span className="clip-line">
            <span className="split-line block">Things I&apos;ve built,</span>
          </span>
          <span className="clip-line">
            <span className="split-line block italic" style={{ color: "var(--lavender)" }}>
              and am building.
            </span>
          </span>
        </h2>
      </div>

      {}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto_auto] auto-rows-fr">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {}
      <p
        className="mt-10 font-sans text-sm text-center"
        style={{ color: "var(--muted-foreground)" }}
      >
        More projects on the way — check back soon.
      </p>
    </section>
  );
}
