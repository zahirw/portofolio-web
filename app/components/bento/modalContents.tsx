"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState, type SVGProps } from "react";
import {
  profile,
  skillGroups,
  experiences,
  projects,
  educationList,
  socials,
  type Project,
} from "@/lib/data";
import {
  GraduationIcon,
  AwardIcon,
  CodeIcon,
  DatabaseIcon,
  SparkIcon,
  WrenchIcon,
  MailIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  UpworkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  CloseIcon,
} from "../icons";

type GalleryImage = { src: string; alt: string };

// Fullscreen viewer for project screenshots. Portals to <body> so it sits
// above the modal (which is z-50); supports click-to-close, arrow keys, and
// prev/next navigation across the whole gallery for the project.
function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
    };
  }, [index, images.length, onClose, onIndexChange]);

  if (!mounted) return null;

  const image = images[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(3,6,14,0.92)] p-4 backdrop-blur-md tab:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close fullscreen image"
        className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[1.15rem] text-fg transition hover:border-accent hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <CloseIcon />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fg transition hover:border-accent hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 tab:left-4"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fg transition hover:border-accent hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 tab:right-4"
          >
            <ArrowRightIcon />
          </button>
        </>
      ) : null}

      <div
        className="relative h-full max-h-[85vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {images.length > 1 ? (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.75rem] text-muted">
          {index + 1} / {images.length}
        </span>
      ) : null}
    </div>,
    document.body,
  );
}

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
          {educationList.map((edu) => (
            <div key={edu.degree} className="mb-[0.6rem] last:mb-0">
              <p className="my-[0.15rem]">
                {edu.degree} — {edu.school}
              </p>
              <p className="my-[0.15rem] text-muted">
                {edu.start} – {edu.end} · {edu.detail}
              </p>
            </div>
          ))}
        </div>
        <div className="glass rounded-xl px-[1.4rem] py-5">
          <h3 className="mb-2 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong">
            <AwardIcon className="size-[1.35em] shrink-0 text-accent" />
            Recognition
          </h3>
          <ul className="pl-[1.1rem] text-muted">
            <li>Upwork — Top Rated, 100% Job Success Score</li>
            <li>
              Government portals delivered: SIARSIPARIS (Arsip Nasional RI),
              SIPKONS
            </li>
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
  Frontend: CodeIcon,
  "Backend & AI": DatabaseIcon,
  Web3: SparkIcon,
  "Tools & Platforms": WrenchIcon,
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
          className="relative grid grid-cols-[auto_1fr] gap-5 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:-bottom-5 [&:not(:last-child)]:before:left-[7px] [&:not(:last-child)]:before:top-8 [&:not(:last-child)]:before:w-0.5 [&:not(:last-child)]:before:bg-[linear-gradient(rgba(123,180,255,0.35),transparent)] [&:not(:last-child)]:before:content-['']"
        >
          <div
            className="relative z-[1] mt-6 h-4 w-4 rounded-full bg-accent shadow-[0_0_0_5px_rgba(74,158,255,0.2)]"
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

function ProjectsList({ onSelect }: { onSelect: (name: string) => void }) {
  return (
    <div className="grid gap-5 tab:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.name}
          className="group relative flex flex-col overflow-hidden rounded-[18px] glass"
        >
          <button
            type="button"
            onClick={() => onSelect(project.name)}
            aria-label={`Open ${project.name} details`}
            className="grid flex-1 content-start text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-accent-soft">
              <Image
                src={project.thumbnail}
                alt={`${project.name} preview`}
                fill
                sizes="(min-width: 720px) 20rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid content-start gap-[0.9rem] p-5">
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
              <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-accent-strong">
                View details
                <ArrowRightIcon className="size-[1.1em] transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        </article>
      ))}
    </div>
  );
}

function ProjectDetailView({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const { detail } = project;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flat list of every screenshot for this project (thumbnail first, then
  // each feature's images in render order) so the lightbox can page through
  // all of them regardless of which thumbnail was clicked.
  const gallery = useMemo<GalleryImage[]>(() => {
    const images: GalleryImage[] = [
      { src: project.thumbnail, alt: `${project.name} preview` },
    ];
    detail?.features.forEach((feature) => {
      feature.images.forEach((image, index) => {
        images.push({
          src: image,
          alt: `${feature.title} screenshot ${index + 1}`,
        });
      });
    });
    return images;
  }, [project, detail]);

  let featureImageCursor = 1;

  return (
    <div className="grid gap-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.78rem] text-accent-strong transition hover:border-accent hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <ArrowLeftIcon className="size-[1.1em]" />
        Back to projects
      </button>

      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        aria-label={`View ${project.name} preview fullscreen`}
        className="group relative aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <Image
          src={project.thumbnail}
          alt={`${project.name} preview`}
          fill
          sizes="(min-width: 720px) 38rem, 100vw"
          className="object-cover transition group-hover:scale-[1.02]"
        />
      </button>

      <div>
        <h3 className="text-[1.3rem]">{project.name}</h3>
        <p className="m-0 mt-[0.15rem] font-mono text-[0.82rem] text-accent-strong">
          {project.tagline}
          {detail ? ` · ${detail.company}` : ""}
        </p>
      </div>

      <p className="m-0 text-muted">{detail?.overview ?? project.description}</p>

      {detail ? (
        <>
          <div className="glass rounded-[18px] px-[1.4rem] py-5">
            <h4 className="mb-2 text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong">
              Roles &amp; Responsibilities
            </h4>
            <ul className="grid gap-[0.4rem] pl-[1.15rem] text-muted marker:text-accent">
              {detail.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong">
              Technologies
            </h4>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {detail.technologies.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5">
            <h4 className="m-0 text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong">
              Key Features
            </h4>
            {detail.features.map((feature) => (
              <div key={feature.title} className="glass rounded-[18px] px-[1.4rem] py-5">
                <h5 className="mb-2 text-[1.05rem]">{feature.title}</h5>
                <ul className="mb-4 grid gap-[0.4rem] pl-[1.15rem] text-muted marker:text-accent">
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-3 tab:grid-cols-3">
                  {feature.images.map((image, index) => {
                    const galleryIndex = featureImageCursor++;
                    return (
                      <button
                        key={`${feature.title}-${index}`}
                        type="button"
                        onClick={() => setLightboxIndex(galleryIndex)}
                        aria-label={`View ${feature.title} screenshot ${index + 1} fullscreen`}
                        className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                      >
                        <Image
                          src={image}
                          alt={`${feature.title} screenshot ${index + 1}`}
                          fill
                          sizes="(min-width: 720px) 12rem, 33vw"
                          className="object-cover transition group-hover:scale-[1.05]"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {detail.liveUrl ? (
            <a
              href={detail.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-fit"
            >
              <ExternalLinkIcon />
              View live website
            </a>
          ) : null}
        </>
      ) : (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {project.stack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {lightboxIndex !== null ? (
        <ImageLightbox
          images={gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}

export function ProjectsContent() {
  const [selected, setSelected] = useState<string | null>(null);
  const project = projects.find((p) => p.name === selected) ?? null;

  if (project) {
    return (
      <ProjectDetailView project={project} onBack={() => setSelected(null)} />
    );
  }

  return <ProjectsList onSelect={setSelected} />;
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
        className="group flex items-center gap-[0.9rem] rounded-xl border border-white/10 bg-white/5 px-5 py-4 no-underline transition hover:-translate-y-0.5 hover:border-accent"
      >
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[1.15rem] text-accent-strong transition-colors group-hover:border-accent group-hover:text-accent"
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
