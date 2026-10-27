import {
  ArrowRight,
  BarChart3,
  Bot,
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
  "/brand/hero/01.jpg",
  "/brand/hero/02.jpg",
  "/brand/hero/03.jpg",
  "/brand/hero/04.jpg",
  "/brand/hero/05.jpg",
];

const services = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Instructional design",
    copy: "Inclusive courses and learning experiences shaped around outcomes, context and real learner needs.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Learning analytics",
    copy: "Clear signals from learning data that help teams act earlier and improve what happens next.",
  },
  {
    icon: Users,
    number: "03",
    title: "Faculty development",
    copy: "Practical workshops and coaching that build confidence in digital, blended and AI-supported teaching.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Quality assurance",
    copy: "Structured reviews for accessibility, quality standards, accreditation readiness and continuous improvement.",
  },
  {
    icon: BrainCircuit,
    number: "05",
    title: "Learning technology",
    copy: "Thoughtful integration of authoring tools, LMS platforms and interactive media without unnecessary complexity.",
  },
  {
    icon: Bot,
    number: "06",
    title: "AI and automation",
    copy: "Connected systems that simplify workflows, surface insights and return time to the people doing the work.",
  },
];

const audiences = [
  {
    id: "higher-ed",
    number: "01",
    label: "Higher education",
    copy: "Faculty support systems, course transformation, accessibility reviews and learning analytics for universities and colleges.",
    href: "#product-hub",
    cta: "See the Support Hub",
    tone: "forest",
  },
  {
    id: "organisations",
    number: "02",
    label: "Organisations",
    copy: "Capability-building programmes, quality assurance and instructional design that transfer lasting skill into your teams.",
    href: "#services",
    cta: "Explore our expertise",
    tone: "gold",
  },
  {
    id: "businesses",
    number: "03",
    label: "Growing businesses",
    copy: "AI automation for client communication, scheduling and progress tracking that returns hours to the people doing the work.",
    href: "#product-automation",
    cta: "Explore business automation",
    tone: "mint",
  },
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselOffsetRef = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  useReveal([selectedProject, modalPhase]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("elp-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <BrandLockup variant="hero" />
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Start a conversation</a>
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
                Inclusive learning systems and intelligent workflows for organisations ready to make a lasting difference.
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
                <img src="/brand/logo-mark.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="audiences section" id="who-we-help" aria-label="Who we help">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Who we help</p>
                <h2>
                  Built for the people
                  <br />
                  <span className="display-accent">shaping learning.</span>
                </h2>
              </div>
              <p>
                Whether you lead a faculty team, an L&D function or a growing business,
                we meet you in the challenge and design what lasts.
              </p>
            </div>
            <div className="audience-cards">
              {audiences.map((audience) => (
                <a
                  className={`audience-card audience-${audience.tone} reveal`}
                  key={audience.id}
                  href={audience.href}
                >
                  <span className="audience-number">{audience.number}</span>
                  <div className="audience-body">
                    <h3>{audience.label}</h3>
                    <p>{audience.copy}</p>
                  </div>
                  <span className="audience-link">
                    {audience.cta} <MoveRight size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="products section" id="products">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Core products</p>
                <h2>
                  Two smarter systems.
                  <br />
                  <span className="display-accent">Built around people.</span>
                </h2>
              </div>
              <p>
                Practical automation that removes friction, improves response quality and gives teams more time for the work that needs a human touch.
              </p>
            </div>

            <article className="product-feature product-feature-dark reveal" id="product-hub">
              <div className="product-copy">
                <div className="product-index">01 <span>Higher education</span></div>
                <h3>Faculty Digital<br />Support Hub</h3>
                <p>
                  An intelligent front door for faculty support. Every request is classified, routed and logged automatically so the right specialist can respond sooner.
                </p>
                <ul className="check-list">
                  <li><CircleCheck size={18} /> 95%+ request classification accuracy</li>
                  <li><CircleCheck size={18} /> Instant routing across specialist teams</li>
                  <li><CircleCheck size={18} /> Built-in quality review and analytics</li>
                </ul>
                <EnquireActions
                  item="the Faculty Digital Support Hub"
                  prompt="Need a smarter front door for faculty support?"
                  tone="light"
                />
              </div>
              <div className="product-media">
                <div className="media-glow" aria-hidden="true" />
                <img src="/portfolio/slide-09.png" alt="Faculty Digital Support Hub interface preview" />
              </div>
            </article>

            <article className="product-feature product-feature-light reveal" id="product-automation">
              <div className="product-media">
                <div className="media-glow" aria-hidden="true" />
                <img src="/portfolio/slide-11.png" alt="Small business automation interface preview" />
              </div>
              <div className="product-copy">
                <div className="product-index">02 <span>Growing businesses</span></div>
                <h3>Small Business<br />AI Automation</h3>
                <p>
                  A connected assistant for client communication, reminders, scheduling and progress tracking, all working in the background without adding another task to the day.
                </p>
                <ul className="check-list">
                  <li><CircleCheck size={18} /> Personalised responses in under two minutes</li>
                  <li><CircleCheck size={18} /> Automated reminders and scheduling</li>
                  <li><CircleCheck size={18} /> Live progress records for every client</li>
                </ul>
                <EnquireActions
                  item="Small Business AI Automation"
                  prompt="Ready to give your team hours back each week?"
                  tone="dark"
                />
              </div>
            </article>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="container">
            <div className="section-heading services-heading reveal">
              <div>
                <p className="eyebrow">Our expertise</p>
                <h2>
                  From learning challenge
                  <br />
                  to{" "}
                  <span className="display-accent is-inline">lasting capability.</span>
                </h2>
              </div>
              <p>
                Instructional expertise, accessible design, analytics and technology
                in one connected practice.
              </p>
            </div>
            <div className="service-list">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-row reveal" key={service.title}>
                    <span className="service-number">{service.number}</span>
                    <div className="service-icon" aria-hidden="true"><Icon size={22} /></div>
                    <div className="service-body">
                      <h3>{service.title}</h3>
                      <p>{service.copy}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="portfolio-section section" id="portfolio">
          <div className="container portfolio-heading reveal">
            <div>
              <p className="eyebrow eyebrow-light">Selected portfolio</p>
              <h2>
                Work you can
                <br />
                <span className="display-accent">look inside.</span>
              </h2>
            </div>
            <div className="portfolio-intro">
              <p>
                Eight projects spanning automation, instructional design,
                accessibility, analytics and faculty development.
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
                  <span className="project-number">{String((index % portfolioProjects.length) + 1).padStart(2, "0")}</span>
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

        <section className="about section" id="about">
          <div className="container about-layout">
            <div className="about-copy reveal">
              <p className="eyebrow">Who we are</p>
              <h2>
                We are not just
                <br />
                designers. We are
                <br />
                <span className="display-accent">
                  transformation
                  <br />
                  partners.
                </span>
              </h2>
              <p className="about-lead">
                ElevatED Learning Partners is a women-led instructional design and
                learning analytics consultancy with reach across the Arab Gulf, Africa,
                Europe and the Americas.
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
                        <p>{leader.role}</p>
                      </div>
                      <p className="person-bio">{leader.bio}</p>
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
              <h2 className="process-title">
                Co-created.{" "}
                <span className="display-accent is-inline"><br />Built to last.</span>
              </h2>
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
          <div className="container contact-grid reveal">
            <div>
              <p className="eyebrow eyebrow-light">Start a conversation</p>
              <h2>
                What could learning
                <br />
                <span className="display-accent">look like next?</span>
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
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <BrandLockup variant="hero" />
            <p className="footer-motto">Inclusive by design.</p>
          </div>
          <p>Purposeful learning design. Intelligent systems. Measurable progress.</p>
          <div className="footer-links">
            <a href="#products">Products</a>
            <a href="#services">Expertise</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
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
                prompt="Want something like this for your organisation?"
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
