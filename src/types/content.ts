export type LinkItem = {
  _id: string
  title: string
  eyebrow?: string
  url: string
  accent?: string
}

export type Release = {
  _id: string
  title: string
  artist: string
  releaseType: 'single' | 'ep' | 'album'
  releaseAt?: string
  slug: string
  coverUrl?: string
  description?: string
  streamingLinks?: {service: string; url: string}[]
}

export type HomeContent = {
  settings: {name: string; tagline?: string; bio?: string; contactEmail?: string} | null
  links: LinkItem[]
  releases: Release[]
}
