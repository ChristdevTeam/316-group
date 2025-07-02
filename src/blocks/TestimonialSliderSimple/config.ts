import { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const TestimonialSliderSimple: Block = {
  slug: 'testimonialSliderSimple',
  interfaceName: 'TestimonialSliderSimpleBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What our clients say',
    },
    textClasses({
      overrides: {
        name: 'headingClasses',
        label: 'Heading Classes',
        defaultValue: ['text-4xl', 'font-bold', 'mb-8', 'text-white', 'md:text-5xl', 'lg:text-6xl'],
      },
    }),
    textClasses({
      overrides: {
        name: 'testimonialTextClasses',
        label: 'Testimonial Text Classes',
        defaultValue: [
          'text-slate-900',
          'leading-relaxed',
          'text-base',
          'md:text-lg',
          'lg:text-xl',
        ],
      },
    }),
    textClasses({
      overrides: {
        name: 'authorInfoClasses',
        label: 'Author Info Classes',
        defaultValue: ['text-lg', 'md:text-xl', 'text-slate-800'],
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'backgroundClasses',
        label: 'Background Classes',
        defaultValue: 'bg-blue-600',
      },
    }),
    {
      name: 'paddingType',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'No Padding',
          value: 'noPadding',
        },
        {
          label: 'Padding Added',
          value: 'paddingAdded',
        },
        {
          label: 'Padding Top Only',
          value: 'paddingTopOnly',
        },
        {
          label: 'Padding Bottom Only',
          value: 'paddingBottomOnly',
        },
        {
          label: 'Padding Top Only Added',
          value: 'paddingTopOnlyAdded',
        },
        {
          label: 'Padding Bottom Only Added',
          value: 'paddingBottomOnlyAdded',
        },
        {
          label: 'Padding Top Added',
          value: 'paddingTopAdded',
        },
        {
          label: 'Padding Bottom Added',
          value: 'paddingBottomAdded',
        },
      ],
    },
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
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Icon or avatar for the testimonial',
          },
        },
        {
          name: 'testimonialText',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The testimonial content',
          },
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the person giving the testimonial',
          },
        },
        {
          name: 'authorPosition',
          type: 'text',
          required: false,
          admin: {
            description: 'Position or title of the person (optional)',
          },
        },
      ],
    },
  ],
}
