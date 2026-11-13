import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Mail,
  Menu,
  Moon,
  MoveRight,
  Sun,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { BrandLockup } from "./components/BrandLockup";
import { CalendlyButton } from "./components/CalendlyButton";
import { Hero } from "./components/Hero";
import { PersonCard } from "./components/PersonCard";
import { ProjectModal } from "./components/ProjectModal";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import {
  DP_TECH_URL,
  createEmailLink,
  createWhatsAppLink,
  enquireWhatsApp,
  leaders,
} from "./data/contact";
import { expertiseAreas } from "./data/expertise";
import { innovations } from "./data/innovations";
import { offerings } from "./data/offerings";
import { platformStream } from "./data/platform";
import { aiEssentialsCourse, portfolioProjects, type PortfolioProject } from "./data/portfolio";
import { SITE_LEGAL_NAME, navLinks, processSteps } from "./data/site";
import { useReveal } from "./hooks/useReveal";
import { useSoftHashScroll } from "./hooks/useSoftHashScroll";
import { readStoredTheme, writeStoredTheme, type Theme } from "./lib/theme";

type ModalOrigin = { dx: number; dy: number };

function App() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [modalOrigin, setModalOrigin] = useState<ModalOrigin | null>(null);
  const [modalPhase, setModalPhase] = useState<"opening" | "open" | "closing">("open");
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselOffsetRef = useRef(0);
  const carouselPausedRef = useRef(false);
  const carouselHalfWidthRef = useRef(0);
  const closeTimerRef = useRef<number | null>(null);
  const modalPhaseRef = useRef<"opening" | "open" | "closing">("open");
  const lastOpenerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useReveal(!selectedProject);
  useSoftHashScroll({ onNavigate: closeMenu });

  useEffect(() => {
    writeStoredTheme(theme);
  }, [theme]);

  // Scroll spy + scrolled header state (rAF-throttled).
  useEffect(() => {
    const sectionIds = [
      "offerings",
      "innovation",
      "course-quality-platform",
      "portfolio",
      "ai-essentials",
      "credentials",
      "about",
      "process",
      "contact",
    ];
    let ticking = false;
    const update = () => {
      ticking = false;
      const nextScrolled = window.scrollY > 100;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

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
      const nextNav = current
        ? (navLinks.find((link) => (link.sections as readonly string[]).includes(current))?.href ??
          (current === "contact" ? "#contact" : null))
        : null;
      setActiveNav((prev) => (prev === nextNav ? prev : nextNav));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Portfolio marquee: cache half-width; pause via ref so the rAF loop does not remount.
  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let lastTime = performance.now();

    const measure = () => {
      carouselHalfWidthRef.current = track.scrollWidth / 2;
    };

    const applyOffset = () => {
      const one = carouselHalfWidthRef.current;
      if (one > 0) {
        while (carouselOffsetRef.current >= one) carouselOffsetRef.current -= one;
        while (carouselOffsetRef.current < 0) carouselOffsetRef.current += one;
      }
      track.style.transform = `translate3d(${-carouselOffsetRef.current}px, 0, 0)`;
    };

    measure();
    applyOffset();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (!reduceMotion && !carouselPausedRef.current) {
        carouselOffsetRef.current += 0.45 * (delta / 16.67);
        applyOffset();
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    const onResize = () => {
      measure();
      applyOffset();
    };
    window.addEventListener("resize", onResize);
    const images = Array.from(track.querySelectorAll("img"));
    images.forEach((img) => img.addEventListener("load", measure));

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      images.forEach((img) => img.removeEventListener("load", measure));
    };
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    modalPhaseRef.current = modalPhase;
  }, [modalPhase]);

  // Mobile menu: focus first link when opened; restore focus to menu button on close.
  useEffect(() => {
    if (!menuOpen) return;
    const menuButton = menuButtonRef.current;
    const firstLink = navRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const openProject = (project: PortfolioProject, event: MouseEvent<HTMLButtonElement>) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    lastOpenerRef.current = event.currentTarget;
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

  const closeProject = useCallback(() => {
    if (modalPhaseRef.current === "closing") return;
    setModalPhase("closing");
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedProject(null);
      setModalPhase("open");
      setModalOrigin(null);
    }, 380);
  }, []);

  const scrollCarousel = (direction: number) => {
    const track = carouselTrackRef.current;
    if (!track) return;
    carouselOffsetRef.current += direction * 430;
    const one = carouselHalfWidthRef.current || track.scrollWidth / 2;
    carouselHalfWidthRef.current = one;
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

  const advanceModalSlide = useCallback(() => {
    setSelectedSlide((index) => {
      if (!selectedProject) return index;
      return (index + 1) % selectedProject.slides.length;
    });
  }, [selectedProject]);

  const prevModalSlide = useCallback(() => {
    setSelectedSlide((index) => {
      if (!selectedProject) return index;
      return (index - 1 + selectedProject.slides.length) % selectedProject.slides.length;
    });
  }, [selectedProject]);

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

        <nav
          ref={navRef}
          id="primary-navigation"
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeNav === link.href ? "is-active" : undefined}
              aria-current={activeNav === link.href ? "true" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`nav-contact${activeNav === "#contact" ? " is-active" : ""}`}
            aria-current={activeNav === "#contact" ? "true" : undefined}
            onClick={closeMenu}
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
            ref={menuButtonRef}
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <Hero />

        <section className="audiences section" id="expertise" aria-label="Our expertise">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Our expertise</p>
                <h2 className="section-title">
                  Thoughtfully designed learning.{" "}
                  <span className="display-accent is-inline">Meaningful impact.</span>
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
                <p className="eyebrow">Innovation & Technology</p>
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
                        {item.calendly ? (
                          <CalendlyButton
                            label={item.cta}
                            className="button button-gold product-compact-action"
                            iconSize={17}
                          />
                        ) : (
                          <a className="button button-gold product-compact-action" href={item.href}>
                            {item.cta}
                          </a>
                        )}
                        <a
                          className="button button-outline product-compact-action"
                          href={item.secondaryHref}
                          {...(item.secondaryHref.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          <WhatsAppIcon size={17} /> {item.secondaryCta}
                        </a>
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
                    loading="lazy"
                    decoding="async"
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
                <CalendlyButton label="Request a demo" iconSize={17} />
                <a
                  className="button button-outline"
                  href={platformWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section section" id="portfolio">
          <div className="container portfolio-heading reveal">
            <div>
              <p className="eyebrow eyebrow-light">Selected work</p>
              <h2 className="section-title">
                Our Expertise{" "}
                <span className="display-accent is-inline">in Action.</span>
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
            onMouseEnter={() => {
              carouselPausedRef.current = true;
            }}
            onMouseLeave={() => {
              carouselPausedRef.current = false;
            }}
            onFocus={() => {
              carouselPausedRef.current = true;
            }}
            onBlur={() => {
              carouselPausedRef.current = false;
            }}
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
                  <img src={project.cover} alt="" loading="lazy" decoding="async" />
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

        <section className="course-showcase section" id="ai-essentials" aria-label="AI Essentials CPD course">
          <div className="container course-showcase-layout reveal">
            <div className="course-showcase-media">
              <img
                src={aiEssentialsCourse.cover}
                alt="AI Essentials for Working Professionals course cover"
                width={960}
                height={720}
                loading="lazy"
                decoding="async"
              />
              <span className="course-showcase-badge">First CPD course</span>
            </div>
            <div className="course-showcase-copy">
              <p className="eyebrow">CPD-certified learning</p>
              <h2 className="section-title">
                {aiEssentialsCourse.shortTitle}
                <br />
                <span className="display-accent is-inline">for working professionals.</span>
              </h2>
              <p className="course-showcase-lead">{aiEssentialsCourse.summary}</p>
              <ul className="course-showcase-modules">
                {aiEssentialsCourse.impact.map((item) => (
                  <li key={item}>
                    <CircleCheck size={16} /> {item}
                  </li>
                ))}
              </ul>
              <div className="button-row">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={(event) => openProject(aiEssentialsCourse, event)}
                >
                  View the course <ArrowRight size={17} />
                </button>
                <CalendlyButton label="Book a call" className="button button-outline" iconSize={17} />
              </div>
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
                  loading="lazy"
                />
                <img
                  className="credential-mark credential-mark-dark"
                  src="/brand/credentials/cpd-certified-on-dark.png"
                  alt=""
                  aria-hidden="true"
                  width={132}
                  height={120}
                  loading="lazy"
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
                <PersonCard key={leader.name} leader={leader} />
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
              {processSteps.map((step, index) => (
                <article
                  className="process-row reveal"
                  key={step.number}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <span className="process-number">{step.number}</span>
                  <div className="process-body">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
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
                  <CalendlyButton label="Book a call" className="button button-gold" />
                  <a
                    className="button button-light"
                    href={createEmailLink(
                      "Learning transformation enquiry",
                      "Hi, I have just visited your website and would like to talk more about a potential learning or automation project.\n\nA useful place to begin would be...\n\nThank you.",
                    )}
                  >
                    <Mail size={18} /> Email our team
                  </a>
                  <a className="button button-ghost" href={generalWhatsApp} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
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
          <span>© {new Date().getFullYear()} {SITE_LEGAL_NAME}.</span>
          <a className="dp-credit" href={DP_TECH_URL} target="_blank" rel="noopener noreferrer">
            Powered by DP Tech
          </a>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          slideIndex={selectedSlide}
          phase={modalPhase}
          originStyle={modalStyle}
          onClose={closeProject}
          onNextSlide={advanceModalSlide}
          onPrevSlide={prevModalSlide}
          returnFocusRef={lastOpenerRef}
        />
      )}
    </div>
  );
}

export default App;
