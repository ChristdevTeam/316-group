import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

type gradientColorType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_: any, siblingData: any) => boolean
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

      // Teal
      { label: 'Teal 50', value: `${prefix}-teal-50` },
      { label: 'Teal 100', value: `${prefix}-teal-100` },
      { label: 'Teal 200', value: `${prefix}-teal-200` },
      { label: 'Teal 300', value: `${prefix}-teal-300` },
      { label: 'Teal 400', value: `${prefix}-teal-400` },
      { label: 'Teal 500', value: `${prefix}-teal-500` },
      { label: 'Teal 600', value: `${prefix}-teal-600` },
      { label: 'Teal 700', value: `${prefix}-teal-700` },
      { label: 'Teal 800', value: `${prefix}-teal-800` },
      { label: 'Teal 900', value: `${prefix}-teal-900` },
      { label: 'Teal 950', value: `${prefix}-teal-950` },

      // Sky
      { label: 'Sky 50', value: `${prefix}-sky-50` },
      { label: 'Sky 100', value: `${prefix}-sky-100` },
      { label: 'Sky 200', value: `${prefix}-sky-200` },
      { label: 'Sky 300', value: `${prefix}-sky-300` },
      { label: 'Sky 400', value: `${prefix}-sky-400` },
      { label: 'Sky 500', value: `${prefix}-sky-500` },
      { label: 'Sky 600', value: `${prefix}-sky-600` },
      { label: 'Sky 700', value: `${prefix}-sky-700` },
      { label: 'Sky 800', value: `${prefix}-sky-800` },
      { label: 'Sky 900', value: `${prefix}-sky-900` },
      { label: 'Sky 950', value: `${prefix}-sky-950` },

      // Lime
      { label: 'Lime 50', value: `${prefix}-lime-50` },
      { label: 'Lime 100', value: `${prefix}-lime-100` },
      { label: 'Lime 200', value: `${prefix}-lime-200` },
      { label: 'Lime 300', value: `${prefix}-lime-300` },
      { label: 'Lime 400', value: `${prefix}-lime-400` },
      { label: 'Lime 500', value: `${prefix}-lime-500` },
      { label: 'Lime 600', value: `${prefix}-lime-600` },
      { label: 'Lime 700', value: `${prefix}-lime-700` },
      { label: 'Lime 800', value: `${prefix}-lime-800` },
      { label: 'Lime 900', value: `${prefix}-lime-900` },
      { label: 'Lime 950', value: `${prefix}-lime-950` },

      // Cyan
      { label: 'Cyan 50', value: `${prefix}-cyan-50` },
      { label: 'Cyan 100', value: `${prefix}-cyan-100` },
      { label: 'Cyan 200', value: `${prefix}-cyan-200` },
      { label: 'Cyan 300', value: `${prefix}-cyan-300` },
      { label: 'Cyan 400', value: `${prefix}-cyan-400` },
      { label: 'Cyan 500', value: `${prefix}-cyan-500` },
      { label: 'Cyan 600', value: `${prefix}-cyan-600` },
      { label: 'Cyan 700', value: `${prefix}-cyan-700` },
      { label: 'Cyan 800', value: `${prefix}-cyan-800` },
      { label: 'Cyan 900', value: `${prefix}-cyan-900` },
      { label: 'Cyan 950', value: `${prefix}-cyan-950` },

      // Violet
      { label: 'Violet 50', value: `${prefix}-violet-50` },
      { label: 'Violet 100', value: `${prefix}-violet-100` },
      { label: 'Violet 200', value: `${prefix}-violet-200` },
      { label: 'Violet 300', value: `${prefix}-violet-300` },
      { label: 'Violet 400', value: `${prefix}-violet-400` },
      { label: 'Violet 500', value: `${prefix}-violet-500` },
      { label: 'Violet 600', value: `${prefix}-violet-600` },
      { label: 'Violet 700', value: `${prefix}-violet-700` },
      { label: 'Violet 800', value: `${prefix}-violet-800` },
      { label: 'Violet 900', value: `${prefix}-violet-900` },
      { label: 'Violet 950', value: `${prefix}-violet-950` },

      // Fuchsia
      { label: 'Fuchsia 50', value: `${prefix}-fuchsia-50` },
      { label: 'Fuchsia 100', value: `${prefix}-fuchsia-100` },
      { label: 'Fuchsia 200', value: `${prefix}-fuchsia-200` },
      { label: 'Fuchsia 300', value: `${prefix}-fuchsia-300` },
      { label: 'Fuchsia 400', value: `${prefix}-fuchsia-400` },
      { label: 'Fuchsia 500', value: `${prefix}-fuchsia-500` },
      { label: 'Fuchsia 600', value: `${prefix}-fuchsia-600` },
      { label: 'Fuchsia 700', value: `${prefix}-fuchsia-700` },
      { label: 'Fuchsia 800', value: `${prefix}-fuchsia-800` },
      { label: 'Fuchsia 900', value: `${prefix}-fuchsia-900` },
      { label: 'Fuchsia 950', value: `${prefix}-fuchsia-950` },

      // Pink
      { label: 'Pink 50', value: `${prefix}-pink-50` },
      { label: 'Pink 100', value: `${prefix}-pink-100` },
      { label: 'Pink 200', value: `${prefix}-pink-200` },
      { label: 'Pink 300', value: `${prefix}-pink-300` },
      { label: 'Pink 400', value: `${prefix}-pink-400` },
      { label: 'Pink 500', value: `${prefix}-pink-500` },
      { label: 'Pink 600', value: `${prefix}-pink-600` },
      { label: 'Pink 700', value: `${prefix}-pink-700` },
      { label: 'Pink 800', value: `${prefix}-pink-800` },
      { label: 'Pink 900', value: `${prefix}-pink-900` },
      { label: 'Pink 950', value: `${prefix}-pink-950` },

      // Rose
      { label: 'Rose 50', value: `${prefix}-rose-50` },
      { label: 'Rose 100', value: `${prefix}-rose-100` },
      { label: 'Rose 200', value: `${prefix}-rose-200` },
      { label: 'Rose 300', value: `${prefix}-rose-300` },
      { label: 'Rose 400', value: `${prefix}-rose-400` },
      { label: 'Rose 500', value: `${prefix}-rose-500` },
      { label: 'Rose 600', value: `${prefix}-rose-600` },
      { label: 'Rose 700', value: `${prefix}-rose-700` },
      { label: 'Rose 800', value: `${prefix}-rose-800` },
      { label: 'Rose 900', value: `${prefix}-rose-900` },
      { label: 'Rose 950', value: `${prefix}-rose-950` },

      // Neutral
      { label: 'Neutral 50', value: `${prefix}-neutral-50` },
      { label: 'Neutral 100', value: `${prefix}-neutral-100` },
      { label: 'Neutral 200', value: `${prefix}-neutral-200` },
      { label: 'Neutral 300', value: `${prefix}-neutral-300` },
      { label: 'Neutral 400', value: `${prefix}-neutral-400` },
      { label: 'Neutral 500', value: `${prefix}-neutral-500` },
      { label: 'Neutral 600', value: `${prefix}-neutral-600` },
      { label: 'Neutral 700', value: `${prefix}-neutral-700` },
      { label: 'Neutral 800', value: `${prefix}-neutral-800` },
      { label: 'Neutral 900', value: `${prefix}-neutral-900` },
      { label: 'Neutral 950', value: `${prefix}-neutral-950` },

      // Stone
      { label: 'Stone 50', value: `${prefix}-stone-50` },
      { label: 'Stone 100', value: `${prefix}-stone-100` },
      { label: 'Stone 200', value: `${prefix}-stone-200` },
      { label: 'Stone 300', value: `${prefix}-stone-300` },
      { label: 'Stone 400', value: `${prefix}-stone-400` },
      { label: 'Stone 500', value: `${prefix}-stone-500` },
      { label: 'Stone 600', value: `${prefix}-stone-600` },
      { label: 'Stone 700', value: `${prefix}-stone-700` },
      { label: 'Stone 800', value: `${prefix}-stone-800` },
      { label: 'Stone 900', value: `${prefix}-stone-900` },
      { label: 'Stone 950', value: `${prefix}-stone-950` },

      // Amber
      { label: 'Amber 50', value: `${prefix}-amber-50` },
      { label: 'Amber 100', value: `${prefix}-amber-100` },
      { label: 'Amber 200', value: `${prefix}-amber-200` },
      { label: 'Amber 300', value: `${prefix}-amber-300` },
      { label: 'Amber 400', value: `${prefix}-amber-400` },
      { label: 'Amber 500', value: `${prefix}-amber-500` },
      { label: 'Amber 600', value: `${prefix}-amber-600` },
      { label: 'Amber 700', value: `${prefix}-amber-700` },
      { label: 'Amber 800', value: `${prefix}-amber-800` },
      { label: 'Amber 900', value: `${prefix}-amber-900` },
      { label: 'Amber 950', value: `${prefix}-amber-950` },

      // Purple
      { label: 'Purple 50', value: `${prefix}-purple-50` },
      { label: 'Purple 100', value: `${prefix}-purple-100` },
      { label: 'Purple 200', value: `${prefix}-purple-200` },
      { label: 'Purple 300', value: `${prefix}-purple-300` },
      { label: 'Purple 400', value: `${prefix}-purple-400` },
      { label: 'Purple 500', value: `${prefix}-purple-500` },
      { label: 'Purple 600', value: `${prefix}-purple-600` },
      { label: 'Purple 700', value: `${prefix}-purple-700` },
      { label: 'Purple 800', value: `${prefix}-purple-800` },
      { label: 'Purple 900', value: `${prefix}-purple-900` },
      { label: 'Purple 950', value: `${prefix}-purple-950` },

      // Indigo
      { label: 'Indigo 50', value: `${prefix}-indigo-50` },
      { label: 'Indigo 100', value: `${prefix}-indigo-100` },
      { label: 'Indigo 200', value: `${prefix}-indigo-200` },
      { label: 'Indigo 300', value: `${prefix}-indigo-300` },
      { label: 'Indigo 400', value: `${prefix}-indigo-400` },
      { label: 'Indigo 500', value: `${prefix}-indigo-500` },
      { label: 'Indigo 600', value: `${prefix}-indigo-600` },
      { label: 'Indigo 700', value: `${prefix}-indigo-700` },
      { label: 'Indigo 800', value: `${prefix}-indigo-800` },
      { label: 'Indigo 900', value: `${prefix}-indigo-900` },
      { label: 'Indigo 950', value: `${prefix}-indigo-950` },

      // Emerald
      { label: 'Emerald 50', value: `${prefix}-emerald-50` },
      { label: 'Emerald 100', value: `${prefix}-emerald-100` },
      { label: 'Emerald 200', value: `${prefix}-emerald-200` },
      { label: 'Emerald 300', value: `${prefix}-emerald-300` },
      { label: 'Emerald 400', value: `${prefix}-emerald-400` },
      { label: 'Emerald 500', value: `${prefix}-emerald-500` },
      { label: 'Emerald 600', value: `${prefix}-emerald-600` },
      { label: 'Emerald 700', value: `${prefix}-emerald-700` },
      { label: 'Emerald 800', value: `${prefix}-emerald-800` },
      { label: 'Emerald 900', value: `${prefix}-emerald-900` },
      { label: 'Emerald 950', value: `${prefix}-emerald-950` },

      // Yellow
      { label: 'Yellow 50', value: `${prefix}-yellow-50` },
      { label: 'Yellow 100', value: `${prefix}-yellow-100` },
      { label: 'Yellow 200', value: `${prefix}-yellow-200` },
      { label: 'Yellow 300', value: `${prefix}-yellow-300` },
      { label: 'Yellow 400', value: `${prefix}-yellow-400` },
      { label: 'Yellow 500', value: `${prefix}-yellow-500` },
      { label: 'Yellow 600', value: `${prefix}-yellow-600` },
      { label: 'Yellow 700', value: `${prefix}-yellow-700` },
      { label: 'Yellow 800', value: `${prefix}-yellow-800` },
      { label: 'Yellow 900', value: `${prefix}-yellow-900` },
      { label: 'Yellow 950', value: `${prefix}-yellow-950` },

      // Orange
      { label: 'Orange 50', value: `${prefix}-orange-50` },
      { label: 'Orange 100', value: `${prefix}-orange-100` },
      { label: 'Orange 200', value: `${prefix}-orange-200` },
      { label: 'Orange 300', value: `${prefix}-orange-300` },
      { label: 'Orange 400', value: `${prefix}-orange-400` },
      { label: 'Orange 500', value: `${prefix}-orange-500` },
      { label: 'Orange 600', value: `${prefix}-orange-600` },
      { label: 'Orange 700', value: `${prefix}-orange-700` },
      { label: 'Orange 800', value: `${prefix}-orange-800` },
      { label: 'Orange 900', value: `${prefix}-orange-900` },
      { label: 'Orange 950', value: `${prefix}-orange-950` },

      // Red
      { label: 'Red 50', value: `${prefix}-red-50` },
      { label: 'Red 100', value: `${prefix}-red-100` },
      { label: 'Red 200', value: `${prefix}-red-200` },
      { label: 'Red 300', value: `${prefix}-red-300` },
      { label: 'Red 400', value: `${prefix}-red-400` },
      { label: 'Red 500', value: `${prefix}-red-500` },
      { label: 'Red 600', value: `${prefix}-red-600` },
      { label: 'Red 700', value: `${prefix}-red-700` },
      { label: 'Red 800', value: `${prefix}-red-800` },
      { label: 'Red 900', value: `${prefix}-red-900` },
      { label: 'Red 950', value: `${prefix}-red-950` },
    ],
    admin: {
      condition,
    },
  }

  return deepMerge(colorResult, overrides)
}
