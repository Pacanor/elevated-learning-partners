import { useEffect, useState } from "react";
import { heroImages } from "../data/site";
import { BrandLockup } from "./BrandLockup";
import { CalendlyButton } from "./CalendlyButton";

/** Hero owns its own slide timer so the rest of the page does not re-render every 5s. */
export function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-photos" aria-hidden="true">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`hero-photo${index === heroIndex ? " is-active" : ""}${index % 2 === 0 ? " zoom-in" : " zoom-out"}`}
          >
            {index === 0 || index === heroIndex || index === (heroIndex + 1) % heroImages.length ? (
              <img
                src={src}
                alt=""
                width={1280}
                height={720}
                decoding={index === 0 ? "sync" : "async"}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-orbit orbit-three" aria-hidden="true" />
      <div className="hero-grid container">
        <div className="hero-copy reveal" data-revealed="true">
          <h1>
            Purposeful learning.
            <span className="display-accent">Measurable progress.</span>
          </h1>
          <p className="hero-intro">
            Learning design, professional training, and the technology that helps both last.
          </p>
          <div className="button-row">
            <CalendlyButton label="Book a call" />
            <a className="button button-ghost" href="#portfolio">See selected work</a>
          </div>
        </div>

        <div className="hero-visual reveal" data-revealed="true" aria-hidden="true">
          <div className="hero-mark-wrap">
            <BrandLockup variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
