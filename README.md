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

## DigitalOcean App Platform (free static site)

Cheapest option: App Platform **static site free tier** ($0/mo for up to 3 static apps; 1 GiB transfer).

Spec lives in `.do/app.yaml`.

```bash
# One-time: create a personal access token at
# https://cloud.digitalocean.com/account/api/tokens
doctl auth init --access-token YOUR_TOKEN

# Create / update the app from the checked-in spec
doctl apps create --spec .do/app.yaml
```

- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Catch-all document: `index.html`
- Deploy on push to `main`

Repo: https://github.com/Pacanor/elevated-learning-partners
