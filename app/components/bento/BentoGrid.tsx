"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, type Variants } from "motion/react";
import {
  UserIcon,
  LayersIcon,
  BriefcaseIcon,
  FolderIcon,
  SendIcon,
} from "../icons";
import CircuitField from "./CircuitField";
import Modal from "./Modal";
import { IdentitySection } from "./IdentitySection";
import { StatusSection } from "./StatusSection";
import { AboutSection } from "./AboutSection";
import { OrbSection } from "./OrbSection";
import { ExperienceSection } from "./ExperienceSection";
import { StatSection } from "./StatSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ContactSection } from "./ContactSection";
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

  /* Hold-to-charge progress lifted from the orb so the circuit field (a
     sibling overlay) can energize with the same value. A MotionValue only —
     the interaction never touches React state up here. */
  const chargeProgress = useMotionValue(0);

  // Bumped by the Skills reset button to re-seed the tidy chip layout.
  const [skillsReset, setSkillsReset] = useState(0);

  // Live Jakarta local time for the availability card — computed client-side
  // only (starts blank so server/client markup matches on hydration).
  const [localTime, setLocalTime] = useState("");
  useEffect(() => {
    const update = () =>
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Retain the last-shown meta so the modal keeps its content during the
  // close/exit animation (active flips to null before the panel finishes).
  const lastMeta = useRef<ModalMeta | null>(null);
  if (active) lastMeta.current = MODALS[active];
  const meta = lastMeta.current;

  const cellVariants = reduce ? undefined : item;

  return (
    <>
      <motion.div
        className="bento w-full desk:flex-1"
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        {/* Circuit traces radiating from the orb across the whole grid —
            absolute overlay (not a grid item), energized while charging. */}
        <CircuitField progress={chargeProgress} />

        <IdentitySection variants={cellVariants} />
        <StatusSection variants={cellVariants} localTime={localTime} />
        <AboutSection variants={cellVariants} onOpen={() => setActive("about")} />
        <OrbSection variants={cellVariants} progress={chargeProgress} />
        <ExperienceSection
          variants={cellVariants}
          onOpen={() => setActive("experience")}
        />
        <StatSection variants={cellVariants} onOpen={() => setActive("about")} />
        <SkillsSection
          variants={cellVariants}
          progress={chargeProgress}
          resetKey={skillsReset}
          onReset={() => setSkillsReset((k) => k + 1)}
          onOpen={() => setActive("skills")}
        />
        <ProjectsSection
          variants={cellVariants}
          onOpen={() => setActive("projects")}
        />
        <ContactSection
          variants={cellVariants}
          onOpen={() => setActive("contact")}
        />
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
