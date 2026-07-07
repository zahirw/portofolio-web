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

export type ProjectFeature = {
  title: string;
  points: string[];
  // Placeholder screenshot(s) for this feature — swap for real screenshots
  // when available.
  images: string[];
};

export type ProjectDetail = {
  company: string;
  companyUrl?: string;
  overview: string;
  roles: string[];
  technologies: string[];
  features: ProjectFeature[];
  liveUrl?: string;
};

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  description: string;
  // Path (in /public) to the card thumbnail. Swap the placeholder SVGs in
  // /public/projects for real screenshots when available.
  thumbnail: string;
  // Optional deep-dive shown when a project card is opened in the modal.
  detail?: ProjectDetail;
};

export type SocialLink = {
  label: string;
  href: string;
  // Set to true for links that still need a real URL from Zahir.
  placeholder?: boolean;
};

export const profile = {
  name: "Zahir Wakid",
  role: "Senior Frontend Engineer · Full Stack Developer",
  location: "Jakarta, Indonesia (Remote / GMT+7)",
  email: "wakidzahir@gmail.com",
  phone: "(+62) 812-1032-2275",
  phoneHref: "+6281210322275",
  summary:
    "Senior Frontend Engineer with 7+ years shipping production web & mobile apps across fintech, blockchain, and government. React/Next.js/TypeScript specialist who increasingly owns the full stack — Node.js, Express, Supabase, PostgreSQL — plus Web3 (Wagmi) and AI/LLM integrations (Claude, OpenAI, RAG). Delivered SSO platforms, NFT ticketing systems, and government portals used in production. Top Rated on Upwork with a 100% Job Success Score, translating complex fintech and blockchain requirements into performant, maintainable applications.",
  // Zahir will place Zahir_CV.pdf in /public.
  cvUrl: "/Zahir_CV.pdf",
  // Hero portrait. Placeholder for now — drop a real photo at /public/zahir.jpg
  // (portrait orientation, ~4:5 works best) and change this to "/zahir.jpg".
  photo: "/zahir.svg",
  stats: [
    { value: "7+", label: "Years experience" },
    { value: "6", label: "Featured projects" },
    { value: "4", label: "Industries" },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Vue.js",
      "Redux",
      "Zustand",
      "Pinia",
      "Vuex",
      "TanStack Query",
      "GSAP",
      "Tailwind CSS",
      "Ant Design",
      "Chakra UI",
      "Bootstrap",
      "Naïve UI",
    ],
  },
  {
    label: "Backend & AI",
    items: [
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "REST API design",
      "BullMQ",
      "Claude API",
      "OpenAI",
      "DeepSeek",
      "RAG (pgvector)",
      "Stripe / Midtrans",
    ],
  },
  {
    label: "Web3",
    items: ["Wagmi", "NFT integrations", "Wallet-based auth"],
  },
  {
    label: "Tools & Platforms",
    items: [
      "Vite",
      "Git / GitHub",
      "Vercel",
      "Netlify",
      "Cloudflare",
      "Postman",
      "Jenkins",
      "OpenShift",
    ],
  },
];

