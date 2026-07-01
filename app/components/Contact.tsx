import Section from "./Section";
import Reveal from "./Reveal";
import { profile, socials } from "@/lib/data";
import {
  MessageIcon,
  MailIcon,
  PhoneIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  UpworkIcon,
} from "./icons";
import type { SVGProps } from "react";

const socialIcons: Record<
  string,
  (p: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Upwork: UpworkIcon,
};

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let's talk"
      title="Contact"
      icon={<MessageIcon />}
    >
      <Reveal as="div" className="contact-panel">
        <p className="contact-lead">
          Open to frontend opportunities and collaborations. Feel free to reach
          out.
        </p>

        <div className="contact-details">
          <a href={`mailto:${profile.email}`} className="contact-item">
            <span className="contact-item-icon" aria-hidden="true">
              <MailIcon />
            </span>
            <span className="contact-item-text">
              <span className="contact-label">Email</span>
              <span className="contact-value">{profile.email}</span>
            </span>
          </a>
          {/* <a href={`tel:${profile.phoneHref}`} className="contact-item">
            <span className="contact-item-icon" aria-hidden="true">
              <PhoneIcon />
            </span>
            <span className="contact-item-text">
              <span className="contact-label">Phone</span>
              <span className="contact-value">{profile.phone}</span>
            </span>
          </a> */}
        </div>

        <div className="contact-actions">
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
      </Reveal>

      <footer className="footer">
        <p>
          © {profile.name} · {profile.role}
        </p>
      </footer>
    </Section>
  );
}
