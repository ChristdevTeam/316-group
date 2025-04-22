import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'
import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'blogArchiveHeroContent',
      type: 'group',
      fields: [
        {
          type: 'collapsible',
          label: 'Blog Hero Content',
          admin: {
            initCollapsed: true,
          },
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
      ],
    },
    {
      name: 'caseStudyArchiveHeroContent',
      type: 'group',
      fields: [
        {
          type: 'collapsible',
          label: 'Case Study Hero Content',
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
      ],
    },
    {
      name: 'ebooksAndGuidesArchiveHeroContent',
      type: 'group',
      fields: [
        {
          type: 'collapsible',
          label: 'Ebooks and Guides Hero Content',
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
      ],
    },
  ],
}
