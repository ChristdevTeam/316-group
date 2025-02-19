import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'
import { gradientColorPicker } from './gradientColorPicker'

type gradientClassesType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_, siblingData) => boolean
}) => Field

export const gradientClasses: gradientClassesType = ({
  condition = () => true,
  overrides = {},
} = {}) => {
  const gradientResult: Field = {
    name: 'gradientClasses',
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'bg-gradient-to-r',
        options: [
          { label: 'Left to Right', value: 'bg-gradient-to-r' },
          { label: 'Right to Left', value: 'bg-gradient-to-l' },
          { label: 'Top to Bottom', value: 'bg-gradient-to-b' },
          { label: 'Bottom to Top', value: 'bg-gradient-to-t' },
          { label: 'Top Left to Bottom Right', value: 'bg-gradient-to-br' },
          { label: 'Top Right to Bottom Left', value: 'bg-gradient-to-bl' },
          { label: 'Bottom Right to Top Left', value: 'bg-gradient-to-tl' },
          { label: 'Bottom Left to Top Right', value: 'bg-gradient-to-tr' },
        ],
      },
      gradientColorPicker({
        prefix: 'from',
        overrides: {
          defaultValue: 'from-slate-950',
        },
      }),
      gradientColorPicker({
        prefix: 'via',
        overrides: {
          defaultValue: 'via-slate-900',
        },
      }),
      gradientColorPicker({
        prefix: 'to',
        overrides: {
          defaultValue: 'to-slate-800',
        },
      }),
    ],
    admin: {
      condition,
    },
  }

  return deepMerge(gradientResult, overrides)
}
