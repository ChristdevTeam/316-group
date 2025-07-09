import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const Industries: Block = {
  slug: 'industries',
  interfaceName: 'IndustriesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Industries',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: true,
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
                  text: "See how 316 Group's market intelligence and business solutions help to drive innovation, and elevate growth for businesses across various industries.",
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
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      defaultValue: [
        {
          industry: 'RETAIL',
          tagline: 'THE RIGHT PLACE AT THE RIGHT TIME',
          description: "See how 316 Group's market intelligence and business solutions help to drive innovation, and elevate growth for businesses across various industries.",
          image: null,
          link: {
            type: 'custom',
            url: '#',
            label: 'Explore',
            appearance: 'default',
            newTab: false,
          },
        },
      ],
      fields: [
        {
          name: 'industry',
          type: 'text',
          label: 'Industry Name',
          required: true,
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Slide Image',
          relationTo: 'media',
          required: true,
        },
        link({
          appearances: ['default', 'outline', 'ghost', 'secondary'],
        }),
      ],
    },
  ],
}