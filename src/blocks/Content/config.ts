import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { VerticalCTAFields } from '@/fields/vcta'
import { textClasses } from '@/fields/textClasses'
import { linkGroup } from '@/fields/linkGroup'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
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
    name: 'columnContent',
    type: 'array',
    label: 'Column Content',
    fields: [
      {
        name: 'contentType',
        type: 'select',
        required: true,
        defaultValue: 'richText',
        options: [
          { label: 'Rich Text', value: 'richText' },
          { label: 'Media', value: 'media' },
          { label: 'Link', value: 'link' },
          { label: 'Vertical CTA', value: 'verticalCTA' },
        ],
      },
      {
        name: 'richText',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
        admin: {
          condition: (_, { contentType }) => contentType === 'richText',
        },
      },
      textClasses({
        overrides: {
          name: 'richTextClasses',
          label: 'Rich Text Classes',
          defaultValue: [],
          admin: {
            condition: (_, { contentType }) => contentType === 'richText',
          },
        },
      }),
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        admin: {
          condition: (_, { contentType }) => contentType === 'media',
        },
      },

      linkGroup({
        overrides: {
          maxRows: 3,
          admin: {
            condition: (_, { contentType }) => contentType === 'link',
          },
        },
      }),

      {
        name: 'verticalCTA',
        type: 'group',
        fields: VerticalCTAFields,
        admin: {
          condition: (_, { contentType }) => contentType === 'verticalCTA',
        },
      },
    ],
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
    {
      name: 'paddingType',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'No Padding', value: 'noPadding' },
        { label: 'Padding Both Added', value: 'paddingAdded' },
        { label: 'Padding Top Only', value: 'paddingTopOnly' },
        { label: 'Padding Bottom Only', value: 'paddingBottomOnly' },
        { label: 'Padding Top Only Added', value: 'paddingTopOnlyAdded' },
        { label: 'Padding Bottom Only Added', value: 'paddingBottomOnlyAdded' },
        { label: 'Padding Top Added', value: 'paddingTopAdded' },
        { label: 'Padding Bottom Added', value: 'paddingBottomAdded' },
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
