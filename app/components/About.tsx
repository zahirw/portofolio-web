import Section from "./Section";
import Reveal from "./Reveal";
import { certifications, education, profile } from "@/lib/data";
import { UserIcon, GraduationIcon, AwardIcon } from "./icons";

export default function About() {
  return (
    <Section id="about" eyebrow="Who I am" title="About" icon={<UserIcon />}>
      <div className="about-grid">
        <Reveal as="div" className="about-summary-wrap">
          <p className="about-summary">{profile.summary}</p>
        </Reveal>
        <Reveal as="div" className="about-aside" delay={0.1}>
          <div className="about-block">
            <h3>
              <GraduationIcon className="block-icon" />
              Education
            </h3>
            <p>{education.degree}</p>
            <p className="muted">{education.detail}</p>
          </div>
          <div className="about-block">
            <h3>
              <AwardIcon className="block-icon" />
              Certifications
            </h3>
            <ul>
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
