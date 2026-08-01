import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist / project name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 4}),
    defineField({name: 'portrait', title: 'Portrait', type: 'image', options: {hotspot: true}}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'email'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
