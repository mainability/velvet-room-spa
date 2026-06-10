# The Velvet Room — SPA

A single-page app for **The Velvet Room** bar, configured for Vercel deployment with client-side routing.

## Pages

- **/** — Welcome page with hero and hours
- **/reservations** — Table reservation form

## Why this folder exists

This is a **static SPA** (not Next.js). On Vercel, every URL is treated as a server path unless you configure rewrites. Without them, visiting `/reservations` directly returns a 404.

This project includes `vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

That tells Vercel to serve `index.html` for all routes so the browser router can take over.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output goes to the **`dist`** folder (configured in `vite.config.js` and `vercel.json`).

## Deploy to Vercel

1. Push this folder to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Vercel reads `vercel.json` automatically:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **SPA rewrites:** all paths → `/index.html`

### If you still get 404s

- Confirm **Output Directory** is `dist` in Vercel project settings
- Check the deployment logs for build errors
- Verify the deployment URL has no typos
- Ensure you have access to the deployment (not blocked by Vercel protection)

## Customize

Edit `src/content/site.js` for bar name, hours, contact info, and reservation slots.
