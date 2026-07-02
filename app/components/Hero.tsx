"use client";

import Image from "next/image";
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
    <section id="top" className="pt-24 pb-18">
      <motion.div
        className="mx-auto grid w-full max-w-[65rem] items-center gap-10 px-6 tab:grid-cols-[1fr_minmax(280px,340px)] tab:gap-14"
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <div>
        <motion.p
          variants={variants}
          className="font-mono uppercase tracking-[0.14em] text-[0.72rem] text-accent-strong m-0 mb-3"
        >
          {profile.location}
        </motion.p>
        <motion.h1
          variants={variants}
          className="text-[clamp(2.75rem,8vw,5rem)] font-extrabold bg-[linear-gradient(135deg,#0f1b2d_30%,#2563eb_120%)] bg-clip-text text-transparent my-2"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          variants={variants}
          className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-accent-strong m-0 mb-5"
        >
          {profile.role}
        </motion.p>
        <motion.p
          variants={variants}
          className="max-w-[640px] text-[1.08rem] text-muted m-0 mb-8"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          variants={variants}
          className="flex flex-wrap gap-[0.85rem] mb-11"
        >
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

        <motion.ul
          variants={variants}
          className="flex flex-wrap gap-4 list-none p-0 m-0"
        >
          {profile.stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col py-[0.9rem] px-[1.4rem] rounded-xl glass min-w-[120px]"
            >
              <span className="text-[1.75rem] font-extrabold text-accent-strong leading-[1.1]">
                {stat.value}
              </span>
              <span className="text-[0.82rem] text-muted">{stat.label}</span>
            </li>
          ))}
        </motion.ul>
        </div>

        <motion.div
          variants={variants}
          className="relative order-first mx-auto w-full max-w-[280px] tab:order-0 tab:max-w-none"
        >
          {/* Decorative accent glow behind the portrait */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-4xl bg-[radial-gradient(120%_120%_at_70%_10%,rgba(37,99,235,0.35),transparent_60%)] blur-2xl"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] glass p-1.5">
            <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
              <Image
                src={profile.photo}
                alt={`${profile.name} — ${profile.role}`}
                fill
                priority
                sizes="(min-width: 720px) 340px, 280px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
