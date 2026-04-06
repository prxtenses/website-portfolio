"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Mail, Send, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradientAnimation";

import { siGithub, siX } from "simple-icons";
import { SimpleIcon } from "@/components/ui/SimpleIcon";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    id: "github-link",
    label: "GitHub",
    href: "https://github.com/prxtenses",
    siIcon: siGithub,
    note: "Source & projects",
  },
  {
    id: "email-link",
    label: "Email",
    href: "mailto:hello@sonka.dev",
    icon: Mail,
    note: "hello@sonka.dev",
  },
  {
    id: "x-link",
    label: "X",
    href: "#",
    siIcon: siX,
    note: "Connect professionally",
  },
];


export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-heading .split-line", {
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        yPercent: 110,
        opacity: 0,
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
      });

      gsap.from([".contact-form", ".contact-sidebar"], {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 36,
        stagger: 0.15,
        duration: 0.85,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-wrap overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <BackgroundGradientAnimation
        containerClassName="absolute inset-0 z-0"
        className="hidden"
      />
      
      <div className="relative z-10 readable-overlay">
      <span className="section-label">Contact</span>

      {}
      <div className="contact-heading mb-14">
        <h2
          className="font-heading overflow-hidden"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
        >
          <span className="clip-line">
            <span className="split-line block">Let&apos;s build something</span>
          </span>
          <span className="clip-line">
            <span className="split-line block italic" style={{ color: "var(--lavender)" }}>
              worth remembering.
            </span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_auto]">
        {}
        <div className="contact-form">
          {sent ? (
            <div
              className="flex h-64 flex-col items-center justify-center rounded-2xl text-center"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "color-mix(in oklch, var(--sage) 20%, var(--background))" }}
              >
                <Send size={20} style={{ color: "var(--sage)" }} />
              </div>
              <h3 className="font-heading text-xl mb-2" style={{ color: "var(--foreground)" }}>
                Message sent!
              </h3>
              <p className="font-sans text-sm" style={{ color: "var(--muted-foreground)" }}>
                I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="font-sans text-xs uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    required
                    className="rounded-xl border font-sans text-sm h-12 focus-visible:ring-1 bg-white/5 border-white/10 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-xs uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="rounded-xl border font-sans text-sm h-12 bg-[#0a0a0c]/20 border-white/10 text-foreground focus:border-primary/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="font-sans text-xs uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  placeholder="What's this about?"
                  className="rounded-xl border font-sans text-sm h-12 bg-[#0a0a0c]/20 border-white/10 text-foreground focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="font-sans text-xs uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your project, idea, or just say hello..."
                  required
                  rows={6}
                  className="rounded-xl border font-sans text-sm resize-none bg-[#0a0a0c]/20 border-white/10 text-foreground focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 font-sans text-sm font-medium transition-all duration-300 bg-primary text-primary-foreground hover:opacity-90 glow-primary"
              >
                <Send size={14} />
                Send message
              </button>
            </form>
          )}
        </div>

        {}
        <div
          className="contact-sidebar flex flex-col gap-4 lg:w-64"
        >
          <p
            className="font-sans text-sm leading-relaxed mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            Prefer direct contact? Find me at any of the channels below.
          </p>

          {SOCIALS.map((social) => {
            return (
              <a
                key={social.id}
                id={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 liquid-blur glass-noise bg-[#0a0a0c]/40 border border-white/10 hover:border-white/20 hover:shadow-hover"
              >
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {"siIcon" in social && social.siIcon ? (
                    <SimpleIcon icon={social.siIcon} size={16} />
                  ) : (
                    "icon" in social && social.icon && <social.icon size={16} />
                  )}
                </div>


                <div>
                  <div
                    className="font-sans text-sm font-medium group-hover:text-[var(--lavender)] transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {social.label}
                  </div>
                  <div
                    className="font-sans text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {social.note}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
