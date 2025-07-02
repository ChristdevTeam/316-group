import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { GuideCollectionArchive } from '@/components/GuideCollectionArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const ebooksAndGuides: PaginatedDocs = await payload.find({
    collection: 'ebooks-and-guides',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    where: {
      spotlight: {
        not_equals: true,
      },
    },
  })

  const spotlight: PaginatedDocs = await payload.find({
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
    <div>
      <PageClient />
      {pageTitle && (
        <div className="container max-w-screen-2xl">
          <h1
            dangerouslySetInnerHTML={{ __html: pageTitle }}
            className={cn(typeof pageTitleClasses === 'object' ? pageTitleClasses?.classes : '')}
          ></h1>
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
      <div className="container pt-8 mb-8 max-w-screen-2xl">
        <PageRange
          collection="ebooks-and-guides"
          currentPage={ebooksAndGuides.page}
          limit={12}
          totalDocs={ebooksAndGuides.totalDocs}
        />
      </div>
      <GuideCollectionArchive heading="Latest Guides & Downloads" guides={ebooksAndGuides.docs} />

      <div className="container mb-16 max-w-screen-2xl xl:mb-24">
        {ebooksAndGuides.totalPages > 1 && ebooksAndGuides.page && (
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

export function generateMetadata(): Metadata {
  return {
    title: `Guides & Downloads - 316 Group`,
  }
}
