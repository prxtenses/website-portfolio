"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="section-wrap py-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {}
        <span
          className="font-heading text-lg font-semibold"
          style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
        >
        sonka<span style={{ color: "var(--lavender)" }}>.dev</span>
        </span>

        {}
        <nav className="flex flex-wrap justify-center gap-6">
          {["About", "Projects", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(`#${item.toLowerCase()}`)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-sans text-sm transition-colors hover:text-[var(--lavender)]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item}
            </a>
          ))}
        </nav>

        {}
        <p
          className="font-sans text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          © {year} Sonka. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
