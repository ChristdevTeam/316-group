import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

// Function to generate a unique 6-digit code
const generateUniqueCode = async (payload: any): Promise<string> => {
  let code: string
  let isUnique = false
  
  while (!isUnique) {
    // Generate a random 6-digit number
    code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Check if this code already exists
    const existing = await payload.find({
      collection: 'investors',
      where: {
        password: {
          equals: code,
        },
      },
    })
    
    if (existing.docs.length === 0) {
      isUnique = true
    }
  }
  
  return code!
}

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
    defaultColumns: ['name', 'email', 'password', 'updatedAt'],
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-generate password for new investors or when password is empty
        if (operation === 'create' || !data.password) {
          data.password = await generateUniqueCode(req.payload)
        }
        return data
      },
    ],
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
      label: 'Download PIN Code',
      unique: true,
      admin: {
        description: 'Auto-generated 6-digit PIN code that investors will use to download files from the Investor Relations section.',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}