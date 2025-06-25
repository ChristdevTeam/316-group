import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { GuideCollectionArchive } from '@/components/GuideCollectionArchive'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const ebooksAndGuides = await payload.find({
    collection: 'ebooks-and-guides',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  const spotlight = await payload.find({
    collection: 'ebooks-and-guides',
    depth: 1,
    limit: 3,
    overrideAccess: false,
    where: {
      spotlight: {
        equals: true,
      },
    },
  })
  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 3,
  })
  const {
    pageTitle,
    pageTitleClasses,
    sectionBackgroundColor,
    subtitle,
    subtitleClasses,
    title,
    titleClasses,
    description,
    descriptionClasses,
  } = settings.ebooksAndGuidesArchiveHeroContent

  const footer = settings.ebooksAndGuidesArchiveFooter
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      {pageTitle && (
        <div className="container max-w-screen-2xl">
          <h1 dangerouslySetInnerHTML={{ __html: pageTitle }} className={cn(pageTitleClasses)}></h1>
        </div>
      )}
      <div
        className={cn(
          'w-full min-h-[60dvh]',
          sectionBackgroundColor,
          'flex flex-col justify-center items-center',
        )}
      >
        <div className="container max-w-screen-2xl">
          {subtitle && (
            <div className={cn('flex gap-4 justify-center items-center md:gap-6', subtitleClasses)}>
              <div className="w-6 h-6 bg-lime-400"></div>
              <h2 dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
          )}
          {title && (
            <h1 dangerouslySetInnerHTML={{ __html: title }} className={cn(titleClasses)}></h1>
          )}
          {description && (
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className={cn(descriptionClasses)}
            ></p>
          )}
        </div>
      </div>

      {spotlight.docs.length > 0 && (
        <GuideCollectionArchive
          heading="Spotlight"
          guides={spotlight.docs}
          className="mt-16 mb-16 lg:mb-24 lg:mt-24"
        />
      )}

      <div className="container mb-8">
        <PageRange
          collection="ebooks-and-guides"
          currentPage={ebooksAndGuides.page}
          limit={12}
          totalDocs={ebooksAndGuides.totalDocs}
        />
      </div>

      <GuideCollectionArchive guides={ebooksAndGuides.docs} />

      <div className="container">
        {ebooksAndGuides?.page && ebooksAndGuides?.totalPages > 1 && (
          <Pagination page={ebooksAndGuides.page} totalPages={ebooksAndGuides.totalPages} />
        )}
      </div>

      {footer && (
        <div className={cn('py-16 lg:py-24', footer.sectionBackgroundColor)}>
          <div className="container grid gap-8 max-w-screen-2xl lg:grid-cols-2 md:gap-10 xl:gap-16">
            {footer.image && <Media resource={footer.image} imgClassName="" />}

            <div className="space-y-6 xl:space-y-8 2xl:space-y-12">
              {footer.links &&
                footer.links.map(({ link, buttonClasses }, index) => (
                  <div key={index}>
                    <CMSLink {...link} className={cn(buttonClasses)}></CMSLink>
                  </div>
                ))}
              {footer.title && (
                <h3
                  dangerouslySetInnerHTML={{ __html: footer.title }}
                  className={cn(footer.titleClasses)}
                ></h3>
              )}
              {footer.description && (
                <RichText
                  enableGutter={false}
                  enableProse={false}
                  content={footer.description}
                  className={cn(footer.descriptionClasses)}
                ></RichText>
              )}
              <div>
                {typeof footer.download === 'object' && footer.download.filename && (
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${footer.download.filename}`}
                    download
                    className="mt-4 text-lg font-semibold text-white underline lg:mt-10 md:text-xl"
                  >
                    Download
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Guides & Downloads Page ${pageNumber || ''} - 316 Group`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'ebooks-and-guides',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
