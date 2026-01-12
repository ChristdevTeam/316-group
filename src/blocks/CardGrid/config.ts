import { Block } from 'payload'
import { link } from '@/fields/link'

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
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
          defaultValue: 'Build from Scratch, launch in weeks',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Our global account allows you to easily convert funds between different assets, either manually or automatically, ensuring access to favourable exchange rates at any time.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        link({
          overrides: {
            name: 'link', // Explicitly naming it 'link' to access it easily
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
          ],
        },
      ],
    },
  ],
}
