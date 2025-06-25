import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { getServerSideURL } from '@/utilities/getURL'
import { BusinessSlider } from '@/blocks/BusinessSlider/config'
import { HoverSliderBlock } from '@/blocks/HoverSlider/config'
import { ServicesAccordion } from '@/blocks/ServicesAccordion/config'
import { ContentClipPath } from '@/blocks/ContentClipPath/config'
import { FullCardGradient } from '@/blocks/FullCardGradient/config'
import { BusinessSlider2 } from '@/blocks/BusinessSlider2/config'
import { Showcase } from '@/blocks/Showcase/config'
import { GlobalAccounts } from '@/blocks/GlobalAccounts/config'
import { AnimatedText } from '@/blocks/Animatedtext/config'
import { Numbers } from '@/blocks/Numbers/config'
import { TabBlock } from '@/blocks/TabBlock/config'
import { InteractiveMediaGrid } from '@/blocks/InteractiveMediaGrid/config'
import { TestimonialSlider } from '@/blocks/TestimonialSlider/config'
import { SpacingBlock } from '@/blocks/SpacingBlock/config'
import { CaseStudyArchive } from '@/blocks/CaseStudyArchiveBlock/config'
import { ResourcesHeroBlock } from '@/blocks/ResourcesHero/config'
import { EbooksAndGuidesArchive } from '@/blocks/EbooksAndGuidesArchiveBlock/config'
import { ContentWithForm } from '@/blocks/ContentWithForm/config'
// import { VerticalCallToAction } from '@/blocks/VerticalCTA/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pagess'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                ResourcesHeroBlock,
                Archive,
                CallToAction,
                Content,
                ContentWithForm,
                EbooksAndGuidesArchive,
                FormBlock,
                MediaBlock,
                BusinessSlider,
                BusinessSlider2,
                HoverSliderBlock,
                ServicesAccordion,
                ContentClipPath,
                FullCardGradient,
                Showcase,
                GlobalAccounts,
                AnimatedText,
                Numbers,
                TabBlock,
                InteractiveMediaGrid,
                TestimonialSlider,
                SpacingBlock,
                CaseStudyArchive,
              ],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
