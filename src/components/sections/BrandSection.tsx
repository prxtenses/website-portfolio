"use client";
import React from "react";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";

export default function BrandSection() {
  return (
    <section 
      id="brand"
      className="section-wrap relative flex h-[35rem] w-full flex-col items-center justify-center overflow-hidden bg-transparent py-20"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {}
      <div className="absolute inset-0 z-0 bg-[#0a0a0c]/40 liquid-blur opacity-20" />
      
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12">
        <TextHoverEffect text="SONKA" />
      </div>
      
      {}
      <div className="absolute bottom-12 z-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground/60 select-none">
          Security Researcher • Low-Level Engineer • Systems Design
        </p>
      </div>
    </section>
  );
}
