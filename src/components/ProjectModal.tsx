import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import type { PortfolioProject } from "../data/portfolio";
import { EnquireActions } from "./EnquireActions";

type ProjectModalProps = {
  project: PortfolioProject;
  slideIndex: number;
  phase: "opening" | "open" | "closing";
  originStyle?: CSSProperties;
  onClose: () => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
  ).filter((el) => el.getAttribute("aria-hidden") !== "true");
}

export function ProjectModal({
  project,
  slideIndex,
  phase,
  originStyle,
  onClose,
  onNextSlide,
  onPrevSlide,
  returnFocusRef,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const onNextRef = useRef(onNextSlide);
  const onPrevRef = useRef(onPrevSlide);

  useEffect(() => {
    onCloseRef.current = onClose;
    onNextRef.current = onNextSlide;
    onPrevRef.current = onPrevSlide;
  }, [onClose, onNextSlide, onPrevSlide]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const returnTo = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = getFocusable(dialogRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      const target = event.target as HTMLElement | null;
      const inCopy =
        target instanceof HTMLElement && Boolean(target.closest(".modal-copy"));
      if (inCopy && (event.key === "ArrowUp" || event.key === "ArrowDown")) return;

      const isControl =
        target instanceof HTMLElement &&
        (target.closest("button, a") || target.isContentEditable);
      if (isControl && (event.key === " " || event.key === "Enter")) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        onNextRef.current();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        onPrevRef.current();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
      returnTo?.focus();
    };
  }, [project.id, returnFocusRef]);

  return (
    <div
      className={`modal-backdrop is-${phase}`}
      role="presentation"
      onMouseDown={() => onCloseRef.current()}
    >
      <section
        ref={dialogRef}
        className={`project-modal is-${phase}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        style={originStyle}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          aria-label="Close project preview"
          onClick={() => onCloseRef.current()}
        >
          <X />
        </button>

        <div className="modal-media">
          <div className="modal-media-header">
            <div className="modal-media-caption">
              <small>{project.category}</small>
              <h2 id="project-modal-title">{project.title}</h2>
            </div>
          </div>

          <div className="modal-slides">
            <figure className="modal-slide" key={`${project.id}-${slideIndex}`}>
              <img
                src={project.slides[slideIndex]}
                alt={`${project.title} portfolio preview ${slideIndex + 1}`}
              />
            </figure>
          </div>

          {project.slides.length > 1 && (
            <button
              className="modal-next-caret"
              type="button"
              aria-label={`Next preview (${slideIndex + 1} of ${project.slides.length})`}
              onClick={() => onNextRef.current()}
            >
              <ChevronDown size={22} />
            </button>
          )}
        </div>

        <div className="modal-copy">
          <p className="modal-client">Client: {project.client}</p>
          <p className="modal-summary">{project.summary}</p>
          <div className="modal-details">
            <div>
              <h3>Our role</h3>
              <p>{project.role}</p>
            </div>
            <div>
              <h3>Impact</h3>
              <ul>
                {project.impact.map((item) => (
                  <li key={item}>
                    <Check size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tool-tags">
            {project.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <EnquireActions
            item={project.shortTitle}
            prompt="Want something like this for your organization?"
          />
        </div>
      </section>
    </div>
  );
}
