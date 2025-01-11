import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'
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
        {
          name: 'mainHeading',
          type: 'text',
          label: 'Main Heading',
          defaultValue: 'Explore our suite of Digital Advisory Services',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          required: true,
        },
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
