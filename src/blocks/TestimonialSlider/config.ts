import { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { gradientClasses } from '@/fields/gradientClasses'

export const TestimonialSlider: Block = {
  slug: 'testimonialSlider',
  interfaceName: 'TestimonialSliderBlock',
  fields: [
    gradientClasses({
      overrides: {
        name: 'gradient',
        label: 'Background Gradient',
      },
    }),
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What our clients say',
      required: true,
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
        name: 'companyNameClasses',
        label: 'Company Name Classes',
        defaultValue: ['text-2xl', 'font-bold', 'md:text-3xl', 'lg:text-4xl'],
      },
    }),
    textClasses({
      overrides: {
        name: 'testimonialTextClasses',
        label: 'Testimonial Text Classes',
        defaultValue: [
          'text-slate-900',
          'mb-6',
          'leading-relaxed',
          'text-base',
          'md:text-xl',
          'lg:text-2xl',
        ],
      },
    }),
    textClasses({
      overrides: {
        name: 'authorInfoClasses',
        label: 'Author Info Classes',
        defaultValue: ['text-xl', 'md:text-xl', 'lg:text-2xl', 'text-green-800', 'font-bold'],
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
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
        },
        {
          name: 'platformIcons',
          type: 'array',
          maxRows: 4,
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'testimonialText',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
