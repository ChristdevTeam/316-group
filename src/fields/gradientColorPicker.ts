import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

type gradientColorType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_, siblingData) => boolean
  prefix?: 'from' | 'via' | 'to'
}) => Field

export const gradientColorPicker: gradientColorType = ({
  condition = () => true,
  overrides = {},
  prefix = 'from',
} = {}) => {
  const colorResult: Field = {
    name: `${prefix}Color`,
    type: 'select',
    options: [
      { label: 'Inherit', value: `${prefix}-inherit` },
      { label: 'Current', value: `${prefix}-current` },
      { label: 'Transparent', value: `${prefix}-transparent` },
      { label: 'Black', value: `${prefix}-black` },
      { label: 'White', value: `${prefix}-white` },

      // Slate
      { label: 'Slate 50', value: `${prefix}-slate-50` },
      { label: 'Slate 100', value: `${prefix}-slate-100` },
      { label: 'Slate 200', value: `${prefix}-slate-200` },
      { label: 'Slate 300', value: `${prefix}-slate-300` },
      { label: 'Slate 400', value: `${prefix}-slate-400` },
      { label: 'Slate 500', value: `${prefix}-slate-500` },
      { label: 'Slate 600', value: `${prefix}-slate-600` },
      { label: 'Slate 700', value: `${prefix}-slate-700` },
      { label: 'Slate 800', value: `${prefix}-slate-800` },
      { label: 'Slate 900', value: `${prefix}-slate-900` },
      { label: 'Slate 950', value: `${prefix}-slate-950` },

      // Gray
      { label: 'Gray 50', value: `${prefix}-gray-50` },
      { label: 'Gray 100', value: `${prefix}-gray-100` },
      { label: 'Gray 200', value: `${prefix}-gray-200` },
      { label: 'Gray 300', value: `${prefix}-gray-300` },
      { label: 'Gray 400', value: `${prefix}-gray-400` },
      { label: 'Gray 500', value: `${prefix}-gray-500` },
      { label: 'Gray 600', value: `${prefix}-gray-600` },
      { label: 'Gray 700', value: `${prefix}-gray-700` },
      { label: 'Gray 800', value: `${prefix}-gray-800` },
      { label: 'Gray 900', value: `${prefix}-gray-900` },
      { label: 'Gray 950', value: `${prefix}-gray-950` },

      // Zinc
      { label: 'Zinc 50', value: `${prefix}-zinc-50` },
      { label: 'Zinc 100', value: `${prefix}-zinc-100` },
      { label: 'Zinc 200', value: `${prefix}-zinc-200` },
      { label: 'Zinc 300', value: `${prefix}-zinc-300` },
      { label: 'Zinc 400', value: `${prefix}-zinc-400` },
      { label: 'Zinc 500', value: `${prefix}-zinc-500` },
      { label: 'Zinc 600', value: `${prefix}-zinc-600` },
      { label: 'Zinc 700', value: `${prefix}-zinc-700` },
      { label: 'Zinc 800', value: `${prefix}-zinc-800` },
      { label: 'Zinc 900', value: `${prefix}-zinc-900` },
      { label: 'Zinc 950', value: `${prefix}-zinc-950` },

      // All other colors following the same pattern...
      // Blue
      { label: 'Blue 50', value: `${prefix}-blue-50` },
      { label: 'Blue 100', value: `${prefix}-blue-100` },
      { label: 'Blue 200', value: `${prefix}-blue-200` },
      { label: 'Blue 300', value: `${prefix}-blue-300` },
      { label: 'Blue 400', value: `${prefix}-blue-400` },
      { label: 'Blue 500', value: `${prefix}-blue-500` },
      { label: 'Blue 600', value: `${prefix}-blue-600` },
      { label: 'Blue 700', value: `${prefix}-blue-700` },
      { label: 'Blue 800', value: `${prefix}-blue-800` },
      { label: 'Blue 900', value: `${prefix}-blue-900` },
      { label: 'Blue 950', value: `${prefix}-blue-950` },

      // Green
      { label: 'Green 50', value: `${prefix}-green-50` },
      { label: 'Green 100', value: `${prefix}-green-100` },
      { label: 'Green 200', value: `${prefix}-green-200` },
      { label: 'Green 300', value: `${prefix}-green-300` },
      { label: 'Green 400', value: `${prefix}-green-400` },
      { label: 'Green 500', value: `${prefix}-green-500` },
      { label: 'Green 600', value: `${prefix}-green-600` },
      { label: 'Green 700', value: `${prefix}-green-700` },
      { label: 'Green 800', value: `${prefix}-green-800` },
      { label: 'Green 900', value: `${prefix}-green-900` },
      { label: 'Green 950', value: `${prefix}-green-950` },

      // Add all other Tailwind colors...
    ],
    admin: {
      condition,
    },
  }

  return deepMerge(colorResult, overrides)
}
