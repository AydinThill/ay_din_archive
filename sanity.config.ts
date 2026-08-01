import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemas'
import {structure} from './src/sanity/structure'

export default defineConfig({
  name: 'ay_din',
  title: 'Ay Din',
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'jh1352yt',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({schemaType}) => !['mainSiteSettings', 'archiveSettings'].includes(schemaType),
      ),
  },
})
