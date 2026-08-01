# Ay Din Archive

A custom, 3D archive for Ay Din music, releases, transmissions, and artifacts. The frontend
and CMS follow the same core stack as the Pistrino-Steffen Gallery website, with TypeScript
added for safer content and scene contracts.

The planned public URL is `https://aydin.quest/archive/`.

## Stack

- Vite 8, React 19, and TypeScript
- Three.js through React Three Fiber and Drei
- Zustand for interaction state
- Sanity Studio and Sanity Content Lake
- Oxlint and Prettier

## Start locally

Requirements: Node.js 22+ and npm.

```bash
npm install
cp .env.example .env
npm run dev:web
```

The web app runs at `http://localhost:5173`. Until Sanity is configured it intentionally
uses local demo content, so the 3D scene can be developed immediately.

Production builds use `/archive/` as their asset base through `.env.production`. To rename
the route later, change `VITE_BASE_PATH` in the deployment environment and update the
canonical URL in `index.html`. Local development remains at `/` by default.

## Connect the CMS

1. Log in to Sanity with `npx sanity login`.
2. Create a new project at [sanity.io/manage](https://www.sanity.io/manage), or with the
   Sanity CLI.
3. Copy `.env.example` to `.env` and replace `your-project-id` in both project ID values.
4. Add `http://localhost:5173` as a CORS origin in the Sanity project settings.
5. Start both apps with `npm run dev`.

The frontend runs at `http://localhost:5173`; Studio runs at `http://localhost:3333/studio`.

### Content model

- **Track** stores uploaded audio, metadata, duration, and credits.
- **Release** groups one or more tracks with artwork, streaming links, and a release time.
- **Link** drives the spatial link objects and their accent colors.
- **Site settings** is a singleton for the artist name, tagline, bio, and contact details.

A release set to **Scheduled** becomes visible when `releaseAt` is reached. **Public**
bypasses the date and **Hidden** keeps it out of the public query. Keep a document as an
unpublished Sanity draft when it should not be available through the published API at all.

## Commands

```bash
npm run dev           # frontend and Studio together
npm run dev:web       # frontend only
npm run dev:studio    # Studio only
npm run build         # typecheck and build the frontend
npm run build:studio  # build Sanity Studio
npm run lint
npm run format:check
```

## Hosting under a subpath

The generated frontend is ready to be served from `/archive/`, including its JavaScript
and CSS asset URLs. `vercel.json` maps those public URLs to the files in Vite's `dist`
directory and sends application routes to `index.html`.

### Initial Vercel setup

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected
   **Vite** framework settings. The build and output settings are already versioned in
   `vercel.json`.
3. Add the Sanity variables from `.env.example` under **Project → Settings → Environment
   Variables** when the CMS project exists. `VITE_BASE_PATH=/archive/` is already supplied
   by `.env.production`.
4. Deploy once and test the generated `*.vercel.app/archive/` URL.
5. Under **Project → Settings → Domains**, add `aydin.quest` and optionally
   `www.aydin.quest`.
6. At the domain registrar, create the exact DNS records Vercel shows. For an apex domain,
   this is normally an A record; `www` normally uses a CNAME. Prefer the values displayed
   by Vercel for this project over copied generic values.

The root `/` redirect to `/archive/` is intentionally temporary. Remove the first entry
under `redirects` in `vercel.json` when the main `aydin.quest` homepage is ready.

Requests to the former `/linktree` path permanently redirect to `/archive/`.

## Suggested next phase

Define the visual concept and navigation model before expanding the scene. In particular,
decide whether releases should behave like objects in one continuous world, a scroll-driven
3D timeline, or a compact spatial menu. The content model supports all three directions.
