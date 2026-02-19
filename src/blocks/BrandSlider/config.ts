import { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'

export const BrandSlider: Block = {
  slug: 'brandSlider',
  interfaceName: 'BrandSliderBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Some of our Products and Brands',
      required: true,
    },
    textClasses({
      overrides: {
        name: 'headingClasses',
        label: 'Heading Classes',
        defaultValue: ['text-3xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-12'],
      },
    }),
    {
      name: 'autoplayDelay',
      type: 'number',
      required: true,
      defaultValue: 5000,
      admin: {
        description: 'Delay in milliseconds between slides',
      },
    },
    {
      name: 'speed',
      type: 'number',
      required: true,
      defaultValue: 1000,
      admin: {
        description: 'Speed of the slider transition in milliseconds',
      },
    },
  ],
}
