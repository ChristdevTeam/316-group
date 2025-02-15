import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'

export const VerticalCTAFields: Field[] = [
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: 'Why Us?',
  },
  textClasses({
    overrides: {
      name: 'subtitleClasses',
      label: 'Subtitle Classes',
      defaultValue: ['text-lg', 'md:text-xl', 'mb-4'],
    },
  }),
  {
    name: 'title',
    type: 'text',
    defaultValue:
      'We fulfil your <span class="text-green-500">e-commerce dreams with every order</span>',
  },
  textClasses({
    overrides: {
      name: 'titleClasses',
      label: 'Title Classes',
      defaultValue: ['text-3xl', 'md:text-5xl', 'font-semibold', 'pb-8'],
    },
  }),
  {
    name: 'description',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
    defaultValue: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'We empower financial institutions with cutting-edge tech solutions providing great customer experiences, ultimate performance, and extreme scalability. Our modular cloud-native digital banking platform, enables building unique fintech solutions across the world. With the partner ecosystem and API orchestration layer, our clients have quick access to payment services from market-leading companies.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
  },
  textClasses({
    overrides: {
      name: 'descriptionClasses',
      label: 'Description Classes',
      defaultValue: ['text-base', 'md:text-lg', 'pb-8'],
    },
  }),
  linkGroup({
    appearances: ['default', 'outline'],
    overrides: {
      maxRows: 2,
      required: false,
    },
  }),
  {
    name: 'alignment',
    type: 'select',
    options: ['top', 'center', 'bottom'],
    defaultValue: 'top',
  },
]

export const VerticalCallToAction: Block = {
  slug: 'vcta',
  interfaceName: 'VerticalCallToActionBlock',
  fields: VerticalCTAFields,
  labels: {
    plural: 'Vertical Calls to Action',
    singular: 'Vertical Call to Action',
  },
}
