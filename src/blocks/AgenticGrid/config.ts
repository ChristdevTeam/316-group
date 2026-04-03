import { Block } from 'payload'

import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { gradientClasses } from '@/fields/gradientClasses'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { colorPickerAll } from '@/fields/colorPicker'
import { icon } from '@/fields/icon'

export const AgenticGrid: Block = {
  slug: 'agenticGrid',
  interfaceName: 'AgenticGridBlock',
  labels: {
    singular: 'Agentic Grid',
    plural: 'Agentic Grids',
  },
  fields: [
    // ── Header Section ──
    {
      name: 'headerSection',
      type: 'group',
      label: 'Header Section',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'AI Powered. Future Ready. <span class="text-blue-400">Human Led.</span>',
          admin: {
            description:
              'Supports inline HTML for partial coloring, e.g. <span class="text-blue-400">Human Led.</span>',
          },
        },
        textClasses({
          overrides: {
            name: 'taglineClasses',
            label: 'Tagline Classes',
            defaultValue: [
              'text-sm',
              'font-medium',
              'uppercase',
              'text-white',
            ],
          },
        }),
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Pre-built, Domain-trained AI Agent',
        },
        textClasses({
          overrides: {
            name: 'titleClasses',
            label: 'Title Classes',
            defaultValue: ['text-2xl', 'font-bold', 'text-white'],
          },
        }),
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        textClasses({
          overrides: {
            name: 'descriptionClasses',
            label: 'Description Classes',
            defaultValue: ['text-gray-400'],
          },
        }),
      ],
    },

    // ── Center Card ──
    {
      name: 'centerCard',
      type: 'group',
      label: 'Center Card',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Center Card Text',
          defaultValue: 'AGENTIC',
        },
        {
          name: 'superscript',
          type: 'text',
          label: 'Superscript Text',
          defaultValue: 'AI',
        },
        textColorPickerAll({
          overrides: {
            name: 'textColor',
            label: 'Center Card Text Color',
            defaultValue: 'text-orange-500',
          },
        }),
        bgColorPickerAll({
          overrides: {
            name: 'bgColor',
            label: 'Center Card Background',
            defaultValue: 'bg-slate-950',
          },
        }),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Center Card Image (optional, overrides text)',
        },
      ],
    },

    // ── Industry Items ──
    {
      name: 'items',
      type: 'array',
      label: 'Industry Items',
      minRows: 8,
      maxRows: 10,
      labels: {
        singular: 'Industry Item',
        plural: 'Industry Items',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        icon(),
        {
          name: 'description',
          type: 'textarea',
          label: 'Accordion Description',
          required: true,
        },
      ],
    },

    // ── Section Styling ──
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      defaultValue: 'gradient',
      options: [
        { label: 'Solid Color', value: 'color' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    bgColorPickerAll({
      overrides: {
        name: 'sectionBgColor',
        label: 'Section Background Color',
        defaultValue: 'bg-blue-950',
      },
      condition: (_, { backgroundType }) => backgroundType === 'color',
    }),
    gradientClasses({
      overrides: {
        name: 'sectionGradient',
        label: 'Section Gradient',
      },
      condition: (_, { backgroundType }) => backgroundType === 'gradient',
    }),
    colorPickerAll({
      overrides: {
        name: 'activeBorderColor',
        label: 'Active Card Border Color',
        defaultValue: 'white',
      },
    }),
  ],
}
