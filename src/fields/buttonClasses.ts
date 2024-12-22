import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'

type buttonClassesType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_, siblingData) => boolean
}) => Field

export const buttonClasses: buttonClassesType = ({
  condition = () => true,
  overrides = {},
} = {}) => {
  const buttonResult: Field = {
    name: 'buttonClasses',
    type: 'select',
    label: 'Button Classes',
    hasMany: true,
    admin: {
      condition,
    },
    options: [
      { label: 'Rounded Full', value: 'rounded-full' },
      { label: 'Rounded Large', value: 'rounded-lg' },
      { label: 'Rounded Medium', value: 'rounded' },
      { label: 'Rounded Small', value: 'rounded-sm' },
      { label: 'Border', value: 'border' },
      { label: 'Border Width 2', value: 'border-2' },
      { label: 'Bordered Dark', value: 'border-dark' },
      //border colors
      { label: 'Bordered Red', value: 'border-red' },
      { label: 'Bordered Green', value: 'border-green' },
      { label: 'Bordered Blue', value: 'border-blue' },
      { label: 'Bordered Yellow', value: 'border-yellow' },
      { label: 'Bordered Indigo', value: 'border-indigo' },
      { label: 'Bordered Purple', value: 'border-purple' },
      { label: 'Bordered Pink', value: 'border-pink' },
      { label: 'Bordered Gray', value: 'border-gray' },
      { label: 'Bordered Black', value: 'border-black' },
      { label: 'Bordered White', value: 'border-white' },
      //background colors
      { label: 'Inherit', value: 'bg-inherit' },
      { label: 'Current', value: 'bg-current' },
      { label: 'Transparent', value: 'bg-transparent' },
      { label: 'Black', value: 'bg-black' },
      { label: 'White', value: 'bg-white' },
    ],
  }

  return deepMerge(buttonResult, overrides)
}
