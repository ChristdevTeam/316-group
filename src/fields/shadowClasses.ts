import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

type shadowClassesType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_, siblingData) => boolean
}) => Field

export const shadowClasses: shadowClassesType = ({
  condition = () => true,
  overrides = {},
} = {}) => {
  const shadowResult: Field = {
    name: 'shadowClasses',
    type: 'select',
    hasMany: true,
    admin: {
      condition,
    },
    options: [
      // Base shadows
      { label: 'Shadow Small', value: 'shadow-sm' },
      { label: 'Shadow', value: 'shadow' },
      { label: 'Shadow Medium', value: 'shadow-md' },
      { label: 'Shadow Large', value: 'shadow-lg' },
      { label: 'Shadow XL', value: 'shadow-xl' },
      { label: 'Shadow 2XL', value: 'shadow-2xl' },
      { label: 'Shadow Inner', value: 'shadow-inner' },
      { label: 'No Shadow', value: 'shadow-none' },

      // Hover shadows
      { label: 'Hover: Shadow Small', value: 'hover:shadow-sm' },
      { label: 'Hover: Shadow', value: 'hover:shadow' },
      { label: 'Hover: Shadow Medium', value: 'hover:shadow-md' },
      { label: 'Hover: Shadow Large', value: 'hover:shadow-lg' },
      { label: 'Hover: Shadow XL', value: 'hover:shadow-xl' },
      { label: 'Hover: Shadow 2XL', value: 'hover:shadow-2xl' },
      { label: 'Hover: Shadow Inner', value: 'hover:shadow-inner' },
      { label: 'Hover: No Shadow', value: 'hover:shadow-none' },

      // Colors
      { label: 'Shadow Slate', value: 'shadow-slate-500/50' },
      { label: 'Shadow Blue', value: 'shadow-blue-500/50' },
      { label: 'Shadow Green', value: 'shadow-green-500/50' },
      { label: 'Shadow Purple', value: 'shadow-purple-500/50' },
      { label: 'Shadow Orange', value: 'shadow-orange-500/50' },
    ],
  }

  return deepMerge(shadowResult, overrides)
}
