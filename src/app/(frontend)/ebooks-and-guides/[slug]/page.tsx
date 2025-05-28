import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { GuidesHero } from '@/heros/GuidesHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { RenderPostBlocks } from '@/blocks/RenderPostBlocks'
import { GuideCollectionArchive } from '@/components/GuideCollectionArchive'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const ebooksAndGuides = await payload.find({
    collection: 'ebooks-and-guides',
    draft: false,
    limit: 1000,
    depth: 2,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = ebooksAndGuides.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function EbookAndGuide({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/ebooks-and-guides/' + slug
  const ebookAndGuide = await queryEbookAndGuideBySlug({ slug })

  if (!ebookAndGuide) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <GuidesHero doc={ebookAndGuide} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <RenderPostBlocks blocks={ebookAndGuide.items} />
        <div className="container max-w-screen-2xl">
          {ebookAndGuide.relatedEbooksAndGuides &&
            ebookAndGuide.relatedEbooksAndGuides.length > 0 && (
              <GuideCollectionArchive
                className="mt-12 lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                guides={ebookAndGuide.relatedEbooksAndGuides.filter(
                  (item) => typeof item === 'object',
                )}
                heading="Browse more guides & reports "
              />
            )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const ebookAndGuide = await queryEbookAndGuideBySlug({ slug })

  return generateMeta({ doc: ebookAndGuide })
}

const queryEbookAndGuideBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'ebooks-and-guides',
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    pagination: false,

    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
