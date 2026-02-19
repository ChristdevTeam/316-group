import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Full Width', value: 'fullWidth' },
      ],
    },
    {
      name: 'borderRadius',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: 'Full', value: 'full' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
