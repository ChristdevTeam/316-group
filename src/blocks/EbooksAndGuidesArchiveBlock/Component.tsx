import type {
  EbooksAndGuide,
  EbooksAndGuidesArchiveBlock as EbooksAndGuidesArchiveBlockProps,
} from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/Card'
import { paddingGenerator } from '@/utilities/paddingGenerator'

export const EbooksAndGuidesArchiveBlock: React.FC<
  EbooksAndGuidesArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    populateBy,
    selectedDocs,
    categories,
    limit: limitFromProps,
    heading,
    headingStyles,
    backgroundMedia,
    backgroundType,
    sectionBackgroundColor,
    paddingType,
  } = props

  const limit = limitFromProps || 3

  let ebooksAndGuides: EbooksAndGuide[] = []
  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedEbooksAndGuides = await payload.find({
      collection: 'ebooks-and-guides',
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

    ebooksAndGuides = fetchedEbooksAndGuides.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedDocs = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as EbooksAndGuide[]

      ebooksAndGuides = filteredSelectedDocs
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
      {heading && (
        <div className="container max-w-screen-2xl pb-8 z-5 flex gap-8 flex-col sm:flex-row justify-between">
          <h3
            dangerouslySetInnerHTML={{ __html: heading }}
            className={cn(
              typeof headingStyles === 'object'
                ? headingStyles?.classes
                : 'font-semibold text-2xl md:text-3xl lg:text-4xl',
            )}
          />

          <Link href={'/ebooks-and-guides'}>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 relative transition-all bg-white text-black hover:bg-black hover:text-white"
            >
              <span>See All</span>
              <span className="text-xl transform transition-transform duration-300 ease-in-out hover:translate-x-2">
                →
              </span>
            </Button>
          </Link>
        </div>
      )}
      <div className="container max-w-screen-2xl pt-8 z-5 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {ebooksAndGuides.map((ebooksAndGuide, index) => {
          // console.log(caseStudy)
          return (
            <div key={index}>
              <Card relationTo="ebooks-and-guides" showCategories doc={ebooksAndGuide}></Card>{' '}
            </div>
          )
        })}
      </div>
    </div>
  )
}
