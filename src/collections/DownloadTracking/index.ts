import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const DownloadTracking: CollectionConfig = {
  slug: 'download-tracking',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['investor', 'fileName', 'downloadedAt'],
    useAsTitle: 'fileName',
  },
  fields: [
    {
      name: 'investor',
      type: 'relationship',
      relationTo: 'investors',
      required: true,
      label: 'Investor',
    },
    {
      name: 'fileName',
      type: 'text',
      required: true,
      label: 'Downloaded File Name',
    },
    {
      name: 'fileId',
      type: 'text',
      required: true,
      label: 'File ID',
      admin: {
        description: 'The ID of the downloaded media file.',
      },
    },
    {
      name: 'downloadedAt',
      type: 'date',
      required: true,
      label: 'Download Date',
      defaultValue: () => new Date(),
    },
    {
      name: 'downloadType',
      type: 'select',
      required: true,
      label: 'Download Type',
      options: [
        { label: 'Report', value: 'report' },
        { label: 'IR Calendar', value: 'ir-calendar' },
        { label: 'Financial Result', value: 'financial-result' },
        { label: 'Financial Ratio', value: 'financial-ratio' },
      ],
    },
  ],
  timestamps: true,
}