import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { BrandHero } from '@/components/Brand/BrandHero'
import { BrandPillars } from '@/components/Brand/BrandPillars'
import { BrandSectionSplit } from '@/components/Brand/BrandSectionSplit'
import { BrandGallery } from '@/components/Brand/BrandGallery'
import { BrandFullscreen } from '@/components/Brand/BrandFullscreen'
import { BrandMixed } from '@/components/Brand/BrandMixed'
import { BrandFinal } from '@/components/Brand/BrandFinal'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const brands = await payload.find({
    collection: 'brands',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = brands.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function BrandPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/brands/' + slug
  const brand = await queryBrandBySlug({ slug })

  if (!brand) return <PayloadRedirects url={url} />

  return (
    <article className="">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <BrandHero data={brand} />

      {brand.content?.brandPillars && <BrandPillars pillars={brand.content.brandPillars} />}

      {brand.content?.introSection && (
        <section className="py-16 text-center container">
          {brand.content.introSection.title && (
            <h2 className={cn('max-w-4xl mx-auto', brand.content.introSection.titleClassName)}>
              {brand.content.introSection.title}
            </h2>
          )}
          {brand.content.introSection.richText && (
            <div className={cn('max-w-3xl mx-auto', brand.content.introSection.richTextClassName)}>
              <RichText content={brand.content.introSection.richText} />
            </div>
          )}
          {brand.content.introSection.link && (
            <div className="mt-8">
              <CMSLink {...brand.content.introSection.link} />
            </div>
          )}
        </section>
      )}

      <div id="brand-split" className="scroll-mt-24">
        <BrandSectionSplit data={brand.content?.splitSection} />
      </div>

      <BrandGallery data={brand.content?.gallerySection} />

      <div id="brand-fullscreen" className="scroll-mt-24">
        <BrandFullscreen data={brand.content?.fullscreenSection} />
      </div>

      <div id="brand-mixed" className="scroll-mt-24">
        <BrandMixed data={brand.content?.mixedSection} />
      </div>

      <div id="brand-final" className="scroll-mt-24">
        <BrandFinal data={brand.content?.finalSection} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const brand = await queryBrandBySlug({ slug })

  return generateMeta({ doc: brand })
}

const queryBrandBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'brands',
    draft,
    limit: 1,
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
