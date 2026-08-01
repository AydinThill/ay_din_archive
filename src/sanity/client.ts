import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-08-01'

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id')

export const sanityClient = isSanityConfigured
  ? createClient({projectId, dataset, apiVersion, useCdn: true, perspective: 'published'})
  : null
