export const profile = {
  name: "Satish Kumar",
  role: "Full Stack Developer | Backend Enthusiast",
  username: "Satish-011",
  github: "https://github.com/Satish-011",
  avatar: "/profile.webp",
  email: "satish.240101236@iiitbh.ac.in",
  linkedin: "https://www.linkedin.com/in/satish-kumar-a48729324",
  resume: "/resume.pdf",
  education: "",
  intro:
    "I build full-stack applications and enjoy the backend work that makes them reliable. Lately, I’ve been exploring how transactions, queues, and databases fit together.",
};
export const projects = [
  {
    name: "Backend Ledger",
    github: "https://github.com/Satish-011/Backend-ledger",
    description:
      "An account and transfer API that records each debit and credit in a MongoDB transaction. Redis caches transaction history, and BullMQ handles transfer emails in the background.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "Docker",
      "JWT Authentication",
      "BullMQ",
    ],
    preview: "/ledger.webp",
    previewSmall: "/ledger-small.webp",
    previewAlt: "An illustrated ledger with matching debit and credit columns",
    demo: "",
  },
];
export const skills = [
  ["Frontend", ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express.js", "REST APIs"]],
  [
    "Databases and tools",
    ["MongoDB", "PostgreSQL", "Redis", "Docker", "Git", "GitHub"],
  ],
  ["Problem solving", ["C++", "Data Structures and Algorithms"]],
];
export const writings = []; // Entries use title, description, date (YYYY-MM-DD), readingTime, and url.
