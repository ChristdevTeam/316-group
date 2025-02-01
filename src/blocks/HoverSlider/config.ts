import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { link } from '@/fields/link'
import { textClasses } from '@/fields/textClasses'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const HoverSliderBlock: Block = {
  slug: 'hoverSlider',
  interfaceName: 'HoverSliderBlock',
  fields: [
    {
      name: 'sliderTitle',
      type: 'text',
      // required: true,
    },
    textClasses({
      overrides: {
        name: 'sliderTitleClasses',
        label: 'Slider Title Classes',
        defaultValue: ['text-xl', 'pb-16', 'md:text-2xl'],
      },
    }),
    {
      name: 'sliderDescription',
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
    textClasses({
      overrides: {
        name: 'sliderDescriptionClasses',
        label: 'Slider Description Classes',
        defaultValue: ['text-lg', 'pb-8', 'md:text-xl'],
      },
    }),
    {
      name: 'isProductSlider',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sliderItems',
      type: 'array',
      required: true,
      // minRows: 2,
      fields: [
        {
          name: 'id',
          type: 'number',
          required: true,
          admin: {
            hidden: true,
          },
        },
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
        textClasses({
          overrides: {
            name: 'descriptionClasses',
            label: 'Description Classes',
            defaultValue: ['text-lg', 'md:text-xl'],
          },
        }),
        { name: 'enableLink', type: 'checkbox', defaultValue: false },
        link({
          appearances: false,
          // disableLabel: true,
          overrides: {
            name: 'link',
            label: 'Link',
            admin: {
              condition: (_, siblingData) => siblingData.enableLink,
            },
          },
        }),
        {
          name: 'mediaFile',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        bgColorPickerAll(),
      ],
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'update' || operation === 'create') {
              if (value) {
                value?.forEach((item: any, index: number) => {
                  if (!item.id) {
                    // Assign the auto-increment ID based on the index
                    item.id = index + 1
                  }
                })
              }

              return value
            }
          },
        ],
      },
    },
    {
      name: 'paddingType',
      label: 'Section Padding',
      type: 'select',
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
}
