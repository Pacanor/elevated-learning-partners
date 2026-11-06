type BrandLockupProps = {
  variant?: "nav" | "hero" | "footer";
};

const ASSETS = {
  nav: {
    src: "/brand/lockups/nav-approved.png",
    alt: "ElevatED Learning Partners",
  },
  hero: {
    src: "/brand/lockups/mark-colour-on-dark.png",
    alt: "",
  },
  footer: {
    src: "/brand/lockups/stacked-colour-on-dark.png",
    alt: "ElevatED Learning Partners",
  },
} as const;

export function BrandLockup({ variant = "nav" }: BrandLockupProps) {
  const asset = ASSETS[variant];
  return (
    <span className={`brand-lockup brand-lockup-${variant}`}>
      <img src={asset.src} alt={asset.alt} />
      {variant === "hero" && (
        <span className="visually-hidden">ElevatED Learning Partners</span>
      )}
    </span>
  );
}
