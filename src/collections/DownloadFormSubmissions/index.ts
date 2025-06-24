import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const DownloadFormSubmissions: CollectionConfig = {
  slug: 'download-form-submissions',
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['email', 'firstName', 'lastName', 'downloadedFile', 'createdAt'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'downloadedFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'emailHeroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'privacyPolicyAccepted',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'sourceDocument',
      type: 'text',
      admin: {
        description: 'The document/page from which this form was submitted',
      },
    },
  ],
  timestamps: true,
}