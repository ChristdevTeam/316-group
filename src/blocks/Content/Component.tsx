import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import Image from 'next/image'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundMedia, backgroundType, sectionBackgroundColor, paddingType } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
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
      )}
    >
      {backgroundType === 'media' && renderBackgroundMedia()}
      <div className="container max-w-screen-2xl z-5">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-y-12 lg:gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const size = col.size

              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                >
                  {col.columnContent?.map((content, index) => {
                    const { contentType, links, richText, media, verticalCTA } = content

                    if (contentType === 'media' && media && typeof media !== 'string') {
                      return (
                        <div className="rounded-xl overflow-hidden" key={index}>
                          <Media resource={media} size="33vw" imgClassName="rounded-xl" />
                        </div>
                      )
                    }

                    if (contentType === 'richText') {
                      // const richText = content.richText
                      const richTextClasses = content.richTextClasses
                      return (
                        richText && (
                          <RichText
                            content={richText}
                            enableGutter={false}
                            enableProse={false}
                            className={cn(richTextClasses)}
                          />
                        )
                      )
                    }

                    if (contentType === 'verticalCTA') {
                      // const verticalCTA = content.verticalCTA
                      return (
                        verticalCTA && (
                          <div key={index}>
                            {verticalCTA.subtitle && (
                              <p className="lg:text-xl">{verticalCTA.subtitle}</p>
                            )}
                            {verticalCTA.title && (
                              <h3
                                dangerouslySetInnerHTML={{ __html: verticalCTA.title }}
                                className={cn(verticalCTA.titleClasses)}
                              ></h3>
                            )}
                            {verticalCTA.description && (
                              <RichText
                                className={cn(verticalCTA.descriptionClasses)}
                                content={verticalCTA.description}
                                enableGutter={false}
                              />
                            )}
                            <div className="flex gap-8">
                              {(verticalCTA.links || []).map(({ link, buttonClasses }, i) => {
                                return (
                                  <CMSLink
                                    key={i}
                                    size="lg"
                                    {...link}
                                    className={cn(buttonClasses)}
                                  />
                                )
                              })}
                            </div>
                          </div>
                        )
                      )
                    }

                    return (
                      Array.isArray(links) &&
                      links.length > 0 && (
                        <div className="flex gap-4" key={index}>
                          {links.map(({ link, buttonClasses }, i) => {
                            return (
                              <div key={i} className="flex">
                                <CMSLink
                                  size={'sm'}
                                  {...link}
                                  className={cn(
                                    'rounded-xl bg-transparent border-slate-950',
                                    buttonClasses,
                                  )}
                                />
                              </div>
                            )
                          })}
                        </div>
                      )
                    )
                  })}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
