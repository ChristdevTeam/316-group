import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import Image from 'next/image'
import { TestimonialCarousel } from '@/components/ui/testimonial'
import Carousel from '@/components/ui/Carousel'
import CardInvert from '@/components/CardInvert'
import { AutoScrollSlider } from '@/components/AutoScrollSlider'
import { StyledCards } from '@/components/StyledCards'
import { Icon } from '@/components/Icon'
import { SwiperElement } from '@/components/Swiper'
import { paddingGenerator } from '@/utilities/paddingGenerator'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const {
    columns,
    backgroundMedia,
    backgroundType,
    sectionBackgroundColor,
    paddingType,
    bgoverlay,
    gradientSettings,
  } = props

  const colsSpanClasses = {
    full: 'lg:col-span-12 md:col-span-4',
    half: 'lg:col-span-6 md:col-span-4',
    oneThird: 'lg:col-span-4 md:col-span-4',
    twoThirds: 'lg:col-span-8 md:col-span-4',
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
  const mdOrderClasses = {
    1: 'md:order-1',
    2: 'md:order-2',
    3: 'md:order-3',
    4: 'md:order-4',
    5: 'md:order-5',
    6: 'md:order-6',
    7: 'md:order-7',
    8: 'md:order-8',
    9: 'md:order-9',
    10: 'md:order-10',
    11: 'md:order-11',
    12: 'md:order-12',
    13: 'md:order-13',
    14: 'md:order-14',
    15: 'md:order-15',
    16: 'md:order-16',
    17: 'md:order-17',
    18: 'md:order-18',
    19: 'md:order-19',
    20: 'md:order-20',
    21: 'md:order-21',
    22: 'md:order-22',
    23: 'md:order-23',
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
        <>
          <Image
            src={url}
            fill
            alt={backgroundMedia.alt ? backgroundMedia.alt : 'background image'}
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
          />
          <div
            className={cn(
              bgoverlay && 'bg-black/30 absolute inset-0 w-full h-full object-cover z-[-1]',
            )}
          />
        </>
      )
    } else if (mimeType?.startsWith('video/') && url) {
      return (
        <>
          <video
            src={url}
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
            autoPlay
            muted
            loop
            playsInline
          />
          <div
            className={cn(
              bgoverlay && 'bg-black/30 absolute inset-0 w-full h-full object-cover z-[-1]',
            )}
          />
        </>
      )
    }

    console.warn('Unsupported media type:', mimeType)
    return null
  }

  const gradientStyle: React.CSSProperties = {}

  if (backgroundType === 'gradient' && gradientSettings) {
    if (
      gradientSettings.gradientStartPercentage !== undefined &&
      gradientSettings.gradientStartPercentage !== null
    ) {
      // @ts-ignore
      gradientStyle['--tw-gradient-from-position'] = `${gradientSettings.gradientStartPercentage}%`
    }
    if (
      gradientSettings.gradientViaPercentage !== undefined &&
      gradientSettings.gradientViaPercentage !== null
    ) {
      // @ts-ignore
      gradientStyle['--tw-gradient-via-position'] = `${gradientSettings.gradientViaPercentage}%`
    }
    if (
      gradientSettings.gradientStopPercentage !== undefined &&
      gradientSettings.gradientStopPercentage !== null
    ) {
      // @ts-ignore
      gradientStyle['--tw-gradient-to-position'] = `${gradientSettings.gradientStopPercentage}%`
    }
  }

  return (
    <div
      style={gradientStyle}
      className={cn(
        'w-full relative',
        paddingGenerator(paddingType),
        backgroundType === 'color' && sectionBackgroundColor,
        backgroundType === 'color' && getBestContrastTextColor(sectionBackgroundColor),
        backgroundType === 'media' && 'text-white',
        backgroundType === 'gradient' &&
          gradientSettings &&
          cn(
            `bg-gradient-${gradientSettings.gradientDirection}`,
            gradientSettings.gradientStartColor && `from-${gradientSettings.gradientStartColor}`,
            gradientSettings.gradientViaColor && `via-${gradientSettings.gradientViaColor}`,
            gradientSettings.gradientStopColor && `to-${gradientSettings.gradientStopColor}`,
          ),
        backgroundType === 'gradient' &&
          gradientSettings?.gradientStartColor &&
          getBestContrastTextColor(`bg-${gradientSettings.gradientStartColor}`),
      )}
    >
      {backgroundType === 'media' && renderBackgroundMedia()}
      <div className="container max-w-screen-2xl z-5">
        <div className="mobile-only:flex mobile-only:flex-col gap-8 md:grid lg:grid-cols-12 md:grid-cols-4 lg:gap-y-12 lg:gap-x-16">
          {columns?.map((col, index) => {
            const size = col.size || 'full'
            const mobileOrder = col.mobileOrder || index + 1
            const orderClass = orderClasses[mobileOrder as keyof typeof orderClasses] || ''
            const mdOrderClass = mdOrderClasses[index + 1] || 'md:order-0'
            const colWidth = colsSpanClasses[size]
            return (
              <div
                key={index}
                className={cn(
                  colWidth, // Responsive column spans
                  orderClass, // Mobile order
                  mdOrderClass, // Reset order on desktop
                )}
              >
                {col.columnContent?.map((content, index) => {
                  const {
                    contentType,
                    links,
                    richText,
                    media,
                    verticalCTA,
                    cardWithList,
                    linkAlignment,
                    verticalCTABgColor,
                    verticalCTABgOpacity,
                  } = content

                  if (contentType === 'media' && media && typeof media !== 'string') {
                    const { mediaWidth, mediaCustomWidth } = content
                    let wrapperClasses = 'rounded-xl overflow-hidden'
                    let imgClasses = 'rounded-xl'
                    let fill = false
                    const wrapperStyle: React.CSSProperties = {}

                    if (mediaWidth === 'fill') {
                      wrapperClasses = cn(wrapperClasses, 'relative w-full h-full')
                      imgClasses = cn(imgClasses, 'object-cover')
                      fill = true
                    } else if (mediaWidth === 'full') {
                      wrapperClasses = cn(wrapperClasses, 'w-full')
                      imgClasses = cn(imgClasses, 'w-full h-auto')
                    } else if (mediaWidth === 'custom' && mediaCustomWidth) {
                      wrapperStyle.width = mediaCustomWidth
                      imgClasses = cn(imgClasses, 'w-full h-auto')
                    }

                    return (
                      <div className={wrapperClasses} style={wrapperStyle} key={index}>
                        <Media resource={media} size="33vw" imgClassName={imgClasses} fill={fill} />
                      </div>
                    )
                  }
                  if (contentType === 'cardInvert' && content.cardInvert) {
                    const { cardTitle, cardDescription, cardImage } = content.cardInvert
                    if (typeof cardImage === 'object')
                      return (
                        <CardInvert
                          key={index}
                          cardTitle={cardTitle}
                          cardDescription={cardDescription}
                          cardImage={cardImage}
                        />
                      )
                  }

                  if (contentType === 'swiperSlider' && content.swiperImages) {
                    const images = content.swiperImages
                    return <SwiperElement key={index} images={images} />
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
                  if (contentType === 'styledHeading') {
                    const styledHeading = content.styledHeading
                    return (
                      styledHeading?.heading && (
                        <h2
                          key={index}
                          className={cn(
                            styledHeading?.headingClasses,
                            styledHeading?.leftBorderStyle &&
                              `pl-4 md:pl-8 border-l-4 border-${styledHeading?.borderColor}`,
                          )}
                          dangerouslySetInnerHTML={{ __html: styledHeading?.heading }}
                        />
                      )
                    )
                  }

                  if (contentType === 'verticalCTA') {
                    // const verticalCTA = content.verticalCTA
                    return (
                      verticalCTA && (
                        <div
                          key={index}
                          className={cn(
                            'flex flex-col',
                            verticalCTA.alignment === 'top' && 'justify-start h-full',
                            verticalCTA.alignment === 'center' && 'justify-center h-full',
                            verticalCTA.alignment === 'bottom' && 'justify-end h-full',
                            verticalCTABgColor && verticalCTABgColor,
                            verticalCTABgOpacity && verticalCTABgOpacity,
                            verticalCTABgColor && 'p-8 md:p-12 rounded-2xl',
                          )}
                        >
                          {verticalCTA.subtitle && (
                            <p
                              className={cn(verticalCTA.subtitleClasses)}
                              dangerouslySetInnerHTML={{ __html: verticalCTA.subtitle }}
                            />
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

                  if (contentType === 'cardWithList' && cardWithList) {
                    const { cardTitle, listItems, cardBgColor, titleClasses } = cardWithList
                    return (
                      <div
                        key={index}
                        className={cn('p-8 md:p-16 lg:p-24 rounded-2xl', cardBgColor)}
                      >
                        <h3
                          className={cn(titleClasses)}
                          dangerouslySetInnerHTML={{ __html: cardTitle }}
                        />
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {listItems?.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              {item.icon && <Media resource={item.icon} className="w-6 h-6" />}
                              <span className={cn(item.textClasses)}>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }

                  if (contentType === 'autoScrollSlider' && content.autoScrollSlider) {
                    const { images, dimensionClasses, speed } = content.autoScrollSlider
                    return (
                      <AutoScrollSlider
                        key={index}
                        images={images}
                        dimensionClasses={dimensionClasses || []}
                        speed={speed || 1000}
                      />
                    )
                  }

                  if (contentType === 'styledCards' && content.styledCards) {
                    const {
                      cards,
                      imageClasses,
                      gapClasses,
                      titleClasses,
                      descriptionClasses,
                      shadowClasses,
                      cardBgColor,
                      cardHoverBgColor,
                      borderClasses,
                    } = content.styledCards
                    return (
                      <StyledCards
                        key={index}
                        cards={cards}
                        imageClasses={imageClasses}
                        gapClasses={gapClasses}
                        titleClasses={titleClasses}
                        descriptionClasses={descriptionClasses}
                        shadowClasses={shadowClasses}
                        cardBgColor={cardBgColor}
                        cardHoverBgColor={cardHoverBgColor}
                        borderClasses={borderClasses}
                      />
                    )
                  }

                  if (contentType === 'statusBanner' && content.statusBanner) {
                    const {
                      content: bannerContent,
                      contentClasses,
                      flavor,
                      alignment,
                      icon,
                    } = content.statusBanner

                    const flavorClasses = {
                      success: {
                        bg: 'bg-green-900/30',
                        text: 'text-green-500',
                        border: 'border-green-800',
                      },
                      danger: {
                        bg: 'bg-red-900/30',
                        text: 'text-red-500',
                        border: 'border-red-800',
                      },
                      warning: {
                        bg: 'bg-amber-900/30',
                        text: 'text-amber-500',
                        border: 'border-amber-800',
                      },
                      info: {
                        bg: 'bg-blue-900/30',
                        text: 'text-blue-500',
                        border: 'border-blue-800',
                      },
                      primary: {
                        bg: 'bg-slate-800',
                        text: 'text-white',
                        border: 'border-slate-700',
                      },
                      secondary: {
                        bg: 'bg-gray-100',
                        text: 'text-gray-800',
                        border: 'border-gray-200',
                      },
                    }

                    const selectedFlavor = flavorClasses[flavor || 'success']

                    return (
                      <div
                        key={index}
                        className={cn(
                          'w-full py-4 px-6 rounded-xl border flex items-center gap-3',
                          selectedFlavor.bg,
                          selectedFlavor.border,
                          alignment === 'center' && 'justify-center',
                          alignment === 'right' && 'justify-end',
                          alignment === 'left' && 'justify-start',
                        )}
                      >
                        {icon && (
                          <Icon name={icon} className={cn('w-8 h-8', selectedFlavor.text)} />
                        )}
                        <span className={cn(contentClasses, selectedFlavor.text)}>
                          {bannerContent}
                        </span>
                      </div>
                    )
                  }

                  if (contentType === 'spacer' && content.spacer) {
                    const spacer = content.spacer
                    return (
                      <div
                        key={index}
                        className={cn(spacer.spacing, spacer.bgColor, spacer.width)}
                      />
                    )
                  }

                  return (
                    Array.isArray(links) &&
                    links.length > 0 && (
                      <div
                        className={cn(
                          'flex gap-4',
                          linkAlignment === 'center' && 'justify-center',
                          linkAlignment === 'right' && 'justify-end',
                          linkAlignment === 'left' && 'justify-start',
                        )}
                        key={index}
                      >
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
