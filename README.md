# Ventura AI Free

Ventura AI Free is a production-ready web app from **Ventura Labs AI** designed to help users **find the right AI faster** through a curated AI map.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Zustand (client-side persistence)
- EmailJS (optional welcome email)

## Routes

- `/` — landing page
- `/cadastro/` — registration (name + email)
- `/mapa/` — protected AI map
- `/admin/` — leads dashboard with filters + CSV export

## Main flow

1. User lands on the homepage.
2. Registers with name and email.
3. Session and leads persist in browser storage.
4. Optional welcome email can be sent via EmailJS.
5. User accesses protected AI map and clicks “Começar Grátis”.
6. Each click is tracked as a lead interaction.
7. Admin dashboard shows metrics, table, filters and CSV export.

## Important security note

This project uses **localStorage** for client-side persistence only.

- localStorage is **not secure authentication**
- localStorage is **not a centralized production database**
- Do not use this approach for sensitive data in real production environments

## AI tools currently mapped

ChatGPT, Claude, Gemini, Microsoft Copilot, Perplexity, Grok, NotebookLM, Canva AI, GitHub Copilot and Hugging Face.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set EmailJS variables only if you want optional welcome emails.

## Local development

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.
It builds a static export and deploys to GitHub Pages.

## License

MIT
