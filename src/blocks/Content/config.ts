import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { VerticalCTAFields } from '../VerticalCTA/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
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
  },
  {
    name: 'fontFamily',
    type: 'select',
    options: [
      { label: 'Urbanist', value: 'urbanist' },
      { label: 'Inter', value: 'inter' },
      { label: 'Ubuntu', value: 'ubuntu' },
      { label: 'Jost', value: 'jost' },
    ],
  },
  {
    name: 'richTextClasses',
    type: 'text',
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'addVerticalCTA',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'verticalCTA',
    type: 'group', // or 'array' if multiple entries are allowed
    fields: VerticalCTAFields,
    admin: {
      condition: (_, { addVerticalCTA }) => Boolean(addVerticalCTA),
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Media', value: 'media' },
      ],
    },

    bgColorPickerAll({
      overrides: {
        label: 'Content Background Color',
        name: 'sectionBackgroundColor',
        admin: {
          condition: (_, { backgroundType }) => backgroundType === 'color',
        },
      },
    }),
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
  ],
}
