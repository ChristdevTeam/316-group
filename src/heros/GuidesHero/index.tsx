'use client'
import { EbooksAndGuide } from '@/payload-types'
import { Media } from '@/components/Media'
import React from 'react'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

export const GuidesHero: React.FC<{ doc: EbooksAndGuide }> = ({ doc }) => {
  const {
    title,
    hero: { image, description },
    categories,
  } = doc
  return (
    <div className="bg-blue-900 py-16 lg:py-24">
      <div className="container max-w-screen-2xl flex flex-col lg:flex-row  justify-between items-center gap-6 md:gap-8 lg:gap-16">
        <div className="text-white pb-8">
          <div className="capitalize text-lg mb-8">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
          <div className="space-y-8 md:space-y-14 xl:max-w-[80%]">
            <h1 className="mb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
              {title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl">{description}</p>

            <button className="bg-slate-950 text-white text-xl">
              <Link href={'#downloadForm'} className="px-10 py-6 flex items-center gap-4">
                {' '}
                Download <ArrowDown />{' '}
              </Link>
            </button>
          </div>
        </div>
        <div className="lg:min-w-[30%]">
          {image && typeof image !== 'string' && (
            <Media
              priority={false}
              loading="lazy"
              imgClassName="-z-10 object-cover"
              resource={image}
            />
          )}
        </div>
      </div>
    </div>
  )
}
