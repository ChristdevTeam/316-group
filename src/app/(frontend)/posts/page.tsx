import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
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

  const spotlight = await payload.find({
    collection: 'posts',
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
  } = settings.blogArchiveHeroContent

  const footer = settings.blogArchiveFooter

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
          'flex flex-col justify-center items-center text-white',
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
        <CollectionArchive
          heading="Spotlight"
          posts={spotlight.docs}
          className="mt-16 mb-16 lg:mb-24 lg:mt-24"
        />
      )}
      <div className="container pt-8 mb-8 max-w-screen-2xl">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>
      <CollectionArchive heading="Latest Stories" posts={posts.docs} />

      <div className="container mb-16 max-w-screen-2xl xl:mb-24">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
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
                  className={cn(
                    typeof footer.titleClasses === 'object' && footer.titleClasses?.classes,
                    'text-white',
                  )}
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
    title: `Blog - 316 Group`,
  }
}
