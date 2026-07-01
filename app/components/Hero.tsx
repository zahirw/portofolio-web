"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { profile } from "@/lib/data";
import { ArrowRightIcon, SendIcon, DownloadIcon } from "./icons";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  // When reduced motion is preferred, render everything immediately.
  const variants = reduce ? undefined : item;

  return (
    <section id="top" className="hero">
      <motion.div
        className="container"
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <motion.p variants={variants} className="eyebrow">
          {profile.location}
        </motion.p>
        <motion.h1 variants={variants} className="hero-name">
          {profile.name}
        </motion.h1>
        <motion.p variants={variants} className="hero-role">
          {profile.role}
        </motion.p>
        <motion.p variants={variants} className="hero-summary">
          {profile.summary}
        </motion.p>

        <motion.div variants={variants} className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
            <ArrowRightIcon />
          </a>
          <a href="#contact" className="btn btn-secondary">
            <SendIcon />
            Get in Touch
          </a>
          <a href={profile.cvUrl} download className="btn btn-secondary">
            <DownloadIcon />
            Download CV
          </a>
        </motion.div>

        <motion.ul variants={variants} className="hero-stats">
          {profile.stats.map((stat) => (
            <li key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
