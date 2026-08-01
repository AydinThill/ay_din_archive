import {defineField, defineType} from 'sanity'

export const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      description: 'For example: Radio Edit, Live, Remix.',
      type: 'string',
    }),
    defineField({
      name: 'audio',
      title: 'Audio file',
      type: 'file',
      options: {accept: 'audio/*'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'durationSeconds',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (rule) => rule.positive().integer(),
    }),
    defineField({
      name: 'previewStartSeconds',
      title: 'Preview start (seconds)',
      description: 'Where a short public preview should begin.',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({name: 'isExplicit', title: 'Explicit', type: 'boolean', initialValue: false}),
    defineField({name: 'credits', title: 'Credits', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title', version: 'version'},
    prepare: ({title, version}) => ({title, subtitle: version || 'Original'}),
  },
})
