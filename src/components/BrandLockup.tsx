type BrandLockupProps = {
  variant?: "nav" | "hero" | "footer";
};

const ASSETS = {
  nav: {
    src: "/brand/lockups/nav-approved.png",
    alt: "ElevatED Learning Partners",
    width: 328,
    height: 112,
  },
  hero: {
    src: "/brand/lockups/mark-colour-on-dark.png",
    alt: "",
    width: 240,
    height: 240,
  },
  footer: {
    src: "/brand/lockups/stacked-colour-on-dark.png",
    alt: "ElevatED Learning Partners",
    width: 240,
    height: 280,
  },
} as const;

export function BrandLockup({ variant = "nav" }: BrandLockupProps) {
  const asset = ASSETS[variant];
  return (
    <span className={`brand-lockup brand-lockup-${variant}`}>
      <img
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        decoding="async"
      />
      {variant === "hero" && (
        <span className="visually-hidden">ElevatED Learning Partners</span>
      )}
    </span>
  );
}
