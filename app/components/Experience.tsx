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
      <ol className="list-none p-0 m-0 grid gap-5 relative">
        {experiences.map((job, i) => (
          <Reveal
            key={job.company}
            as="li"
            className="grid grid-cols-[auto_1fr] gap-5 relative [&:not(:last-child)]:before:content-[''] [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:left-[7px] [&:not(:last-child)]:before:top-8 [&:not(:last-child)]:before:-bottom-5 [&:not(:last-child)]:before:w-0.5 [&:not(:last-child)]:before:bg-[linear-gradient(var(--color-accent-soft),transparent)]"
            delay={i * 0.1}
          >
            <div
              className="w-4 h-4 rounded-full bg-accent shadow-[0_0_0_5px_rgba(37,99,235,0.15)] mt-6 relative z-[1]"
              aria-hidden="true"
            />
            <div className="rounded-[18px] py-[1.4rem] px-[1.6rem] glass transition duration-250 hover:-translate-y-[3px] hover:shadow-[0_20px_45px_-14px_rgba(23,54,106,0.38)]">
              <h3 className="text-[1.2rem]">{job.role}</h3>
              <p className="my-[0.2rem] font-semibold text-accent-strong">
                {job.company}
              </p>
              <p className="font-mono text-[0.8rem] text-muted-2 m-0 mb-[0.85rem]">
                <time>
                  {job.start} — {job.end}
                </time>
                <span> · {job.location}</span>
              </p>
              <ul className="pl-[1.15rem] grid gap-[0.4rem] text-muted marker:text-accent">
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
