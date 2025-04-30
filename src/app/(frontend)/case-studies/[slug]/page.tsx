import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

// import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { CaseStudyHero } from '@/heros/CaseStudyHero'
import CompanyInfo from '@/components/CompanyInfo'
import ProcessMapping from '@/components/ProcessMapping'
import ClientObjectives from '@/components/ClientObjectives'
import CTA from '@/components/CTA'
import SolutionAndOutcome from '@/components/SolutionAndOutcome'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = caseStudies.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/case-studies/' + slug
  const caseStudy = await queryCaseStudyBySlug({ slug })

  if (!caseStudy) return <PayloadRedirects url={url} />

  const { companyInfo, processMapping, objectives, callToAction, solutionAndOutcome } = caseStudy

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <CaseStudyHero caseStudy={caseStudy} />
      <CompanyInfo companyInfo={companyInfo} />
      <ProcessMapping processMapping={processMapping} />
      <ClientObjectives objectives={objectives} />
      <CTA cta={callToAction} />
      <SolutionAndOutcome data={solutionAndOutcome} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {caseStudy.relatedCaseStudies && caseStudy.relatedCaseStudies.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={caseStudy.relatedCaseStudies.filter(
                (caseStudy) => typeof caseStudy === 'object',
              )}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const caseStudy = await queryCaseStudyBySlug({ slug })

  return generateMeta({ doc: caseStudy })
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
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

const getCaseStudySinglePageEndingContent = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.findGlobal({
    slug: 'settings',
    depth: 3,
  })
})
