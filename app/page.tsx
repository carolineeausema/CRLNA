"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { PixelHeadshot } from "./PixelHeadshot";
import { HeroHeadline } from "./HeroHeadline";
import { AboutStatement } from "./AboutStatement";
import { Reveal } from "./Reveal";
import { SpinIcon } from "./SpinIcon";
import { Preloader } from "./Preloader";
import { ProjectOverlay } from "./ProjectOverlay";
import { availability, projects, quests, type Track } from "./data";

const navigation = [
  { id: "work", label: "Work", href: "#work" },
  { id: "about", label: "About", href: "#about" },
  { id: "quests", label: "Side quests", href: "#quests" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const sectionIds = ["work", "about", "quests", "contact"];

type Filter = "All" | Track | "Creative";
const filterOptions: Filter[] = ["All", "Engineering", "Design", "Creative"];

const QUEST_ICONS = ["circle", "flower", "singer", "tulip"] as const;

const pad = (value: number) => String(value).padStart(2, "0");

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selSlug, setSelSlug] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [nearFooter, setNearFooter] = useState(false);
  const [copied, setCopied] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const floatCardRef = useRef<HTMLAnchorElement>(null);

  const visibleProjects = filter === "All" ? projects : projects.filter((project) => project.track === filter);
  const selIndex = selSlug ? projects.findIndex((project) => project.slug === selSlug) : -1;
  const selProject = selIndex >= 0 ? projects[selIndex] : null;
  const nextProject = projects[(Math.max(selIndex, 0) + 1) % projects.length];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("project");
    if (requested && projects.some((project) => project.slug === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelSlug(requested);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      setPastHero(y > vh * 0.8);

      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= vh * 0.45) current = id;
      }
      setActive(current);

      const footerEl = document.getElementById("site-footer");
      setNearFooter(!!footerEl && footerEl.getBoundingClientRect().top < vh);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const circle = ringRef.current;
    if (!circle) return;
    const circumference = 157.1;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(circle, { strokeDashoffset: circumference * (1 - self.progress) });
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const backToTopVisible = pastHero && !selSlug;
    const floatCardVisible = pastHero && !selSlug && active !== "contact";
    const ctx = gsap.context(() => {
      if (backToTopRef.current) {
        gsap.to(backToTopRef.current, {
          opacity: backToTopVisible ? 1 : 0,
          y: backToTopVisible ? 0 : 20,
          duration: 0.35,
          ease: "power2.out",
          pointerEvents: backToTopVisible ? "auto" : "none",
        });
      }
      if (floatCardRef.current) {
        gsap.to(floatCardRef.current, {
          opacity: floatCardVisible ? 1 : 0,
          y: floatCardVisible ? 0 : 20,
          duration: 0.35,
          ease: "power2.out",
          pointerEvents: floatCardVisible ? "auto" : "none",
        });
      }
    });
    return () => ctx.revert();
  }, [pastHero, selSlug, active]);

  const openProject = (slug: string) => setSelSlug(slug);
  const closeProject = () => setSelSlug(null);
  const goNext = () => setSelSlug(nextProject.slug);

  const copyEmail = () => {
    navigator.clipboard?.writeText("carolineeausema@gmail.com").catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const pickFilter = (f: Filter) => {
    if (f === "Creative") {
      document.getElementById("quests")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setFilter(f);
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <Preloader />

      <SiteHeader active={active} visible={!nearFooter} />

      <button
        type="button"
        ref={backToTopRef}
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={(event) => gsap.to(event.currentTarget, { scale: 1.06, duration: 0.25, ease: "power2.out" })}
        onMouseLeave={(event) => gsap.to(event.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out" })}
        aria-label="Back to top"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" className="back-to-top-ring">
          <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="2" />
          <circle
            ref={ringRef}
            cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="2"
            strokeDasharray="157.1" strokeDashoffset="157.1" strokeLinecap="round"
          />
        </svg>
        <span>&uarr;</span>
      </button>

      <a
        href="#contact"
        ref={floatCardRef}
        className="float-card"
        onMouseEnter={(event) => gsap.to(event.currentTarget, { y: -4, duration: 0.35, ease: "power2.out" })}
        onMouseLeave={(event) => gsap.to(event.currentTarget, { y: 0, duration: 0.35, ease: "power2.out" })}
      >
        <span className="float-card-left">
          <span className="float-card-copy">Open to<br />new roles</span>
          <span className="float-card-say">Say hello &darr;</span>
        </span>
        <span className="float-card-hi">hi</span>
      </a>

      <Hero />

      <main id="main" tabIndex={-1}>
        <WorkSection filter={filter} projects={visibleProjects} onFilterChange={pickFilter} onOpen={openProject} />

        <AboutChapter />
        <AboutSection />

        <QuestsSection />

        <ContactSection copied={copied} onCopy={copyEmail} />
      </main>

      <Footer />

      <ProjectOverlay project={selProject} nextTitle={nextProject.title} onClose={closeProject} onNext={goNext} />
    </>
  );
}

function ChapterRow({ n, label, icon, k = 1.2, as = "span" }: { n: string; label: string; icon: "circle" | "flower" | "singer" | "tulip"; k?: number; as?: "span" | "h2" }) {
  const Label = as;
  return (
    <Reveal as="div" className="chapter-row">
      <span className="chapter-n">
        <SpinIcon k={k} icon={icon} size={14} />
        {n}
      </span>
      <Label className="chapter-label">{label}</Label>
    </Reveal>
  );
}

function SiteHeader({ active, visible }: { active: string | null; visible: boolean }) {
  const gooRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      navigation.forEach((item) => {
        const isActive = item.id === active;
        const targets = [gooRefs.current[item.id], linkRefs.current[item.id]].filter(Boolean);
        if (!targets.length) return;
        gsap.to(targets, {
          paddingLeft: isActive ? 30 : 16,
          paddingRight: isActive ? 30 : 16,
          duration: 0.7,
          ease: "NAV",
        });
      });
    });
    return () => ctx.revert();
  }, [active]);

  return (
    <nav className={`site-header-v2${visible ? "" : " is-hidden"}`} aria-label="Primary">
      <a className="brand-v2" href="#top">CRLNA</a>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="navGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
      </svg>
      <div className="pill-nav">
        <div className="pill-nav-goo" aria-hidden="true">
          {navigation.map((item) => (
            <span
              key={item.id}
              ref={(el) => { gooRefs.current[item.id] = el; }}
              className="pill-nav-goo-pill"
            >
              {item.label}
            </span>
          ))}
        </div>
        <div className="pill-nav-links">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              ref={(el) => { linkRefs.current[item.id] = el; }}
              aria-current={item.id === active ? "true" : "false"}
              className="pill-nav-link"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero-v2" id="top">
      <div className="hero-headshot-wrap">
        <PixelHeadshot />
      </div>
      <div className="hero-v2-content">
        <div className="hero-v2-tagrow">
          <span className="hero-v2-num">01</span>
          <span className="hero-v2-eyebrow">Product Engineering</span>
        </div>
        <div className="hero-v2-rule" />
        <div className="hero-v2-copy">
          <div className="hero-v2-copy-col">
            <HeroHeadline />
            <p className="hero-v2-lead">Make complicated systems work for real people</p>
            <div className="hero-v2-actions">
              <a className="hero-cta" href="#work">
                <span className="hero-cta-icon" aria-hidden="true">&darr;</span>
                <span className="hero-cta-label">See the work</span>
              </a>
              <a className="pill-button-outline" href="#contact">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function WorkSection({
  filter,
  projects: visibleProjects,
  onFilterChange,
  onOpen,
}: {
  filter: Filter;
  projects: typeof projects;
  onFilterChange: (filter: Filter) => void;
  onOpen: (slug: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="section-v2" id="work">
      <ChapterRow n="02" label="Selected work, 2022–2026" icon="circle" k={1.2} />

      <div className="section-grid section-content">
        <div />
        <div className="work-v2-body">
          <Reveal as="div" className="work-v2-heading">
            <h2 className="work-v2-h2">
              Work <span className="kw-taupe">({pad(visibleProjects.length)})</span>
            </h2>
            <div className="pill-filter">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  className={`pill-filter-btn${filter === option ? " is-active" : ""}`}
                  onClick={() => onFilterChange(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="work-v2-list" onMouseLeave={() => setHover(null)}>
            {visibleProjects.map((project) => (
              <Reveal as="div" key={project.slug}>
                <div
                  role="button"
                  tabIndex={0}
                  className="work-v2-row"
                  aria-label={`View case study: ${project.title}`}
                  onClick={() => onOpen(project.slug)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(project.slug); } }}
                  onMouseEnter={() => setHover(project.slug)}
                  onFocus={() => setHover(project.slug)}
                >
                  <span className="work-v2-year">{project.year}</span>
                  <span className={`work-v2-title-stack${hover === project.slug ? " is-hover" : ""}`}>
                    <span className="work-v2-title">{project.title}</span>
                    <span className="work-v2-org">{project.org} &middot; {project.track}</span>
                  </span>
                  <span className="work-v2-desc">{project.description}</span>
                  <span className={`work-v2-arrow${hover === project.slug ? " is-hover" : ""}`} aria-hidden="true">&#8599;</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutChapter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    const label = labelRef.current;
    if (!wrap || !panel || !label) return;

    const easeInOutCubic = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
    const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

    const render = (p: number) => {
      const u = clamp((p - 0.05) / 0.8);
      const e = easeInOutCubic(u);
      const iy = 38 * (1 - e);
      const ix = 40 * (1 - e);
      gsap.set(panel, { clipPath: `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${28 * (1 - e)}px)` });
      gsap.set(label, { scale: 0.55 + 0.45 * e, opacity: 1 - clamp((p - 0.9) / 0.1) });
    };

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: () => `+=${wrap.offsetHeight - window.innerHeight}`,
      pin: false,
      onUpdate: (self) => render(self.progress),
    });
    // Apply the starting frame immediately so the label never shows at full size before the first scroll update.
    render(trigger.progress);

    return () => trigger.kill();
  }, []);

  return (
    <div className="about-chapter" ref={wrapRef} aria-hidden="true">
      <div className="about-chapter-sticky">
        <div className="about-chapter-panel" ref={panelRef}>
          <div className="about-chapter-label" ref={labelRef}>
            <span className="chapter-n"><SpinIcon k={1} icon="flower" size={14} />03</span>
            <span className="about-chapter-word">About</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="section-v2 about-v2" id="about">
      <ChapterRow n="03" label="About" icon="flower" k={1.2} as="h2" />

      <div className="about-v2-grid">
        <Reveal as="div" className="about-v2-photostrip">
          <img src="/assets/photostrip.jpg" alt="Photobooth strip" />
        </Reveal>
        <div className="about-v2-copy-col">
          <AboutStatement />
          <div className="about-v2-body">
            <Reveal as="p">
              I came to product design by way of sociology: studying computer science with the same curiosity about why systems work the way they do, aimed at something I could actually build. I think about infrastructure a lot: it&apos;s invisible until it breaks. My job is usually to notice the quiet failure point before anyone else does. Staying curious, open, and sensitive to problems that aren&apos;t mine is what makes that possible.
            </Reveal>
            <Reveal as="p">
              I&apos;m currently a Doblin GPS Innovation Fellow, a year-long program pipelining junior practitioners into public-sector innovation work, where I&apos;m developing an eminence piece through Deloitte&apos;s Center for Government Insights.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      }
    );

    // Recalculate the scroll distance once each photo has loaded and the track has its real width.
    // Each card is sized from its photo's aspect ratio so vertical photos get a narrower column.
    const images = Array.from(track.querySelectorAll("img"));
    const onLoad = (img: HTMLImageElement) => {
      if (!img.naturalWidth) return;
      img.closest<HTMLElement>(".quest-v2-item")?.style.setProperty("--ar", String(img.naturalWidth / img.naturalHeight));
      ScrollTrigger.refresh();
    };
    const handlers = images.map((img) => {
      const handler = () => onLoad(img);
      img.addEventListener("load", handler);
      if (img.complete) onLoad(img);
      return handler;
    });

    return () => {
      images.forEach((img, i) => img.removeEventListener("load", handlers[i]));
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="quests-v2" id="quests" ref={sectionRef}>
      <div className="quests-v2-sticky">
        <div className="quests-v2-heading">
          <div className="quests-v2-heading-left">
            <span className="chapter-row-inline">
              <SpinIcon k={1.2} icon="flower" size={14} />
              04 &mdash; This section is a work in progress
            </span>
            <h2 className="quests-v2-h2">Side <span className="kw-sage">quests</span></h2>
          </div>
          <span className="quests-v2-hint">Keep scrolling &rarr;</span>
        </div>
        <div className="quests-v2-track" ref={trackRef}>
          {quests.map((quest, index) => (
            <article className="quest-v2-item" key={quest.slug}>
              <div className="quest-v2-top">
                <span>{pad(index + 1)} / {pad(quests.length)}</span>
                <span className="quest-v2-top-right">
                  {quest.date}
                  <SpinIcon icon={QUEST_ICONS[index % 4]} k={index % 2 ? -1.3 : 1.3} />
                </span>
              </div>
              <img className="quest-v2-photo" src={`/assets/quests/${quest.slug}.jpg`} alt={quest.title} />
              <div className="quest-v2-copy">
                <span className="quest-v2-domain">{quest.domain} &mdash; {quest.status}</span>
                <h3>{quest.title}</h3>
                <p>{quest.body}</p>
                <div className="quest-v2-links">
                  {quest.links?.map((item) => (
                    <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>{item.label} &#8599;</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setSending(true);
    setFormMsg("");
    try {
      const [response] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }),
        new Promise((resolve) => setTimeout(resolve, 1100)),
      ]);
      if (!response.ok) throw new Error("Request failed");
      setFormMsg("Message sent! I'll reply within a day or two.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setFormMsg("Something went wrong. Try again, or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section-v2" id="contact">
      <ChapterRow n="05" label="Contact" icon="singer" k={1.2} />

      <div className="section-grid section-content">
        <div />
        <div className="contact-v2-body">
          <Reveal as="h2" className="contact-v2-h2">
            Currently open to <span className="kw-nowrap">product design</span> and front-end engineering roles.
          </Reveal>
          <div className="contact-v2-grid">
            <Reveal as="div" className="contact-v2-direct">
              <p className="contact-v2-desc">Also happy to talk about projector mappings, planes, and yoga. I reply within a day or two.</p>
              <button type="button" className="email-pill" onClick={onCopy}>
                <span>carolineeausema@gmail.com</span>
                <span className="email-pill-tag">{copied ? "Copied ✓" : "Copy"}</span>
              </button>
              <div className="pill-filter">
                <a className="pill-filter-btn" href="https://github.com" target="_blank" rel="noreferrer">GitHub &#8599;</a>
                <a className="pill-filter-btn" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn &#8599;</a>
                <a className="pill-filter-btn" href="#">Resume PDF &darr;</a>
              </div>
              <div className="contact-v2-status"><span className="status-dot" />{availability}</div>
            </Reveal>

            <Reveal as="form" className="contact-v2-form" onSubmit={handleSubmit}>
              <label>Name
                <input type="text" name="name" autoComplete="name" placeholder="Jane Doe" value={name} onChange={(event) => setName(event.target.value)} required />
              </label>
              <label>Email
                <input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label>Message
                <textarea name="message" placeholder="What are you working on?" value={message} onChange={(event) => setMessage(event.target.value)} required />
              </label>
              <button className="contact-v2-submit" type="submit" disabled={sending}>
                <span>{sending ? "Sending..." : "Send"}</span><span>&rarr;</span>
              </button>
              <div role="status" aria-live="polite" className="form-status">{formMsg}</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-v2" id="site-footer">
      <div className="footer-v2-top">
        <span className="footer-v2-spin"><SpinIcon k={0.9} icon="circle" size={64} /></span>
        <span>Built with a little sparkle in my eye.</span>
      </div>
      <div className="footer-v2-wordmark" role="img" aria-label="CRLNA">
        {"CRLNA".split("").map((char, i) => <span key={i}>{char}</span>)}
      </div>
      <div className="footer-v2-bottom">&copy; 2026 CRLNA / React / Next / TypeScript / p5</div>
    </footer>
  );
}
