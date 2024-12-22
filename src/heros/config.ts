import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'

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
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['productHero'].includes(type),
      },
      required: true,
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Classes',
        admin: {
          condition: (_, { type }) => ['productHero'].includes(type),
        },
      },
    }),
    {
      name: 'subTitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['productHero'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'subTitleClasses',
        label: 'Sub Title Classes',
        admin: {
          condition: (_, { type }) => ['productHero'].includes(type),
        },
      },
    }),

    {
      name: 'descriptionText',
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
      admin: {
        condition: (_, { type } = {}) => ['productHero'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        label: 'Description Classes',
        admin: {
          condition: (_, { type }) => ['productHero'].includes(type),
        },
      },
    }),
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
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
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
      name: 'mediaMobile',
      label: 'Hero Background Image for Mobile View',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['productHero'].includes(type),
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
    {
      name: 'padTop',
      type: 'checkbox',
      label: 'Pad page Top?',
      defaultValue: true,
    },
  ],
  label: false,
}
