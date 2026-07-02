import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";
import { FolderIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="Projects" icon={<FolderIcon />}>
      <div className="grid gap-5 grid-cols-1 tab:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            as="article"
            className="group relative overflow-hidden flex flex-col rounded-[18px] glass transition duration-250 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-14px_rgba(23,54,106,0.38)] before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--color-accent),transparent)] before:opacity-0 before:transition-opacity hover:before:opacity-100"
            delay={i * 0.1}
          >
            <div className="relative aspect-video overflow-hidden bg-accent-soft border-b border-white/70">
              <Image
                src={project.thumbnail}
                alt={`${project.name} preview`}
                fill
                sizes="(min-width: 720px) 33vw, 100vw"
                className="object-cover transition-transform duration-350 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6 grid gap-[0.9rem] content-start flex-1">
              <div>
                <h3 className="text-[1.25rem]">{project.name}</h3>
                <p className="m-0 mt-[0.15rem] font-mono text-accent-strong text-[0.82rem]">
                  {project.tagline}
                </p>
              </div>
              <p className="m-0 text-muted">{project.description}</p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {project.stack.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
