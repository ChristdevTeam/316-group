'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { CMSLink } from '@/components/Link'
import { Page } from '@/payload-types'
import RichText from '@/components/RichText'

export const SwiperHero: React.FC<Page['hero']> = ({
  heroTitle,
  heroTitleClasses,
  title,
  titleClasses,
  subTitle,subTitleClasses,
  descriptionText,
  descriptionClasses,
  links,
  overlayText,
  overlayTextClasses,
  images,
  bgColor,
}) => {
  if (!images?.length) return null

  return (
    <div className={cn('relative w-full min-h-[60vh] -mt-16', bgColor)}>
      <div className="relative container max-w-screen-2xl flex flex-col lg:flex-row gap-16 justify-between overflow-hidden py-16 md:pb-28">
        {overlayText && (
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-30">
            <div className={cn(overlayTextClasses)}>{overlayText}</div>
          </div>
        )}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>{heroTitle && <button className={cn(heroTitleClasses)}>{heroTitle}</button>}</div>
          {title && (
            <div className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }} />
          )}

          {subTitle && <div className={cn(subTitleClasses)} dangerouslySetInnerHTML={{ __html: subTitle }}></div>}

          {descriptionText && (
            <RichText
              className={cn(descriptionClasses)}
              enableGutter={false}
              content={descriptionText}
            />
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
        </div>
        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="relative inset-0 w-full h-full 
              [&_.swiper-pagination]:bottom-[-2rem]
              [&_.swiper-pagination-bullet]:w-4 
              [&_.swiper-pagination-bullet]:h-4 
              [&_.swiper-pagination-bullet]:bg-slate-300 
              [&_.swiper-pagination-bullet-active]:bg-cyan-600
              [&_.swiper-pagination-bullet-active]:w-5
              [&_.swiper-pagination-bullet-active]:h-5"
          >
            {images.map((media, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <Media
                  resource={media.media}
                  className="object-cover w-full h-full rounded-2xl"
                  imgClassName="object-cover w-full h-full rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
