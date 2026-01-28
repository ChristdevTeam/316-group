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
import { colorPickerAll } from '@/fields/colorPicker'
import { icon } from '@/fields/icon'

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
          { label: 'Styled Heading', value: 'styledHeading' },
          { label: 'Media', value: 'media' },
          { label: 'Link', value: 'link' },
          { label: 'Vertical CTA', value: 'verticalCTA' },
          { label: 'Testimonials', value: 'testimonials' },
          { label: 'Image Carousel', value: 'carousel' },
          { label: 'Card Invert', value: 'cardInvert' },
          { label: 'Card with List', value: 'cardWithList' },
          { label: 'Auto Scroll Slider', value: 'autoScrollSlider' },
          { label: 'Styled Cards', value: 'styledCards' },
          { label: 'Styled Cards', value: 'styledCards' },
          { label: 'Swiper Images Slider', value: 'swiperSlider' },
          { label: 'Status Banner', value: 'statusBanner' },
          { label: 'Spacer', value: 'spacer' },
        ],
      },
      {
        name: 'spacer',
        type: 'group',
        fields: [
          {
            name: 'spacing',
            type: 'select',
            required: true,
            defaultValue: ['pb-0', 'md:pb-8', 'lg:pb-12', 'xl:pb-16', '2xl:pb-32'],
            hasMany: true,
            options: [
              { label: 'None', value: 'pb-0' },
              { label: 'Space 1', value: 'pb-1' },
              { label: 'Space 2', value: 'pb-2' },
              { label: 'Space 4', value: 'pb-4' },
              { label: 'Space 8', value: 'pb-8' },
              { label: 'Space 10', value: 'pb-10' },
              { label: 'Space 12', value: 'pb-12' },
              { label: 'Space 16', value: 'pb-16' },
              { label: 'Space 20', value: 'pb-20' },
              { label: 'Space 24', value: 'pb-24' },
              { label: 'Space 32', value: 'pb-32' },
              { label: 'Space 40', value: 'pb-40' },
              { label: 'Space 48', value: 'pb-48' },
              { label: 'Space 56', value: 'pb-56' },
              { label: 'Space 64', value: 'pb-64' },
              { label: 'Space 72', value: 'pb-72' },
              { label: 'Space 80', value: 'pb-80' },
              // add options for different screen sizes
              { label: 'md:None', value: 'md:pb-0' },
              { label: 'md:Space 1', value: 'md:pb-1' },
              { label: 'md:Space 2', value: 'md:pb-2' },
              { label: 'md:Space 4', value: 'md:pb-4' },
              { label: 'md:Space 8', value: 'md:pb-8' },
              { label: 'md:Space 10', value: 'md:pb-10' },
              { label: 'md:Space 12', value: 'md:pb-12' },
              { label: 'md:Space 16', value: 'md:pb-16' },
              { label: 'md:Space 20', value: 'md:pb-20' },
              { label: 'md:Space 24', value: 'md:pb-24' },
              { label: 'md:Space 32', value: 'md:pb-32' },
              { label: 'md:Space 40', value: 'md:pb-40' },
              { label: 'md:Space 48', value: 'md:pb-48' },
              { label: 'md:Space 56', value: 'md:pb-56' },
              { label: 'md:Space 64', value: 'md:pb-64' },
              { label: 'md:Space 72', value: 'md:pb-72' },
              { label: 'md:Space 80', value: 'md:pb-80' },

              { label: 'lg:None', value: 'lg:pb-0' },
              { label: 'lg:Space 1', value: 'lg:pb-1' },
              { label: 'lg:Space 2', value: 'lg:pb-2' },
              { label: 'lg:Space 4', value: 'lg:pb-4' },
              { label: 'lg:Space 8', value: 'lg:pb-8' },
              { label: 'lg:Space 10', value: 'lg:pb-10' },
              { label: 'lg:Space 12', value: 'lg:pb-12' },
              { label: 'lg:Space 16', value: 'lg:pb-16' },
              { label: 'lg:Space 20', value: 'lg:pb-20' },
              { label: 'lg:Space 24', value: 'lg:pb-24' },
              { label: 'lg:Space 32', value: 'lg:pb-32' },
              { label: 'lg:Space 40', value: 'lg:pb-40' },
              { label: 'lg:Space 48', value: 'lg:pb-48' },
              { label: 'lg:Space 56', value: 'lg:pb-56' },
              { label: 'lg:Space 64', value: 'lg:pb-64' },
              { label: 'lg:Space 72', value: 'lg:pb-72' },
              { label: 'lg:Space 80', value: 'lg:pb-80' },
              // XL options
              { label: 'xl:None', value: 'xl:pb-0' },
              { label: 'xl:Space 1', value: 'xl:pb-1' },
              { label: 'xl:Space 2', value: 'xl:pb-2' },
              { label: 'xl:Space 4', value: 'xl:pb-4' },
              { label: 'xl:Space 8', value: 'xl:pb-8' },
              { label: 'xl:Space 10', value: 'xl:pb-10' },
              { label: 'xl:Space 12', value: 'xl:pb-12' },
              { label: 'xl:Space 16', value: 'xl:pb-16' },
              { label: 'xl:Space 20', value: 'xl:pb-20' },
              { label: 'xl:Space 24', value: 'xl:pb-24' },
              { label: 'xl:Space 32', value: 'xl:pb-32' },
              { label: 'xl:Space 40', value: 'xl:pb-40' },
              { label: 'xl:Space 48', value: 'xl:pb-48' },
              { label: 'xl:Space 56', value: 'xl:pb-56' },
              { label: 'xl:Space 64', value: 'xl:pb-64' },
              { label: 'xl:Space 72', value: 'xl:pb-72' },
              { label: 'xl:Space 80', value: 'xl:pb-80' },
              // 2XL options
              { label: '2xl:None', value: '2xl:pb-0' },
              { label: '2xl:Space 1', value: '2xl:pb-1' },
              { label: '2xl:Space 2', value: '2xl:pb-2' },
              { label: '2xl:Space 4', value: '2xl:pb-4' },
              { label: '2xl:Space 8', value: '2xl:pb-8' },
              { label: '2xl:Space 10', value: '2xl:pb-10' },
              { label: '2xl:Space 12', value: '2xl:pb-12' },
              { label: '2xl:Space 16', value: '2xl:pb-16' },
              { label: '2xl:Space 20', value: '2xl:pb-20' },
              { label: '2xl:Space 24', value: '2xl:pb-24' },
              { label: '2xl:Space 32', value: '2xl:pb-32' },
              { label: '2xl:Space 40', value: '2xl:pb-40' },
              { label: '2xl:Space 48', value: '2xl:pb-48' },
              { label: '2xl:Space 56', value: '2xl:pb-56' },
              { label: '2xl:Space 64', value: '2xl:pb-64' },
              { label: '2xl:Space 72', value: '2xl:pb-72' },
              { label: '2xl:Space 80', value: '2xl:pb-80' },
              // 3XL options
              { label: '3xl:None', value: '3xl:pb-0' },
              { label: '3xl:Space 1', value: '3xl:pb-1' },
              { label: '3xl:Space 2', value: '3xl:pb-2' },
              { label: '3xl:Space 4', value: '3xl:pb-4' },
              { label: '3xl:Space 8', value: '3xl:pb-8' },
              { label: '3xl:Space 10', value: '3xl:pb-10' },
              { label: '3xl:Space 12', value: '3xl:pb-12' },
              { label: '3xl:Space 16', value: '3xl:pb-16' },
              { label: '3xl:Space 20', value: '3xl:pb-20' },
              { label: '3xl:Space 24', value: '3xl:pb-24' },
              { label: '3xl:Space 32', value: '3xl:pb-32' },
              { label: '3xl:Space 40', value: '3xl:pb-40' },
              { label: '3xl:Space 48', value: '3xl:pb-48' },
              { label: '3xl:Space 56', value: '3xl:pb-56' },
              { label: '3xl:Space 64', value: '3xl:pb-64' },
              { label: '3xl:Space 72', value: '3xl:pb-72' },
              { label: '3xl:Space 80', value: '3xl:pb-80' },
            ],
          },
          bgColorPickerAll({
            overrides: {
              defaultValue: 'bg-transparent',
            },
          }),
          {
            name: 'width',
            type: 'select',
            required: true,
            defaultValue: ['w-full'],
            hasMany: true,
            options: [
              { label: 'Full', value: 'w-full' },
              { label: 'Half', value: 'w-1/2' },
              { label: 'Third', value: 'w-1/3' },
              { label: 'Two Thirds', value: 'w-2/3' },
              { label: 'Quarter', value: 'w-1/4' },
              { label: 'Three Quarters', value: 'w-3/4' },
              { label: 'One Fifth', value: 'w-1/5' },
              { label: 'Two Fifths', value: 'w-2/5' },
              { label: 'Three Fifths', value: 'w-3/5' },
              { label: 'Four Fifths', value: 'w-4/5' },
              // add options for different screen sizes
              { label: 'md:Full', value: 'md:w-full' },
              { label: 'md:Half', value: 'md:w-1/2' },
              { label: 'md:Third', value: 'md:w-1/3' },
              { label: 'md:Two Thirds', value: 'md:w-2/3' },
              { label: 'md:Quarter', value: 'md:w-1/4' },
              { label: 'md:Three Quarters', value: 'md:w-3/4' },
              { label: 'md:One Fifth', value: 'md:w-1/5' },
              { label: 'md:Two Fifths', value: 'md:w-2/5' },
              { label: 'md:Three Fifths', value: 'md:w-3/5' },
              { label: 'md:Four Fifths', value: 'md:w-4/5' },
              { label: 'lg:Full', value: 'lg:w-full' },
              { label: 'lg:Half', value: 'lg:w-1/2' },
              { label: 'lg:Third', value: 'lg:w-1/3' },
              { label: 'lg:Two Thirds', value: 'lg:w-2/3' },
              { label: 'lg:Quarter', value: 'lg:w-1/4' },
              { label: 'lg:Three Quarters', value: 'lg:w-3/4' },
              { label: 'lg:One Fifth', value: 'lg:w-1/5' },
              { label: 'lg:Two Fifths', value: 'lg:w-2/5' },
              { label: 'lg:Three Fifths', value: 'lg:w-3/5' },
              { label: 'lg:Four Fifths', value: 'lg:w-4/5' },
              { label: 'xl:Full', value: 'xl:w-full' },
              { label: 'xl:Half', value: 'xl:w-1/2' },
              { label: 'xl:Third', value: 'xl:w-1/3' },
              { label: 'xl:Two Thirds', value: 'xl:w-2/3' },
              { label: 'xl:Quarter', value: 'xl:w-1/4' },
              { label: 'xl:Three Quarters', value: 'xl:w-3/4' },
              { label: 'xl:One Fifth', value: 'xl:w-1/5' },
              { label: 'xl:Two Fifths', value: 'xl:w-2/5' },
              { label: 'xl:Three Fifths', value: 'xl:w-3/5' },
              { label: 'xl:Four Fifths', value: 'xl:w-4/5' },
              { label: '2xl:Full', value: '2xl:w-full' },
              { label: '2xl:Half', value: '2xl:w-1/2' },
              { label: '2xl:Third', value: '2xl:w-1/3' },
              { label: '2xl:Two Thirds', value: '2xl:w-2/3' },
              { label: '2xl:Quarter', value: '2xl:w-1/4' },
              { label: '2xl:Three Quarters', value: '2xl:w-3/4' },
              { label: '2xl:One Fifth', value: '2xl:w-1/5' },
              { label: '2xl:Two Fifths', value: '2xl:w-2/5' },
              { label: '2xl:Three Fifths', value: '2xl:w-3/5' },
              { label: '2xl:Four Fifths', value: '2xl:w-4/5' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'spacer',
        },
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
        name: 'styledHeading',
        type: 'group',
        fields: [
          {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Going Further <br /> <span class="text-lime-300">Together</span>',
          },
          textClasses({
            overrides: {
              name: 'headingClasses',
              label: 'Heading Classes',
              defaultValue: ['text-5xl', 'md:text-7xl', 'lg:text-8xl', 'xl:text-9xl', 'font-bold'],
            },
          }),
          {
            name: 'leftBorderStyle',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              description: 'Add a left border to the heading',
            },
          },
          colorPickerAll({
            overrides: {
              name: 'borderColor',
              label: 'Border Color',
              defaultValue: 'white',
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'styledHeading',
        },
      },
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        admin: {
          condition: (_, { contentType }) => contentType === 'media',
        },
      },
      {
        name: 'mediaWidth',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Full Width', value: 'full' },
          { label: 'Fill Container', value: 'fill' },
          { label: 'Custom', value: 'custom' },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'media',
        },
      },
      {
        name: 'mediaCustomWidth',
        type: 'text',
        admin: {
          condition: (_, { contentType, mediaWidth }) =>
            contentType === 'media' && mediaWidth === 'custom',
          description: 'Enter a valid CSS width value (e.g. 500px, 50%, 20rem)',
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
      {
        name: 'statusBanner',
        type: 'group',
        fields: [
          icon(),
          {
            name: 'content',
            type: 'text',
            required: true,
            defaultValue: '100% safe and secure • PCI DSS Compliant',
          },
          textClasses({
            overrides: {
              name: 'contentClasses',
              label: 'Content Text Classes',
              defaultValue: ['text-base', 'font-medium'],
            },
          }),
          {
            name: 'flavor',
            type: 'select',
            required: true,
            defaultValue: 'success',
            options: [
              { label: 'Success', value: 'success' },
              { label: 'Danger', value: 'danger' },
              { label: 'Warning', value: 'warning' },
              { label: 'Info', value: 'info' },
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
            ],
            admin: {
              description: 'Determines the background and text color theme',
            },
          },
          {
            name: 'alignment',
            type: 'select',
            required: true,
            defaultValue: 'center',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'statusBanner',
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
        { label: 'Gradient', value: 'gradient' },
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
      name: 'gradientSettings',
      type: 'group',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'gradient',
      },
      fields: [
        {
          name: 'gradientDirection',
          type: 'select',
          defaultValue: 'to-r',
          options: [
            { label: 'To Right', value: 'to-r' },
            { label: 'To Left', value: 'to-l' },
            { label: 'To Bottom', value: 'to-b' },
            { label: 'To Top', value: 'to-t' },
            { label: 'To Bottom Right', value: 'to-br' },
            { label: 'To Bottom Left', value: 'to-bl' },
            { label: 'To Top Right', value: 'to-tr' },
            { label: 'To Top Left', value: 'to-tl' },
          ],
        },
        {
          type: 'row',
          fields: [
            colorPickerAll({
              overrides: {
                label: 'Start Color',
                name: 'gradientStartColor',
              },
            }),
            {
              name: 'gradientStartPercentage',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            colorPickerAll({
              overrides: {
                label: 'Via Color',
                name: 'gradientViaColor',
              },
            }),
            {
              name: 'gradientViaPercentage',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            colorPickerAll({
              overrides: {
                label: 'Stop Color',
                name: 'gradientStopColor',
              },
            }),
            {
              name: 'gradientStopPercentage',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
    {
      name: 'bgoverlay',
      type: 'checkbox',
      label: 'Background Overlay',
      defaultValue: false,
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
  ],
}
