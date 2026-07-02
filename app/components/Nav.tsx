"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

// Sticky glass nav with scroll-spy: highlights the link for the section
// currently in view using an IntersectionObserver.
export default function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Trigger when a section sits in the upper-middle band of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-3 z-20 mt-3 mx-auto max-w-[1064px] px-3">
      <div className="glass-strong w-full max-w-[65rem] mx-auto flex items-center justify-between gap-4 py-[0.7rem] px-[1.1rem] rounded-full">
        <a href="#top" className="font-bold no-underline tracking-[-0.01em]">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="hidden tab:flex gap-6 list-none p-0 m-0">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`no-underline text-[0.92rem] transition-colors hover:text-accent-strong ${
                      isActive
                        ? "text-accent-strong font-semibold"
                        : "text-muted"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href={profile.cvUrl}
          download
          className="bg-accent text-white py-2 px-[1.1rem] rounded-full no-underline text-[0.88rem] font-semibold whitespace-nowrap shadow-[0_8px_18px_-8px_rgba(37,99,235,0.7)] transition hover:bg-accent-strong hover:-translate-y-px"
        >
          Download CV
        </a>
      </div>
    </header>
  );
}
