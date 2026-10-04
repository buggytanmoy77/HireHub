// Single source of truth for site navigation.
// To ship a new section: add a real route in App.jsx and remove its entry
// from PLACEHOLDER_PAGES — the navbar and footer pick it up automatically.

export const NAV_LINKS = [
  { label: "Home", to: "/", end: true },
  { label: "Jobs", to: "/jobs" },
  { label: "Courses", to: "/courses" },
  { label: "Resume", to: "/resume" },
  { label: "Interview Prep", to: "/interview-prep" },
];

// Sections that are part of the product structure but not built yet.
// Each renders the shared "coming soon" page.
export const PLACEHOLDER_PAGES = [
  {
    path: "/courses",
    title: "Courses",
    description: "Curated learning paths that close the exact skill gaps found in your resume.",
  },
  {
    path: "/interview-prep",
    title: "Interview Prep",
    description: "Role-specific practice questions and mock interviews, matched to the jobs you apply for.",
  },
  {
    path: "/about",
    title: "About HireHub",
    description: "We're building the fastest way for students and early-career talent to find roles that fit.",
  },
  {
    path: "/contact",
    title: "Contact",
    description: "Questions, partnerships or feedback — a contact form is on its way.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "How we collect, store and protect your resume and profile data.",
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "The terms that govern your use of HireHub.",
  },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Jobs", to: "/jobs" },
      { label: "Courses", to: "/courses" },
      { label: "Resume", to: "/resume" },
      { label: "Interview Prep", to: "/interview-prep" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

// Replace "#" with the real profile URLs once they exist.
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "GitHub", href: "#", icon: "github" },
  { label: "X", href: "#", icon: "x" },
];
