import { CaseStudy } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { Media } from '../Media'
import Link from 'next/link'

type Props = Pick<CaseStudy, 'title' | 'heroImage' | 'tags' | 'slug' | 'excerpt' | 'download'>

const index: React.FC<{
  doc: Props
}> = (props) => {
  const { doc } = props
  const { title, heroImage, tags, slug, excerpt, download } = doc
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2')}>
      <Link
        className="flex justify-center items-center text-white min-h-32 bg-slate-800 relative aspect-[4/3] md:aspect-auto"
        href={`/case-studies/${slug}`}
      >
        <Media imgClassName="fill object-cover" fill resource={heroImage} />
      </Link>
      <div className="flex flex-col gap-6 justify-between items-start p-6 border border-gray-700 lg:gap-6 md:p-8 lg:p-12 xl:p-16">
        <div className="flex gap-4 mt-6 md:mt-0">
          {tags?.map((tag, index) => {
            return (
              <div
                key={index}
                className="flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium border border-slate-950 lg:px-8 lg:py-3"
              >
                {typeof tag === 'string' ? tag : tag.title}
              </div>
            )
          })}
        </div>
        <h3 className="text-xl font-extrabold lg:text-2xl xl:text-3xl">
          <Link className="" href={`/case-studies/${slug}`}>
            {title}
          </Link>
        </h3>
        <p>{excerpt}</p>

        <div className="mb-2 text-base font-bold md:text-lg lg:text-xl xl:text-xl md:mb-0">
          {download ? (
            typeof download === 'object' &&
            download.filename && (
              <a className="border-b-2" href={`/media/${download.filename}`} download>
                Download
              </a>
            )
          ) : (
            <Link className="border-b-2" href={`/case-studies/${slug}`}>
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default index
