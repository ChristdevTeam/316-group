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
          name: 'fileToDownload',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'This file link will be emailed to the submitter when the form is submitted',
          },
        },
        {
          name: 'emailHeroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Hero image for the email',
          },
        },

        {
          name: 'submitButtonText',
          type: 'text',
          required: true,
          defaultValue: 'Download',
          admin: {
            description: 'Text displayed on the submit button',
          },
        },

        {
          name: 'documentName',
          type: 'text',
          required: true,
          defaultValue: 'Your 2025 e-commerce Playbook',
          admin: {
            description: 'Name of the document that will appear in the email template',
          },
        },
        {
          name: 'introText',
          type: 'textarea',
          required: true,
          defaultValue:
            'Thank you for your interest in our latest E-Book on efficient E-Commerce.<br>Discover the best strategies to reduce your shipping costs and returns!',
          admin: {
            description: 'Introductory text that appears in the email template',
          },
        },
        {
          name: 'sourceDocument',
          type: 'text',
          required: false,
          defaultValue: '',
          admin: {
            description:
              'Source document or page identifier for tracking form submissions (optional)',
          },
        },
      ],
    },
  ],
}
