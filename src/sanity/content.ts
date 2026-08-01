import type {HomeContent} from '../types/content'
import {sanityClient} from './client'
import {homeQuery} from './queries'

export const fallbackContent: HomeContent = {
  settings: {
    name: 'YOUR NAME',
    tagline: 'A spatial home for sound and everything around it.',
  },
  links: [
    {_id: 'music', title: 'Music', eyebrow: 'Listen', url: '#releases', accent: '#d8ff65'},
    {_id: 'work', title: 'Selected work', eyebrow: 'Explore', url: '#work', accent: '#79c5ff'},
    {
      _id: 'contact',
      title: 'Contact',
      eyebrow: 'Say hello',
      url: 'mailto:hello@example.com',
      accent: '#ff8fc7',
    },
  ],
  releases: [],
}

export async function getHomeContent(): Promise<HomeContent> {
  if (!sanityClient) return fallbackContent

  try {
    return await sanityClient.fetch<HomeContent>(homeQuery)
  } catch (error) {
    console.error('Could not load Sanity content; using local placeholders.', error)
    return fallbackContent
  }
}
