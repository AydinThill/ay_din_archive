# Spatial Links

A custom, 3D link-in-bio experience for music releases. The frontend and CMS follow the
same core stack as the Pistrino-Steffen Gallery website, with TypeScript added for safer
content and scene contracts.

The planned public URL is `https://aydin.quest/linktree/`. “Linktree” is a temporary route
name and not the final product name.

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

Production builds use `/linktree/` as their asset base through `.env.production`. To rename
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

The generated frontend is ready to be served from `/linktree/`, including its JavaScript
and CSS asset URLs. The host for the main `aydin.quest` website must route requests for
`/linktree/*` to this project's built `index.html`. The exact rewrite belongs in the hosting
configuration once the provider for the main website is chosen.

## Suggested next phase

Define the visual concept and navigation model before expanding the scene. In particular,
decide whether releases should behave like objects in one continuous world, a scroll-driven
3D timeline, or a compact spatial menu. The content model supports all three directions.
