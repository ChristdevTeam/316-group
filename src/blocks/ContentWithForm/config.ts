import type { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { linkGroup } from '@/fields/linkGroup'
import { gradientClasses } from '@/fields/gradientClasses'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContentWithForm: Block = {
  slug: 'contentWithForm',
  interfaceName: 'ContentWithFormBlock',
  fields: [
    {
      name: 'leftColumnItems',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'itemType',
          type: 'radio',
          options: [
            {
              label: 'Text',
              value: 'text',
            },
            {
              label: 'Logos',
              value: 'logos',
            },
            {
              label: 'Buttons',
              value: 'buttons',
            },
          ],
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            condition: (_, { itemType }) => itemType === 'text',
          },
        },
        {
          name: 'textStyle',
          type: 'relationship',
          relationTo: 'text-styles',
          admin: {
            condition: (_, { itemType }) => itemType === 'text',
          },
        },

        linkGroup({
          overrides: {
            name: 'links',
            label: 'Links',
            admin: {
              condition: (_, { itemType }) => itemType === 'buttons',
            },
          },
        }),
        {
          name: 'logoImages',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          admin: {
            description: 'Logos that will be displayed horizontally',
            condition: (_, { itemType }) => itemType === 'logos',
          },
        },
      ],
    },
    {
      name: 'formBlock',
      type: 'group',
      fields: [
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
        },
        {
          name: 'enableIntro',
          type: 'checkbox',
          required: true,
          defaultValue: true,
          label: 'Enable Intro Content',
        },
        {
          name: 'introContent',
          type: 'richText',
          required: true,
          admin: {
            condition: (_, { enableIntro }) => Boolean(enableIntro),
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                AlignFeature(),
              ]
            },
          }),
        },
        {
          name: 'disappearingIntroOnSubmit',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
        {
          name: 'enableSpecialConfirmation',
          type: 'checkbox',
          defaultValue: false,
          required: true,
          label: 'Enable Special Confirmation',
          admin: {
            description: 'Use custom confirmation instead of default form confirmation',
          },
        },
        {
          name: 'specialConfirmationTitle',
          type: 'text',
          label: 'Confirmation Title',
          required: true,
          admin: {
            condition: (_, { enableSpecialConfirmation }) => Boolean(enableSpecialConfirmation),
          },
        },
        {
          name: 'specialConfirmationDescription',
          type: 'textarea',
          label: 'Confirmation Description',
          required: true,
          admin: {
            condition: (_, { enableSpecialConfirmation }) => Boolean(enableSpecialConfirmation),
          },
        },
        {
          name: 'enableConfirmationCard',
          type: 'checkbox',
          defaultValue: false,
          required: true,
          label: 'Show Card in Confirmation',
          admin: {
            condition: (_, { enableSpecialConfirmation }) => Boolean(enableSpecialConfirmation),
          },
        },
        {
          name: 'confirmationCardType',
          type: 'select',
          label: 'Card Type',
          required: true,
          options: [
            { label: 'Post', value: 'Post' },
            { label: 'Ebooks and Guides', value: 'EbooksAndGuide' },
            { label: 'Case Study', value: 'CaseStudy' },
          ],
          admin: {
            condition: (_, { enableSpecialConfirmation, enableConfirmationCard }) =>
              Boolean(enableSpecialConfirmation) && Boolean(enableConfirmationCard),
          },
        },
        {
          name: 'confirmationCardData',
          type: 'relationship',
          label: 'Card Data',
          required: true,
          relationTo: ['posts', 'ebooks-and-guides', 'case-studies'],
          admin: {
            condition: (_, { enableSpecialConfirmation, enableConfirmationCard }) =>
              Boolean(enableSpecialConfirmation) && Boolean(enableConfirmationCard),
          },
        },
      ],
    },
    {
      name: 'leftColumnAlignment',
      type: 'select',
      defaultValue: 'center',
      required: true,
      options: [
        { label: 'Top', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'end' },
      ],
    },
    {
      name: 'formOverflowAmount',
      type: 'select',
      defaultValue: 'medium',
      required: true,
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        description: 'How much the form should overflow out of the section',
      },
    },
    gradientClasses({
      overrides: {
        name: 'backgroundGradient',
        label: 'Section Background Gradient',
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
}
