import type {
  CaseStudy,
  CaseStudyArchiveBlock as CaseStudyArchiveBlockProps,
} from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import CaseStudyCard from '@/components/CaseStudyCard'

export const CaseStudyArchiveBlock: React.FC<
  CaseStudyArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    tags,
    heading,
    headingStyles,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    backgroundMedia,
    backgroundType,
    sectionBackgroundColor,
    paddingType,
  } = props
  const limit = limitFromProps || 3

  let caseStudies: CaseStudy[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedTags = tags?.map((tag) => {
      if (typeof tag === 'object') return tag.id
      else return tag
    })

    const fetchedCaseStudies = await payload.find({
      collection: 'case-studies',
      limit,
      ...(flattenedTags && flattenedTags.length > 0
        ? {
            where: {
              tags: {
                in: flattenedTags,
              },
            },
          }
        : {}),
    })

    caseStudies = fetchedCaseStudies.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedCaseStudies = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as CaseStudy[]

      caseStudies = filteredSelectedCaseStudies
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
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
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

          <Link href={'/case-studies'}>
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
      <div className="container max-w-screen-2xl pt-8 z-5 grid gap-8 grid-cols-1">
        {caseStudies.map((caseStudy, index) => {
          // console.log(caseStudy)
          return (
            <div key={index}>
              <CaseStudyCard doc={caseStudy}></CaseStudyCard>
            </div>
          )
        })}
      </div>
    </div>
  )
}
