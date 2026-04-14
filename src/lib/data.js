export const siteConfig = {
  name: "Carl Anthony Dayoc",
  title: "Developer",
  email: "hello@ameerkhan.dev",
  description:
    "I am an entry-level IT graduate with hands-on experience in web and mobile development. I have worked with technologies such as React, Next.js, Flutter, Spring Boot, and SQL to build and support monitoring systems, data loggers, and management applications. Through my internship and junior programmer role, I've contributed to UI development, backend integration, system testing, and documentation. I am a fast learner with strong problem-solving skills and a passion for continuously improving my technical abilities through real-world projects and collaboration.",
  heroIntro:
    "Full-stack developer building web and mobile experiences across React, Next.js, Node, Spring Boot, and Flutter.",
  heroHeadline: "I BUILD APPLICATIONS THAT BRING YOUR IDEAS TO LIFE",
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export const projects = [
  {
    name: "Tic-Tac-Toe",
    description:
      "An interactive web-based application that recreates the classic two-player game on a 3x3 grid. The game manages player turns, validates each move, and continuously checks all possible winning combinations. It automatically determines when a player wins or when the match ends in a draw, providing clear visual feedback to the users.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    github: "https://github.com/Toniownn/React-Tic-Tac-Toe",
    live: "https://react-tic-tac-toe-nine-murex.vercel.app/",
  },
  {
    name: "Ping Pong Score Keeper",
    description:
      "An interactive scoreboard application designed for tracking ping-pong matches. Users can define a winning score, and the system automatically updates player scores in real time. Once a player reaches the selected winning number, the app clearly highlights the winner.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Toniownn/PingPongScoreKeeper",
    live: "https://ping-pong-score-keeper-one.vercel.app/",
  },
  {
    name: "Note App",
    description:
      "A sticky notes application that allows users to create an account and log in to manage their notes securely. Users can create multiple folders to organize their notes by category, and easily add, edit, or delete notes within each folder. The app provides a simple and intuitive interface.",
    tags: ["React", "TypeScript", "Firebase", "Tailwind", "Shadcn"],
    github: "https://github.com/Toniownn/Note-App-Public",
  },
];

export const skills = [
  // Frontend
  { name: "React", color: "#61DAFB", icon: "SiReact" },
  { name: "Next.js", color: "#333333", icon: "SiNextdotjs" },
  { name: "Tailwind", color: "#06B6D4", icon: "SiTailwindcss" },
  { name: "HTML5", color: "#E34F26", icon: "SiHtml5" },
  { name: "CSS3", color: "#2965F1", icon: "SiCss" },
  // Backend
  { name: "Node.js", color: "#339933", icon: "SiNodedotjs" },
  { name: "Express", color: "#555555", icon: "SiExpress" },
  { name: "Spring Boot", color: "#6DB33F", icon: "SiSpringboot" },
  // Mobile
  { name: "Flutter", color: "#02569B", icon: "SiFlutter" },
  { name: "Dart", color: "#0175C2", icon: "SiDart" },
  // Databases
  { name: "MongoDB", color: "#47A248", icon: "SiMongodb" },
  { name: "MySQL", color: "#4479A1", icon: "SiMysql" },
  { name: "PostgreSQL", color: "#4169E1", icon: "SiPostgresql" },
  // Languages
  { name: "JavaScript", color: "#F7DF1E", icon: "SiJavascript" },
  { name: "TypeScript", color: "#3178C6", icon: "SiTypescript" },
  // Tools
  { name: "Git", color: "#F05032", icon: "SiGit" },
  { name: "GitHub", color: "#6e40c9", icon: "SiGithub" },
  { name: "Figma", color: "#F24E1E", icon: "SiFigma" },
];

export const experiences = [
  {
    year: "Aug. 2024 — Aug. 2025",
    role: "Junior Programmer",
    company: "BBLC",
    tags: ["Next.js", "MongoDB", "Flutter", "Spring Boot"],
    bullets: [
      "Contributed to a <strong>Next.js + MongoDB</strong> web-based data logger for real-time temperature monitoring.",
      "Built <strong>Flutter UI components</strong> and assisted in integrating the mobile application with a <strong>Spring Boot backend</strong>.",
      "Supported <strong>API integration</strong>, <strong>debugging</strong>, and <strong>system testing</strong> to improve application stability.",
      "Assisted in preparing technical documentation for ongoing development and maintenance.",
    ],
  },
  {
    year: "Feb 2024 — May 2024",
    role: "Web Developer",
    company: "CTU",
    tags: ["Front-end", "Back-end", "Testing"],
    bullets: [
      "Assisted in developing a secure login and monitoring system for tracking library user entry and exit.",
      "Contributed to both <strong>front-end</strong> and <strong>back-end</strong> features to improve staff efficiency and data accuracy.",
      "Helped with <strong>testing</strong> and <strong>validation</strong> of system functionality.",
    ],
  },
  {
    year: "Feb 2024 — Jul 2024",
    role: "Front-End Developer",
    company: "LOT",
    tags: ["Desktop UI", "UX", "Collaboration"],
    bullets: [
      "<strong>Designed</strong> and <strong>developed</strong> a desktop application for client record management.",
      "Implemented <strong>user-friendly UI</strong> with a focus on secure and efficient data handling.",
      "Collaborated closely with backend developers to ensure consistent system performance.",
    ],
  },
];

export const heroLabels = {
  topLeft: "(FULL-STACK)",
  topRight: "(AVAILABLE FOR HIRE)",
  centerRight: ["CRAFTING DIGITAL", "EXPERIENCES"],
  bottomLeft: [
    "TRANSFORMING IDEAS INTO CODE",
    "BUILDING WEB & MOBILE APPS",
    "WITH REACT, NEXT.JS & NODE",
    "MEANINGFUL IMPACT",
  ],
  stackLabel: "CLIENTS:",
  stackItems: ["REACT", "NEXT.JS", "NODE"],
  cta: { text: "VIEW RECENT WORK", href: "#projects" },
  subtitle: "( DEVELOPER )",
};

export const services = [
  {
    number: "01",
    title: "Web Development",
    icon: "Code",
    description:
      "Building high-performance, responsive websites with clean code and modern technologies that deliver exceptional user experiences.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    icon: "Palette",
    description:
      "Crafting intuitive and visually stunning interfaces that engage users and drive conversions through thoughtful design.",
  },
  {
    number: "03",
    title: "Responsive Design",
    icon: "Smartphone",
    description:
      "Ensuring your website looks and functions perfectly across all devices, from mobile phones to large desktop screens.",
  },
  {
    number: "04",
    title: "Webflow Development",
    icon: "Globe",
    description:
      "Expert Webflow development transforming designs into pixel-perfect, fully animated, and CMS-driven websites.",
  },
];

export const stats = [
  { number: "1+", label: "YEARS EXPERIENCE" },
  { number: "5+", label: "PROJECTS DELIVERED" },
  { number: "15+", label: "TECHNOLOGIES" },
];

export const pullQuote =
  "I believe great code starts with understanding people, not just problems.";

export const process = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your vision, goals, and requirements. Through in-depth conversations, I map out the project scope, target audience, and technical needs to build a solid foundation.",
  },
  {
    number: "02",
    title: "Build & Iterate",
    description:
      "Development happens in focused sprints with regular check-ins. You see progress at every stage, provide feedback, and we refine together until the result exceeds expectations.",
  },
  {
    number: "03",
    title: "Launch & Support",
    description:
      "Once everything is polished and tested, we deploy. I provide documentation, training, and ongoing support to ensure your project thrives long after launch.",
  },
];
