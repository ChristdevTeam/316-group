import { link } from '@/fields/link'
import { textClasses } from '@/fields/textClasses'
import type { Block } from 'payload'

import { bgColorPickerAll } from '@/fields/bgColorPicker'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BusinessSlider2: Block = {
  slug: 'bslider2',
  fields: [
    bgColorPickerAll({
      overrides: {
        label: 'Block Background',
        defaultValue: 'bg-black',
      },
    }),
    { name: 'sliderTitle', type: 'text' },
    textClasses({
      overrides: {
        name: 'sliderTitleClasses',
        label: 'Slider Title Classes',
        defaultValue: ['text-4xl', 'md:text-6xl', 'pb-8', 'md:text-2xl'],
      },
    }),
    {
      name: 'sliderDescription',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    textClasses({
      overrides: {
        name: 'sliderDescriptionClasses',
        label: 'Slider Description Classes',
      },
    }),
    {
      name: 'cardStyles',
      type: 'group',
      label: 'Global Card Styles',
      fields: [
        bgColorPickerAll({
          overrides: {
            name: 'cardBgColor',
            label: 'Card Background Color',
            defaultValue: 'bg-white',
          },
        }),
        bgColorPickerAll({
          overrides: {
            name: 'cardHoverBgColor',
            label: 'Card Hover Background Color',
            defaultValue: 'bg-slate-100',
          },
        }),
        textClasses({
          overrides: {
            name: 'cardTitleClasses',
            label: 'Card Title Classes',
          },
        }),
        textClasses({
          overrides: {
            name: 'cardDescriptionClasses',
            label: 'Card Description Classes',
          },
        }),
      ],
    },
    {
      name: 'sliderItems',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        link({
          disableLabel: true,
          overrides: {},
        }),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
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
  ],
  interfaceName: 'BusinessSliderBlock2',
}
