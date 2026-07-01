import Section from "./Section";
import Reveal from "./Reveal";
import { experiences } from "@/lib/data";
import { BriefcaseIcon } from "./icons";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Where I've worked"
      title="Experience"
      icon={<BriefcaseIcon />}
    >
      <ol className="timeline">
        {experiences.map((job, i) => (
          <Reveal key={job.company} as="li" className="timeline-item" delay={i * 0.1}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <h3 className="job-role">{job.role}</h3>
              <p className="job-company">{job.company}</p>
              <p className="job-meta">
                <time>
                  {job.start} — {job.end}
                </time>
                <span> · {job.location}</span>
              </p>
              <ul className="job-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
