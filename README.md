# Spatial Links

A custom, 3D link-in-bio experience for music releases. The frontend and CMS follow the
same core stack as the Pistrino-Steffen Gallery website, with TypeScript added for safer
content and scene contracts.

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

## Suggested next phase

Define the visual concept and navigation model before expanding the scene. In particular,
decide whether releases should behave like objects in one continuous world, a scroll-driven
3D timeline, or a compact spatial menu. The content model supports all three directions.
