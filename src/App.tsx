import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveRight,
  Phone,
  ShieldCheck,
  Sun,
  Users,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { BrandLockup } from "./components/BrandLockup";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import {
  CALENDLY_INLINE_URL,
  CALENDLY_URL,
  DP_TECH_URL,
  createEmailLink,
  createWhatsAppLink,
  enquireEmail,
  enquireWhatsApp,
  leaders,
} from "./data/contact";
import { portfolioProjects, type PortfolioProject } from "./data/portfolio";

type Theme = "light" | "dark";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget?: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

function resolveTheme(stored: string | null): Theme {
  if (stored === "dark" || stored === "noir" || stored === "navy" || stored === "charcoal" || stored === "night") {
    return "dark";
  }
  return "light";
}

function openCalendly() {
  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

type ModalOrigin = {
  dx: number;
  dy: number;
};

const heroImages = [
  "/brand/hero/01.jpg?v=20261110",
  "/brand/hero/02.jpg?v=20261110",
  "/brand/hero/03.jpg?v=20261110",
  "/brand/hero/04.jpg?v=20261110",
  "/brand/hero/05.jpg?v=20261110",
  "/brand/hero/06.jpg?v=20261110",
];

const offerings = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Curriculum design & development",
    copy: "Custom, standards-aligned curricula designed to meet diverse learner needs, promote accessible and culturally responsive learning, and foster meaningful, lasting learning outcomes. With Academy of Hope, that included a new Maryland adult curriculum and a modernized Washington, DC curriculum.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Curriculum evaluation & modernization",
    copy: "Comprehensive curriculum reviews and redesigns that strengthen educational quality, ensure alignment with global and national standards, promote accessibility and inclusive, culturally responsive learning, and integrate evidence-based instructional practices.",
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "Instructional design & course development",
    copy: "Engaging courses, lessons, assessments, and learning resources designed for in-person, online, and blended environments, creating meaningful learning experiences that foster lasting understanding, knowledge retention, and real-world application.",
  },
  {
    icon: Users,
    number: "04",
    title: "Educator, professional & workforce development",
    copy: "Practical, research-informed training that strengthens instructional effectiveness, develops workforce skills, builds professional capacity, and supports continuous improvement.",
  },
  {
    icon: BarChart3,
    number: "05",
    title: "Learning evaluation & quality assurance",
    copy: "Data-informed evaluation of curricula, instructional practices, and learning outcomes to identify areas for improvement, guide evidence-based decisions, and strengthen educational quality and effectiveness.",
  },
];

const innovations = [
  {
    number: "01",
    id: "product-hub",
    tone: "forest",
    audience: "Faculty support",
    title: "Faculty Digital Support Hub",
    summary: "Smarter support for educators and instructional teams.",
    detail:
      "A centralized solution that organizes, routes, and tracks faculty support requests, improving response times, accountability, and continuous improvement.",
    points: [
      "Intelligent request routing",
      "Centralized, searchable records",
      "Insights for continuous improvement",
    ],
    cta: "Email us about faculty support",
    href: enquireEmail("Faculty Digital Support Hub"),
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("Faculty Digital Support Hub") ?? undefined,
  },
  {
    number: "02",
    id: "product-benchmark",
    tone: "gold",
    audience: "Higher education",
    title: "Course Quality Benchmark Tool",
    summary: "Transform course reviews into actionable insights.",
    detail:
      "An AI-assisted, human-validated course evaluation tool informed by Quality Matters (QM) standards that assesses instructional design, accessibility, and course quality, identifies trends across programs, and provides actionable insights for continuous improvement.",
    points: [
      "Course quality insights informed by Quality Matters (QM) standards",
      "AI-assisted, human-validated reviews that support continuous improvement",
      "Accessibility evaluation against WCAG 2.1 AA",
    ],
    cta: "Request a demo",
    calendly: true,
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("Course Quality Benchmarking Platform") ?? undefined,
  },
  {
    number: "03",
    id: "product-automation",
    tone: "mint",
    audience: "Business & organizational workflows",
    title: "AI & automation solutions",
    summary: "Smarter processes. More time for meaningful work.",
    detail:
      "Practical AI-powered solutions that help educational institutions, organizations, and growing businesses automate repetitive tasks, streamline communication, improve scheduling, and manage everyday operations more efficiently.",
    points: [
      "Automated communication and follow-ups",
      "Streamlined scheduling and administrative workflows",
      "Improved tracking and operational efficiency",
    ],
    cta: "Email us about automation",
    href: enquireEmail("AI and automation"),
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("AI and automation") ?? undefined,
  },
  {
    number: "04",
    id: "product-technology",
    tone: "sage",
    audience: "Teaching & learning",
    title: "Learning technology integration",
    summary: "Technology designed around teaching and learning.",
    detail:
      "Strategic selection, integration, and optimization of learning management systems, digital learning tools, and interactive technologies that enhance instruction and learner engagement.",
    points: [
      "LMS and learning technology integration",
      "Digital and interactive learning tools",
      "Practical implementation and adoption support",
    ],
    cta: "Email us about learning technology",
    href: enquireEmail("Learning technology integration"),
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("Learning technology integration") ?? undefined,
  },
];

