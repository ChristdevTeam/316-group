import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const {
    categories,
    hero: { image, description },
    title,
  } = post

  return (
    <div className="bg-blue-900 py-16 lg:py-24">
      <div className="container max-w-screen-2xl flex flex-col lg:flex-row  justify-between items-center gap-6 md:gap-8 lg:gap-16">
        <div className="text-white pb-8">
          <div className="uppercase text-base mb-6">
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
          <div className="space-y-4 md:space-y-8">
            <h1 className="mb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
              {title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl">{description}</p>
          </div>
        </div>
        <div className="lg:min-w-[45%]">
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
