import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const ContentClipPath: Block = {
  slug: 'contentClipPath',
  interfaceName: 'ContentClipPath',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        defaultValue: ['text-2xl'],
      },
    }),
    {
      name: 'heading',
      type: 'text',
    },
    textClasses({
      overrides: {
        name: 'headingClasses',
        defaultValue: ['text-4xl', 'font-bold', 'text-gray-900'],
      },
    }),
    {
      name: 'description',
      type: 'richText',
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        defaultValue: ['text-gray-700', 'text-xl', 'w-7/10'],
      },
    }),
    linkGroup(),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    bgColorPickerAll({
      overrides: {
        defaultValue: 'bg-blue-100',
      },
    }),
  ],
}
