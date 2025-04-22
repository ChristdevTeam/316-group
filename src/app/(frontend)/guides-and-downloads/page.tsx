import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cn } from '@/utilities/cn'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

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

  return (
    <div>
      <PageClient />
      {pageTitle && (
        <div className="container">
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
        <div className="container">
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
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Guides & Downloads - 316 Group`,
  }
}