const expertiseAreas = [
  {
    id: "curriculum-design",
    number: "01",
    label: "Curriculum & instructional design",
    copy: "Design engaging, standards-aligned curricula, courses, and learning experiences for K-12, higher education, adult education, and professional learning.",
    href: "#offerings",
    cta: "See our offerings",
    tone: "forest",
  },
  {
    id: "educator-development",
    number: "02",
    label: "Educator, professional & workforce development",
    copy: "Equip educators, trainers, and organizational teams with practical strategies, training programs, and learning experiences that strengthen instructional effectiveness and workforce skills.",
    href: "#offerings",
    cta: "See our offerings",
    tone: "gold",
  },
  {
    id: "learning-strategy",
    number: "03",
    label: "Learning strategy & innovation",
    copy: "Help institutions and organizations evaluate learning needs, improve educational programs, and integrate innovative approaches and technologies.",
    href: "#innovation",
    cta: "See innovation & technology",
    tone: "mint",
  },
] as const;

const platformScreens = [
  {
    src: "/brand/platform/01-overview.png",
    alt: "Course Quality Benchmarking Platform overview with rubric-based review, leadership dashboard, and institution-isolated data",
  },
  {
    src: "/brand/platform/02-kpis.png",
    alt: "Course Quality Benchmarking Platform showing strongest and weakest standards with recently updated course reviews",
  },
  {
    src: "/brand/platform/03-heatmap.png",
    alt: "Course Quality Benchmarking Platform institutional heatmap with faculty development insight and maturity distribution",
  },
];

const platformStream = [...platformScreens, ...platformScreens];

const navLinks = [
  { href: "#offerings", label: "Offerings", sections: ["offerings"] },
  { href: "#innovation", label: "Innovation", sections: ["innovation"] },
  {
    href: "#course-quality-platform",
    label: "Portfolio",
    sections: ["course-quality-platform", "portfolio", "credentials"],
  },
  { href: "#about", label: "About", sections: ["about", "process"] },
] as const;

const process = [
  ["01", "Discover", "We listen first, then define the real challenge, audience and measure of success."],
  ["02", "Design", "We prototype the right learning, workflow or experience with your context built in."],
  ["03", "Implement", "We build, test and refine with clear checkpoints and practical documentation."],
  ["04", "Sustain", "We transfer capability so your team can keep improving long after launch."],
];

