// Single source of truth for all portfolio content (from Zahir's CV).
// Edited across all 3 build phases; components stay stable.

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  description: string;
  // Path (in /public) to the card thumbnail. Swap the placeholder SVGs in
  // /public/projects for real screenshots when available.
  thumbnail: string;
};

export type SocialLink = {
  label: string;
  href: string;
  // Set to true for links that still need a real URL from Zahir.
  placeholder?: boolean;
};

export const profile = {
  name: "Zahir Wakid",
  role: "Frontend Developer",
  location: "Jakarta, Indonesia",
  email: "wakidzahir@gmail.com",
  phone: "(+62) 812-1032-2275",
  phoneHref: "+6281210322275",
  summary:
    "Frontend Developer with 4+ years of experience building responsive, scalable, and user-centric web and mobile applications across fintech, blockchain, and government projects. Proficient in React, Vue, Next.js, TypeScript, and RESTful API integration. Passionate about clean code, intuitive UI/UX, and continuous learning.",
  // Zahir will place Zahir_CV.pdf in /public.
  cvUrl: "/Zahir_CV.pdf",
  // Hero portrait. Placeholder for now — drop a real photo at /public/zahir.jpg
  // (portrait orientation, ~4:5 works best) and change this to "/zahir.jpg".
  photo: "/zahir.svg",
  stats: [
    { value: "4+", label: "Years experience" },
    { value: "3", label: "Featured projects" },
    { value: "3", label: "Industries" },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "HTML", "CSS / SCSS"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Redux",
      "Zustand",
      "Pinia",
      "Vuex",
      "React Query",
      "GSAP",
    ],
  },
  {
    label: "UI Libraries",
    items: ["Tailwind CSS", "Chakra UI", "Bootstrap", "Ant Design", "Naive UI"],
  },
  {
    label: "Tools & Platforms",
    items: ["Vite", "Vercel", "Netlify", "Postman", "GitHub"],
  },
  {
    label: "Databases",
    items: ["MySQL", "PostgreSQL"],
  },
];

export const experiences: Experience[] = [
  {
    role: "Frontend Developer",
    company: "PT. Metaverse Indonesia Makmur (Nusameta, WIR Group)",
    location: "Indonesia",
    start: "Mar 2022",
    end: "Present",
    bullets: [
      "Developed and maintained web apps using Next.js and React Native for various blockchain products.",
      "Collaborated with the UI/UX team to implement responsive and accessible design components.",
      "Integrated REST APIs and handled state management using Redux and Zustand.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "PT. Mitra Semeru Indonesia (PowerCommerce Asia)",
    location: "Indonesia",
    start: "Jan 2022",
    end: "Nov 2022",
    bullets: [
      "Built and maintained Powerbiz web modules including user management and order fulfillment.",
      "Optimized frontend performance and resolved bugs across multiple modules.",
    ],
  },
  {
    role: "Senior IT Staff & Frontend Developer",
    company: "PT. Pintar Inovasi Digital (Asetku, Akulaku Group)",
    location: "Indonesia",
    start: "Oct 2018",
    end: "Nov 2021",
    bullets: [
      "Led frontend development of dashboards and internal web tools using Vue.js.",
      "Participated in testing APIs from third-party vendors including ASLI RI and Thomson Reuters.",
      "Contributed to ISO 27001 compliance tasks as SMKI Officer.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Betapass",
    tagline: "SSO & Dashboard",
    stack: ["Next.js", "React", "TypeScript"],
    description:
      "Single sign-on platform and dashboard built with Next.js, integrating secure login and user management.",
    thumbnail: "/projects/betapass.svg",
  },
  {
    name: "Entri Ticketing",
    tagline: "Mobile App",
    stack: ["React Native", "Blockchain", "NFT"],
    description:
      "Mobile ticketing app built with React Native, integrating NFT-based ticket validation.",
    thumbnail: "/projects/entri-ticketing.svg",
  },
  {
    name: "SIPKONS",
    tagline: "Government Housing System",
    stack: ["Vue.js", "CMS"],
    description:
      "Government housing system built with Vue.js, featuring custom CMS capabilities.",
    thumbnail: "/projects/sipkons.svg",
  },
];

export const education = {
  degree: "Bachelor's Degree in Information Technology",
  detail: "(or relevant experience)",
};

export const certifications = [
  { name: "React Masterclass", issuer: "Udemy", year: "2021" },
];

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:wakidzahir@gmail.com" },
  { label: "Phone", href: "tel:+6281210322275" },
  // TODO: Zahir to supply real GitHub / LinkedIn / Upwork URLs.
  { label: "GitHub", href: "https://github.com/zahirw", placeholder: true },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/zahir-wakid",
    placeholder: true,
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~0107dfee102c50008f?mp_source=share",
    placeholder: true,
  },
];

// In-page navigation targets (used by Nav + sections).
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
