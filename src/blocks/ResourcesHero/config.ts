import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'
import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ResourcesHeroBlock: Block = {
  slug: 'resourcesHero',
  interfaceName: 'ResourcesHeroBlock',
  fields: [
    {
      name: 'mainTitle',
      type: 'text',
      defaultValue: 'Resources',
      required: true,
    },
    { name: 'mainTitleStyle', type: 'relationship', relationTo: 'text-styles' },
    bgColorPickerAll({
      overrides: {
        defaultValue: 'bg-blue-800',
      },
    }),
    {
      name: 'title',
      type: 'text',
      defaultValue:
        'We back <span class="text-green-600">disruptive</span> products and founders in retail',
      required: true,
    },
    { name: 'titleStyle', type: 'relationship', relationTo: 'text-styles' },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: () => [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature({
            enabledCollections: ['pages', 'posts', 'case-studies', 'ebooks-and-guides'],
          }),
        ],
      }),
    },
    { name: 'descriptionStyle', type: 'relationship', relationTo: 'text-styles' },
    {
      name: 'swiperData',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'We back  disruptive products and founders in retail',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: () => [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              LinkFeature({
                enabledCollections: ['pages', 'posts', 'case-studies', 'ebooks-and-guides'],
              }),
            ],
          }),
        },
        linkGroup(),
      ],
    },
  ],
}
