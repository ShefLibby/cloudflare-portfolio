import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import libbyImg from "@/assets/libby.png";
import { useReveal } from "@/hooks/use-reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Code2,
  Database,
  Wrench,
  Briefcase,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Libby Shefferly — Information Systems Portfolio" },
      {
        name: "description",
        content:
          "Libby Shefferly — Information Systems student at GVSU. SQL, C#, Python, web development, and IT infrastructure.",
      },
      { property: "og:title", content: "Libby Shefferly — IS Portfolio" },
      {
        property: "og:description",
        content: "Information Systems student & aspiring IT professional.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const SKILLS = [
  {
    icon: Code2,
    title: "Programming & Web",
    items: ["SQL", "Python", "C#", "HTML5", "CSS3", "JavaScript"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    items: ["Visual Studio", "Linux", "MS Excel", "Office 365", "MS Teams"],
  },
  {
    icon: Database,
    title: "Concepts & Methods",
    items: [
      "Database Design",
      "Data Analysis",
      "SDLC",
      "Agile",
      "IT Infrastructure",
      "Troubleshooting",
    ],
  },
];

const PROJECTS = [
  {
    title: "C# / .NET Application Development",
    blurb:
      "Windows Forms apps built in Visual Studio with event-driven logic, input validation, and performance debugging.",
    tags: ["C#", ".NET", "Visual Studio", "WinForms"],
    accent: "from-sky-400/30 to-indigo-500/20",
    role: "Developer • Coursework + independent practice",
    timeline: "Spring 2024 – Present",
    details: [
      "Built several Windows Forms applications in C# focused on data entry, validation, and small business workflows.",
      "Practiced clean event-driven patterns: separating UI events from business logic, writing reusable validation helpers, and handling exceptions gracefully.",
      "Used the Visual Studio debugger and performance profiler to step through code, inspect call stacks, and tighten slow loops.",
    ],
    highlights: ["Event-driven architecture", "Form validation", "Exception handling", "Debugger / profiler"],
  },
  {
    title: "SQL Coffee Shop Database",
    blurb:
      "Relational database for a fictional coffee shop — menu, rewards, and transactions modeled end to end.",
    tags: ["SQL", "DB Design", "BCNF"],
    accent: "from-amber-300/30 to-rose-400/20",
    role: "Database designer • Team of 3",
    timeline: "Fall 2024",
    details: [
      "Designed an ER diagram covering customers, menu items, orders, payments, and a loyalty rewards program, then normalized the schema to BCNF.",
      "Wrote DDL for tables, primary/foreign keys, and check constraints, plus seed data scripts for realistic testing.",
      "Built queries for daily sales summaries, top-selling items, rewards point balances, and customer retention reporting.",
    ],
    highlights: ["ER modeling", "Normalization to BCNF", "Joins + aggregates", "Referential integrity"],
  },
  {
    title: "IT Infrastructure Proposal",
    blurb:
      "End-to-end IT upgrade plan for a medical practice — backups, remote access, and EHR integration.",
    tags: ["IT Infra", "Systems Analysis", "Docs"],
    accent: "from-emerald-300/30 to-cyan-400/20",
    role: "Systems analyst • Team of 4",
    timeline: "Winter 2025",
    details: [
      "Analyzed the existing network, workstations, and clinical workflow at a small medical practice to identify reliability and compliance gaps.",
      "Recommended a RAID-10 backup server, a Citrix-based remote access layer for clinicians, and integration paths into the Epic EHR.",
      "Documented the rollout in a phased implementation plan with cost estimates, risk callouts, and a training outline for staff.",
    ],
    highlights: ["RAID-10 backups", "Citrix remote access", "Epic EHR integration", "Phased rollout plan"],
  },
  {
    title: "Forward Fitness Club Website",
    blurb:
      "Responsive marketing site for a fictional fitness club built from scratch in HTML5 and CSS3.",
    tags: ["HTML5", "CSS3", "Responsive", "a11y"],
    accent: "from-fuchsia-300/30 to-violet-400/20",
    role: "Front-end developer • Solo",
    timeline: "Fall 2023",
    details: [
      "Built a multi-page site using semantic HTML5 and a CSS Grid + Flexbox layout that holds up from phone to desktop.",
      "Implemented a responsive navigation that collapses on small screens, plus consistent typography and spacing across pages.",
      "Validated the markup against W3C and checked color contrast and alt text for basic accessibility.",
    ],
    highlights: ["Semantic HTML5", "Grid + Flexbox", "Mobile-first", "W3C valid"],
  },
  {
    title: "Portfolio Website",
    blurb:
      "This site — handwritten markup, mobile-first layout, and small touches of motion.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-blue-300/30 to-teal-400/20",
    role: "Designer + developer • Solo",
    timeline: "2025",
    details: [
      "Designed the layout around a single hero image and a clear path through About, Skills, Projects, Experience, and Contact.",
      "Used CSS Grid, custom properties, and small JavaScript helpers for the scroll-reveal animations and expanding project cards.",
      "Kept the markup semantic and the page weight low so it loads quickly on a phone.",
    ],
    highlights: ["Custom layout", "Scroll-reveal", "Accessible markup", "Lightweight"],
  },
];

const EXPERIENCE = [
  {
    role: "Server / Event Staff",
    company: "The Grand Woods Lounge",
    date: "Sep 2025 — Present",
    body:
      "Professional service for private events; collaborated with the team for seamless operations and a strong guest experience.",
  },
  {
    role: "Team Member",
    company: "Cold Stone Creamery",
    date: "Mar 2021 — Aug 2025",
    body:
      "Four years of high-quality customer service and issue resolution in a fast-paced, high-volume environment.",
  },
];

function Portfolio() {
  const ref = useReveal<HTMLDivElement>();
  const [scrolled, setScrolled] = useState(false);
  const [openProject, setOpenProject] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="min-h-screen">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between rounded-full transition-all duration-300 ${
            scrolled
              ? "glass shadow-card border border-border py-2.5 px-4"
              : "bg-transparent"
          }`}
        >
          <a
            href="#hero"
            className="font-display font-bold tracking-tight text-lg flex items-center gap-2"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
              LS
            </span>
            <span className="hidden sm:inline">Libby Shefferly</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {["about", "skills", "projects", "experience", "contact"].map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  className="hover:text-foreground transition-colors capitalize"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition"
          >
            Let's talk <ArrowUpRight className="size-3.5" />
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden bg-hero text-white"
      >
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="absolute -top-32 -right-20 h-[500px] w-[500px] rounded-full blur-3xl opacity-40 animate-blob"
          style={{ background: "oklch(0.78 0.18 235)" }}
        />
        <div
          className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-30 animate-blob"
          style={{ background: "oklch(0.82 0.16 85)", animationDelay: "-6s" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div className="reveal-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 border border-white/20 rounded-full px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              GVSU • Detroit, MI
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]">
              Hi, I'm <span className="text-gradient">Libby</span>.
              <br />
              I build clean, useful systems.
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-xl">
              Information Systems student & aspiring IT professional. I work
              across SQL, C#, Python, and the web — building solutions that are
              efficient, accessible, and people-centered.
            </p>
            <p className="mt-2 text-sm text-white/55">
              B.S. Management of Information Systems • Expected Dec 2027
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-medium shadow-glow hover:scale-[1.02] transition"
              >
                View my work <ArrowUpRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="relative reveal-up flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-50"
                style={{ background: "var(--gradient-text)" }}
              />
              <div className="relative animate-float">
                <img
                  src={libbyImg}
                  alt="Libby Shefferly"
                  className="relative w-[280px] sm:w-[340px] lg:w-[380px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 65%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 65%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition animate-float"
          aria-label="Scroll"
        >
          <ArrowDown className="size-6" />
        </a>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border bg-secondary/40 overflow-hidden py-5">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-2xl font-display font-medium text-muted-foreground">
          {[...Array(2)].flatMap((_, i) =>
            [
              "SQL",
              "C# / .NET",
              "Python",
              "Database Design",
              "IT Infrastructure",
              "Web Development",
              "Agile",
              "Troubleshooting",
            ].map((w) => (
              <span key={`${i}-${w}`} className="flex items-center gap-12">
                {w}
                <span className="text-accent">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <div className="reveal-up relative order-2 lg:order-1">
            <div
              className="absolute -inset-6 rounded-[2rem] -z-10"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.16 235 / 0.15), oklch(0.82 0.16 85 / 0.15))",
              }}
            />
            <div className="relative rounded-[2rem] border border-border bg-card p-8 sm:p-10 shadow-card">
              <p className="font-display text-3xl leading-snug">
                <span className="text-accent">“</span>
                I like the part of tech where someone's day actually gets easier
                — a faster form, a query that finally returns what they
                expected, a system that just works.
                <span className="text-accent">”</span>
              </p>
              <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold">
                  LS
                </div>
                <div>
                  <p className="text-sm font-semibold">Libby Shefferly</p>
                  <p className="text-xs text-muted-foreground">
                    Information Systems · GVSU
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-6 glass border border-border rounded-2xl px-5 py-4 shadow-card">
              <div className="flex items-center gap-3">
                <GraduationCap className="size-5 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Dean's List</p>
                  <p className="text-sm font-semibold">Fall '24 + Winter '25</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="reveal-up text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              About me
            </span>
            <h2 className="reveal-up mt-3 text-4xl sm:text-5xl font-bold">
              A student at the intersection of{" "}
              <span className="text-gradient">tech & usability</span>.
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p className="reveal-up">
                I'm a motivated Information Systems student at Grand Valley
                State University seeking an IT internship to apply skills in
                SQL, C#, application development, and troubleshooting — while
                contributing to IT projects, process improvement, and system
                support.
              </p>
              <p className="reveal-up">
                I have hands-on experience in team-based projects spanning
                database design, software development, and web implementation. I
                love building things that are efficient, accessible, and
                people-centered.
              </p>
              <p className="reveal-up">
                Off-campus, I'm a member of the GVSU Cheer Team and earned a
                spot on the Dean's List for Fall 2024 and Winter 2025. I thrive
                in fast-paced environments with a customer-first mindset.
              </p>
            </div>

            <div className="reveal-up mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { k: "GPA", v: "3.2" },
                { k: "Grad", v: "Dec 2027" },
                { k: "Location", v: "Allendale, MI" },
                { k: "Honors", v: "Dean's ×2" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.k}
                  </p>
                  <p className="mt-1 font-display font-semibold">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 bg-secondary/40">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              What I know
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">
              Technical toolkit
            </h2>
            <p className="mt-4 text-muted-foreground">
              The languages, platforms, and concepts I reach for to ship
              clean, working systems.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {SKILLS.map((g) => (
              <div
                key={g.title}
                className="reveal-up group relative rounded-3xl border border-border bg-card p-7 shadow-card hover:-translate-y-1 transition"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <g.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{g.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                Selected work
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Projects</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Academic and personal builds — databases, applications,
              infrastructure, and the web.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                className="reveal-up group relative rounded-3xl border border-border bg-card p-7 shadow-card overflow-hidden hover:-translate-y-1 transition"
              >
                <div
                  className={`absolute -top-20 -right-20 h-44 w-44 rounded-full blur-3xl opacity-70 bg-gradient-to-br ${p.accent}`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      0{i + 1}
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {p.blurb}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-28 px-6 bg-secondary/40">
        <div className="mx-auto max-w-4xl">
          <div className="reveal-up text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              Where I've worked
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Experience</h2>
          </div>

          <div className="mt-14 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />
            <div className="space-y-12">
              {EXPERIENCE.map((e, i) => (
                <div
                  key={e.role}
                  className={`reveal-up relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                    i % 2 ? "sm:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
                  <div className="pl-12 sm:pl-0 sm:pr-10 sm:text-right">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {e.date}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{e.role}</h3>
                    <p className="text-accent font-medium">{e.company}</p>
                  </div>
                  <div className="pl-12 sm:pl-10 mt-3 sm:mt-0">
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                      <Briefcase className="size-4 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {e.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="reveal-up relative overflow-hidden rounded-[2.5rem] bg-hero text-white p-10 sm:p-16 shadow-glow">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div
              className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-50 animate-blob"
              style={{ background: "oklch(0.82 0.16 85)" }}
            />
            <div className="relative">
              <span className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold">
                Let's talk
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold max-w-2xl">
                Looking for an IT internship in{" "}
                <span className="text-gradient">2025 – 2026</span>.
              </h2>
              <p className="mt-5 max-w-xl text-white/75">
                Have a question, an opportunity, or just want to connect? I'd
                love to hear from you.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                {[
                  {
                    Icon: Mail,
                    label: "Email",
                    value: "shefferl@mail.gvsu.edu",
                    href: "mailto:shefferl@mail.gvsu.edu",
                  },
                  {
                    Icon: Phone,
                    label: "Phone",
                    value: "(313) 515-4807",
                    href: "tel:13135154807",
                  },
                  {
                    Icon: Linkedin,
                    label: "LinkedIn",
                    value: "Libby Shefferly",
                    href: "https://www.linkedin.com/in/libby-shefferly-0689692a7/",
                  },
                  {
                    Icon: Github,
                    label: "GitHub",
                    value: "ShefLibby",
                    href: "https://github.com/ShefLibby",
                  },
                ].map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur p-4 transition"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wider text-white/55">
                        {label}
                      </p>
                      <p className="font-medium truncate">{value}</p>
                    </div>
                    <ArrowUpRight className="size-4 text-white/60 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  </a>
                ))}
              </div>

              <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
                <MapPin className="size-4" /> Allendale, MI · Open to remote &
                hybrid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-display font-semibold text-foreground">
            Libby Shefferly
          </p>
          <nav className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/libby-shefferly-0689692a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ShefLibby"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="mailto:shefferl@mail.gvsu.edu"
              className="hover:text-foreground"
            >
              Email
            </a>
          </nav>
          <p>© 2025 · Grand Valley State University</p>
        </div>
      </footer>
    </div>
  );
}
