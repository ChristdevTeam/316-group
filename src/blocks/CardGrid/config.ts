import { Block } from 'payload'
import { link } from '@/fields/link'
import { textClasses } from '@/fields/textClasses'

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Build from Scratch, launch in weeks',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Our global account allows you to easily convert funds between different assets, either manually or automatically, ensuring access to favourable exchange rates at any time.',
    },
    textClasses({
      overrides: {
        name: 'titleTextClasses',
        label: 'Title Text Classes',
        defaultValue: ['text-3xl', 'md:text-5xl', 'font-semibold', 'mb-6', 'text-slate-900'],
      },
    }),
    textClasses({
      overrides: {
        name: 'descriptionTextClasses',
        label: 'Description Text Classes',
        defaultValue: ['text-lg', 'text-slate-600', 'leading-relaxed', 'mb-16'],
      },
    }),
    {
      name: 'displayStyle',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Swiper', value: 'swiper' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            components: {
              Field: '@/components/Admin/IconPicker',
            },
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Business Accounts',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'All-in-one business accounts to collect, manage, nd move money globally',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        link({
          overrides: {
            name: 'link',
          },
        }),
        {
          name: 'colorTheme',
          type: 'select',
          required: true,
          defaultValue: 'blue',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Purple', value: 'purple' },
            { label: 'Orange', value: 'orange' },
            { label: 'Pink', value: 'pink' },
            { label: 'Green', value: 'green' },
            { label: 'Sky', value: 'sky' },
            { label: 'Teal', value: 'teal' },
            { label: 'Indigo', value: 'indigo' },
            { label: 'Rose', value: 'rose' },
            { label: 'Amber', value: 'amber' },
            { label: 'Emerald', value: 'emerald' },
            { label: 'Fuchsia', value: 'fuchsia' },
            { label: 'Cyan', value: 'cyan' },
            { label: 'Lime', value: 'lime' },
            { label: 'Grey', value: 'grey' },
          ],
        },
      ],
    },
  ],
}
