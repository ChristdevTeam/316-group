import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const TestimonialCard: Block = {
  slug: 'testimonialCard',
  interfaceName: 'TestimonialCard',
  fields: [
    bgColorPickerAll({
      overrides: {
        name: 'accentColor',
        defaultValue: 'bg-lime-400',
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'mainBackground',
        defaultValue: 'bg-blue-600',
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'testimonial',
      type: 'text',
      required: true,
      defaultValue:
        'Blockchain technology has the potential to revolutionize the banking industry. This technology can enable secure and transparent transactions without the need for intermediaries. Banks are exploring the use of blockchain technology for various use cases, including cross-border payments, trade finance, and digital identity verification',
    },
    textClasses({
      overrides: {
        name: 'testimonialClasses',
        label: 'Testimonial Classes',
        defaultValue: [
          'text-sm',
          'sm:text-base',
          'md:text-xl',
          'lg:text-2xl',
          'font-medium',
          'text-gray-50',
          'leading-relaxed',
          'text-center',
        ],
      },
    }),
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Halima Youssifou, ',
    },
    {
      name: 'authorPosition',
      type: 'text',
      required: true,
      defaultValue: 'NED, Product Development, 316 Group',
    },
    textClasses({
      overrides: {
        name: 'authorClasses',
        label: 'Testimonial Classes',
        defaultValue: [
          'text-base',
          'md:text-lg',
          'lg:text-xl',
          'font-semibold',
          'text-gray-200',
          'text-center',
        ],
      },
    }),
  ],
}
