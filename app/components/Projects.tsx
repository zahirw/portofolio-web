import Section from "./Section";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";
import { FolderIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="Projects" icon={<FolderIcon />}>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <Reveal key={project.name} as="article" className="project-card" delay={i * 0.1}>
            <div className="project-head">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
            </div>
            <p className="project-desc">{project.description}</p>
            <ul className="project-stack">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
