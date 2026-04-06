# sonka.dev

Personal portfolio focused on low-level systems, reverse engineering, and Direct Memory Access (DMA).

The frontend is built to reflect a "Liquid Glass" / "Machine-Layer" aesthetic, balancing high-level web tech with a technical, debugger-inspired UI.

## Core Focus
- **Low-Level Development:** C++, ASM (x86/x64), Win32 API.
- **Security & RE:** Kernel-mode drivers, binary analysis, anti-tamper.
- **Hardware Interfacing:** DMA/FPGA-based utilities for memory synchronization.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + Vanilla CSS (OKLCH color system)
- **Animations:** GSAP (ScrollTrigger) + Framer Motion
- **Smooth Scroll:** Lenis
- **Type Safety:** TypeScript

## Implementation Details
- **Liquid Glass Effect:** Custom GSAP mouse tracking with hardware-accelerated backdrop blurs.
- **Dynamic Projects:** Project cards featuring tilt-shift physics and status-aware styling.
- **Performance:** Optimized background SVG noise filters and blob animations (disabled on mobile for GPU efficiency).

## Development
```bash
# Install dependencies
npm install

# Run locally
npm run dev
```

## Structure
- `/src/components/sections`: Main content sections (Hero, About, Projects, Contact).
- `/src/components/ui`: Reusable interface components and glassmorphism utilities.
- `/src/app/globals.css`: Core design system and OKLCH color token definitions.
