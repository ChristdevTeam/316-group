import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import Image from 'next/image'
import { CollectionArchive } from '@/components/CollectionArchive'
import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { paddingGenerator } from '@/utilities/paddingGenerator'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    backgroundMedia,
    backgroundType,
    sectionBackgroundColor,
    paddingType,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  function getBestContrastTextColor(bgClass: string | null | undefined): string {
    // Extract the suffix after the last "-"
    if (bgClass) {
      const bgSuffix = bgClass.split('-').pop()

      // Handle special cases explicitly
      switch (bgSuffix) {
        case 'inherit':
        case 'current':
          // Assume text color is inherited and doesn't need adjustment
          return 'text-inherit'
        case 'transparent':
          // Transparent background; text color depends on the underlying content
          return 'text-black'
        case 'black':
          return 'text-white'
        case 'white':
          return 'text-black'
        default:
          // Numeric or color suffixes
          const numericValue = parseInt(bgSuffix || '', 10)
          if (!isNaN(numericValue)) {
            // For numeric suffixes, decide based on brightness threshold
            return numericValue >= 500 ? 'text-white' : 'text-black'
          }

          // Fallback for unknown cases
          console.warn(`Unknown or unsupported background class: ${bgClass}`)
          return 'text-black'
      }
    }
    return ''
  }

  // Render background media
  const renderBackgroundMedia = () => {
    if (!backgroundMedia || typeof backgroundMedia === 'string') return null

    const { mimeType, url } = backgroundMedia

    if (mimeType?.startsWith('image/') && url) {
      return (
        <Image
          src={url}
          fill
          alt={backgroundMedia.alt ? backgroundMedia.alt : 'background image'}
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
        />
      )
    } else if (mimeType?.startsWith('video/') && url) {
      return (
        <video
          src={url}
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
          autoPlay
          muted
          loop
          playsInline
        />
      )
    }

    console.warn('Unsupported media type:', mimeType)
    return null
  }

  return (
    <div
      className={cn(
        'w-full relative',
        backgroundType === 'color' && sectionBackgroundColor,
        backgroundType === 'color' && getBestContrastTextColor(sectionBackgroundColor),
        backgroundType === 'media' && 'text-white',
        paddingGenerator(paddingType),
      )}
      id={`block-${id}`}
    >
      {backgroundType === 'media' && renderBackgroundMedia()}
      {introContent && (
        <div className="container max-w-screen-2xl mb-16 z-5 flex gap-8 flex-col sm:flex-row justify-between">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />

          <Link href={'/posts'}>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 relative transition-all"
            >
              <span>See All</span>
              <span className="text-xl transform transition-transform duration-300 ease-in-out hover:translate-x-2">
                →
              </span>
            </Button>
          </Link>
        </div>
      )}
      <CollectionArchive posts={posts} className="z-5" />
    </div>
  )
}
