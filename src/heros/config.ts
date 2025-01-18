import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import { buttonClasses } from '@/fields/buttonClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

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
          label: 'Product Page Hero 1',
          value: 'productHero',
        },
        {
          label: 'Product Page Hero 2',
          value: 'productHero2',
        },
      ],
      required: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      admin: { condition: (_, { type }) => ['productHero2', 'productHero'].includes(type) },
    },
    buttonClasses({
      overrides: {
        name: 'heroTitleClasses',
        label: 'Hero Title Classes',
        admin: { condition: (_, { type }) => ['productHero2', 'productHero'].includes(type) },
        defaultValue: [
          'mt-4',
          'md:mt-10',
          'bg-transparent',
          'text-black',
          'border',
          'border-black',
          'py-6',
          'px-6',
          'rounded-xl',
        ],
      },
    }),
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['productHero', 'productHero2'].includes(type),
      },
      required: true,
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Classes',
        admin: {
          condition: (_, { type }) => ['productHero', 'productHero2'].includes(type),
        },
      },
    }),
    {
      name: 'subTitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['productHero', 'productHero2'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'subTitleClasses',
        label: 'Sub Title Classes',
        admin: {
          condition: (_, { type }) => ['productHero', 'productHero2'].includes(type),
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
        condition: (_, { type } = {}) =>
          ['productHero', 'specialHero', 'productHero2'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        label: 'Description Classes',
        admin: {
          condition: (_, { type }) => ['productHero', 'productHero2'].includes(type),
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
          ['highImpact', 'mediumImpact', 'specialHero', 'productHero', 'productHero2'].includes(
            type,
          ),
      },
      relationTo: 'media',
      required: true,
    },

    {
      name: 'mediaMobile',
      label: 'Hero Background Image for Mobile View',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['productHero', 'productHero2'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    bgColorPickerAll({
      overrides: {
        name: 'bgColor',
        label: 'Background Color',
        admin: {
          condition: (_, { type }) => ['productHero2'].includes(type),
        },
        defaultValue: 'bg-sky-800',
      },
    }),
    {
      name: 'heroGraphic',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['productHero', 'productHero2'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'includeStoreLinks',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'specialHero'].includes(type),
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
