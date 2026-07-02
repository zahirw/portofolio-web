"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { profile, projects, experiences } from "@/lib/data";
import {
  UserIcon,
  LayersIcon,
  BriefcaseIcon,
  FolderIcon,
  MapPinIcon,
  SendIcon,
  ArrowRightIcon,
} from "../icons";
import BentoCard from "./BentoCard";
import Modal from "./Modal";
import PhotoOrb from "./PhotoOrb";
import { CircuitTrace } from "./decor";
import {
  AboutContent,
  SkillsContent,
  ExperienceContent,
  ProjectsContent,
  ContactContent,
} from "./modalContents";

type ModalKey = "about" | "skills" | "experience" | "projects" | "contact";

type ModalMeta = {
  title: string;
  eyebrow: string;
  icon: ReactNode;
  content: ReactNode;
};

const MODALS: Record<ModalKey, ModalMeta> = {
  about: {
    title: "About",
    eyebrow: "Who I am",
    icon: <UserIcon />,
    content: <AboutContent />,
  },
  skills: {
    title: "Skills",
    eyebrow: "What I work with",
    icon: <LayersIcon />,
    content: <SkillsContent />,
  },
  experience: {
    title: "Experience",
    eyebrow: "Where I've worked",
    icon: <BriefcaseIcon />,
    content: <ExperienceContent />,
  },
  projects: {
    title: "Projects",
    eyebrow: "Selected work",
    icon: <FolderIcon />,
    content: <ProjectsContent />,
  },
  contact: {
    title: "Contact",
    eyebrow: "Let's talk",
    icon: <SendIcon />,
    content: <ContactContent />,
  },
};

