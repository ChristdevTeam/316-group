import { anyone } from '@/access/anyone'
import { textClasses } from '@/fields/textClasses'
import { CollectionConfig } from 'payload'

export const TextStyles: CollectionConfig = {
  slug: 'text-styles',
  admin: {
    useAsTitle: 'name',
  },
  disableDuplicate: true,
  access: {
    create: anyone,
    read: anyone,
    update: anyone,
    delete: anyone,
  },
  defaultPopulate: { name: true, classes: true },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    textClasses({
      overrides: {
        name: 'classes',
        required: true,
      },
    }),
  ],
}
