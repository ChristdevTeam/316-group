import type { Block } from 'payload'

import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const Showcase: Block = {
  slug: 'showcase',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Your bank, <span class="text-green-500">powered by us</span>',
      required: true,
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Classes',
        defaultValue: ['text-4xl', 'lg:text-6xl', 'text-center', 'font-semibold'],
      },
    }),
    {
      name: 'showcaseItems',
      type: 'array',
      fields: [
        {
          name: 'itemType',
          type: 'select',
          options: [
            { label: 'Showcase Item', value: 'showcase' },
            { label: 'Divider', value: 'divider' },
          ],
        },
        {
          name: 'showcaseItem',
          type: 'group',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'itemTitle',
              type: 'text',
              defaultValue: '<span class="text-green-500">6x</span> Faster',
              required: true,
            },
            textClasses({
              overrides: {
                name: 'itemTitleClasses',
                label: 'ItemTitle Classes',

                defaultValue: ['text-2xl', 'text-center', 'font-semibold'],
              },
            }),
            {
              name: 'description',
              type: 'text',
              defaultValue: 'Than the industry average to go live with a new fintech product.',
              required: true,
            },
            textClasses({
              overrides: {
                name: 'descriptionClasses',
                label: 'Description Classes',
                defaultValue: ['text-lg', 'text-center', 'text-slate-600'],
              },
            }),
          ],
          admin: {
            condition: (_, { itemType }) => itemType === 'showcase',
          },
        },
        bgColorPickerAll({
          overrides: {
            name: 'dividerColor',
            label: 'Divider Color',
            defaultValue: 'bg-white',
            admin: {
              condition: (_, { itemType }) => itemType === 'divider',
            },
          },
        }),
      ],
      required: true,
    },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Media', value: 'media' },
      ],
    },
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
    bgColorPickerAll({
      overrides: {
        label: 'Content Background Color',
        name: 'sectionBackgroundColor',
        admin: {
          condition: (_, { backgroundType }) => backgroundType === 'color',
        },
      },
    }),
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
  ],
  interfaceName: 'ShowcaseBlock',
}
