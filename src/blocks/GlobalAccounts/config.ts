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
      defaultValue: 'text<span class="text-green-500">Global</span> Accounts',
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
      fields: [{ name: 'feature', type: 'text', defaultValue: 'textFlexible and global' }],
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
    textClasses({
      overrides: {
        name: 'ctaTextClasses',
        label: 'CTA Text Classes',
        defaultValue: [
          'text-2xl',
          'md:text-3xl',
          'xl:text-4xl',
          'font-semibold',
          'text-center',
          'mb-6',
        ],
      },
    }),
    {
      name: 'styles',
      type: 'group',
      fields: [
        {
          name: 'accentColour',
          type: 'select',
          options: [
            { label: 'Green', value: 'text-green-500' },
            { label: 'Blue', value: 'text-blue-500' },
            { label: 'Purple', value: 'text-purple-500' },
            { label: 'Red', value: 'text-red-500' },
            { label: 'Orange', value: 'text-orange-500' },
            { label: 'Yellow', value: 'text-yellow-500' },
            { label: 'Pink', value: 'text-pink-500' },
            { label: 'Teal', value: 'text-teal-500' },
            { label: 'Cyan', value: 'text-cyan-500' },
            { label: 'Lime', value: 'text-lime-500' },
            { label: 'Emerald', value: 'text-emerald-500' },
            { label: 'Indigo', value: 'text-indigo-500' },
            { label: 'Violet', value: 'text-violet-500' },
            { label: 'Fuchsia', value: 'text-fuchsia-500' },
            { label: 'Rose', value: 'text-rose-500' },
            { label: 'Slate', value: 'text-slate-500' },
            { label: 'Gray', value: 'text-gray-500' },
            { label: 'Zinc', value: 'text-zinc-500' },
            { label: 'Neutral', value: 'text-neutral-500' },
            { label: 'Stone', value: 'text-stone-500' },
          ],
          defaultValue: 'text-green-500',
        },
        bgColorPickerAll({
          overrides: {
            name: 'ctaBackground',
            label: 'CTA Background',
          },
        }),
      ],
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
      defaultValue: 'textdefault',
      options: [
        { label: 'Default', value: 'textdefault' },
        { label: 'No Padding', value: 'textnoPadding' },
        { label: 'Padding Both Added', value: 'textpaddingAdded' },
        { label: 'Padding Top Only', value: 'textpaddingTopOnly' },
        { label: 'Padding Bottom Only', value: 'textpaddingBottomOnly' },
        { label: 'Padding Top Only Added', value: 'textpaddingTopOnlyAdded' },
        { label: 'Padding Bottom Only Added', value: 'textpaddingBottomOnlyAdded' },
        { label: 'Padding Top Added', value: 'textpaddingTopAdded' },
        { label: 'Padding Bottom Added', value: 'textpaddingBottomAdded' },
      ],
    },
  ],
  interfaceName: 'GlobalAccountsBlock',
}
