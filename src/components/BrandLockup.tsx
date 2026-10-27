type BrandLockupProps = {
  variant?: "dark" | "light" | "hero";
  compact?: boolean;
};

export function BrandLockup({ variant = "dark", compact = false }: BrandLockupProps) {
  return (
    <span className={`brand-lockup brand-${variant}${compact ? " is-compact" : ""}`}>
      <span className="brand-word" aria-hidden="true">
        <img className="brand-e" src="/brand/logo-mark.png" alt="" />
        <span className="brand-levat">
          levat<span className="brand-ed">ED</span>
        </span>
      </span>
      <span className="brand-sub">Learning Partners</span>
      <span className="visually-hidden">ElevatED Learning Partners</span>
    </span>
  );
}