function EnquireActions({
  item,
  prompt,
  tone = "dark",
}: {
  item: string;
  prompt: string;
  tone?: "dark" | "light" | "gold";
}) {
  const whatsapp = enquireWhatsApp(item);
  return (
    <div className={`enquire-block enquire-${tone}`}>
      <p className="enquire-prompt">{prompt}</p>
      <div className="button-row">
        <a className="button button-gold" href={enquireEmail(item)}>
          <Mail size={17} /> Email us
        </a>
        {whatsapp && (
          <a
            className={`button ${tone === "light" ? "button-ghost" : "button-outline"}`}
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -42px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(localStorage.getItem("elp-theme")));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [modalOrigin, setModalOrigin] = useState<ModalOrigin | null>(null);
  const [modalPhase, setModalPhase] = useState<"opening" | "open" | "closing">("open");
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselOffsetRef = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const calendlyMountRef = useRef<HTMLDivElement>(null);

  useReveal([selectedProject, modalPhase]);

  useEffect(() => {
    const host = calendlyMountRef.current;
    if (!host) return;

    let cancelled = false;
    let attempts = 0;
    const mount = () => {
      if (cancelled || !calendlyMountRef.current) return;
      if (!window.Calendly?.initInlineWidget) {
        if (attempts < 40) {
          attempts += 1;
          window.setTimeout(mount, 150);
        }
        return;
      }
      calendlyMountRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_INLINE_URL,
        parentElement: calendlyMountRef.current,
      });
    };
    mount();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const scrollToTarget = (target: HTMLElement) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const end = target.getBoundingClientRect().top + window.scrollY - margin;
      if (reduce) {
        window.scrollTo(0, end);
        return;
      }
      const start = window.scrollY;
      const distance = end - start;
      if (Math.abs(distance) < 2) return;
      // ~0.5s soft accel, cruise, ~0.5s soft decel with continuous velocity.
      const edge = 500;
      const cruise = Math.min(1800, Math.max(520, Math.abs(distance) * 0.42));
      const duration = edge * 2 + cruise;
      const started = performance.now();
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      // Integral of smoothstep(u)=3u²-2u³ is u³-½u⁴; edge ramps match cruise speed.
      const integSmooth = (u: number) => {
        const x = Math.min(1, Math.max(0, u));
        return x * x * x - 0.5 * x * x * x * x;
      };
      const totalWeight = edge + cruise;
      const progressAt = (elapsed: number) => {
        if (elapsed <= edge) {
          return (edge * integSmooth(elapsed / edge)) / totalWeight;
        }
        if (elapsed <= edge + cruise) {
          return (edge * 0.5 + (elapsed - edge)) / totalWeight;
        }
        const u = Math.min(1, (elapsed - edge - cruise) / edge);
        return (edge * 0.5 + cruise + edge * (u - integSmooth(u))) / totalWeight;
      };
      const step = () => {
        const elapsed = performance.now() - started;
        const t = Math.min(1, progressAt(elapsed));
        window.scrollTo(0, start + distance * t);
        if (elapsed < duration) {
          frame = window.setTimeout(step, 16);
          return;
        }
        window.scrollTo(0, end);
        root.style.scrollBehavior = "";
      };
      window.clearTimeout(frame);
      frame = window.setTimeout(step, 16);
    };
    const onClick = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;
      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, "", href);
      setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(frame);
      document.documentElement.style.scrollBehavior = "";
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("elp-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds = [
      "offerings",
      "innovation",
      "course-quality-platform",
      "portfolio",
      "credentials",
      "about",
      "process",
      "contact",
    ];
    const update = () => {
      setScrolled(window.scrollY > 100);
      const marker = Math.min(Math.round(window.innerHeight * 0.32), 260);
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48) {
        current = "contact";
      }
      if (!current) {
        setActiveNav(null);
        return;
      }
      const match = navLinks.find((link) => (link.sections as readonly string[]).includes(current));
      setActiveNav(match?.href ?? (current === "contact" ? "#contact" : null));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let lastTime = performance.now();

    const setWidth = () => track.scrollWidth / 2;

    const applyOffset = () => {
      const one = setWidth();
      if (one > 0) {
        while (carouselOffsetRef.current >= one) carouselOffsetRef.current -= one;
        while (carouselOffsetRef.current < 0) carouselOffsetRef.current += one;
      }
      track.style.transform = `translate3d(${-carouselOffsetRef.current}px, 0, 0)`;
    };

    applyOffset();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (!reduceMotion && !carouselPaused) {
        carouselOffsetRef.current += 0.45 * (delta / 16.67);
        applyOffset();
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    const onResize = () => applyOffset();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
    };
  }, [carouselPaused]);

  useEffect(() => {
    if (!selectedProject) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        setSelectedSlide((index) => (index + 1) % selectedProject.slides.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedProject]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    [],
  );

  const openProject = (project: PortfolioProject, event: MouseEvent<HTMLButtonElement>) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    const rect = event.currentTarget.getBoundingClientRect();
    setModalOrigin({
      dx: rect.left + rect.width / 2 - window.innerWidth / 2,
      dy: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
    setSelectedProject(project);
    setSelectedSlide(0);
    setModalPhase("opening");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalPhase("open"));
    });
  };

  const closeProject = () => {
    if (!selectedProject || modalPhase === "closing") return;
    setModalPhase("closing");
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedProject(null);
      setModalPhase("open");
      setModalOrigin(null);
    }, 380);
  };

  const scrollCarousel = (direction: number) => {
    const track = carouselTrackRef.current;
    if (!track) return;
    carouselOffsetRef.current += direction * 430;
    const one = track.scrollWidth / 2;
    if (one > 0) {
      while (carouselOffsetRef.current >= one) carouselOffsetRef.current -= one;
      while (carouselOffsetRef.current < 0) carouselOffsetRef.current += one;
    }
    track.style.transition = "transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)";
    track.style.transform = `translate3d(${-carouselOffsetRef.current}px, 0, 0)`;
    window.setTimeout(() => {
      if (carouselTrackRef.current) carouselTrackRef.current.style.transition = "";
    }, 480);
  };

  const advanceModalSlide = () => {
    if (!selectedProject) return;
    setSelectedSlide((index) => (index + 1) % selectedProject.slides.length);
  };

  const generalWhatsApp = createWhatsAppLink(
    "Hello ElevatED Learning Partners. I have just visited your website and would like to discuss a learning or automation project.",
  );
  const platformWhatsApp = enquireWhatsApp("Course Quality Benchmarking Platform");

  const modalStyle =
    modalOrigin && selectedProject
      ? ({
          "--origin-dx": `${modalOrigin.dx}px`,
          "--origin-dy": `${modalOrigin.dy}px`,
        } as CSSProperties)
      : undefined;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className={`site-header${scrolled ? " is-scrolled" : " is-top"}`}>
        <a className="logo-link" href="#top" aria-label="ElevatED Learning Partners, back to top">
          <BrandLockup variant="nav" />
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeNav === link.href ? "is-active" : undefined}
              aria-current={activeNav === link.href ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`nav-contact${activeNav === "#contact" ? " is-active" : ""}`}
            aria-current={activeNav === "#contact" ? "true" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Start a conversation
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-photos" aria-hidden="true">
            {heroImages.map((src, index) => (
              <div
                key={src}
                className={`hero-photo${index === heroIndex ? " is-active" : ""}${index % 2 === 0 ? " zoom-in" : " zoom-out"}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
          <div className="hero-veil" aria-hidden="true" />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-orbit orbit-three" aria-hidden="true" />
          <div className="hero-grid container">
            <div className="hero-copy reveal is-visible">
              <h1>
                Purposeful learning.
                <span className="display-accent">Measurable progress.</span>
              </h1>
              <p className="hero-intro">
                Learning design, professional training, and the technology that helps both last.
              </p>
              <div className="button-row">
                <button className="button button-primary" type="button" onClick={openCalendly}>
                  <Calendar size={18} /> Book a call
                </button>
                <a className="button button-ghost" href="#portfolio">See selected work</a>
              </div>
            </div>

            <div className="hero-visual reveal is-visible" aria-hidden="true">
              <div className="hero-mark-wrap">
                <BrandLockup variant="hero" />
              </div>
            </div>
          </div>
        </section>

        <section className="audiences section" id="expertise" aria-label="Our expertise">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Our expertise</p>
                <h2 className="section-title">
                  Curriculum, instruction
                  <br />
                  and strategy. Built for
                  <br />
                  <span className="display-accent is-inline">diverse learners.</span>
                </h2>
              </div>
              <p>
                We partner with schools, higher education institutions, and organizations
                to design effective curricula, elevate instructional practices, and create
                learning solutions that meet the needs of diverse learners.
              </p>
            </div>
            <div className="audience-cards">
              {expertiseAreas.map((area) => (
                <a
                  className={`audience-card audience-${area.tone} reveal`}
                  key={area.id}
                  href={area.href}
                >
                  <span className="audience-number">{area.number}</span>
                  <div className="audience-body">
                    <h3>{area.label}</h3>
                    <p>{area.copy}</p>
                  </div>
                  <span className="audience-link">
                    {area.cta} <MoveRight size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="services section" id="offerings">
          <div className="container">
            <div className="section-heading services-heading reveal">
              <div>
                <p className="eyebrow">Our offerings</p>
                <h2 className="section-title offerings-title">
                  Thoughtfully designed learning.{" "}
                  <span className="display-accent is-inline">Lasting impact.</span>
                </h2>
              </div>
              <p>
                We partner with K-12 schools, higher education institutions, adult education
                providers, and organizations to develop effective curricula, strengthen
                instructional practices, and improve learning outcomes.
              </p>
            </div>
            <div className="service-list">
              {offerings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <article className="service-row reveal" key={offering.title}>
                    <span className="service-number">{offering.number}</span>
                    <div className="service-icon" aria-hidden="true"><Icon size={22} /></div>
                    <div className="service-body">
                      <h3>{offering.title}</h3>
                      <p>{offering.copy}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="products-compact section" id="innovation" aria-label="Innovation">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Innovation</p>
                <h2 className="section-title">
                  Thoughtful technology.
                  <br />
                  <span className="display-accent is-inline">Smarter ways of working.</span>
                </h2>
              </div>
              <p>
                We help educational institutions, organizations, and growing businesses
                leverage purposeful technology, streamline operations, and create smarter
                solutions that improve learning, performance, and productivity.
              </p>
            </div>
            <div className="product-compact-grid innovation-grid">
              {innovations.map((item) => (
                <article className={`product-compact-card innovation-${item.tone} reveal`} id={item.id} key={item.id}>
                  <span className="product-compact-number">{item.number}</span>
                  <small>{item.audience}</small>
                  <h3>{item.title}</h3>
                  <p className="product-compact-summary">{item.summary}</p>
                  <div className="product-compact-expand">
                    <p>{item.detail}</p>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>
                          <CircleCheck size={16} /> {point}
                        </li>
                      ))}
                    </ul>
                    <div className="product-compact-cta">
                      <div className="product-compact-actions">
                        {"calendly" in item && item.calendly ? (
                          <button
                            className="button button-gold product-compact-action"
                            type="button"
                            onClick={openCalendly}
                          >
                            <Calendar size={17} /> {item.cta}
                          </button>
                        ) : (
                          <a
                            className="button button-gold product-compact-action"
                            href={"href" in item ? item.href : undefined}
                          >
                            {item.cta}
                          </a>
                        )}
                        {item.secondaryHref && item.secondaryCta && (
                          <a
                            className="button button-outline product-compact-action"
                            href={item.secondaryHref}
                            {...(item.secondaryHref.startsWith("http")
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                          >
                            {item.secondaryCta}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-feature section" id="course-quality-platform" aria-label="Course Quality Benchmarking Platform">
          <div className="container platform-layout">
            <div className="platform-media reveal" aria-hidden="true">
              <div className="platform-stream">
                {platformStream.map((screen, index) => (
                  <img
                    key={`${screen.src}-${index}`}
                    className="platform-shot"
                    src={screen.src}
                    alt=""
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                ))}
              </div>
            </div>

            <div className="platform-intro reveal">
              <p className="eyebrow">Course quality platform</p>
              <h2 className="section-title platform-title">
                The Course Quality
                <br />
                <span className="display-accent is-inline">Benchmarking Platform</span>
              </h2>
              <p className="platform-lead">
                Give higher education leadership a clear view of course quality across
                every course in the catalog.
              </p>
              <p className="platform-tagline">
                Every course. One view.
                <br />
                AI-accelerated review. Human-certified.
              </p>
              <div className="platform-copy">
                <p>
                  Built for higher education: rubric-based review, a leadership dashboard,
                  and institution-isolated data in one platform.
                </p>
                <p>
                  See your strongest and weakest standards at a glance, and track every new
                  review as it enters the catalog.
                </p>
                <p>
                  The institutional heatmap surfaces catalog-wide weaknesses quickly, so
                  leadership knows exactly where to invest faculty development next.
                </p>
              </div>
              <div className="button-row platform-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={openCalendly}
                >
                  <Calendar size={17} /> Request a demo
                </button>
                {platformWhatsApp && (
                  <a
                    className="button button-outline"
                    href={platformWhatsApp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon size={17} /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section section" id="portfolio">
          <div className="container portfolio-heading reveal">
            <div>
              <p className="eyebrow eyebrow-light">Selected work</p>
              <h2 className="section-title">
                Our expertise
                <br />
                <span className="display-accent is-inline">in action.</span>
              </h2>
            </div>
            <div className="portfolio-intro">
              <p>
                Explore selected projects that demonstrate how we bring together learning
                design, strategic thinking, and innovative technology to solve challenges
                and deliver meaningful results.
              </p>
              <div className="carousel-controls">
                <button type="button" aria-label="Previous projects" onClick={() => scrollCarousel(-1)}><ChevronLeft /></button>
                <button type="button" aria-label="Next projects" onClick={() => scrollCarousel(1)}><ChevronRight /></button>
              </div>
            </div>
          </div>

          <div
            className="portfolio-carousel"
            ref={carouselRef}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={() => setCarouselPaused(false)}
            aria-label="Project carousel"
          >
            <div className="portfolio-track" ref={carouselTrackRef}>
              {[...portfolioProjects, ...portfolioProjects].map((project, index) => (
                <button
                  type="button"
                  className="project-card"
                  key={`${project.id}-${index}`}
                  onClick={(event) => openProject(project, event)}
                  aria-label={`Preview ${project.title}`}
                >
                  <img src={project.cover} alt="" loading="lazy" />
                  <span className="project-overlay" />
                  {project.cpd && <span className="project-cpd">CPD</span>}
                  <span className="project-content">
                    <small>{project.category}</small>
                    <strong>{project.shortTitle}</strong>
                    <span>Open project <ArrowRight size={16} /></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="credentials section" id="credentials">
          <div className="container">
            <article className="credential-band reveal">
              <div className="credential-seal">
                <img
                  className="credential-mark credential-mark-light"
                  src="/brand/credentials/cpd-certified.png"
                  alt="CPD Certified mark from The CPD Certification Service"
                  width={132}
                  height={120}
                />
                <img
                  className="credential-mark credential-mark-dark"
                  src="/brand/credentials/cpd-certified-on-dark.png"
                  alt=""
                  aria-hidden="true"
                  width={132}
                  height={120}
                />
              </div>
              <div className="credential-copy">
                <p className="eyebrow">Credentials</p>
                <h2 className="section-title credentials-title">
                  Independently recognized.
                  <br />
                  <span className="display-accent is-inline">Practically applied.</span>
                </h2>
                <p>
                  Our CPD-certified courses reflect a commitment to excellence in design, development,
                  and delivery. Continuing professional development helps people expand what they know,
                  strengthen their skills, and stay current. The courses are practical and relevant,
                  so participants leave with something they can use. The aim is learning that lasts.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-layout">
            <div className="about-copy reveal">
              <p className="eyebrow">Who we are</p>
              <h2 className="section-title about-title">
                We are not just
                <br />
                designers. We are
                <br />
                <span className="display-accent is-inline">transformation partners.</span>
              </h2>
              <p className="about-lead">
                ElevatED Learning Partners is a women-led learning and development
                partnership, with reach across the Arab Gulf, Africa, Europe and the Americas.
              </p>
              <p>
                Our work brings together decades of higher education, corporate learning
                and edtech experience. Every engagement balances global standards with
                the culture, goals and capacity of the people who will carry the work forward.
              </p>
            </div>

            <div className="people-grid">
              {leaders.map((leader) => (
                <article className="person-card reveal" key={leader.name}>
                  <div className="person-frame">
                    <img src={leader.image} alt={leader.name} width={720} height={900} loading="lazy" />
                    <div className="person-overlay">
                      <div className="person-caption">
                        <h3>{leader.name}</h3>
                        <p className="person-role">{leader.role}</p>
                      </div>
                      <p className="person-bio">{leader.bio}</p>
                      <p className="person-qualification">{leader.qualification}</p>
                      <div className="person-links">
                        <a href={leader.linkedin} target="_blank" rel="noreferrer" aria-label={`${leader.shortName} on LinkedIn`}>
                          <Linkedin size={16} />
                        </a>
                        <a href={`mailto:${leader.email}?subject=${encodeURIComponent(`Hello ${leader.shortName}`)}`} aria-label={`Email ${leader.shortName}`}>
                          <Mail size={16} />
                        </a>
                        <a href={`tel:${leader.phone}`} aria-label={`Call ${leader.shortName}`}>
                          <Phone size={16} />
                        </a>
                        <a
                          href={createWhatsAppLink(`Hi ${leader.shortName}, I found your profile on the ElevatED Learning Partners website and would like to connect.`, leader.whatsapp) ?? undefined}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`WhatsApp ${leader.shortName}`}
                        >
                          <WhatsAppIcon size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section" id="process">
          <div className="container process-wrap">
            <div className="process-heading reveal">
              <p className="eyebrow">How we work</p>
              <h2 className="section-title process-title">
                Co-created.
                <br />
                <span className="display-accent is-inline">Built to last.</span>
              </h2>
              <p className="process-lead">
                We stay close to your people and your context at every step, so what we
                design together transfers cleanly, and your team can keep improving it
                long after launch.
              </p>
            </div>
            <div className="process-list">
              {process.map(([number, title, copy], index) => (
                <article
                  className="process-row reveal"
                  key={number}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <span className="process-number">{number}</span>
                  <div className="process-body">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
          <div className="contact-orbit contact-orbit-two" aria-hidden="true" />
          <div className="container contact-stack reveal">
            <div className="contact-grid">
              <div>
                <p className="eyebrow eyebrow-light">Start a conversation</p>
                <h2 className="section-title contact-title">
                  What could learning
                  <br />
                  <span className="display-accent is-inline">look like next?</span>
                </h2>
              </div>
              <div className="contact-copy">
                <p>
                  Tell us what you are trying to change. Book a time that works,
                  or reach out by email or WhatsApp.
                </p>
                <div className="button-row">
                  <button className="button button-gold" type="button" onClick={openCalendly}>
                    <Calendar size={18} /> Book a call
                  </button>
                  <a
                    className="button button-light"
                    href={createEmailLink(
                      "Learning transformation enquiry",
                      "Hi, I have just visited your website and would like to talk more about a potential learning or automation project.\n\nA useful place to begin would be...\n\nThank you.",
                    )}
                  >
                    <Mail size={18} /> Email our team
                  </a>
                  {generalWhatsApp && (
                    <a className="button button-ghost" href={generalWhatsApp} target="_blank" rel="noreferrer">
                      <WhatsAppIcon size={18} /> Chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="calendly-panel">
              <div className="calendly-panel-copy">
                <p className="eyebrow eyebrow-light">Book a discovery call</p>
                <h3>Pick a time that works for you.</h3>
                <p>
                  Prefer to schedule directly? Choose a slot below. The same booking
                  also opens from Book a call anywhere on the site.
                </p>
              </div>
              <div
                ref={calendlyMountRef}
                className="calendly-inline-widget"
                role="region"
                aria-label="Book a discovery call with ElevatED Learning Partners"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <BrandLockup variant="footer" />
          </div>
          <p>Purposeful learning design. Practical training. Measurable progress.</p>
          <div className="footer-links">
            <a href="#offerings">Offerings</a>
            <a href="#innovation">Innovation</a>
            <a href="#course-quality-platform">Portfolio</a>
            <a href="#about">About</a>
            <a href="#process">How we work</a>
            <a href="#credentials">Credentials</a>
          </div>
        </div>
        <div className="container footer-base">
          <span>© {new Date().getFullYear()} ElevatED Learning Partners, LLC.</span>
          <a className="dp-credit" href={DP_TECH_URL} target="_blank" rel="noreferrer">
            Powered by DP Tech
          </a>
        </div>
      </footer>

      {selectedProject && (
        <div
          className={`modal-backdrop is-${modalPhase}`}
          role="presentation"
          onMouseDown={closeProject}
        >
          <section
            className={`project-modal is-${modalPhase}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            style={modalStyle}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="modal-close"
              type="button"
              aria-label="Close project preview"
              onClick={closeProject}
            >
              <X />
            </button>

            <div className="modal-media">
              <div className="modal-media-header">
                <div className="modal-media-caption">
                  <small>{selectedProject.category}</small>
                  <h2 id="project-modal-title">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="modal-slides">
                <figure className="modal-slide" key={`${selectedProject.id}-${selectedSlide}`}>
                  <img
                    src={selectedProject.slides[selectedSlide]}
                    alt={`${selectedProject.title} portfolio preview ${selectedSlide + 1}`}
                  />
                </figure>
              </div>

              {selectedProject.slides.length > 1 && (
                <button
                  className="modal-next-caret"
                  type="button"
                  aria-label={`Next preview (${selectedSlide + 1} of ${selectedProject.slides.length})`}
                  onClick={advanceModalSlide}
                >
                  <ChevronDown size={22} />
                </button>
              )}
            </div>

            <div className="modal-copy">
              <p className="modal-client">Client: {selectedProject.client}</p>
              <p className="modal-summary">{selectedProject.summary}</p>
              <div className="modal-details">
                <div>
                  <h3>Our role</h3>
                  <p>{selectedProject.role}</p>
                </div>
                <div>
                  <h3>Impact</h3>
                  <ul>
                    {selectedProject.impact.map((item) => (
                      <li key={item}>
                        <Check size={16} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="tool-tags">
                {selectedProject.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <EnquireActions
                item={selectedProject.shortTitle}
                prompt="Want something like this for your organization?"
                tone="gold"
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
