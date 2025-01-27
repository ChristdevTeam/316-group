import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const ServicesAccordion: Block = {
  slug: 'servicesAccordion',
  interfaceName: 'ServicesAccordionBlock',
  fields: [
    {
      name: 'headingSection',
      type: 'group',
      label: 'Heading Section',
      fields: [
        {
          name: 'smallHeading',
          type: 'text',
          label: 'Small Heading',
          defaultValue: 'Core Services',
          required: true,
        },
        textClasses({
          overrides: {
            name: 'smallHeadingClasses',
            defaultValue: ['text-sm', 'text-gray-200', 'pb-8', 'uppercase'],
          },
        }),
        {
          name: 'mainHeading',
          type: 'text',
          label: 'Main Heading',
          defaultValue: 'Explore our suite of Digital Advisory Services',
          required: true,
        },
        textClasses({
          overrides: {
            name: 'mainHeadingClasses',
            defaultValue: ['text-3xl', 'lg:text-4xl', 'font-semibold', 'text-white', 'pb-10'],
          },
        }),
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          required: true,
        },
        textClasses({
          overrides: {
            name: 'descriptionClasses',
            defaultValue: ['text-gray-200', 'pb-8', 'text-xl'],
          },
        }),
        linkGroup(),
        bgColorPickerAll({
          overrides: {
            name: 'firstSectionBackgroundColor',
            defaultValue: 'bg-slate-900',
          },
        }),
        bgColorPickerAll({
          overrides: {
            name: 'secondSectionBackgroundColor',
            defaultValue: 'bg-slate-100',
          },
        }),
      ],
    },
    {
      name: 'serviceItems',
      type: 'array',
      label: 'Service Items',
      labels: {
        singular: 'Service Item',
        plural: 'Service Items',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
          required: true,
        },
        {
          name: 'bulletPoints',
          type: 'array',
          label: 'Bullet Points',
          labels: {
            singular: 'Bullet Point',
            plural: 'Bullet Points',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Bullet Point Text',
              required: true,
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Service Content',
          required: true,
        },
      ],
    },
  ],
}
