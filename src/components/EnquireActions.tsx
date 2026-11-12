import { Mail } from "lucide-react";
import { enquireEmail, enquireWhatsApp } from "../data/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";

type EnquireActionsProps = {
  item: string;
  prompt: string;
};

/** Shared Email + WhatsApp enquire row used in portfolio modals. */
export function EnquireActions({ item, prompt }: EnquireActionsProps) {
  const whatsapp = enquireWhatsApp(item);
  return (
    <div className="enquire-block enquire-gold">
      <p className="enquire-prompt">{prompt}</p>
      <div className="button-row">
        <a className="button button-gold" href={enquireEmail(item)}>
          <Mail size={17} /> Email us
        </a>
        <a className="button button-outline" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={17} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
