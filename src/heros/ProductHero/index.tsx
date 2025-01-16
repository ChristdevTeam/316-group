'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import Link from 'next/link'

export const ProductHero: React.FC<Page['hero']> = ({
  links,
  media,
  includeStoreLinks,
  heroGraphic,
  title,
  titleClasses,
  subTitle,
  subTitleClasses,
  mediaMobile,
  descriptionText,
  descriptionClasses,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  // Render background media
  const renderBackground = () => {
    if (!media || typeof media === 'string') return null
    if (!mediaMobile || typeof mediaMobile === 'string') return null

    const { mimeType: mimeTypeMobile, url: urlMobile } = mediaMobile
    const { mimeType, url } = media

    if (
      mimeType?.startsWith('image/') &&
      mimeTypeMobile?.startsWith('image/') &&
      url &&
      urlMobile
    ) {
      return (
        <React.Fragment>
          <Image
            src={url}
            fill
            alt={media.alt ? media.alt : 'background image'}
            className="absolute hidden md:block inset-0 w-full h-full object-cover object-top z-[-1]"
          />
          <Image
            src={urlMobile}
            fill
            alt={mediaMobile.alt ? mediaMobile.alt : 'background image'}
            className="absolute md:hidden inset-0 w-full h-full object-cover object-top z-[-1]"
          />
        </React.Fragment>
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
    <div data-theme="light mt-[-64px]">
      <div className="relative w-[full] h-full overflow-hidden">
        {renderBackground()}

        <div className="hidden container max-w-screen-2xl py-16 md:py-28 md:grid grid-cols-12 gap-16">
          <div className="col-span-6 sm:w-full md:col-span-5 xl:col-span-5">
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex gap-4 mdb:pt-8">
                {links.map(({ link, buttonClasses }, i) => {
                  return (
                    <div key={i} className="flex">
                      <CMSLink
                        size={'sm'}
                        {...link}
                        className={cn('rounded-xl bg-transparent border-slate-950', buttonClasses)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {title && (
              <h1 dangerouslySetInnerHTML={{ __html: title }} className={cn(titleClasses)}></h1>
            )}
            {subTitle && (
              <h4
                dangerouslySetInnerHTML={{ __html: subTitle }}
                className={cn(subTitleClasses)}
              ></h4>
            )}

            {descriptionText && (
              <RichText
                content={descriptionText}
                enableGutter={false}
                enableProse={false}
                className={cn(descriptionClasses)}
              />
            )}

            {includeStoreLinks && (
              <div className="flex justify-start gap-4 pt-16">
                <Link href={'#'}>
                  <Image
                    src="/assets/applestore.svg"
                    alt="apple store link"
                    height={40}
                    width={120}
                  />
                </Link>
                <Link href={'#'}>
                  <Image
                    src="/assets/googleplay.svg"
                    alt="apple store link"
                    height={40}
                    width={120}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="hidden md:block md:col-span-7 xl:col-span-7 flex items-center content-center">
            {heroGraphic && typeof heroGraphic === 'object' && (
              <div className=" ">
                <Media
                  imgClassName="-z-10 object-fit inset-0 w-full h-full"
                  videoClassName="-z-10 absolute object-fit inset-0 w-full max-h-[100%]"
                  priority={false}
                  loading="lazy"
                  resource={heroGraphic}
                  className="rounded-t-[3em]"
                />
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden container max-w-screen-2xl py-16 sm:pr-8">
          <div>
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex gap-4 mdb:pt-16">
                {links.map(({ link, buttonClasses }, i) => {
                  return (
                    <div key={i} className="flex">
                      <CMSLink
                        size={'sm'}
                        {...link}
                        className={cn('rounded-xl bg-transparent border-slate-950', buttonClasses)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {title && (
              <h1 dangerouslySetInnerHTML={{ __html: title }} className={cn(titleClasses)}></h1>
            )}
            {subTitle && (
              <h4
                dangerouslySetInnerHTML={{ __html: subTitle }}
                className={cn(subTitleClasses)}
              ></h4>
            )}

            {descriptionText && (
              <RichText
                content={descriptionText}
                enableGutter={false}
                enableProse={false}
                className={cn(descriptionClasses)}
              />
            )}

            {includeStoreLinks && (
              <div className="flex justify-start gap-4 pt-16">
                <Link href={'#'}>
                  <Image
                    src="/assets/applestore.svg"
                    alt="apple store link"
                    height={40}
                    width={120}
                  />
                </Link>
                <Link href={'#'}>
                  <Image
                    src="/assets/googleplay.svg"
                    alt="apple store link"
                    height={40}
                    width={120}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
