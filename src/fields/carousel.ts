import { Block, Field } from 'payload'
import { link } from './link'
import { bgColorPickerAll } from './bgColorPicker'
import { textClasses } from './textClasses'

export const Carousel: Field[] = [
  {
    name: 'sliderMode',
    type: 'checkbox',
    label: 'Enable Slider Mode (Edge to Edge)',
    defaultValue: false,
  },
  {
    name: 'imageColumns',
    type: 'group',
    admin: {
      condition: (_, siblingData) => !siblingData?.sliderMode,
    },
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
