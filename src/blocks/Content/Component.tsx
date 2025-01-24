import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import Image from 'next/image'
import { TestimonialCarousel } from '@/components/ui/testimonial'
import Carousel from '@/components/ui/Carousel'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundMedia, backgroundType, sectionBackgroundColor, paddingType } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }
  const orderClasses = {
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
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
        <div className="flex flex-col gap-6 md:grid md:grid-cols-12 lg:gap-y-12 lg:gap-x-16">
          {columns?.map((col, index) => {
            const size = col.size || 'full'
            const mobileOrder = col.mobileOrder || index + 1
            const orderClass = orderClasses[mobileOrder as keyof typeof orderClasses] || ''

            return (
              <div
                key={index}
                className={cn(
                  'w-full', // Full width on mobile
                  `md:col-span-${colsSpanClasses[size]}`, // Responsive column spans
                  size !== 'full' && 'md:col-span-2', // Half columns
                  orderClass, // Mobile order
                  'md:order-0', // Reset order on desktop
                )}
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

                  if (contentType === 'testimonials' && content.testimonials) {
                    const testimonials = content.testimonials
                    const bgColor = content.testimonialCustomizer?.cardBgColor
                    const textClasses = content.testimonialCustomizer?.textClasses
                    if (bgColor && textClasses) {
                      return (
                        <TestimonialCarousel
                          testimonials={testimonials}
                          testimonialModifier={{ bgColor, textClasses }}
                          showArrows={true}
                          showBars={true}
                          key={index}
                          className="w-[95%] md:w-[70%] lg:[w-60%] m-auto"
                        />
                      )
                    } else
                      return (
                        <TestimonialCarousel
                          testimonials={testimonials}
                          showArrows={true}
                          showBars={true}
                          key={index}
                          className="w-[95%] md:w-[70%] lg:[w-60%] m-auto"
                        />
                      )
                  }

                  if (contentType === 'carousel' && content.carousel) {
                    const carousel = content.carousel

                    return <Carousel key={index} {...carousel} />
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
                              enableProse={false}
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
                        {links.map(({ link, buttonClasses, size }, i) => {
                          return (
                            <div key={i} className="flex">
                              <CMSLink
                                size={size ? size : 'lg'}
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
