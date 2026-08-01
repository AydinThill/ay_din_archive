import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId:
      process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'jh1352yt',
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  },
  project: {
    basePath: '/admin',
  },
  deployment: {
    appId: 'jc9vjuyd6i80or3n1gpk7h2l',
    autoUpdates: true,
  },
})
