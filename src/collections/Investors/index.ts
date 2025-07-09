import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Investors: CollectionConfig = {
  slug: 'investors',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Investor Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
      unique: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      label: 'Download Password',
      admin: {
        description: 'Password that investors will use to download files from the Investor Relations section.',
      },
    },
  ],
  timestamps: true,
}