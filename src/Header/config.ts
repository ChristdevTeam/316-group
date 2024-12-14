import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'hasMegaMenu',
          type: 'checkbox',
          label: 'Enable Mega Menu',
          defaultValue: false,
        },
        link({
          appearances: false,
          condition: (_, siblingData) => siblingData.hasMegaMenu !== true,
        }),
        {
          name: 'megaMenuItems',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'link',
              options: [
                { label: 'Link', value: 'link' },
                { label: 'Sub Heading', value: 'subHeading' },
                { label: 'Text', value: 'text' },
                { label: 'Divider', value: 'divider' },
              ],
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.type === 'text' || siblingData.type === 'subHeading'
                },
              },
            },
            {
              name: 'description',
              type: 'text',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.type === 'subHeading' || siblingData.type === 'link'
                },
              },
            },
            link({ condition: (_, siblingData) => siblingData.type === 'link' }),
          ],
          admin: {
            condition: (_, siblingData) => siblingData.hasMegaMenu === true,
          },
        },
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
