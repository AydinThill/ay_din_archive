import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto']}),
    }),
    defineField({name: 'eyebrow', title: 'Short description', type: 'string'}),
    defineField({name: 'isVisible', title: 'Visible', type: 'boolean', initialValue: true}),
    defineField({
      name: 'accent',
      title: '3D accent color',
      description: 'CSS hex color, for example #d7ff64.',
      type: 'string',
      validation: (rule) => rule.regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex color'}),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {title: 'Manual order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'url'}},
})