const SKILL_TAGS = [
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "Tailwind CSS",
  "React Native",
  "Redux",
  "Zustand",
  "React Query",
  "GSAP",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BentoGrid() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ModalKey | null>(null);

  // Retain the last-shown meta so the modal keeps its content during the
  // close/exit animation (active flips to null before the panel finishes).
  const lastMeta = useRef<ModalMeta | null>(null);
  if (active) lastMeta.current = MODALS[active];
  const meta = lastMeta.current;

  // Each direct grid child: carries the grid-area + entrance animation, and
  // stretches to fill its cell so the BentoCard inside can be h-full.
  const Cell = ({ area, children }: { area: string; children: ReactNode }) => (
    <motion.div
      style={{ gridArea: area }}
      variants={reduce ? undefined : item}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );

  const currentRole = experiences[0];

  return (
    <>
      <motion.div
        className="bento w-full desk:flex-1"
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        {/* Identity — name + role + location. Its bottom edge curves up around
            the orb's top (notch-top); at desktop the deep arc eats the lower
            half, so the name block sits in the top zone. */}
        <Cell area="identity">
          <BentoCard className="notch-top items-center justify-center text-center desk:justify-start desk:pt-8">
            <p className="m-0 mb-1.5 inline-flex items-center justify-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent-strong">
              <MapPinIcon className="size-[1.15em]" />
              {profile.location}
            </p>
            <h1 className="m-0 bg-[linear-gradient(115deg,#0f1b2d_25%,var(--color-accent)_75%,var(--color-accent-2)_105%)] bg-clip-text text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.05] text-transparent">
              {profile.name}
            </h1>
            <p className="m-0 mt-2 text-[clamp(1rem,2.5vw,1.35rem)] font-semibold text-accent-strong">
              {profile.role}
            </p>
          </BentoCard>
        </Cell>

        {/* Status — availability toggle */}
        <Cell area="status">
          <BentoCard className="justify-between">
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-2">
              Availability
            </span>
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-7 w-12 items-center rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-2))] p-1 shadow-inner">
                <span className="ml-auto size-5 rounded-full bg-white shadow" />
              </span>
              <span className="text-[0.92rem] font-semibold">Open to work</span>
            </div>
          </BentoCard>
        </Cell>

        {/* About — tall left rail */}
        <Cell area="about">
          <BentoCard
            onClick={() => setActive("about")}
            label="Open About details"
            className="gap-3"
          >
            <span className="title-icon text-[1.6rem]" aria-hidden="true">
              <UserIcon />
            </span>
            <h2 className="m-0 text-[1.3rem] font-bold">About me</h2>
            <p className="m-0 text-[0.95rem] text-muted">
              4+ years crafting responsive, user-centric web &amp; mobile apps
              across fintech, blockchain &amp; government.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-accent-strong">
              Read bio
              <ArrowRightIcon className="size-[1.1em] transition-transform group-hover:translate-x-0.5" />
            </span>
            <CircuitTrace className="bottom-3 right-3 h-24 w-24 opacity-40" />
          </BentoCard>
        </Cell>

        {/* Photo orb — frameless centerpiece floating in the well the three
            neighbouring cards curve around (desktop). No card surface. */}
        <Cell area="orb">
          <div className="flex h-full w-full items-center justify-center">
            <PhotoOrb />
          </div>
        </Cell>

        {/* Skills — tall right rail */}
        <Cell area="skills">
          <BentoCard
            onClick={() => setActive("skills")}
            label="Open Skills details"
            className="gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="title-icon text-[1.4rem]" aria-hidden="true">
                <LayersIcon />
              </span>
              <ArrowRightIcon className="size-4 -rotate-45 text-accent-strong transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <h2 className="m-0 text-[1.3rem] font-bold">Skills</h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {SKILL_TAGS.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
            <span className="mt-auto font-mono text-[0.72rem] text-muted-2">
              20+ technologies · tap to expand
            </span>
          </BentoCard>
        </Cell>

        {/* Stat — years of experience */}
        <Cell area="stat">
          <BentoCard
            onClick={() => setActive("about")}
            label="Open About details"
            className="justify-center"
          >
            <span className="text-[2.6rem] font-extrabold leading-none text-accent-strong">
              {profile.stats[0].value}
            </span>
            <span className="mt-1 text-[0.9rem] text-muted">
              {profile.stats[0].label}
            </span>
          </BentoCard>
        </Cell>

        {/* Experience — current role. Top-right edge curves around the orb's
            lower-left; content sits below the arc (desk:justify-end). */}
        <Cell area="exp">
          <BentoCard
            onClick={() => setActive("experience")}
            label="Open Experience details"
            className="notch-br gap-2 desk:justify-end"
          >
            <span className="title-icon text-[1.3rem]" aria-hidden="true">
              <BriefcaseIcon />
            </span>
            <h2 className="m-0 text-[1.15rem] font-bold">Experience</h2>
            <p className="m-0 text-[0.9rem] font-semibold text-accent-strong">
              {currentRole.role}
            </p>
            <p className="m-0 font-mono text-[0.72rem] text-muted-2">
              Now · {experiences.length} roles
            </p>
            <CircuitTrace className="bottom-2 right-2 h-16 w-16 opacity-30" />
          </BentoCard>
        </Cell>

        {/* Projects — featured work. Top-left edge curves around the orb's
            lower-right; content sits below the arc (desk:justify-end). */}
        <Cell area="projects">
          <BentoCard
            onClick={() => setActive("projects")}
            label="Open Projects details"
            className="notch-bl gap-2 desk:justify-end"
          >
            <span className="title-icon text-[1.3rem]" aria-hidden="true">
              <FolderIcon />
            </span>
            <h2 className="m-0 text-[1.15rem] font-bold">Projects</h2>
            <p className="m-0 text-[0.8rem] text-muted">
              {projects.length} featured builds
            </p>
            {/* mt-auto pins thumbs to the bottom when stacked; at desktop the
                whole column is bottom-packed (justify-end) below the arc, so
                the auto margin would shove the title up into the cutout. */}
            <div className="mt-auto flex gap-2 pt-2 desk:mt-0">
              {projects.map((project) => (
                <span
                  key={project.name}
                  className="relative aspect-square w-full max-w-[3.2rem] overflow-hidden rounded-lg border border-white/70 bg-accent-soft"
                >
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="52px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
          </BentoCard>
        </Cell>

        {/* Contact — CTA */}
        <Cell area="contact">
          <BentoCard
            onClick={() => setActive("contact")}
            label="Open Contact details"
            className="justify-center gap-2.5"
          >
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-strong">
              Let&apos;s talk
            </span>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-2))] px-5 py-2.5 font-semibold text-white shadow-[0_12px_26px_-10px_rgba(37,99,235,0.75)] transition-transform group-hover:-translate-y-0.5">
              <SendIcon />
              Get in touch
            </span>
          </BentoCard>
        </Cell>
      </motion.div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={meta?.title ?? ""}
        titleId="bento-modal-title"
        eyebrow={meta?.eyebrow}
        icon={meta?.icon}
      >
        {meta?.content}
      </Modal>
    </>
  );
}
