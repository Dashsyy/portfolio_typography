export type Project = {
  title: string;
  year: number;
  period: string;
  tag: string;
  tech: string[];
  role?: string;
  description?: string;
};

export const projects: Project[] = [
  {
    title: "RetailOps",
    year: 2025,
    period: "2023–Now",
    tag: "Smart Axiata",
    role: "Core Maintainer",
    description:
      "Maintain and evolve the retail portal used across all Smart shops nationwide — shipping features end-to-end, reviewing vendor code, and coordinating across BAs, developers, and QA.",
    tech: ["Laravel 9", "React", "MariaDB", "Kubernetes", "GitLab CI/CD", "ArgoCD", "Azure SSO"],
  },
  {
    title: "Smart x ABA Mini App",
    year: 2025,
    period: "2024–2025",
    tag: "Smart Axiata",
    description:
      "Built the telecom services layer embedded inside ABA Bank's app — eSIM purchase with eKYC and biometric, broadband booking, add-on sales, and ABA Pay (KHQR) payment integration.",
    tech: ["Vue.js", "Laravel", "Kubernetes", "ABA Pay", "eKYC", "Sentry"],
  },
  {
    title: "Home Internet (FTTx)",
    year: 2024,
    period: "2024",
    tag: "Smart Axiata",
    role: "Deployment Lead",
    description:
      "Led FTTx deployments including the payment follow-up notification pipeline and migration of provisioning logic away from Splynx toward a service-oriented orchestration layer.",
    tech: ["Laravel", "Splynx", "BSS", "eKYC", "Microservices", "MariaDB"],
  },
  {
    title: "Internal MS",
    year: 2024,
    period: "2024",
    tag: "Smart Axiata",
    description:
      "Designed and built internal microservice backends — fault-tolerant pipelines with retry logic, idempotency, and workflow compatibility between legacy and new provisioning systems.",
    tech: ["Laravel", "Microservices", "REST API", "MySQL"],
  },
  {
    title: "Atlas Career",
    year: 2023,
    period: "2022–2023",
    tag: "Beniten",
    description:
      "Full-stack development of a job platform — employer listings, candidate profiles, and application tracking.",
    tech: ["Laravel", "React", "Tailwind", "MySQL"],
  },
  {
    title: "Tech I.S",
    year: 2022,
    period: "2022",
    tag: "Beniten",
    description:
      "Built and maintained an information system for client operations — data management, reporting, and admin tooling.",
    tech: ["Laravel", "Vue.js", "Bootstrap", "MySQL"],
  },
  {
    title: "Internship",
    year: 2021,
    period: "2021",
    tag: "Beniten",
    description:
      "Backend internship — designed, developed, and tested Laravel services following Agile/Scrum workflow alongside frontend and cross-functional teammates.",
    tech: ["Laravel", "PHP", "MySQL"],
  },
];
