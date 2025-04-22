import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { cn } from '@/utilities/cn'

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

      <div className="container max-w-screen-2xl mb-8 pt-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container max-w-screen-2xl mb-24">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog - 316 Group`,
  }
}
