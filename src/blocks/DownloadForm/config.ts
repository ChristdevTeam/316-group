import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const DownloadForm: Block = {
  slug: 'downloadFormBlock',
  interfaceName: 'DownloadFormBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Download the free PDF now',
      required: true,
    },
    {
      name: 'sectionTitleClasses',
      type: 'relationship',
      relationTo: 'text-styles',
      required: true,
    },
    {
      type: 'collapsible',
      label: 'Left Column Data',
      fields: [
        {
          name: 'columnTitle',
          type: 'text',
          required: true,
          defaultValue: 'What you can expect',
        },
        {
          name: 'columnTitleClasses',
          type: 'relationship',
          relationTo: 'text-styles',
          required: true,
        },
        {
          name: 'listTitleClasses',
          type: 'relationship',
          relationTo: 'text-styles',
          required: true,
        },
        {
          name: 'listItemClasses',
          type: 'relationship',
          relationTo: 'text-styles',
          required: true,
        },
        {
          name: 'listData',
          type: 'array',
          fields: [
            {
              name: 'listTitle',
              type: 'text',
              required: true,
              defaultValue:
                'Reduce the shipping costs of your e-commerce the best tips and strategies',
            },
            {
              name: 'listItems',
              type: 'array',
              fields: [
                {
                  name: 'listItem',
                  type: 'text',
                  required: true,
                  defaultValue:
                    'Reduce the shipping costs of your e-commerce the best tips and strategies',
                },
              ],
            },
          ],
        },
        {
          name: 'endText',
          type: 'text',
          required: true,
          defaultValue: 'And much more!',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Form Data',
      fields: [
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
        },
        {
          name: 'fileToDownload',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'This file link will be emailed to the submitter when the form is submitted',
          },
        },
      ],
    },
  ],
}
