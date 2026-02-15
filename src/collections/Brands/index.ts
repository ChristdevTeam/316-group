import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateBrands } from './hooks/revalidateBrands'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { getServerSideURL } from '@/utilities/getURL'
import { link } from '@/fields/link'
import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const Brands: CollectionConfig<'brands'> = {
  slug: 'brands',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'brands',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'brands',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            textClasses({
              overrides: {
                name: 'titleClassName',
                defaultValue: ['text-5xl', 'md:text-7xl', 'font-bold', 'text-white'],
              },
            }),
            {
              name: 'subtitle',
              type: 'text',
            },
            textClasses({
              overrides: {
                name: 'subtitleClassName',
                defaultValue: ['text-xl', 'md:text-2xl', 'text-white'],
              },
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          label: 'Content',
          name: 'content',
          fields: [
            {
              name: 'brandPillars',
              type: 'array',
              label: 'Brand Pillars (Rotating Words)',
              fields: [
                {
                  name: 'word',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'introSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                textClasses({
                  overrides: {
                    name: 'titleClassName',
                    defaultValue: ['text-3xl', 'md:text-5xl', 'font-semibold', 'mb-6'],
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
                },
                textClasses({
                  overrides: {
                    name: 'richTextClassName',
                    defaultValue: ['text-lg', 'text-gray-700', 'leading-relaxed'],
                  },
                }),
                link(),
              ],
            },
            {
              name: 'splitSection',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    defaultValue: 'bg-gray-200',
                    label: 'Background Color',
                  },
                }),
                {
                  name: 'title',
                  type: 'text',
                },
                textClasses({
                  overrides: {
                    name: 'titleClassName',
                    defaultValue: ['text-3xl', 'md:text-4xl', 'font-semibold', 'mb-4'],
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClassName',
                    defaultValue: ['text-lg', 'text-gray-600'],
                  },
                }),
                link(),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'imageHeight',
                  type: 'number',
                  defaultValue: 60,
                  label: 'Image Height (dvh)',
                  admin: {
                    description: 'Enter the height in dvh (e.g. 60 for 60dvh). Default is 60.',
                  },
                },
              ],
            },
            {
              name: 'gallerySection',
              type: 'group',
              fields: [
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
                textClasses({
                  overrides: {
                    name: 'descriptionClassName',
                    defaultValue: [
                      'text-lg',
                      'text-gray-600',
                      'max-w-4xl',
                      'mx-auto',
                      'text-center',
                    ],
                  },
                }),
                {
                  name: 'gallery',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                },
              ],
            },
            {
              name: 'fullscreenSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                textClasses({
                  overrides: {
                    name: 'titleClassName',
                    defaultValue: [
                      'text-4xl',
                      'md:text-6xl',
                      'font-bold',
                      'text-white',
                      'text-center',
                    ],
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClassName',
                    defaultValue: ['text-xl', 'text-white', 'text-center', 'max-w-3xl', 'mx-auto'],
                  },
                }),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'mixedSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                textClasses({
                  overrides: {
                    name: 'titleClassName',
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClassName',
                  },
                }),
                {
                  name: 'gallery',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
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
                },
              ],
            },
            {
              name: 'finalSection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                textClasses({
                  overrides: {
                    name: 'titleClassName',
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClassName',
                  },
                }),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateBrands],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 10000,
      },
    },
    maxPerDoc: 50,
  },
}