export const experiences: Experience[] = [
  {
    role: "Senior Frontend Developer (Blockchain Team)",
    company: "PT. Metaverse Indonesia Makmur (Nusameta, WIR Group)",
    location: "Indonesia · Remote",
    start: "Mar 2022",
    end: "Present",
    bullets: [
      "Architected and shipped 5+ production frontends — Betapass (SSO + dashboard), Entri (NFT ticketing, React Native), EO Entri (event-management dashboard), Scanner Entri, and the Nusameta CMS suite — using Next.js and React Native.",
      "Built Web3 features with Wagmi for wallet-based auth and on-chain NFT ticketing, bridging blockchain complexity into intuitive user flows.",
      "Optimized API integration and rendering performance across apps via code-splitting, TanStack Query caching, and shared component libraries, reducing redundant network calls and improving load times.",
      "Partnered closely with UI/UX designers to ship pixel-accurate, responsive interfaces and consistent design systems across the product suite.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "PT. Mitra Semeru Indonesia (PowerCommerce Asia)",
    location: "Indonesia · Hybrid",
    start: "Jan 2021",
    end: "Nov 2021",
    bullets: [
      "Developed and maintained the Powerbiz e-commerce platform, delivering the fulfillment and user-management modules end to end.",
      "Optimized backend API integration for reliable data flow and resolved cross-module bugs to improve platform stability.",
    ],
  },
  {
    role: "Frontend Developer → IT / Software Tester",
    company: "PT. Pintar Inovasi Digital (Asetku, Akulaku Group)",
    location: "Indonesia · Onsite",
    start: "Oct 2018",
    end: "Nov 2021",
    bullets: [
      "Built and maintained Asetku's customer-facing web app and internal dashboards for a licensed P2P-lending fintech.",
      "Developed EKYC verification web apps for lenders and borrowers, integrating third-party background-check APIs (ASLI RI, Thomson Reuters).",
      "Tested and integrated internal Machine Learning and third-party vendor APIs into the Asetku platform; authored UML system documentation.",
      "Contributed to OJK regulatory licensing as Software Tester and supported e-signature (Digital Signature) vendor implementation.",
    ],
  },
  {
    role: "Service Engineer",
    company: "PT. Jasa Teknologi Informasi IBM (IBM-JTI)",
    location: "Indonesia · Onsite",
    start: "Oct 2017",
    end: "Oct 2018",
    bullets: [
      "Diagnosed, repaired, and tested ATM hardware modules (Hitachi-Omron) in the field — first professional IT role.",
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
    thumbnail: "/projects/betapass-thumbnail.png",
    detail: {
      company: "Nusameta",
      companyUrl: "https://www.nusameta.io",
      overview:
        "Betapass is a Single Sign-On solution that connects all services within the Nusameta ecosystem.",
      roles: [
        "Implementing the Login, Signup, Profile, KYC, and Minar pages — both interface and functionality",
        "Developing and optimizing API integration with the backend services to ensure seamless data flow and functionality",
        "Working closely with UI/UX designers to ensure the implementation matches design specifications and provides an optimal user experience",
        "Collaborating closely with the backend team to implement blockchain wallet connectivity and transaction features",
        "Implementing state management solutions to handle complex data interactions between frontend and backend",
        "Building Darkmode implementation",
        "Using Next.js 14 and Tailwind CSS to create a responsive website interface across multiple devices",
        "Implementing WebSocket for handling real-time notifications",
      ],
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "Redux",
        "Websocket / Socket.io",
        "Web3.js",
      ],
      features: [
        {
          title: "Profile Page",
          points: [
            "Serves as a central hub for users to manage their SSO identity within the Nusameta ecosystem.",
            "Customizable user preferences and settings for a personalized experience across the ecosystem.",
            "Secure password management with password reset functionality.",
          ],
          images: ["/projects/betapass-profile-page.png"],
        },
        {
          title: "KYC Verification",
          points: [
            "Integration with KYC (Know Your Customer) verification process, allowing users to complete identity verification for regulatory compliance.",
            "Guided, multi-step identity verification flow with clear progress indicators.",
            "Form validation and document upload handling to ensure submitted data meets compliance requirements.",
          ],
          images: ["/projects/betapass-kyc.png"],
        },
        {
          title: "Wallet Management",
          points: [
            "Seamless connection to wallet functionality for blockchain-related services within the Nusameta ecosystem.",
            "Collaborated closely with the backend team to implement blockchain wallet connectivity and transaction features.",
            "Displays balances and transaction activity in a clear, responsive layout.",
          ],
          images: ["/projects/betapass-wallet-management.png"],
        },
        {
          title: "Signup Page",
          points: [
            "Streamlined user registration with a modern, intuitive signup interface that simplifies onboarding.",
            "Integration with email verification system to enhance security and confirm user identity.",
            "Form validation ensures user-provided information meets required formatting and quality standards.",
            "Client-side validation using Formik and Yup for immediate feedback on input errors, reducing submission failures.",
            "Custom validation rules for password strength, email format, and username availability checking.",
            "Error message handling with clear, user-friendly notifications that guide users to correct their input.",
          ],
          images: ["/projects/betapass-signup.png"],
        },
        {
          title: "Login Page",
          points: [
            "Clean, modern interface with a streamlined login process for users accessing the Nusameta ecosystem.",
            "Secure authentication protocols with robust error handling for invalid credentials.",
            "Responsive design ensures optimal viewing and functionality across desktop and mobile devices.",
            "Password recovery option with email verification for users who need to reset their credentials.",
            "Integration with WhatsApp authentication, allowing users to sign in using their verified WhatsApp number.",
          ],
          images: ["/projects/betapass-signin.png"],
        },
      ],
      liveUrl: "https://betapass.nusameta.io/",
    },
  },
  {
    name: "Betapass Edu",
    tagline: "Education Platform",
    stack: ["Next.js", "TypeScript", "Socket.io"],
    description:
      "Student data management dashboard integrated with gamified e-learning within the Nusameta application.",
    thumbnail: "/projects/edu-thumbnail.png",
    detail: {
      company: "Nusameta",
      companyUrl: "https://www.nusameta.io",
      overview:
        "Beta Pass Edu is a student data management dashboard integrated with gamified e-learning within the Nusameta application.",
      roles: [
        "Implementing the Register organization, Join organization, Access nusa, User data, Notifications and approval pages — both interface and functionality",
        "Using Next.js 14 and Tailwind CSS to create a responsive website interface across multiple devices",
        "Developing and optimizing API integration with the backend services to ensure seamless data flow and functionality",
        "Working closely with UI/UX designers to ensure the implementation matches design specifications and provides an optimal user experience",
        "Collaborating closely with the backend team to implement blockchain wallet connectivity and transaction features",
        "Implementing state management solutions to handle complex data interactions between frontend and backend",
      ],
      technologies: ["Next.js", "Tailwind CSS", "React Context", "Socket.io"],
      features: [
        {
          title: "Join Organization Page",
          points: [
            "Facilitates seamless school enrollment by inputting key identification numbers.",
            "Real-time school lookup allows instant verification and displays matching school details, including name, level, and address.",
            "Users are required to enter a valid personal identification number (NIP/NIK) to proceed with the registration.",
            "Visual confirmation of school availability ensures accurate data entry and builds user confidence before submission.",
            "Accessibility support with clear input formatting and interactive feedback for ease of use.",
          ],
          images: ["/projects/edu-join-organization-page.png"],
        },
        {
          title: "Register Organization Page",
          points: [
            "Allows new schools to onboard into the platform by submitting essential institution and admin details.",
            "Schools are required to upload a logo image in JPG/PNG/WEBP format, with a max file size of 5MB, for identity verification.",
            "Admins must fill in key school data such as School Name, National School ID (NPSN), Level of Education, Address, and optional Website URL.",
            "The second step captures Admin Information including Email, Phone Number, Full Name, NIP/NIK, and Position at School.",
            "A multi-step form interface (2 steps) ensures that both school and admin data are submitted completely and accurately.",
          ],
          images: [
            "/projects/edu-register-organization-page.png",
            "/projects/edu-register-organization-page-2.png",
          ],
        },
        {
          title: "Realtime Notifications",
          points: [
            "Built a real-time notification panel using Socket.IO (WSS) to deliver updates instantly as backend events occur.",
            "Integrated backend event streams with the frontend notification UI.",
            "Designed categorized notification cards with dynamic status labels and timestamps.",
            "Notifications grouped by type with clear icons and color-coded statuses for improved user awareness.",
          ],
          images: ["/projects/edu-realtime-notif.png"],
        },
        {
          title: "User Data Page",
          points: [
            "Developed a user data table for managing admin profiles, fully integrated with backend API for real-time data rendering.",
            "Implemented server-side filtering, sorting, and pagination, allowing smooth browsing even with large datasets.",
            "Enabled sorting on key columns such as name, gender, and date of birth to enhance data accessibility.",
            "Designed a clean, responsive layout with search functionality to quickly locate specific user records.",
            "Sidebar navigation connects seamlessly to related modules like Student and Teacher management for efficient admin workflows.",
          ],
          images: ["/projects/edu-user-data-page.png"],
        },
      ],
    },
  },
  {
    name: "Nusa Market",
    tagline: "NFT Marketplace",
    stack: ["Next.js", "Web3.js", "TypeScript"],
    description:
      "NFT marketplace built for Nusameta, providing a seamless experience for buying, selling, and trading digital assets on the blockchain.",
    thumbnail: "/projects/nusamarket-thumbnail.png",
    detail: {
      company: "Nusameta",
      companyUrl: "https://www.nusameta.io",
      overview:
        "Nusa Market is a cutting-edge NFT marketplace developed for Nusameta, designed to provide users with a seamless experience for buying, selling, and trading digital assets on the blockchain. This project integrates modern web technologies with blockchain capabilities to create a robust and user-friendly platform.",
      roles: [
        "Implementing the Drops, Collection, Earning, and Activity pages — both interface and functionality",
        "Using Next.js 14 and Tailwind CSS to create a responsive website interface across multiple devices",
        "Developing and optimizing API integration with the backend services to ensure seamless data flow and functionality",
        "Working closely with UI/UX designers to ensure the implementation matches design specifications and provides an optimal user experience",
        "Collaborating closely with the backend team to implement blockchain wallet connectivity and transaction features",
        "Implementing state management solutions to handle complex data interactions between frontend and backend",
      ],
      technologies: ["Next.js", "Tailwind CSS", "React Context", "Web3.js"],
      features: [
        {
          title: "Profile NFT Page",
          points: [
            "Comprehensive user profile page displays NFT collections, allowing users to browse, showcase, and manage their digital assets.",
            "Interactive gallery view with filtering options enables users to sort their NFTs by various attributes such as rarity, acquisition date, and price.",
          ],
          images: ["/projects/nusamarket-nft-page.png"],
        },
        {
          title: "Activity Page",
          points: [
            "Displays a chronological list of NFT-related actions, such as minting and transfers, within the Nusameta ecosystem.",
            "Each listing includes artwork previews, collection names, item types, quantity, and pricing details for easy tracking.",
            "Integrated sorting and filtering tools allow users to refine results by date, status, or other parameters.",
            "Built-in search bar enables fast lookup by artwork name or creator.",
            "Fully responsive layout ensures smooth user experience across desktop and mobile devices.",
          ],
          images: ["/projects/nusamarket-activity-page.png"],
        },
        {
          title: "Earning Page",
          points: [
            "Provides a detailed overview of total revenue generated within the Nusameta marketplace ecosystem.",
            "Displays separate metrics for Total Drop Sales and Total Item Sales, each with real-time percentage change indicators.",
            "Clean and visually appealing layout with a responsive design that works seamlessly across devices.",
            "Helps both creators and collectors understand and optimize their monetization strategies within the platform.",
          ],
          images: ["/projects/nusamarket-earning-page.png"],
        },
      ],
    },
  },
  {
    name: "Entri Ticketing",
    tagline: "Mobile App",
    stack: ["React Native", "Blockchain", "NFT"],
    description:
      "Mobile ticketing app built with React Native, integrating NFT-based ticket validation.",
    thumbnail: "/projects/entri-login.jpg",
    detail: {
      company: "Nusameta",
      companyUrl: "https://www.nusameta.io",
      overview:
        "Entri is a mobile platform designed to revolutionize event access. Built to streamline and secure ticketing, Entri enables organizers to manage entries with digital precision — eliminating fraud, simplifying user flow, and enhancing the attendee experience. Whether for concerts, seminars, or exclusive gatherings, Entri offers a scalable, flexible solution tailored to the future of events.",
      roles: [
        "Implementing the Home, Event detail, NFT list, generate QR ticket, and my ticket screen — both interface and functionality",
        "Using React Native and NativeWind to create a responsive mobile apps interface across multiple devices",
        "Developing and optimizing API integration with the backend services to ensure seamless data flow and functionality",
        "Working closely with UI/UX designers to ensure the implementation matches design specifications and provides an optimal user experience",
        "Collaborating closely with the backend team to implement blockchain wallet connectivity and transaction features",
        "Implementing state management solutions to handle complex data interactions between frontend and backend",
      ],
      technologies: [
        "React Native",
        "Expo",
        "NativeWind (Tailwind CSS)",
        "React Context",
        "Wagmi",
        "Polkadot",
      ],
      features: [
        {
          title: "Login Screen",
          points: [
            "Multi-Entry Access: Users can seamlessly log in using Betapass SSO, sign up for a new account, or simply explore the app in Guest Mode.",
            "User-Centric Flexibility: Designed to accommodate different user needs — from commitment-free browsing to secure, personalized access.",
            "Intuitive Onboarding: A visually engaging and minimal interface that invites interaction with clarity and ease.",
          ],
          images: ["/projects/entri-login.jpg"],
        },
        {
          title: "Home Screen",
          points: [
            "Personalized Event Feed: Displays events that match the user's eligibility, ensuring relevance and tailored engagement.",
            "Dynamic Banner Area: Prominently showcases branding or upcoming highlights for instant visual connection.",
            "Featured Events Section: Curated spotlight for trending or high-priority events to boost visibility and discovery.",
            "Intuitive Navigation: Bottom navigation bar offers quick access to home, search, and user profile — streamlining the browsing experience.",
          ],
          images: ["/projects/entri-home.jpg"],
        },
        {
          title: "Event Detail Screen",
          points: [
            "Event Overview Display: Presents essential details (date, venue, description) with a clean and focused layout.",
            "NFT Eligibility Checker: Users can instantly view and select eligible NFTs that grant event access, with a dedicated action button for seamless validation.",
            "Visitor Insights Panel: Displays data on total check-ins, attendance trends, or guest activity to boost transparency and anticipation.",
            "Action-Oriented Flow: Smart UI encourages confident decision-making — whether it's confirming participation or viewing verified entries.",
          ],
          images: ["/projects/entri-detail-event.jpg"],
        },
        {
          title: "Select Eligible NFT Screen",
          points: [
            "Dual Blockchain Support: Users can select NFT assets from either EVM-based chains or Nagara (Nusameta blockchain), empowering cross-platform accessibility.",
            'Visual Asset Browser: A dynamic grid layout showcasing available NFTs, with clear status indicators (e.g., "Owned" tags) for quick decision-making.',
            'Interactive Purchase Flow: "Buy Now" buttons streamline transactions, backed by secure wallet integration and blockchain validation.',
            "User-Guided Ticket Generation: A simple prompt guides users to generate tickets by choosing verified assets, reinforcing trust and ease of use.",
          ],
          images: ["/projects/entri-eligile-nft.jpg"],
        },
        {
          title: "Generate Ticket Screen",
          points: [
            "Selected NFT Overview: Highlights the chosen NFT (e.g. Light Headed Ape Club) with clear attribution before event binding.",
            "Event Preview Panel: Displays key event info to affirm what ticket is being created for.",
            'One-Tap Ticket Creation: "Generate Ticket" action links the NFT to the event, initiating ticket issuance and QR code display.',
            "Success Screen: Confirms ticket creation with a celebratory message and instantly displays the event entry QR code.",
            "Proof of Ownership: Shows the NFT linked to the ticket, validating blockchain-based entry rights.",
            "Instant Utility: QR code is ready for scanning at the venue, making NFT integration seamless and functional.",
          ],
          images: [
            "/projects/entri-generate-ticket.jpg",
            "/projects/entri-example-ticket.jpg",
          ],
        },
        {
          title: "My Ticket Screen",
          points: [
            'Smart Filtering Tabs: Switch between "All," "Available," and "Used" tickets for instant clarity and historical tracking.',
            "Sort by Relevance: Dropdown sorting (by date, event, etc.) adds flexibility for users managing multiple entries.",
            "Compact Ticket Cards: Each ticket displays event name, date, transaction info, and status — ideal for quick scans.",
            "Status Intelligence: Differentiates between active and used tickets, reducing confusion at venue checkpoints.",
          ],
          images: ["/projects/entri-myticket.jpg"],
        },
      ],
    },
  },
  {
    name: "Powerbiz",
    tagline: "Omnichannel Platform",
    stack: ["Vue.js", "Ant Design", "Pinia"],
    description:
      "Omnichannel commerce and supply chain platform unifying online and offline sales channels for B2B/B2C brands.",
    thumbnail: "/projects/powerbizz-fulfillment.jpg",
    detail: {
      company: "Powercommerce",
      companyUrl: "https://powercommerce.asia/",
      overview:
        "PowerBiz is a comprehensive B2B/B2C omnichannel commerce and supply chain platform built to unify online and offline sales channels, streamline distribution, and optimize inventory across multiple marketplaces. PowerBiz empowers brands with real-time analytics, advanced warehouse management, and seamless integrations with platforms like Tokopedia, Shopee, Lazada, and TikTok Shop.",
      roles: [
        "Implementing fulfillment, user, payment history, and invoice history page — both interface and functionality",
        "Using Vue3 and SCSS to create a responsive interface across multiple devices",
        "Developing and optimizing API integration with the backend services to ensure seamless data flow and functionality",
        "Working closely with UI/UX designers to ensure the implementation matches design specifications and provides an optimal user experience",
        "Collaborating closely with the backend team to implement blockchain wallet connectivity and transaction features",
        "Implementing state management solutions to handle complex data interactions between frontend and backend",
      ],
      technologies: ["Vue.js", "Ant Design", "Pinia", "Axios", "SCSS"],
      features: [
        {
          title: "Fulfillment Page",
          points: [
            "Centralized Order Tracking: Displays all incoming orders filtered by business name (e.g. Kino), streamlining monitoring across channels.",
            "Status Overview: Includes multi-phase statuses like Baru, Pengiriman, Teralokasi, Alokasi Gagal, and Batal for real-time fulfillment clarity.",
            "Comprehensive Data Rows: Shows order ID, shipping ID, total items, inventory status, and channel — empowering warehouse teams to act quickly.",
            "Integrated Navigation: Part of a full logistics suite including inventory, warehouse settings, and export history for seamless ops management.",
          ],
          images: ["/projects/powerbizz-fulfillment.jpg"],
        },
        {
          title: "User Page",
          points: [
            "Role-Based Access Control: Easily manage user permissions across warehouse, business, and admin levels.",
            "Smart Filtering & Search: Locate users by name, business affiliation, or status with intuitive filters.",
            "Status Indicators: Color-coded labels (Active / Inactive) for quick scanning and action prioritization.",
            "Inline Actions: Edit, delete, and view user history directly from the table — streamlining admin workflows.",
            "Scalable Design: Built to support complex organizations with multiple businesses and user roles.",
          ],
          images: ["/projects/powerbizz-user.jpg"],
        },
        {
          title: "Payment History Page",
          points: [
            "Transaction Overview: Displays detailed payment records for ADYAJATI LESTARI, PT - MEDAN, covering dates, methods, and amounts.",
            "Multi-Channel Payments: Supports Virtual Account, E-Wallet (Gopay), and Bank Transfer (BCA & Mandiri) for payment flexibility.",
            "Real-Time Logging: Timestamped entries with unique payment IDs ensure traceability and audit-readiness.",
            "Account Specifics: Includes payment sources (e.g. account numbers, method names) for reconciliation accuracy.",
            "Smart Utilities: Features global search and payment creation for streamlined financial operations.",
          ],
          images: ["/projects/powerbizz-history-payment.jpg"],
        },
        {
          title: "Invoice History Page",
          points: [
            "Comprehensive Invoice Logs: Tracks detailed billing records with invoice numbers, customers, total charges, and current status.",
            "Payment State Clarity: Statuses like SETTLEMENT, PENDING, PAYMENT_EXPIRED, and CANCELED are color-coded for fast identification.",
            "Customer-Centric View: Includes business names (e.g. Grosir Permata) to support partner reconciliation.",
            "Admin-Ready Interface: Built-in navigation connects to inventory, fulfillment, orders, promotions, and more — keeping operations fluid.",
          ],
          images: [
            "/projects/powerbizz-invoice.jpg",
            "/projects/powerbizz-invoice-detail.jpg",
          ],
        },
      ],
      liveUrl: "https://powerbiz.asia/en/page/home",
    },
  },
  // {
  //   name: "SIPKONS",
  //   tagline: "Government Housing System",
  //   stack: ["Vue.js", "CMS"],
  //   description:
  //     "Government housing system built with Vue.js, featuring custom CMS capabilities.",
  //   thumbnail: "/projects/sipkons.svg",
  // },
];

export const educationList = [
  {
    degree: "B.Sc. Information Systems",
    school: "BINUS University",
    start: "2020",
    end: "2022",
    detail: "GPA 3.61 / 4.00",
  },
  {
    degree: "Diploma, Computer Science",
    school: "Telkom University",
    start: "2014",
    end: "2017",
    detail: "GPA 3.49 / 4.00",
  },
];

export const education = educationList[0];

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
