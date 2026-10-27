# ElevatED Learning Partners

A responsive, static one-page website built with React, TypeScript and Vite.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/` and can be hosted as a static site on DigitalOcean App Platform.

## DigitalOcean configuration

- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Catch-all route: `index.html`

The project enquiry buttons use `elevatedlearningpartnersllc@gmail.com`. Add the confirmed WhatsApp number to `WHATSAPP_NUMBER` in `src/data/contact.ts` to enable WhatsApp actions automatically.
