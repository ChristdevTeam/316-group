import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { Block } from 'payload'
export const EbooksAndGuidesArchive: Block = {
  slug: 'ebooksAndGuidesArchive',
  interfaceName: 'EbooksAndGuidesArchiveBlock',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Ebooks & Guides', required: true },
    {
      name: 'headingStyles',
      type: 'relationship',
      relationTo: 'text-styles',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.heading && siblingData.heading !== '',
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'ebooks-and-Guides',
      label: 'Collections To Show',
      options: [
        {
          label: 'Ebooks and Guides',
          value: 'ebooks-and-Guides',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['ebooks-and-guides'],
    },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Media', value: 'media' },
      ],
    },
    bgColorPickerAll({
      overrides: {
        label: 'Content Background Color',
        name: 'sectionBackgroundColor',
        admin: {
          condition: (_, { backgroundType }) => backgroundType === 'color',
        },
      },
    }),
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
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
}
