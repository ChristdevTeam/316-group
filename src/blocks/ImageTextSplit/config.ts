import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { gradientColorPicker } from '@/fields/gradientColorPicker'

export const ImageTextSplit: Block = {
  slug: 'imageTextSplit',
  interfaceName: 'ImageTextSplitBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'imageLeft',
      options: [
        { label: 'Image Left', value: 'imageLeft' },
        { label: 'Image Right', value: 'imageRight' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
        },
        textClasses({
          overrides: {
            name: 'subtitleClasses',
            label: 'Subtitle Classes',
            defaultValue: ['text-sm', 'font-semibold', 'uppercase', 'text-slate-500', 'mb-2'],
          },
        }),
        {
          name: 'title',
          type: 'text',
        },
        textClasses({
          overrides: {
            name: 'titleClasses',
            label: 'Title Classes',
            defaultValue: ['text-3xl', 'md:text-4xl', 'lg:text-5xl', 'font-bold', 'mb-4'],
          },
        }),
        {
          name: 'description',
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
        },
        linkGroup({
          overrides: {
            maxRows: 3,
          },
        }),
      ],
    },
    bgColorPickerAll({
      overrides: {
        name: 'bgColor',
        label: 'Background Color',
        defaultValue: 'bg-transparent',
      },
    }),
    gradientColorPicker({
      prefix: 'from',
      overrides: {
        name: 'fromColor',
        label: 'Gradient From Color',
      },
    }),
    gradientColorPicker({
      prefix: 'via',
      overrides: {
        name: 'viaColor',
        label: 'Gradient Via Color',
      },
    }),
    gradientColorPicker({
      prefix: 'to',
      overrides: {
        name: 'toColor',
        label: 'Gradient To Color',
      },
    }),
  ],
  labels: {
    plural: 'Image Text Splits',
    singular: 'Image Text Split',
  },
}
