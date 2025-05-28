import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Blog Settings',
          fields: [
            {
              name: 'blogArchiveHeroContent',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-sky-800',
                  },
                }),
                {
                  name: 'pageTitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Blog',
                },
                textClasses({
                  overrides: {
                    name: 'pageTitleClasses',
                    defaultValue: [
                      'uppercase',
                      'font-extrabold',
                      'mb-4',
                      'md:mb-8',
                      'text-3xl',
                      'md:text-5xl',
                      'lg:text-6xl',
                      'xl:text-8xl',
                      'pt-8',
                      'md:pt-16',
                    ],
                  },
                }),
                {
                  name: 'subtitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Case Studies',
                },
                textClasses({
                  overrides: {
                    name: 'subtitleClasses',
                    defaultValue: [
                      'text-white',
                      'uppercase',
                      'md:text-2xl',
                      'font-semibold',
                      'mb-4',
                      'md:mb-8',
                    ],
                  },
                }),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'We back  disruptive products and founders in retail',
                },
                textClasses({
                  overrides: {
                    name: 'titleClasses',
                    defaultValue: [
                      'text-white',
                      'text-3xl',
                      'md:text-5xl',
                      'xl:text-6xl',
                      'font-bold',
                      'mb-4',
                      'md:mb-8',
                      'mx-auto',
                      'text-center',
                      'md:w-4/5',
                    ],
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Our business-led approach to technology, focuses on outcomes and strategy over point solutions and technologies. Driving stakeholders towards a common goal, whilst providing a framework which allows for flexibility and adaptability.',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClasses',
                    defaultValue: [
                      'text-white',
                      'text-lg',
                      'md:text-xl',
                      'lg:text-2xl',
                      'font-normal',
                      'text-center',
                      'md:w-4/5',
                      'mx-auto',
                    ],
                  },
                }),
              ],
            },
            {
              name: 'blogArchiveFooter',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-blue-700',
                  },
                }),
                { name: 'image', type: 'upload', relationTo: 'media' },
                linkGroup(),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue:
                    'We back  disruptive<br class="hidden lg:block" /> products and founders in retail',
                },
                textClasses({
                  overrides: {
                    name: 'titleClasses',
                    defaultValue: [
                      'text-white',
                      'text-xl',
                      'md:text-2xl',
                      'lg:text-3xl',
                      'xl:text-5xl',
                      'font-bold',
                      'mb-4',
                      'md:mb-8',
                    ],
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
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClasses',
                    defaultValue: ['text-white', 'text-base', 'lg:text-lg', 'font-normal'],
                  },
                }),
                {
                  name: 'download',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Case Study Settings',
          fields: [
            {
              name: 'caseStudyArchiveHeroContent',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-sky-800',
                  },
                }),
                {
                  name: 'pageTitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Case Studies',
                },
                textClasses({
                  overrides: {
                    name: 'pageTitleClasses',
                    defaultValue: [
                      'uppercase',
                      'font-extrabold',
                      'mb-4',
                      'md:mb-8',
                      'text-3xl',
                      'md:text-5xl',
                      'lg:text-6xl',
                      'xl:text-8xl',
                      'pt-8',
                      'md:pt-16',
                    ],
                  },
                }),
                {
                  name: 'subtitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Case Studies',
                },
                textClasses({
                  overrides: {
                    name: 'subtitleClasses',
                    defaultValue: [
                      'text-white',
                      'uppercase',
                      'md:text-2xl',
                      'font-semibold',
                      'mb-4',
                      'md:mb-8',
                    ],
                  },
                }),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'We back  disruptive products and founders in retail',
                },
                textClasses({
                  overrides: {
                    name: 'titleClasses',
                    defaultValue: [
                      'text-white',
                      'text-3xl',
                      'md:text-5xl',
                      'xl:text-6xl',
                      'font-bold',
                      'mb-4',
                      'md:mb-8',
                      'mx-auto',
                      'text-center',
                      'md:w-4/5',
                    ],
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Our business-led approach to technology, focuses on outcomes and strategy over point solutions and technologies. Driving stakeholders towards a common goal, whilst providing a framework which allows for flexibility and adaptability.',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClasses',
                    defaultValue: [
                      'text-white',
                      'text-lg',
                      'md:text-xl',
                      'lg:text-2xl',
                      'font-normal',
                      'text-center',
                      'md:w-4/5',
                      'mx-auto',
                    ],
                  },
                }),
              ],
            },
            {
              name: 'caseStudySinglePageEndingContent',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-violet-200',
                  },
                }),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue:
                    'Is this case in line with <br class="hidden lg:block" />what you have planned ?',
                },
                {
                  name: 'description',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                    },
                  }),
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'form',
                  type: 'relationship',
                  relationTo: 'forms',
                  required: true,
                },
              ],
            },
            {
              name: 'caseStudyArchiveFooter',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-blue-700',
                  },
                }),
                { name: 'image', type: 'upload', relationTo: 'media' },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue:
                    'We back  disruptive<br class="hidden lg:block" /> products and founders in retail',
                },
                textClasses({
                  overrides: {
                    name: 'titleClasses',
                    defaultValue: [
                      'text-white',
                      'md:text-3xl',
                      'lg:text-4xl',
                      'xl:text-6xl',
                      'font-bold',
                      'mb-4',
                      'md:mb-8',
                    ],
                  },
                }),
                linkGroup({
                  buttonClass: [
                    'bg-white',
                    'text-black',
                    'text-xl',
                    'px-12',
                    'py-8',
                    'rounded-full',
                    'hover:text-white',
                  ],
                }),
                // {
                //   name: 'description',
                //   type: 'richText',
                //   editor: lexicalEditor({
                //     features: ({ rootFeatures }) => {
                //       return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                //     },
                //   }),
                // },
                // textClasses({
                //   overrides: {
                //     name: 'descriptionClasses',
                //     defaultValue: ['text-white', 'text-base', 'lg:text-lg', 'font-normal'],
                //   },
                // }),
                // {
                //   name: 'download',
                //   type: 'upload',
                //   relationTo: 'media',
                //   required: true,
                // },
              ],
            },
          ],
        },
        {
          label: 'Ebooks & Guides Settings',
          fields: [
            {
              name: 'ebooksAndGuidesArchiveHeroContent',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-sky-800',
                  },
                }),
                {
                  name: 'pageTitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Ebooks & Guides',
                },
                textClasses({
                  overrides: {
                    name: 'pageTitleClasses',
                    defaultValue: [
                      'uppercase',
                      'font-extrabold',
                      'mb-4',
                      'md:mb-8',
                      'text-3xl',
                      'md:text-5xl',
                      'lg:text-6xl',
                      'xl:text-8xl',
                      'pt-8',
                      'md:pt-16',
                    ],
                  },
                }),
                {
                  name: 'subtitle',
                  type: 'text',
                  required: true,
                  defaultValue: 'Guides & Downloads',
                },
                textClasses({
                  overrides: {
                    name: 'subtitleClasses',
                    defaultValue: [
                      'text-white',
                      'uppercase',
                      'md:text-2xl',
                      'font-semibold',
                      'mb-4',
                      'md:mb-8',
                    ],
                  },
                }),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'We back  disruptive products and founders in retail',
                },
                textClasses({
                  overrides: {
                    name: 'titleClasses',
                    defaultValue: [
                      'text-white',
                      'text-3xl',
                      'md:text-5xl',
                      'xl:text-6xl',
                      'font-bold',
                      'mb-4',
                      'md:mb-8',
                      'mx-auto',
                      'text-center',
                      'md:w-4/5',
                    ],
                  },
                }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Our business-led approach to technology, focuses on outcomes and strategy over point solutions and technologies. Driving stakeholders towards a common goal, whilst providing a framework which allows for flexibility and adaptability.',
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClasses',
                    defaultValue: [
                      'text-white',
                      'text-lg',
                      'md:text-xl',
                      'lg:text-2xl',
                      'font-normal',
                      'text-center',
                      'md:w-4/5',
                      'mx-auto',
                    ],
                  },
                }),
              ],
            },
            {
              name: 'ebooksAndGuidesArchiveFooter',
              type: 'group',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'sectionBackgroundColor',
                    defaultValue: 'bg-blue-700',
                  },
                }),
                { name: 'image', type: 'upload', relationTo: 'media' },
                linkGroup(),
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue:
                    'We back  disruptive<br class="hidden lg:block" /> products and founders in retail',
                },
                textClasses({
                  overrides: {
                    name: 'titleClasses',
                    defaultValue: [
                      'text-white',
                      'text-xl',
                      'md:text-2xl',
                      'lg:text-3xl',
                      'xl:text-5xl',
                      'font-bold',
                      'mb-4',
                      'md:mb-8',
                    ],
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
                },
                textClasses({
                  overrides: {
                    name: 'descriptionClasses',
                    defaultValue: ['text-white', 'text-base', 'lg:text-lg', 'font-normal'],
                  },
                }),
                {
                  name: 'download',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
