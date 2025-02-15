import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

type borderClassesType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_, siblingData) => boolean
}) => Field

export const borderClasses: borderClassesType = ({
  condition = () => true,
  overrides = {},
} = {}) => {
  const borderResult: Field = {
    name: 'borderClasses',
    type: 'select',
    hasMany: true,
    admin: {
      condition,
    },
    options: [
      // Base border options
      { label: 'Border None', value: 'border-none' },
      { label: 'Border Solid', value: 'border' },
      { label: 'Border Dotted', value: 'border-dotted' },
      { label: 'Border Dashed', value: 'border-dashed' },
      { label: 'Border Double', value: 'border-double' },
      { label: 'Border Groove', value: 'border-groove' },
      { label: 'Border Ridge', value: 'border-ridge' },
      { label: 'Border Inset', value: 'border-inset' },
      { label: 'Border Outset', value: 'border-outset' },

      // Border color options
      { label: 'Border Black', value: 'border-black' },
      { label: 'Border White', value: 'border-white' },
      { label: 'Border Gray', value: 'border-gray-500' },
      { label: 'Border Red', value: 'border-red-500' },
      { label: 'Border Green', value: 'border-green-500' },
      { label: 'Border Blue', value: 'border-blue-500' },
      { label: 'Border Yellow', value: 'border-yellow-500' },

      // Hover border options
      { label: 'Hover: Border Solid', value: 'hover:border' },
      { label: 'Hover: Border Dotted', value: 'hover:border-dotted' },
      { label: 'Hover: Border Dashed', value: 'hover:border-dashed' },
      { label: 'Hover: Border Double', value: 'hover:border-double' },
      { label: 'Hover: Border Groove', value: 'hover:border-groove' },
      { label: 'Hover: Border Ridge', value: 'hover:border-ridge' },
      { label: 'Hover: Border Inset', value: 'hover:border-inset' },
      { label: 'Hover: Border Outset', value: 'hover:border-outset' },
      { label: 'Hover: Border Outset 0', value: 'hover:border-0' },
      { label: 'Hover: Border Outset 2', value: 'hover:border-2' },
      { label: 'Hover: Border Outset 4', value: 'hover:border-4' },
      { label: 'Hover: Border Outset 6', value: 'hover:border-6' },
      { label: 'Hover: Border Outset 8', value: 'hover:border-8' },
      { label: 'Hover: Border Outset T', value: 'hover:border-t' },
      { label: 'Hover: Border Outset R', value: 'hover:border-r' },
      { label: 'Hover: Border Outset B', value: 'hover:border-b' },
      { label: 'Hover: Border Outset L', value: 'hover:border-l' },
      { label: 'Border Outset 0', value: 'border-0' },
      { label: 'Border Outset 2', value: 'border-2' },
      { label: 'Border Outset 4', value: 'border-4' },
      { label: 'Border Outset 6', value: 'border-6' },
      { label: 'Border Outset 8', value: 'border-8' },
      { label: 'Border Outset T', value: 'border-t' },
      { label: 'Border Outset R', value: 'border-r' },
      { label: 'Border Outset B', value: 'border-b' },
      { label: 'Border Outset L', value: 'border-l' },
    ],
  }

  return deepMerge(borderResult, overrides)
}
