import type { ShowcaseBlock as ShowcaseBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/cn'
import React from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'

type Props = {
  className?: string
} & ShowcaseBlockProps

export const ShowcaseBlock: React.FC<Props> = ({
  className,
  title,
  titleClasses,
  showcaseItems,
  paddingType,
  backgroundType,
  sectionBackgroundColor,
  backgroundMedia,
}) => {
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
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
        backgroundType === 'color' && sectionBackgroundColor,
        backgroundType === 'color' && getBestContrastTextColor(sectionBackgroundColor),
        backgroundType === 'media' && 'text-white',
        className,
      )}
    >
      {backgroundType === 'media' && renderBackgroundMedia()}
      <div className="container max-w-screen-2xl z-5">
        <h2 className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }} />
        <div className="flex flex-col lg:flex-row gap-0 justify-between items-stretch">
          {showcaseItems.map((item, index) => {
            if (item.itemType === 'showcase') {
              return (
                <div key={index} className="flex flex-col gap-4 p-6 md:w-[50%] m-auto lg:w-[30%]">
                  {item.showcaseItem?.image && typeof item.showcaseItem?.image !== 'string' && (
                    <div className="flex justify-center items-center">
                      <Media
                        resource={item.showcaseItem?.image}
                        className="w-[60px] h-[60px] object-fit"
                      />
                    </div>
                  )}

                  {item.showcaseItem?.itemTitle && (
                    <h3
                      className={cn(item.showcaseItem?.itemTitleClasses)}
                      dangerouslySetInnerHTML={{ __html: item.showcaseItem?.itemTitle }}
                    />
                  )}
                  {item.showcaseItem?.description && (
                    <p
                      className={cn(item.showcaseItem?.descriptionClasses)}
                      dangerouslySetInnerHTML={{ __html: item.showcaseItem?.description }}
                    />
                  )}
                </div>
              )
            }
            if (item.itemType === 'divider') {
              return (
                <div
                  key={index}
                  className={cn('lg:h-45 h-36 w-[2px] rounded-full m-auto', item.dividerColor)}
                ></div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
