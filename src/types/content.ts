export type LinkItem = {
  _id: string
  title: string
  eyebrow?: string
  url: string
  accent?: string
}

export type Track = {
  _id: string
  title: string
  version?: string
  durationSeconds?: number
  audioUrl?: string
}

export type Release = {
  _id: string
  title: string
  artist: string
  releaseType: 'single' | 'ep' | 'album' | 'mix'
  releaseAt: string
  slug: string
  coverUrl?: string
  tracks: Track[]
  streamingLinks?: {service: string; label?: string; url: string}[]
}

export type HomeContent = {
  settings: {name: string; tagline?: string; bio?: string; contactEmail?: string} | null
  links: LinkItem[]
  releases: Release[]
}
