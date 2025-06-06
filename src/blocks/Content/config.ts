import type { Block, Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { VerticalCTAFields } from '@/fields/vcta'
import { textClasses } from '@/fields/textClasses'
import { linkGroup } from '@/fields/linkGroup'
import { Testimonials } from '@/fields/testimonials'
import { Carousel } from '@/fields/carousel'
import { dimensionClasses } from '@/fields/dimensionClasses'
import { shadowClasses } from '@/fields/shadowClasses'
import { borderClasses } from '@/fields/borderClasses'
import { bgOpacityPicker } from '@/fields/bgOpacityPicker'
import { Banner } from '../Banner/config'
import { Code } from '../Code/config'
import { MediaBlock } from '../MediaBlock/config'
import { BusinessSlider } from '../BusinessSlider/config'
import { HoverSliderBlock } from '../HoverSlider/config'

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
    name: 'mobileOrder',
    type: 'number',
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
          { label: 'Testimonials', value: 'testimonials' },
          { label: 'Image Carousel', value: 'carousel' },
          { label: 'Card Invert', value: 'cardInvert' },
          { label: 'Card with List', value: 'cardWithList' },
          { label: 'Auto Scroll Slider', value: 'autoScrollSlider' },
          { label: 'Styled Cards', value: 'styledCards' },
          { label: 'Swiper Images Slider', value: 'swiperSlider' },
        ],
      },
      {
        name: 'swiperImages',
        type: 'upload',
        relationTo: 'media',
        hasMany: true,
        admin: {
          condition: (_, { contentType }) => contentType === 'swiperSlider',
        },
      },
      {
        name: 'cardInvert',
        type: 'group',
        fields: [
          {
            name: 'cardTitle',

            type: 'text',
            required: true,
          },
          {
            name: 'cardDescription',
            type: 'text',
            required: true,
          },
          {
            name: 'cardImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'cardInvert',
        },
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
            HorizontalRuleFeature(),
            BlocksFeature({
              blocks: [Banner, Code, MediaBlock, BusinessSlider, HoverSliderBlock],
            }),
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
        name: 'linkAlignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'link',
        },
        defaultValue: 'left',
      },
      {
        name: 'verticalCTA',
        type: 'group',
        fields: VerticalCTAFields,
        admin: {
          condition: (_, { contentType }) => contentType === 'verticalCTA',
        },
      },
      bgColorPickerAll({
        overrides: {
          name: 'verticalCTABgColor',
          label: 'Vertical CTA Background Color',
          admin: {
            condition: (_, { contentType }) => contentType === 'verticalCTA',
          },
        },
      }),
      bgOpacityPicker({
        overrides: {
          name: 'verticalCTABgOpacity',
          label: 'Vertical CTA Background Opacity',
          defaultValue: 'bg-opacity-50',
          admin: {
            condition: (_, { verticalCTABgColor }) => Boolean(verticalCTABgColor),
          },
        },
      }),
      {
        name: 'testimonials',
        type: 'array',
        minRows: 1,
        fields: Testimonials,
        admin: {
          condition: (_, { contentType }) => contentType === 'testimonials',
        },
      },
      {
        name: 'testimonialCustomizer',
        type: 'group',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'cardBgColor',
              label: 'Card Background Color',
              defaultValue: 'bg-white',
            },
          }),
          textClasses({
            overrides: {
              name: 'textClasses',
              label: 'Text Classes',
              defaultValue: ['text-slate-900'],
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'testimonials',
        },
      },
      {
        name: 'carousel',
        type: 'group',
        fields: Carousel,
        admin: {
          condition: (_, { contentType }) => contentType === 'carousel',
        },
      },
      {
        name: 'cardWithList',
        type: 'group',
        fields: [
          {
            name: 'cardTitle',
            type: 'text',
            required: true,
          },
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Classes',
              defaultValue: ['text-white', 'text-3xl', 'md:text-4xl', 'font-semibold'],
            },
          }),
          {
            name: 'listItems',
            type: 'array',
            fields: [
              {
                name: 'icon',
                type: 'upload',
                relationTo: 'media',
              },
              {
                name: 'text',
                type: 'text',
                required: true,
                defaultValue: 'Lorem ipsum dolor sit amet consectetur',
              },
              textClasses({
                overrides: {
                  name: 'textClasses',
                  label: 'Text Classes',
                  defaultValue: ['text-white', 'text-2xl', 'font-semibold'],
                },
              }),
            ],
          },
          bgColorPickerAll({
            overrides: {
              name: 'cardBgColor',
              label: 'Card Background Color',
              defaultValue: 'bg-slate-800',
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'cardWithList',
        },
      },
      {
        name: 'autoScrollSlider',
        type: 'group',
        fields: [
          {
            name: 'images',
            type: 'array',
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
          dimensionClasses({
            overrides: {
              defaultValue: ['w-40', 'h-40', 'md:w-48', 'md:h-48'],
            },
          }),
          {
            name: 'speed',
            type: 'number',
            defaultValue: 5000,
            admin: {
              description: 'Speed in milliseconds (5000 = 5 seconds)',
            },
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'autoScrollSlider',
        },
      },
      {
        name: 'styledCards',
        type: 'group',
        fields: [
          {
            name: 'cards',
            type: 'array',
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'description',
                type: 'textarea',
                required: true,
              },
            ],
          },
          dimensionClasses({
            overrides: {
              name: 'imageClasses',
              label: 'Image Dimensions',
              defaultValue: ['w-8', 'h-8', 'md:w-12', 'md:h-12'],
            },
          }),
          {
            name: 'gapClasses',
            type: 'select',
            defaultValue: 'gap-6',
            options: [
              { label: 'Gap 4', value: 'gap-4' },
              { label: 'Gap 6', value: 'gap-6' },
              { label: 'Gap 8', value: 'gap-8' },
              { label: 'Gap 10', value: 'gap-10' },
              { label: 'Gap 12', value: 'gap-12' },
            ],
          },
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Text Classes',
              defaultValue: ['text-lg', 'font-semibold', 'text-slate-900'],
            },
          }),
          textClasses({
            overrides: {
              name: 'descriptionClasses',
              label: 'Description Text Classes',
              defaultValue: ['text-base', 'text-slate-600'],
            },
          }),
          shadowClasses({
            overrides: {
              defaultValue: ['shadow-md', 'hover:shadow-xl'],
            },
          }),
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
              admin: {
                description: 'Background color when hovering over the card',
              },
            },
          }),
          borderClasses({
            overrides: {
              name: 'borderClasses',
              label: 'Border Classes',
              defaultValue: ['border', 'border-gray-500'],
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'styledCards',
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
