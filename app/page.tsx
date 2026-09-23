"use client";

import Link from "next/link";
import { useEffect, useState, type SubmitEvent } from "react";
import { HeroImage } from "./HeroImage";
import { NavigationRail } from "./NavigationRail";
import { ThemeToggle } from "./ThemeToggle";
import { availability, projects, type Track } from "./data";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const heroContent = {
  eyebrow: "Product Design & Engineering",
  title: "Strategy + Design\nin critical spaces",
  description: "Where design decisions become code.",
  about: [
    "I came to product design by way of sociology: studying computer science with the same curiosity about why systems work the way they do, aimed at something I could actually build. I think about infrastructure a lot: it's invisible until it breaks. My job is usually to notice the quiet failure point before anyone else does. Staying curious, open, and sensitive to problems that aren't mine is what makes that possible.",
    "I'm currently a Doblin GPS Innovation Fellow, a year-long program pipelining junior practitioners into public-sector innovation work, where I'm developing an eminence piece through Deloitte's Center for Government Insights.",
  ],
};

const contactContent = {
  title: "Currently open to product design and front-end engineering roles.",
  description:
    "Also happy to talk about projector mappings, planes, and yoga. I reply within a day or two.",
  email: "carolineeausema@gmail.com",
  status: "Currently: full-time at Deloitte, open to conversations about what's next.",
};

const filterOptions: Array<"All" | Track> = ["All", "Engineering", "Design", "Creative"];

type Filter = "All" | Track;

const pad = (value: number) => String(value).padStart(2, "0");

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = filter === "All"
    ? projects
    : projects.filter((project) => project.track === filter);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <main className="home-page">
      <SiteHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {menuOpen && <MobileMenu onNavigate={() => setMenuOpen(false)} />}

      <Hero />
      <div className="scroll-cue">↓ &nbsp; Work</div>
      <WorkSection
        filter={filter}
        projects={visibleProjects}
        onFilterChange={setFilter}
      />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function SiteHeader({
  menuOpen,
  onMenuToggle,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
}) {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        CRLNA
      </Link>

      <nav className="desktop-nav">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Availability />
      <ThemeToggle />

      <button
        className="menu-trigger"
        onClick={onMenuToggle}
        aria-expanded={menuOpen}
      >
        {menuOpen ? "Close x" : "Menu"}
      </button>

      <NavigationRail />
    </header>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mobile-menu">
      <a href="#work" onClick={onNavigate}>
        Work <span>{pad(projects.length)}</span>
      </a>
      <a href="#about" onClick={onNavigate}>
        About
      </a>
      <a href="#contact" onClick={onNavigate}>
        Contact
      </a>

      <div className="menu-meta">
        <a
          href="https://github.com/carolineeausema"
          target="_blank"
          rel="noreferrer"
        >
          GitHub -&gt;
        </a>
        <Availability />
        <ThemeToggle />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{heroContent.eyebrow}</p>
        <h1>{heroContent.title}</h1>
      </div>

      <div className="hero-art">
        <HeroImage />
      </div>

      <div className="hero-support">
        <p className="lead">{heroContent.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            See the work -&gt;
          </a>
          <a className="button button-secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <div className="mobile-availability">
        <Availability />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="section-heading">
        <h2>About</h2>
        <p>Design thinking, engineering judgment, and the journey as the destination.</p>
      </div>
      <div className="about-copy">{heroContent.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
  );
}

function WorkSection({
  filter,
  projects: visibleProjects,
  onFilterChange,
}: {
  filter: Filter;
  projects: typeof projects;
  onFilterChange: (filter: Filter) => void;
}) {
  return (
    <section className="work-section" id="work">
      <div className="section-heading">
        <h2>Work</h2>

        <div className="segmented">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={filter === option ? "active" : ""}
              onClick={() => onFilterChange(option)}
            >
              {option} <span>{getFilterCount(option)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="work-columns">
        <span>YR</span>
        <span>PROJECT</span>
        <span>WHAT IT DOES</span>
        <span>STACK</span>
        <span>IMPACT</span>
      </div>

      <div className="work-list">
        {visibleProjects.map((project) => (
          <Link
            className="work-row"
            href={`/work/${project.slug}`}
            key={project.slug}
          >
            <span className="work-year">{project.year}</span>
            <span className="work-title">{project.title}</span>
            <span className="work-description">{project.description}</span>
            <span className="work-stack">{project.stack}</span>
            <strong className="work-impact">{project.impact}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-poster">
        <h2>{contactContent.title}</h2>
        <p>{contactContent.description}</p>
        <p className="contact-status">{contactContent.status}</p>
      </div>

      <div className="contact-body">
        <div className="direct">
          <p className="eyebrow">Direct</p>
          <a className="email" href={`mailto:${contactContent.email}`}>
            {contactContent.email}
          </a>

          <div className="social-links">
            <a
              href="https://github.com/carolineeausema"
              target="_blank"
              rel="noreferrer"
            >
              GitHub -&gt;
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn -&gt;
            </a>
            <a href="#contact">Resume PDF ↓</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Message
            <textarea
              placeholder="What are you working on?"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </label>

          <button className="button button-dark" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send ->"}
          </button>

          {status === "sent" && <p className="form-status form-status-success">Message sent :) I&apos;ll reply within a day or two.</p>}
          {status === "error" && <p className="form-status form-status-error">Something went wrong. Try again, or email me directly.</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span>© 2026 CRLNA / React / Next / TypeScript / p5</span>
      <Link className="footer-easter-egg" href="/quests">p.s. these r side quests →</Link>
      <span>Built with a little sparkle in my eye.</span>
    </footer>
  );
}

function Availability() {
  return (
    <div className="availability">
      <i />
      {availability}
    </div>
  );
}

function getFilterCount(option: Filter) {
  const count = option === "All" ? projects.length : projects.filter((project) => project.track === option).length;
  return pad(count);
}
