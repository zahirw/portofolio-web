import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";
import {
  LayersIcon,
  CodeIcon,
  BoxIcon,
  PaletteIcon,
  WrenchIcon,
  DatabaseIcon,
} from "./icons";
import type { SVGProps } from "react";

const groupIcons: Record<string, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  Languages: CodeIcon,
  "Frameworks & Libraries": BoxIcon,
  "UI Libraries": PaletteIcon,
  "Tools & Platforms": WrenchIcon,
  Databases: DatabaseIcon,
};

export default function Skills() {
  return (
    <Section id="skills" eyebrow="What I work with" title="Skills" icon={<LayersIcon />}>
      <div className="skills-grid">
        {skillGroups.map((group, i) => {
          const GroupIcon = groupIcons[group.label] ?? CodeIcon;
          return (
          <Reveal key={group.label} as="div" className="skill-card" delay={i * 0.08}>
            <h3>
              <GroupIcon className="block-icon" />
              {group.label}
            </h3>
            <ul className="skill-tags">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
