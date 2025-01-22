import { Block, Field } from 'payload'

export const Testimonials: Field[] = [
  {
    name: 'avatar',
    type: 'upload',
    relationTo: 'media',
    required: false,
  },
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'richText',
    required: true,
  },
]

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: Testimonials,
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonial',
  },
}
