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
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="nav-brand">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive ? "is-active" : undefined}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <a href={profile.cvUrl} download className="nav-cta">
          Download CV
        </a>
      </div>
    </header>
  );
}
