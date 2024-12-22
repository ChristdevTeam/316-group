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
      { label: 'Border Width 1', value: 'border-[1px]' },
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
      //hover backgrounds
      { label: 'Hover bg transparent', value: 'hover:bg-transparent' },
      { label: 'Hover bg black', value: 'hover:bg-black' },
      { label: 'Hover bg white', value: 'hover:bg-white' },
      //hover border colors
      { label: 'Hover border red', value: 'hover:border-red' },
      { label: 'Hover border green', value: 'hover:border-green' },
      { label: 'Hover border blue', value: 'hover:border-blue' },
      { label: 'Hover border yellow', value: 'hover:border-yellow' },
      { label: 'Hover border indigo', value: 'hover:border-indigo' },
      { label: 'Hover border purple', value: 'hover:border-purple' },
      { label: 'Hover border pink', value: 'hover:border-pink' },
      { label: 'Hover border gray', value: 'hover:border-gray' },
      { label: 'Hover border black', value: 'hover:border-black' },
      { label: 'Hover border white', value: 'hover:border-white' },
      { label: 'Hover border transparent', value: 'hover:border-transparent' },
    ],
  }

  return deepMerge(buttonResult, overrides)
}
