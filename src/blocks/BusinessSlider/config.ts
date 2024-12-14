import { link } from '@/fields/link'
import type { Block } from 'payload'

export const BusinessSlider: Block = {
  slug: 'bslider',
  fields: [
    {
      name: 'sliderItems',
      type: 'array',
      required: true,
      minRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        link(),
      ],
    },
  ],
  interfaceName: 'BusinessSliderBlock',
}
