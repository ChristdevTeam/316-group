import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'
import { VerticalCTAFields } from '@/fields/vcta'
import { Block } from 'payload'

export const TabBlock: Block = {
  slug: 'tabBlock',
  interfaceName: 'TabBlock',
  fields: [
    {
      name: 'tabs',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tabName',
          type: 'text',
          required: true,
        },
        {
          name: 'mainContent',
          type: 'group',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            bgColorPickerAll({
              overrides: {
                name: 'imgBg',
                label: 'Image background Colour',
                defaultValue: 'bg-orange-600',
              },
            }),
            {
              name: 'vcta',
              type: 'group',
              fields: VerticalCTAFields,
            },
            bgColorPickerAll({
              overrides: {
                name: 'backgroundColor',
                defaultValue: 'bg-white',
              },
            }),
          ],
        },
        {
          name: 'expandableContent',
          type: 'group',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            textClasses({
              overrides: {
                name: 'headingClasses',
                defaultValue: ['text-3xl', 'font-bold', 'text-slate-900', 'mb-8', 'pt-6'],
              },
            }),
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            textClasses({
              overrides: {
                name: 'itemTitleClasses',
                label: 'Item Title Classes',
                defaultValue: ['text-xl', 'font-semibold', 'text-slate-900'],
              },
            }),
            textClasses({
              overrides: {
                name: 'itemDescriptionClasses',
                label: 'Item Description Classes',
                defaultValue: ['text-base', 'text-slate-600'],
              },
            }),
          ],
        },
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
  ],
}
