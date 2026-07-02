import Section from "./Section";
import Reveal from "./Reveal";
import { certifications, education, profile } from "@/lib/data";
import { UserIcon, GraduationIcon, AwardIcon } from "./icons";

export default function About() {
  return (
    <Section id="about" eyebrow="Who I am" title="About" icon={<UserIcon />}>
      <div className="grid gap-7 tab:grid-cols-[1.6fr_1fr] tab:items-start">
        <Reveal as="div">
          <p className="m-0 max-w-[640px] text-[1.08rem] text-muted">
            {profile.summary}
          </p>
        </Reveal>
        <Reveal as="div" className="grid gap-4" delay={0.1}>
          <div className="glass rounded-xl py-5 px-[1.4rem]">
            <h3 className="text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong mb-2 flex items-center gap-2">
              <GraduationIcon className="size-[1.35em] shrink-0 text-accent" />
              Education
            </h3>
            <p className="my-[0.15rem]">{education.degree}</p>
            <p className="my-[0.15rem] text-muted">{education.detail}</p>
          </div>
          <div className="glass rounded-xl py-5 px-[1.4rem]">
            <h3 className="text-[0.78rem] uppercase tracking-[0.1em] text-accent-strong mb-2 flex items-center gap-2">
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
        </Reveal>
      </div>
    </Section>
  );
}
