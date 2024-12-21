import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'
import { textColorPickerAll } from '@/fields/textColorPicker'

export const VerticalCTAFields: Field[] = [
  {
    name: 'subtitle',
    type: 'text',
  },
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'titleClasses',
    type: 'select',
    options: [
      { label: 'Default', value: '' },
      { label: 'Text Size: Extra Large (2XL)', value: 'text-2xl' },
      { label: 'Text Size: 3XL', value: 'text-3xl' },
      { label: 'Text Size: 4XL', value: 'text-4xl' },
      { label: 'Text Size: 5XL', value: 'text-5xl' },
      { label: 'Text Size: 6XL', value: 'text-6xl' },
      { label: 'Text Size: 7XL', value: 'text-7xl' },
      { label: 'Text Size: 8XL', value: 'text-8xl' },
      { label: 'Medium Screen: Text Size 4XL', value: 'md:text-4xl' },
      { label: 'Medium Screen: Text Size 5XL', value: 'md:text-5xl' },
      { label: 'Medium Screen: Text Size 6XL', value: 'md:text-6xl' },
      { label: 'Medium Screen: Text Size 7XL', value: 'md:text-7xl' },
      { label: 'Medium Screen: Text Size 8XL', value: 'md:text-8xl' },
      { label: 'Large Screen: Text Size 4XL', value: 'lg:text-4xl' },
      { label: 'Large Screen: Text Size 5XL', value: 'lg:text-5xl' },
      { label: 'Large Screen: Text Size 6XL', value: 'lg:text-6xl' },
      { label: 'Large Screen: Text Size 7XL', value: 'lg:text-7xl' },
      { label: 'Large Screen: Text Size 8XL', value: 'lg:text-8xl' },
      { label: 'Font Weight: Medium (400)', value: 'font-medium' },
      { label: 'Font Weight: Semi-bold (500)', value: 'font-semibold' },
      { label: 'Font Weight: Bold (600)', value: 'font-bold' },
      { label: 'Font Weight: Extra-bold (700)', value: 'font-extrabold' },
      { label: 'Font Weight: Black (800)', value: 'font-black' },
      { label: 'Large Screen: Font Weight Medium (400)', value: 'lg:font-medium' },
      { label: 'Large Screen: Font Weight Semi-bold (500)', value: 'lg:font-semibold' },
      { label: 'Large Screen: Font Weight Bold (600)', value: 'lg:font-bold' },
      { label: 'Large Screen: Font Weight Extra-bold (700)', value: 'lg:font-extrabold' },
      { label: 'Large Screen: Font Weight Black (800)', value: 'lg:font-black' },
      { label: 'Font: Jost', value: 'font-jost' },
      { label: 'Font: Urbanist', value: 'font-urbanist' },
      { label: 'Font: Ubuntu', value: 'font-ubuntu' },
      { label: 'Font: Inter', value: 'font-inter' },
      // Padding Top Options
      { label: 'Padding Top - None', value: 'pt-0' },
      { label: 'Padding Top - Extra Small (1)', value: 'pt-1' },
      { label: 'Padding Top - Small (2)', value: 'pt-2' },
      { label: 'Padding Top - Medium (4)', value: 'pt-4' },
      { label: 'Padding Top - Large (6)', value: 'pt-6' },
      { label: 'Padding Top - Extra Large (8)', value: 'pt-8' },
      { label: 'Padding Top - 2XL (10)', value: 'pt-10' },
      { label: 'Padding Top - 3XL (12)', value: 'pt-12' },
      { label: 'Padding Top - 4XL (16)', value: 'pt-16' },
      { label: 'Padding Top - 5XL (20)', value: 'pt-20' },
      { label: 'Padding Top - 6XL (24)', value: 'pt-24' },
      { label: 'Padding Top - 7XL (32)', value: 'pt-32' },
      { label: 'Padding Top - 8XL (40)', value: 'pt-40' },

      // Padding Top for Medium Screens
      { label: 'Padding Top (md) - None', value: 'md:pt-0' },
      { label: 'Padding Top (md) - Extra Small (1)', value: 'md:pt-1' },
      { label: 'Padding Top (md) - Small (2)', value: 'md:pt-2' },
      { label: 'Padding Top (md) - Medium (4)', value: 'md:pt-4' },
      { label: 'Padding Top (md) - Large (6)', value: 'md:pt-6' },
      { label: 'Padding Top (md) - Extra Large (8)', value: 'md:pt-8' },
      { label: 'Padding Top (md) - 2XL (10)', value: 'md:pt-10' },
      { label: 'Padding Top (md) - 3XL (12)', value: 'md:pt-12' },
      { label: 'Padding Top (md) - 4XL (16)', value: 'md:pt-16' },
      { label: 'Padding Top (md) - 5XL (20)', value: 'md:pt-20' },
      { label: 'Padding Top (md) - 6XL (24)', value: 'md:pt-24' },
      { label: 'Padding Top (md) - 7XL (32)', value: 'md:pt-32' },
      { label: 'Padding Top (md) - 8XL (40)', value: 'md:pt-40' },

      // Padding Top for Large Screens
      { label: 'Padding Top (lg) - None', value: 'lg:pt-0' },
      { label: 'Padding Top (lg) - Extra Small (1)', value: 'lg:pt-1' },
      { label: 'Padding Top (lg) - Small (2)', value: 'lg:pt-2' },
      { label: 'Padding Top (lg) - Medium (4)', value: 'lg:pt-4' },
      { label: 'Padding Top (lg) - Large (6)', value: 'lg:pt-6' },
      { label: 'Padding Top (lg) - Extra Large (8)', value: 'lg:pt-8' },
      { label: 'Padding Top (lg) - 2XL (10)', value: 'lg:pt-10' },
      { label: 'Padding Top (lg) - 3XL (12)', value: 'lg:pt-12' },
      { label: 'Padding Top (lg) - 4XL (16)', value: 'lg:pt-16' },
      { label: 'Padding Top (lg) - 5XL (20)', value: 'lg:pt-20' },
      { label: 'Padding Top (lg) - 6XL (24)', value: 'lg:pt-24' },
      { label: 'Padding Top (lg) - 7XL (32)', value: 'lg:pt-32' },
      { label: 'Padding Top (lg) - 8XL (40)', value: 'lg:pt-40' },

      // Padding Bottom Options
      { label: 'Padding Bottom - None', value: 'pb-0' },
      { label: 'Padding Bottom - Extra Small (1)', value: 'pb-1' },
      { label: 'Padding Bottom - Small (2)', value: 'pb-2' },
      { label: 'Padding Bottom - Medium (4)', value: 'pb-4' },
      { label: 'Padding Bottom - Large (6)', value: 'pb-6' },
      { label: 'Padding Bottom - Extra Large (8)', value: 'pb-8' },
      { label: 'Padding Bottom - 2XL (10)', value: 'pb-10' },
      { label: 'Padding Bottom - 3XL (12)', value: 'pb-12' },
      { label: 'Padding Bottom - 4XL (16)', value: 'pb-16' },
      { label: 'Padding Bottom - 5XL (20)', value: 'pb-20' },
      { label: 'Padding Bottom - 6XL (24)', value: 'pb-24' },
      { label: 'Padding Bottom - 7XL (32)', value: 'pb-32' },
      { label: 'Padding Bottom - 8XL (40)', value: 'pb-40' },

      // Padding Bottom for Medium Screens
      { label: 'Padding Bottom (md) - None', value: 'md:pb-0' },
      { label: 'Padding Bottom (md) - Extra Small (1)', value: 'md:pb-1' },
      { label: 'Padding Bottom (md) - Small (2)', value: 'md:pb-2' },
      { label: 'Padding Bottom (md) - Medium (4)', value: 'md:pb-4' },
      { label: 'Padding Bottom (md) - Large (6)', value: 'md:pb-6' },
      { label: 'Padding Bottom (md) - Extra Large (8)', value: 'md:pb-8' },
      { label: 'Padding Bottom (md) - 2XL (10)', value: 'md:pb-10' },
      { label: 'Padding Bottom (md) - 3XL (12)', value: 'md:pb-12' },
      { label: 'Padding Bottom (md) - 4XL (16)', value: 'md:pb-16' },
      { label: 'Padding Bottom (md) - 5XL (20)', value: 'md:pb-20' },
      { label: 'Padding Bottom (md) - 6XL (24)', value: 'md:pb-24' },
      { label: 'Padding Bottom (md) - 7XL (32)', value: 'md:pb-32' },
      { label: 'Padding Bottom (md) - 8XL (40)', value: 'md:pb-40' },

      // Padding Bottom for Large Screens
      { label: 'Padding Bottom (lg) - None', value: 'lg:pb-0' },
      { label: 'Padding Bottom (lg) - Extra Small (1)', value: 'lg:pb-1' },
      { label: 'Padding Bottom (lg) - Small (2)', value: 'lg:pb-2' },
      { label: 'Padding Bottom (lg) - Medium (4)', value: 'lg:pb-4' },
      { label: 'Padding Bottom (lg) - Large (6)', value: 'lg:pb-6' },
      { label: 'Padding Bottom (lg) - Extra Large (8)', value: 'lg:pb-8' },
      { label: 'Padding Bottom (lg) - 2XL (10)', value: 'lg:pb-10' },
      { label: 'Padding Bottom (lg) - 3XL (12)', value: 'lg:pb-12' },
      { label: 'Padding Bottom (lg) - 4XL (16)', value: 'lg:pb-16' },
      { label: 'Padding Bottom (lg) - 5XL (20)', value: 'lg:pb-20' },
      { label: 'Padding Bottom (lg) - 6XL (24)', value: 'lg:pb-24' },
      { label: 'Padding Bottom (lg) - 7XL (32)', value: 'lg:pb-32' },
      { label: 'Padding Bottom (lg) - 8XL (40)', value: 'lg:pb-40' },
    ],
    hasMany: true,
  },
  textColorPickerAll({
    overrides: {
      label: 'Title Colour',
      name: 'titleColour',
    },
  }),

  {
    name: 'description',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
  },
  {
    name: 'descriptionClasses',
    type: 'select',
    options: [
      {
        label: 'Default',
        value: '',
      },
      {
        label: 'Text Size: Extra Large (2XL)',
        value: 'text-2xl',
      },
      {
        label: 'Text Size: 3XL',
        value: 'text-3xl',
      },
      {
        label: 'Text Size: 4XL',
        value: 'text-4xl',
      },
      {
        label: 'Text Size: 5XL',
        value: 'text-5xl',
      },
      {
        label: 'Text Size: 6XL',
        value: 'text-6xl',
      },
      {
        label: 'Text Size: 7XL',
        value: 'text-7xl',
      },
      {
        label: 'Text Size: 8XL',
        value: 'text-8xl',
      },
      {
        label: 'Medium Screen: Text Size 4XL',
        value: 'md:text-4xl',
      },
      {
        label: 'Medium Screen: Text Size 5XL',
        value: 'md:text-5xl',
      },
      {
        label: 'Medium Screen: Text Size 6XL',
        value: 'md:text-6xl',
      },
      {
        label: 'Medium Screen: Text Size 7XL',
        value: 'md:text-7xl',
      },
      {
        label: 'Medium Screen: Text Size 8XL',
        value: 'md:text-8xl',
      },
      {
        label: 'Large Screen: Text Size 4XL',
        value: 'lg:text-4xl',
      },
      {
        label: 'Large Screen: Text Size 5XL',
        value: 'lg:text-5xl',
      },
      {
        label: 'Large Screen: Text Size 6XL',
        value: 'lg:text-6xl',
      },
      {
        label: 'Large Screen: Text Size 7XL',
        value: 'lg:text-7xl',
      },
      {
        label: 'Large Screen: Text Size 8XL',
        value: 'lg:text-8xl',
      },
      {
        label: 'Font Weight: Medium (400)',
        value: 'font-medium',
      },
      {
        label: 'Font Weight: Semi-bold (500)',
        value: 'font-semibold',
      },
      {
        label: 'Font Weight: Bold (600)',
        value: 'font-bold',
      },
      {
        label: 'Font Weight: Extra-bold (700)',
        value: 'font-extrabold',
      },
      {
        label: 'Font Weight: Black (800)',
        value: 'font-black',
      },
      {
        label: 'Large Screen: Font Weight Medium (400)',
        value: 'lg:font-medium',
      },
      {
        label: 'Large Screen: Font Weight Semi-bold (500)',
        value: 'lg:font-semibold',
      },
      {
        label: 'Large Screen: Font Weight Bold (600)',
        value: 'lg:font-bold',
      },
      {
        label: 'Large Screen: Font Weight Extra-bold (700)',
        value: 'lg:font-extrabold',
      },
      {
        label: 'Large Screen: Font Weight Black (800)',
        value: 'lg:font-black',
      },
      {
        label: 'Font: Jost',
        value: 'font-jost',
      },
      {
        label: 'Font: Urbanist',
        value: 'font-urbanist',
      },
      {
        label: 'Font: Ubuntu',
        value: 'font-ubuntu',
      },
      {
        label: 'Font: Inter',
        value: 'font-inter',
      },
      // Padding Top Options
      { label: 'Padding Top - None', value: 'pt-0' },
      { label: 'Padding Top - Extra Small (1)', value: 'pt-1' },
      { label: 'Padding Top - Small (2)', value: 'pt-2' },
      { label: 'Padding Top - Medium (4)', value: 'pt-4' },
      { label: 'Padding Top - Large (6)', value: 'pt-6' },
      { label: 'Padding Top - Extra Large (8)', value: 'pt-8' },
      { label: 'Padding Top - 2XL (10)', value: 'pt-10' },
      { label: 'Padding Top - 3XL (12)', value: 'pt-12' },
      { label: 'Padding Top - 4XL (16)', value: 'pt-16' },
      { label: 'Padding Top - 5XL (20)', value: 'pt-20' },
      { label: 'Padding Top - 6XL (24)', value: 'pt-24' },
      { label: 'Padding Top - 7XL (32)', value: 'pt-32' },
      { label: 'Padding Top - 8XL (40)', value: 'pt-40' },

      // Padding Top for Medium Screens
      { label: 'Padding Top (md) - None', value: 'md:pt-0' },
      { label: 'Padding Top (md) - Extra Small (1)', value: 'md:pt-1' },
      { label: 'Padding Top (md) - Small (2)', value: 'md:pt-2' },
      { label: 'Padding Top (md) - Medium (4)', value: 'md:pt-4' },
      { label: 'Padding Top (md) - Large (6)', value: 'md:pt-6' },
      { label: 'Padding Top (md) - Extra Large (8)', value: 'md:pt-8' },
      { label: 'Padding Top (md) - 2XL (10)', value: 'md:pt-10' },
      { label: 'Padding Top (md) - 3XL (12)', value: 'md:pt-12' },
      { label: 'Padding Top (md) - 4XL (16)', value: 'md:pt-16' },
      { label: 'Padding Top (md) - 5XL (20)', value: 'md:pt-20' },
      { label: 'Padding Top (md) - 6XL (24)', value: 'md:pt-24' },
      { label: 'Padding Top (md) - 7XL (32)', value: 'md:pt-32' },
      { label: 'Padding Top (md) - 8XL (40)', value: 'md:pt-40' },

      // Padding Top for Large Screens
      { label: 'Padding Top (lg) - None', value: 'lg:pt-0' },
      { label: 'Padding Top (lg) - Extra Small (1)', value: 'lg:pt-1' },
      { label: 'Padding Top (lg) - Small (2)', value: 'lg:pt-2' },
      { label: 'Padding Top (lg) - Medium (4)', value: 'lg:pt-4' },
      { label: 'Padding Top (lg) - Large (6)', value: 'lg:pt-6' },
      { label: 'Padding Top (lg) - Extra Large (8)', value: 'lg:pt-8' },
      { label: 'Padding Top (lg) - 2XL (10)', value: 'lg:pt-10' },
      { label: 'Padding Top (lg) - 3XL (12)', value: 'lg:pt-12' },
      { label: 'Padding Top (lg) - 4XL (16)', value: 'lg:pt-16' },
      { label: 'Padding Top (lg) - 5XL (20)', value: 'lg:pt-20' },
      { label: 'Padding Top (lg) - 6XL (24)', value: 'lg:pt-24' },
      { label: 'Padding Top (lg) - 7XL (32)', value: 'lg:pt-32' },
      { label: 'Padding Top (lg) - 8XL (40)', value: 'lg:pt-40' },

      // Padding Bottom Options
      { label: 'Padding Bottom - None', value: 'pb-0' },
      { label: 'Padding Bottom - Extra Small (1)', value: 'pb-1' },
      { label: 'Padding Bottom - Small (2)', value: 'pb-2' },
      { label: 'Padding Bottom - Medium (4)', value: 'pb-4' },
      { label: 'Padding Bottom - Large (6)', value: 'pb-6' },
      { label: 'Padding Bottom - Extra Large (8)', value: 'pb-8' },
      { label: 'Padding Bottom - 2XL (10)', value: 'pb-10' },
      { label: 'Padding Bottom - 3XL (12)', value: 'pb-12' },
      { label: 'Padding Bottom - 4XL (16)', value: 'pb-16' },
      { label: 'Padding Bottom - 5XL (20)', value: 'pb-20' },
      { label: 'Padding Bottom - 6XL (24)', value: 'pb-24' },
      { label: 'Padding Bottom - 7XL (32)', value: 'pb-32' },
      { label: 'Padding Bottom - 8XL (40)', value: 'pb-40' },

      // Padding Bottom for Medium Screens
      { label: 'Padding Bottom (md) - None', value: 'md:pb-0' },
      { label: 'Padding Bottom (md) - Extra Small (1)', value: 'md:pb-1' },
      { label: 'Padding Bottom (md) - Small (2)', value: 'md:pb-2' },
      { label: 'Padding Bottom (md) - Medium (4)', value: 'md:pb-4' },
      { label: 'Padding Bottom (md) - Large (6)', value: 'md:pb-6' },
      { label: 'Padding Bottom (md) - Extra Large (8)', value: 'md:pb-8' },
      { label: 'Padding Bottom (md) - 2XL (10)', value: 'md:pb-10' },
      { label: 'Padding Bottom (md) - 3XL (12)', value: 'md:pb-12' },
      { label: 'Padding Bottom (md) - 4XL (16)', value: 'md:pb-16' },
      { label: 'Padding Bottom (md) - 5XL (20)', value: 'md:pb-20' },
      { label: 'Padding Bottom (md) - 6XL (24)', value: 'md:pb-24' },
      { label: 'Padding Bottom (md) - 7XL (32)', value: 'md:pb-32' },
      { label: 'Padding Bottom (md) - 8XL (40)', value: 'md:pb-40' },

      // Padding Bottom for Large Screens
      { label: 'Padding Bottom (lg) - None', value: 'lg:pb-0' },
      { label: 'Padding Bottom (lg) - Extra Small (1)', value: 'lg:pb-1' },
      { label: 'Padding Bottom (lg) - Small (2)', value: 'lg:pb-2' },
      { label: 'Padding Bottom (lg) - Medium (4)', value: 'lg:pb-4' },
      { label: 'Padding Bottom (lg) - Large (6)', value: 'lg:pb-6' },
      { label: 'Padding Bottom (lg) - Extra Large (8)', value: 'lg:pb-8' },
      { label: 'Padding Bottom (lg) - 2XL (10)', value: 'lg:pb-10' },
      { label: 'Padding Bottom (lg) - 3XL (12)', value: 'lg:pb-12' },
      { label: 'Padding Bottom (lg) - 4XL (16)', value: 'lg:pb-16' },
      { label: 'Padding Bottom (lg) - 5XL (20)', value: 'lg:pb-20' },
      { label: 'Padding Bottom (lg) - 6XL (24)', value: 'lg:pb-24' },
      { label: 'Padding Bottom (lg) - 7XL (32)', value: 'lg:pb-32' },
      { label: 'Padding Bottom (lg) - 8XL (40)', value: 'lg:pb-40' },
    ],
    hasMany: true,
  },
  linkGroup({
    appearances: ['default', 'outline'],
    overrides: {
      maxRows: 2,
      required: false,
    },
  }),
]

export const VerticalCallToAction: Block = {
  slug: 'vcta',
  interfaceName: 'VerticalCallToActionBlock',
  fields: VerticalCTAFields,
  labels: {
    plural: 'Vertical Calls to Action',
    singular: 'Vertical Call to Action',
  },
}
