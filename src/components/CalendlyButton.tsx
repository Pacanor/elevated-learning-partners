import { Calendar } from "lucide-react";
import { openCalendly } from "../lib/calendly";

type CalendlyButtonProps = {
  label: string;
  className?: string;
  iconSize?: number;
};

/** Primary CTA that opens the discovery-call Calendly popup. */
export function CalendlyButton({
  label,
  className = "button button-primary",
  iconSize = 18,
}: CalendlyButtonProps) {
  return (
    <button className={className} type="button" onClick={openCalendly}>
      <Calendar size={iconSize} /> {label}
    </button>
  );
}
