import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactEmail',
      type: 'text',
      required: false,
      defaultValue: 'contact@316group.co.uk',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'GitHub', value: 'github' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
      defaultValue: [
        {
          platform: 'linkedin',
          link: {
            type: 'custom',
            url: 'https://linkedin.com/company/316group',
          },
        },
        {
          platform: 'instagram',
          link: {
            type: 'custom',
            url: 'https://instagram.com/316group',
          },
        },
        {
          platform: 'facebook',
          link: {
            type: 'custom',
            url: 'https://facebook.com/316group',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      defaultValue: [
        {
          heading: 'Company',
          links: [
            { link: { type: 'custom', label: 'About Us', url: '/about' } },
            { link: { type: 'custom', label: 'Careers', url: '/careers' } },
            { link: { type: 'custom', label: 'Contact', url: '/contact' } },
            { link: { type: 'custom', label: 'Blog', url: '/posts' } },
          ],
        },
        {
          heading: 'Services',
          links: [
            { link: { type: 'custom', label: 'Web Development', url: '/services/web' } },
            { link: { type: 'custom', label: 'Digital Marketing', url: '/services/marketing' } },
            { link: { type: 'custom', label: 'Consulting', url: '/services/consulting' } },
            { link: { type: 'custom', label: 'Design', url: '/services/design' } },
          ],
        },
        {
          heading: 'Resources',
          links: [
            { link: { type: 'custom', label: 'Documentation', url: '/docs' } },
            { link: { type: 'custom', label: 'Support', url: '/support' } },
            { link: { type: 'custom', label: 'Terms', url: '/terms' } },
            { link: { type: 'custom', label: 'Privacy', url: '/privacy' } },
          ],
        },
        {
          heading: 'Solutions',
          links: [
            { link: { type: 'custom', label: 'Enterprise', url: '/solutions/enterprise' } },
            { link: { type: 'custom', label: 'Small Business', url: '/solutions/small-business' } },
            { link: { type: 'custom', label: 'Startups', url: '/solutions/startups' } },
            { link: { type: 'custom', label: 'Partners', url: '/solutions/partners' } },
          ],
        },
      ],
      maxRows: 4,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
