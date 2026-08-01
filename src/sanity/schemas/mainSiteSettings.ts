import {defineField, defineType} from 'sanity'

export const mainSiteSettings = defineType({
  name: 'mainSiteSettings',
  title: 'Main website settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Website title',
      type: 'string',
      initialValue: 'Ay Din',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'introduction', title: 'Introduction', type: 'text', rows: 5}),
    defineField({name: 'portrait', title: 'Portrait', type: 'image', options: {hotspot: true}}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'email'}),
  ],
  preview: {prepare: () => ({title: 'Main website settings'})},
})
