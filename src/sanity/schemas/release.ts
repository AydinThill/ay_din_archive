import {defineField, defineType} from 'sanity'

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
      description: 'Required only for Scheduled releases. Public releases appear immediately.',
      type: 'datetime',
      group: 'schedule',
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15},
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.visibility === 'scheduled' && !value
            ? 'A release date and time is required when visibility is Scheduled.'
            : true,
        ),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'bandcampUrl',
      title: 'Bandcamp URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'soundcloudUrl',
      title: 'SoundCloud URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'deezerUrl',
      title: 'Deezer URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'tidalUrl',
      title: 'Tidal URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
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
