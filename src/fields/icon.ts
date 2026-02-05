import { Field } from 'payload'
import deepMerge from '@/utilities/deepMerge'

type IconType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_, siblingData) => boolean
}) => Field

export const icon: IconType = ({ condition, overrides } = {}) => {
  const iconField: Field = {
    name: 'icon',
    type: 'text',
    required: false,
    admin: {
      components: {
        Field: '@/components/Admin/IconPicker',
      },
      condition,
    },
  }

  return deepMerge(iconField, overrides)
}
