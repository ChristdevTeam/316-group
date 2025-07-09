import type { Block } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const InvestorRelations: Block = {
  slug: 'investorRelations',
  interfaceName: 'InvestorRelationsBlock',
  fields: [
    // // Password protection for downloads
    // {
    //   name: 'investorPasswordCollection',
    //   type: 'relationship',
    //   relationTo: 'investors',
    //   hasMany: false,
    //   label: 'Select Investor Collection for Password Validation',
    //   admin: {
    //     description:
    //       'Select the collection that contains investor information for password validation. This will be used to check if the provided password matches an investor in this collection before allowing downloads.',
    //   },
    // },
    // Presentations Section
    {
      type: 'collapsible',
      label: 'Presentations Section',
      fields: [
        {
          name: 'presentationsTitle',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: '316 Group Insights',
        },
        {
          name: 'presentationsDescription',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'See how 316 Group can provide intelligence and business solutions to drive innovation and deliver growth for businesses across various industries.',
        },
        {
          name: 'presentations',
          type: 'array',
          label: 'Presentations',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Investor Presentation',
            },
            {
              name: 'date',
              type: 'date',
              required: true,
              defaultValue: new Date().toISOString(),
            },
            link(),
          ],
        },
      ],
    },
    // Reports Section
    {
      type: 'collapsible',
      label: 'Reports Section',
      fields: [
        {
          name: 'reportsTitle',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'Reports',
        },
        {
          name: 'reportsDescription',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Access our comprehensive reports and business solutions to drive innovation and deliver growth for businesses across various industries.',
        },
        {
          name: 'reports',
          type: 'array',
          label: 'Reports',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: '3rd Quarterly Report 2023',
            },
            bgColorPickerAll({
              overrides: {
                name: 'overlayBgColor',
                label: 'Overlay Background Color',
                admin: {
                  description:
                    'Background color for the overlay that presents information and download button.',
                },
                defaultValue: 'bg-purple-800',
              },
            }),
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
              admin: {
                description: 'Image that will fill the entire report background.',
              },
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Report File for Download',
            },
          ],
        },
      ],
    },
    // Financials Section
    {
      type: 'collapsible',
      label: 'Financials Section',
      fields: [
        {
          name: 'financialsMainTitle',
          type: 'text',
          label: 'Main Title',
          required: true,
          defaultValue: 'Financials',
        },
        {
          name: 'financialsFurtherInfo',
          type: 'richText',
          label: 'Further Information',
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
          defaultValue: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Management will provide the board with complete and adequate information in a timely manner through regular updates on financial results, market trends and business development. 316 Group is a private held company, downloads are only available for shareholders. ',
                      type: 'text',
                      version: 1,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Contact us',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'link',
                      version: 3,
                      fields: {
                        url: '/contact',
                        doc: {
                          relationTo: 'pages',
                          value: {
                            id: '675016f777dd4b8814c81efb',
                            title: 'Contact',
                            slug: 'contact',
                          },
                        },
                        newTab: true,
                        linkType: 'custom',
                      },
                      id: '686dff8ee9a56712473076f0',
                    },
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: ' for all other matters. ',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
        {
          name: 'showFinancialsDetails',
          type: 'checkbox',
          label: 'Show Financials Details by Default',
          defaultValue: false,
          admin: {
            description:
              'If checked, the Financials details will be visible by default. Otherwise, a "See more" button will be available.',
          },
        },
        {
          name: 'investorRelationsCalendar',
          type: 'array',
          label: 'Investor Relations (IR) Calendar',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'Optional File for Download',
            },
          ],
        },
        {
          name: 'financialResults',
          type: 'array',
          label: 'Financial Results',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
              defaultValue: new Date().toISOString(),
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Downloadable File',
            },
          ],
        },
        {
          name: 'financialRatios',
          type: 'array',
          label: 'Financial Ratios',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
              defaultValue: new Date().toISOString(),
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Downloadable File',
            },
          ],
        },
      ],
    },
  ],
}
