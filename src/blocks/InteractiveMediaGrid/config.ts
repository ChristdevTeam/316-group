import { Block } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'
import { dimensionClasses } from '@/fields/dimensionClasses'

export const InteractiveMediaGrid: Block = {
  slug: 'interactiveMediaGrid',
  interfaceName: 'InteractiveMediaGridBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    textClasses({
      overrides: {
        name: 'headingClasses',
        label: 'Heading Classes',
        defaultValue: ['text-4xl', 'lg:text-5xl', 'xl:text-6xl', 'font-bold', 'mb-8'],
      },
    }),
    dimensionClasses({
      overrides: {
        name: 'iconDimensions',
        label: 'Icon Dimensions',
        defaultValue: ['w-8', 'h-8'],
      },
    }),
    textClasses({
      overrides: {
        name: 'cardTitleClasses',
        label: 'Card Title Classes (Applied to all cards)',
        defaultValue: ['text-base', 'xl:text-lg', 'font-bold', 'mb-2', 'mt-4'],
      },
    }),
    textClasses({
      overrides: {
        name: 'cardDescriptionClasses',
        label: 'Card Description Classes (Applied to all cards)',
        defaultValue: ['text-gray-600', 'text-sm', 'xl:text-base'],
      },
    }),
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'cardTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'cardDescription',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        bgColorPickerAll({
          overrides: {
            name: 'mediaContainerBgColor',
            label: 'Media Container Background Color',
            defaultValue: 'bg-slate-50',
          },
        }),
      ],
    },
    bgColorPickerAll({
      overrides: {
        name: 'activeCardBgColor',
        label: 'Active Card Background Color',
        defaultValue: 'bg-slate-100',
      },
    }),
    {
      name: 'paddingType',
      type: 'select',
      defaultValue: 'default',
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
    {
      name: 'reverseDesktopLayout',
      type: 'checkbox',
      label: 'Reverse Desktop Layout',
      defaultValue: false,
      admin: {
        description: 'Swap the position of content grid and media in desktop view',
      },
    },
  ],
}
