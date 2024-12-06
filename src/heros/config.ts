import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Special Home Hero',
          value: 'specialHero',
        },
        {
          label: 'Product Page Hero',
          value: 'productHero',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      // admin: {
      //   condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      // },
    },

    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      label: 'Hero Background Image',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'specialHero', 'productHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroGraphic',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['productHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'includeStoreLinks',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) => ['productHero', 'specialHero'].includes(type),
      },
    },
  ],
  label: false,
}
