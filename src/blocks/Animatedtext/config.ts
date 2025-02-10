import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const AnimatedText: Block = {
  slug: 'animatedText',
  interfaceName: 'AnimatedText',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    textClasses(),
    {
      name: 'animationSpeed',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Fast', value: 'fast' },
        { label: 'Slow', value: 'slow' },
      ],
      defaultValue: 'default',
    },
    bgColorPickerAll(),
  ],
}
