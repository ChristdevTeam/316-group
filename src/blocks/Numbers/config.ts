import { textClasses } from '@/fields/textClasses'
import { Block } from 'payload'

export const Numbers: Block = {
  slug: 'numbers',
  interfaceName: 'NumbersBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          defaultValue: '01',
        },
        textClasses({
          overrides: {
            name: 'numberClasses',
            label: 'Number Classes',
            defaultValue: ['text-2xl', 'md:text-4xl', 'font-bold', 'text-green-400'],
          },
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Flexible.',
        },
        textClasses({
          overrides: {
            name: 'titleClasses',
            label: 'Title Classes',
            defaultValue: [
              'text-4xl',
              'md:text-5xl',
              'lg:text-6xl',
              'xl:text-7xl',
              'font-semibold',
              'text-slate-900',
            ],
          },
        }),
        {
          name: 'description',
          type: 'text',
          required: true,
          defaultValue:
            'Hold multiple currencies in cash to use for your international banking needs. Get unbeatable exchange rates when you convert, effortlessly make payments from your currency wallets at no extra cost.',
        },
        textClasses({
          overrides: {
            name: 'descriptionClasses',
            label: 'Description Classes',
            defaultValue: ['text-base', 'md:text-lg', 'text-slate-600'],
          },
        }),
      ],
    },
  ],
}
