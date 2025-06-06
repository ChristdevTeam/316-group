'use client'

import type { ResourcesHeroBlock as ResourcesHeroBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { Media } from '@/components/Media'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const ResourcesHeroBlock: React.FC<ResourcesHeroBlockType> = (props) => {
  const {
    mainTitle,
    mainTitleStyle,
    title,
    titleStyle,
    description,
    descriptionStyle,
    swiperData,
    bgColor,
  } = props
  return (
    <div>
      {mainTitle && (
        <div className="container max-w-screen-2xl">
          <h1
            dangerouslySetInnerHTML={{ __html: mainTitle }}
            className={cn(
              typeof mainTitleStyle === 'object'
                ? mainTitleStyle?.classes
                : [
                    'uppercase',
                    'font-extrabold',
                    'mb-4',
                    'md:mb-8',
                    'text-3xl',
                    'md:text-5xl',
                    'lg:text-6xl',
                    'xl:text-8xl',
                    'pt-8',
                    'md:pt-16',
                  ],
            )}
          ></h1>
        </div>
      )}
      <div
        className={cn(
          'w-full min-h-[60dvh]',
          bgColor,
          'flex flex-col justify-center items-center text-white',
        )}
      >
        <div className="container max-w-screen-2xl grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-16 items-center py-16">
          <div className="lg:col-span-3 space-y-8">
            {title && (
              <h1
                dangerouslySetInnerHTML={{ __html: title }}
                className={cn(typeof titleStyle === 'object' && titleStyle?.classes)}
              ></h1>
            )}
            {description && (
              <RichText
                content={description}
                className={cn(typeof descriptionStyle === 'object' && descriptionStyle?.classes)}
                enableGutter={false}
                enableProse={false}
              ></RichText>
            )}
          </div>
          <div className="lg:col-span-4">
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
              {swiperData?.map((slide, index) => (
                <SwiperSlide key={index} className="rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 bg-white text-slate-900 p-0 rounded-2xl overflow-clip">
                    <div className="relative min-h-[200px] md:min-h-[250px] order-1 md:order-none col-span-1">
                      <Media resource={slide.image} fill imgClassName="object-cover w-full" />
                    </div>
                    <div className="space-y-6 p-6 order-2 md:order-none col-span-1">
                      <div className="flex gap-4 items-center flex-wrap">
                        {slide.tags?.map((tag, index) => {
                          if (typeof tag === 'object')
                            return (
                              <span key={index} className="px-4 py-2 border border-slate-900">
                                {tag.title}
                              </span>
                            )
                        })}
                      </div>
                      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                        {slide.title}
                      </h4>
                      {slide.description && (
                        <RichText
                          content={slide.description}
                          enableGutter={false}
                          enableProse={false}
                          className="max-w-full"
                        />
                      )}
                      {slide.links?.map((link, index) => {
                        if (typeof link === 'object')
                          return (
                            <CMSLink
                              key={index}
                              {...link.link}
                              className={cn(link.buttonClasses)}
                            ></CMSLink>
                          )
                      })}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}
