import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './sanity/desk/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  title: 'GGW Capital Real Estate',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure
    }),
    visionTool(),
  ],
})