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
            <div className={cn('flex justify-center items-center gap-4 md:gap-6', subtitleClasses)}>
              <div className="h-6 w-6 bg-lime-400"></div>
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

      <CollectionArchive
        heading="Spotlight"
        posts={spotlight.docs}
        className="mb-16 lg:mb-24 mt-16 lg:mt-24"
      />
      <div className="container max-w-screen-2xl mb-8 pt-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>
      <CollectionArchive heading="Latest Stories" posts={posts.docs} />

      <div className="container max-w-screen-2xl mb-16 xl:mb-24">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
      {footer && (
        <div className={cn('py-16 lg:py-24', footer.sectionBackgroundColor)}>
          <div className="container max-w-screen-2xl grid lg:grid-cols-2 gap-8 md:gap-10 xl:gap-16">
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
                    className="mt-4 lg:mt-10 text-lg md:text-xl text-white underline font-semibold"
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
