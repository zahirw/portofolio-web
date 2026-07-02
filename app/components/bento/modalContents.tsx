import Image from "next/image";
import type { SVGProps } from "react";
import {
  profile,
  skillGroups,
  experiences,
  projects,
  education,
  certifications,
  socials,
} from "@/lib/data";
import {
  GraduationIcon,
  AwardIcon,
  CodeIcon,
  BoxIcon,
  PaletteIcon,
  WrenchIcon,
  DatabaseIcon,
  MailIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  UpworkIcon,
} from "../icons";

// Modal bodies. Each is the full detail for one bento card — the same content
// the old scrolling sections showed, minus the Section/Reveal chrome.

export function AboutContent() {
  return (
    <div className="grid gap-6">
      <p className="m-0 text-[1.05rem] text-muted">{profile.summary}</p>

      <ul className="grid grid-cols-3 gap-3 list-none p-0 m-0">
        {profile.stats.map((stat) => (
          <li
            key={stat.label}
            className="glass rounded-xl px-3 py-3 text-center"
          >
            <span className="block text-[1.5rem] font-extrabold leading-none text-accent-strong">
              {stat.value}
            </span>
            <span className="text-[0.72rem] text-muted">{stat.label}</span>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 tab:grid-cols-2">
        <div className="glass rounded-xl px-[1.4rem] py-5">
          <h3 className="mb-2 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong">
            <GraduationIcon className="size-[1.35em] shrink-0 text-accent" />
            Education
          </h3>
          <p className="my-[0.15rem]">{education.degree}</p>
          <p className="my-[0.15rem] text-muted">{education.detail}</p>
        </div>
        <div className="glass rounded-xl px-[1.4rem] py-5">
          <h3 className="mb-2 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong">
            <AwardIcon className="size-[1.35em] shrink-0 text-accent" />
            Certifications
          </h3>
          <ul className="pl-[1.1rem] text-muted">
            {certifications.map((cert) => (
              <li key={cert.name}>
                {cert.name} — {cert.issuer}, {cert.year}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const groupIcons: Record<
  string,
  (p: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  Languages: CodeIcon,
  "Frameworks & Libraries": BoxIcon,
  "UI Libraries": PaletteIcon,
  "Tools & Platforms": WrenchIcon,
  Databases: DatabaseIcon,
};

export function SkillsContent() {
  return (
    <div className="grid gap-[1.1rem] tab:grid-cols-2">
      {skillGroups.map((group) => {
        const GroupIcon = groupIcons[group.label] ?? CodeIcon;
        return (
          <div key={group.label} className="glass rounded-[18px] p-[1.4rem]">
            <h3 className="mb-[0.9rem] flex items-center gap-[0.55rem] text-[1.05rem]">
              <GroupIcon className="size-[1.35em] shrink-0 text-accent" />
              {group.label}
            </h3>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function ExperienceContent() {
  return (
    <ol className="relative m-0 grid list-none gap-5 p-0">
      {experiences.map((job) => (
        <li
          key={job.company}
          className="relative grid grid-cols-[auto_1fr] gap-5 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:-bottom-5 [&:not(:last-child)]:before:left-[7px] [&:not(:last-child)]:before:top-8 [&:not(:last-child)]:before:w-0.5 [&:not(:last-child)]:before:bg-[linear-gradient(var(--color-accent-soft),transparent)] [&:not(:last-child)]:before:content-['']"
        >
          <div
            className="relative z-[1] mt-6 h-4 w-4 rounded-full bg-accent shadow-[0_0_0_5px_rgba(37,99,235,0.15)]"
            aria-hidden="true"
          />
          <div className="glass rounded-[18px] px-[1.6rem] py-[1.4rem]">
            <h3 className="text-[1.15rem]">{job.role}</h3>
            <p className="my-[0.2rem] font-semibold text-accent-strong">
              {job.company}
            </p>
            <p className="m-0 mb-[0.85rem] font-mono text-[0.8rem] text-muted-2">
              <time>
                {job.start} — {job.end}
              </time>
              <span> · {job.location}</span>
            </p>
            <ul className="grid gap-[0.4rem] pl-[1.15rem] text-muted marker:text-accent">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProjectsContent() {
  return (
    <div className="grid gap-5 tab:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.name}
          className="group relative flex flex-col overflow-hidden rounded-[18px] glass"
        >
          <div className="relative aspect-video overflow-hidden border-b border-white/70 bg-accent-soft">
            <Image
              src={project.thumbnail}
              alt={`${project.name} preview`}
              fill
              sizes="(min-width: 720px) 20rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid flex-1 content-start gap-[0.9rem] p-5">
            <div>
              <h3 className="text-[1.2rem]">{project.name}</h3>
              <p className="m-0 mt-[0.15rem] font-mono text-[0.82rem] text-accent-strong">
                {project.tagline}
              </p>
            </div>
            <p className="m-0 text-muted">{project.description}</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

const socialIcons: Record<
  string,
  (p: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Upwork: UpworkIcon,
};

export function ContactContent() {
  return (
    <div className="grid gap-7">
      <p className="m-0 text-[1.05rem] text-muted">
        Open to frontend opportunities and collaborations. Feel free to reach
        out.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="group flex items-center gap-[0.9rem] rounded-xl border border-white/70 bg-white/50 px-5 py-4 no-underline transition hover:-translate-y-0.5 hover:border-accent"
      >
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/72 text-[1.15rem] text-accent-strong transition-colors group-hover:border-accent group-hover:text-accent"
          aria-hidden="true"
        >
          <MailIcon />
        </span>
        <span className="flex flex-col">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent-strong">
            Email
          </span>
          <span className="text-[1.05rem] font-semibold break-all">
            {profile.email}
          </span>
        </span>
      </a>

      <div className="flex flex-wrap gap-[0.85rem]">
        <a href={profile.cvUrl} download className="btn btn-primary">
          <DownloadIcon />
          Download CV
        </a>
        {socials
          .filter((s) => ["GitHub", "LinkedIn", "Upwork"].includes(s.label))
          .map((social) => {
            const SocialIcon = socialIcons[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label={social.label}
              >
                {SocialIcon ? <SocialIcon /> : null}
                {social.label}
              </a>
            );
          })}
      </div>
    </div>
  );
}
