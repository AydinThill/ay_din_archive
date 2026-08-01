import {defineArrayMember, defineField, defineType} from 'sanity'

const streamingServices = [
  {title: 'Bandcamp', value: 'bandcamp'},
  {title: 'Spotify', value: 'spotify'},
  {title: 'Apple Music', value: 'appleMusic'},
  {title: 'SoundCloud', value: 'soundcloud'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'Other', value: 'other'},
]

export const release = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'schedule', title: 'Schedule'},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Format',
      type: 'string',
      group: 'content',
      initialValue: 'single',
      options: {
        layout: 'radio',
        list: [
          {title: 'Single', value: 'single'},
          {title: 'EP', value: 'ep'},
          {title: 'Album', value: 'album'},
          {title: 'Mix', value: 'mix'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover artwork',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tracks',
      title: 'Tracks',
      description: 'Drag to set the running order.',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'reference', to: [{type: 'track'}]})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      group: 'schedule',
      initialValue: 'scheduled',
      options: {
        layout: 'radio',
        list: [
          {title: 'Scheduled — appears automatically at release time', value: 'scheduled'},
          {title: 'Public — appears immediately', value: 'public'},
          {title: 'Hidden — never appears publicly', value: 'hidden'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseAt',
      title: 'Release date and time',
      description: 'Stored as an exact instant. Sanity displays it in your local timezone.',
      type: 'datetime',
      group: 'schedule',
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'streamingLinks',
      title: 'Listen / buy links',
      type: 'array',
      group: 'links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'streamingLink',
          fields: [
            defineField({
              name: 'service',
              title: 'Service',
              type: 'string',
              options: {list: streamingServices},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Custom label',
              description: 'Useful when the service is “Other”.',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'service', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Release date, newest',
      name: 'releaseAtDesc',
      by: [{field: 'releaseAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', artist: 'artist', date: 'releaseAt', media: 'cover'},
    prepare: ({title, artist, date, media}) => ({
      title,
      subtitle: [artist, date ? new Date(date).toLocaleDateString() : 'No date'].join(' · '),
      media,
    }),
  },
})
