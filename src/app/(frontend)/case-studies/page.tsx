import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cn } from '@/utilities/cn'
import PageClient from './page.client'
import CaseStudyCard from '@/components/CaseStudyCard'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

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
  } = settings.caseStudyArchiveHeroContent
  const footer = settings.caseStudyArchiveFooter

  const caseStudyDocs = await payload.find({
    collection: 'case-studies',
    limit: 1000,
    sort: '-createdAt',
  })
  const caseStudies = caseStudyDocs.docs

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

      <div className="container py-16 space-y-8 max-w-screen-2xl md:space-y-12 xl:space-y-16 xl:py-24">
        {caseStudies.map((caseStudy, index) => {
          const doc = {
            title: caseStudy.title,
            heroImage: caseStudy.heroImage,
            tags: caseStudy.tags,
            slug: caseStudy.slug,
            excerpt: caseStudy.excerpt,
            download: caseStudy.download,
          }
          return (
            <div key={index}>
              <CaseStudyCard doc={doc}></CaseStudyCard>
            </div>
          )
        })}
      </div>
      {footer && (
        <div className={cn('py-16 lg:py-24', footer.sectionBackgroundColor)}>
          <div className="container grid gap-8 max-w-screen-2xl lg:grid-cols-2 md:gap-10 xl:gap-16">
            {footer.image && <Media resource={footer.image} imgClassName="" />}

            <div className="flex flex-col justify-center space-y-6 xl:space-y-8">
              {footer.title && (
                <h3
                  dangerouslySetInnerHTML={{ __html: footer.title }}
                  className={cn(footer.titleClasses, 'w-7/10')}
                ></h3>
              )}

              {footer.links &&
                footer.links.map(({ link, buttonClasses }, index) => (
                  <div key={index}>
                    <CMSLink {...link} className={cn(buttonClasses)}></CMSLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Case Studies - 316 Group`,
  }
}
