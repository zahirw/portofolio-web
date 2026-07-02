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
      <div className="grid gap-[1.1rem] grid-cols-1 tab:grid-cols-2 desk:grid-cols-3">
        {skillGroups.map((group, i) => {
          const GroupIcon = groupIcons[group.label] ?? CodeIcon;
          return (
          <Reveal
            key={group.label}
            as="div"
            className="group glass rounded-[18px] p-[1.4rem] transition duration-250 hover:-translate-y-1 hover:shadow-[0_20px_45px_-14px_rgba(23,54,106,0.38)]"
            delay={i * 0.08}
          >
            <h3 className="text-[1.05rem] mb-[0.9rem] flex items-center gap-[0.55rem]">
              <GroupIcon className="size-[1.35em] shrink-0 text-accent" />
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {group.items.map((item) => (
                <li key={item} className="tag group-hover:border-accent">
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
