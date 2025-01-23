import { Block, Field } from 'payload'
import { link } from './link'
import { bgColorPickerAll } from './bgColorPicker'
import { textClasses } from './textClasses'

export const Carousel: Field[] = [
  {
    name: 'imageColumns',
    type: 'group',
    fields: [
      {
        name: 'mobile',
        type: 'number',
        defaultValue: 1,
      },
      {
        name: 'tablet',
        type: 'number',
        defaultValue: 2,
      },
      {
        name: 'desktop',
        type: 'number',
        defaultValue: 4,
      },
    ],
  },
  {
    name: 'images',
    type: 'array',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'partnerUrl',
        label: 'Partner URL',
        type: 'text',
      },
    ],
  },
]

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  interfaceName: 'CarouselBlock',
  fields: Carousel,
  labels: {
    plural: 'Carousel',
    singular: 'Carousel',
  },
}
