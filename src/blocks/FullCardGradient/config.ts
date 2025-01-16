import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { colorPickerAll } from '@/fields/colorPicker'
import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const FullCardGradient: Block = {
  slug: 'fullCardGradient',
  interfaceName: 'fullCardGradient',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        defaultValue: ['text-3xl', 'font-semibold'],
      },
    }),
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue:
        ' Affordable pricing for <br className="hidden md:block" /> secure online payments',
    },
    textClasses({
      overrides: {
        name: 'headingClasses',
        defaultValue: ['text-4xl', 'font-bold', 'text-gray-900'],
      },
    }),

    linkGroup(),
    {
      name: 'iconList',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
      ],
    },

    colorPickerAll({
      overrides: {
        name: 'bgColor1',
        defaultValue: 'emerald-300',
        label: 'Gradient Start Color',
        required: true,
      },
    }),
    colorPickerAll({
      overrides: {
        name: 'bgColor2',
        defaultValue: 'emerald-600',
        label: 'Gradient End Color',
        required: true,
      },
    }),
    {
      name: 'paddingType',
      label: 'Section Padding',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'No Padding', value: 'noPadding' },
        { label: 'Padding Both Added', value: 'paddingAdded' },
        { label: 'Padding Top Only', value: 'paddingTopOnly' },
        { label: 'Padding Bottom Only', value: 'paddingBottomOnly' },
        { label: 'Padding Top Only Added', value: 'paddingTopOnlyAdded' },
        { label: 'Padding Bottom Only Added', value: 'paddingBottomOnlyAdded' },
        { label: 'Padding Top Added', value: 'paddingTopAdded' },
        { label: 'Padding Bottom Added', value: 'paddingBottomAdded' },
      ],
    },
  ],
}
