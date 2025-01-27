'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '../ui/button'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-xl overflow-hidden bg-white 0 hover:cursor-pointer flex flex-col h-full shadow-md hover:shadow-xl scale-100 hover:scale-105 transition-all duration-300',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4 absolute top-6 right-0">
            {showCategories && hasCategories && (
              <div className="bg-[#2374D7] px-4 py-3 text-white">
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-6 md:p-8">
        <div className=" flex-grow">
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose text-3xl text-extrabold" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {description && (
            <div className="my-2">{description && <p>{sanitizedDescription}</p>}</div>
          )}
        </div>

        <Link href={href} ref={link.ref} className="mt-auto">
          <Button variant={'default'} className="rounded-full bg-blue-800 mt-4">
            Learn More
          </Button>
        </Link>
      </div>
    </article>
  )
}
