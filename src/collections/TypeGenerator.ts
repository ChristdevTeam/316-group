import { authenticated } from '@/access/authenticated'
import { nobody } from '@/access/nobody'
import { TestimonialsBlock } from '@/fields/testimonials'
import { VerticalCallToAction } from '@/fields/vcta'
import { CollectionConfig } from 'payload'

export const TypeGenerator: CollectionConfig = {
  slug: 'typesgenerator',
  access: {
    read: nobody,
  },
  fields: [
    {
      name: 'Types',
      type: 'blocks',
      blocks: [TestimonialsBlock, VerticalCallToAction],
    },
  ],
}
