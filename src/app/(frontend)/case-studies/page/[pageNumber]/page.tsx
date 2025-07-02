import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import CaseStudyCard from '@/components/CaseStudyCard'
import PageClient from '../../page.client'

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

  const caseStudyDocs: PaginatedDocs = await payload.find({
    collection: 'case-studies',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    sort: '-createdAt',
  })

  const caseStudies = caseStudyDocs.docs

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Case Studies</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="case-studies"
          currentPage={caseStudyDocs.page}
          limit={12}
          totalDocs={caseStudyDocs.totalDocs}
        />
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

      <div className="container">
        {caseStudyDocs?.page && caseStudyDocs?.totalPages > 1 && (
          <Pagination page={caseStudyDocs.page} totalPages={caseStudyDocs.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Case Studies Page ${pageNumber || ''} - 316 Group`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'case-studies',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
