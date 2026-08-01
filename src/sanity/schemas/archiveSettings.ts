import {defineField, defineType} from 'sanity'

export const archiveSettings = defineType({
  name: 'archiveSettings',
  title: 'Archive settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Archive title',
      type: 'string',
      initialValue: 'Ay Din Archive',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'bio', title: 'Archive introduction', type: 'text', rows: 4}),
    defineField({
      name: 'portrait',
      title: 'Archive portrait',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'email'}),
  ],
  preview: {prepare: () => ({title: 'Archive settings'})},
})
