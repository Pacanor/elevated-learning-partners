import { Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createEmailLink, createWhatsAppLink, leaders } from "../data/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Leader = (typeof leaders)[number];

type PersonCardProps = {
  leader: Leader;
};

type LinkItem = {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
};

/** Touch / no-hover UIs use tap-to-expand; hover devices keep CSS hover expand. */
function useTapExpandUi() {
  const [tapUi, setTapUi] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(hover: none)").matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const update = () => setTapUi(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return tapUi;
}

export function PersonCard({ leader }: PersonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const tapUi = useTapExpandUi();
  const open = tapUi && expanded;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && cardRef.current?.contains(target)) return;
      setExpanded(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const links: LinkItem[] = [
    {
      href: leader.linkedin,
      label: `${leader.shortName} on LinkedIn`,
      icon: <Linkedin size={16} />,
      external: true,
    },
    {
      href: createEmailLink(`Hello ${leader.shortName}`),
      label: `Email ${leader.shortName}`,
      icon: <Mail size={16} />,
    },
    {
      href: `tel:${leader.phone}`,
      label: `Call ${leader.shortName}`,
      icon: <Phone size={16} />,
    },
    {
      href: createWhatsAppLink(
        `Hi ${leader.shortName}, I found your profile on the ElevatED Learning Partners website and would like to connect.`,
        leader.whatsapp,
      ),
      label: `WhatsApp ${leader.shortName}`,
      icon: <WhatsAppIcon size={16} />,
      external: true,
    },
  ];

  return (
    <article
      ref={cardRef}
      className={`person-card reveal${open ? " is-expanded" : ""}`}
      onClick={() => {
        if (tapUi && !expanded) setExpanded(true);
      }}
    >
      <div className="person-frame">
        <img
          src={leader.image}
          alt={leader.name}
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
        />
        <div className="person-overlay">
          <div className="person-caption">
            <h3>{leader.name}</h3>
            <div className="person-caption-meta">
              <p className="person-role">{leader.role}</p>
              {tapUi && !expanded && (
                <button
                  type="button"
                  className="person-more"
                  aria-expanded={false}
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpanded(true);
                  }}
                >
                  more
                </button>
              )}
            </div>
          </div>
          <div className="person-details">
            <p className="person-bio">{leader.bio}</p>
            <p className="person-qualification">{leader.qualification}</p>
            <div className="person-links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  tabIndex={open || !tapUi ? 0 : -1}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={(event) => event.stopPropagation()}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
