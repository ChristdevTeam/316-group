import type { Block } from 'payload'

import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'

export const GlobalAccounts: Block = {
  slug: 'globalAccounts',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: '<span class="text-green-500">Global</span> Accounts',
      required: true,
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Classes',
        defaultValue: ['text-4xl', 'md:text-5xl', 'text-center', 'font-bold'],
      },
    }),
    {
      name: 'subHeading',
      type: 'text',
      defaultValue:
        'Our global account is <span class="text-green-600">your bridge</span> to international business & personal finance',
    },
    textClasses({
      overrides: {
        name: 'subHeadingClasses',
        label: 'Sub Heading Classes',
        defaultValue: ['text-2xl', 'xl:text-3xl', 'font-semibold'],
      },
    }),
    {
      name: 'description',
      type: 'text',
      defaultValue:
        'It grants you access to multiregional accounts, tailored to your business needs. Enjoy convenient mobile and web interfaces for effortless asset management. Leverage stability and convenience by making payments in multiple currencies.',
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        label: 'Description Classes',
        defaultValue: ['text-lg', 'xl:text-xl', 'leading-relaxed'],
      },
    }),
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', defaultValue: 'Flexible and global' }],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue:
        '<span class="text-green-600">Send and receive</span> funds seamlessly through various channels, with the control and transparency you expect from a cutting-edge financial service.',
      required: true,
    },
    linkGroup({
      overrides: {
        name: 'ctaLink',
        label: 'CTA Link',
        defaultValue: {
          label: `Get started →`,
          newTab: true,
          url: '/',
        },
      },
    }),
    {
      name: 'paddingType',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'No Padding', value: 'noPadding' },
        { label: 'Padding Both Added', value: 'paddingAdded' },
        { label: 'Padding Top Only', value: 'paddingTopOnly' },
        { label: 'Padding Bottom Only', value: 'paddingBottomOnly' },
        { label: 'Padding Top Only Added', value: 'paddingTopOnlyAdded' },
        { label: 'Padding Bottom Only Added', value: 'paddingBottomOnlyAdded' },
        { label: 'Padding Top Added', value: 'paddingTopAdded' },
        { label: 'Padding Bottom Added', value: 'paddingBottomAdded' },
      ],
    },
  ],
  interfaceName: 'GlobalAccountsBlock',
}
