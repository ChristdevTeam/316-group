'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import { CMSLink } from '@/components/Link'
import { Page } from '@/payload-types'
import RichText from '@/components/RichText'

export const SwiperHero: React.FC<Page['hero']> = ({
  heroTitle,
  heroTitleClasses,
  title,
  titleClasses,
  descriptionText,
  descriptionClasses,
  links,
  overlayText,
  overlayTextClasses,
  images,
}) => {
  if (!images?.length) return null

  return (
    <div className={cn('relative w-full min-h-[60vh]')}>
      {heroTitle && (
        <div className={cn('absolute top-4 left-4 z-20', heroTitleClasses)}>{heroTitle}</div>
      )}
      {title && <div className={cn('absolute top-16 left-4 z-20', titleClasses)}>{title}</div>}
      {descriptionText && (
        <RichText
          className={cn('absolute top-32 left-4 z-20 max-w-xl', descriptionClasses)}
          content={descriptionText}
        />
      )}
      {overlayText && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className={cn('text-center text-white', overlayTextClasses)}>{overlayText}</div>
        </div>
      )}
      {Array.isArray(links) && links.length > 0 && (
        <div className="flex gap-4">
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
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="absolute inset-0 w-full h-full"
      >
        {images.map((media, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Media
              resource={media.media}
              className="object-cover w-full h-full"
              imgClassName="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
