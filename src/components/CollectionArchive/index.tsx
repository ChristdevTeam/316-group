import { cn } from 'src/utilities/cn'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Card, CardPostData } from '@/components/Card'
import { CMSLink } from '../Link'
import { Media } from '../Media'
import { Post } from '@/payload-types'

export type Props = {
  className?: string
  posts: Post[]
  heading?: string
}

export const CollectionArchive: React.FC<Props> = async (props) => {
  const { posts, className, heading } = props
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 3,
  })

  const { title, titleClasses, links, image } = settings.blogPostSeparatorContent
  return (
    <div className={cn('container max-w-screen-2xl', className)}>
      {heading && (
        <h2 className="pb-4 mb-8 md:mb-12 xl:mb-16 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white border-b-2 border-foreground">
          {heading}
        </h2>
      )}
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts
            ?.map((result, index) => {
              const items: React.ReactNode[] = []

              if (typeof result === 'object' && result !== null) {
                items.push(
                  <div className="col-span-4" key={index}>
                    <Card className="h-full" doc={result as CardPostData} relationTo="posts" />
                  </div>,
                )
              }

              // Insert full-width component after the first 6 results
              if (index === 5 && posts.length > 6 && image) {
                items.push(
                  <div
                    className="col-span-4 sm:col-span-8 lg:col-span-12 relative my-16"
                    key={`full-width-${index}`}
                  >
                    {/* Full-width background that extends to screen edges */}
                    <div className="absolute inset-0 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen bg-blue-600 dark:bg-blue-800"></div>
                    {/* Content container that respects the grid */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 my-16">
                      <div className="md:col-span-3">
                        <Media resource={image} imgClassName="rounded-sm w-full" />
                      </div>
                      <div className="md:col-span-2 text-white p-8 text-center md:text-left flex flex-col justify-center gap-8 lg:gap-12">
                        <h3
                          className={cn(typeof titleClasses === 'object' && titleClasses.classes)}
                        >
                          {title}
                        </h3>
                        {links?.map(({ link, buttonClasses }, index) => (
                          <div key={index}>
                            <CMSLink {...link} className={cn(buttonClasses)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>,
                )
              }

              return items
            })
            .flat()}
        </div>
      </div>
    </div>
  )
}
