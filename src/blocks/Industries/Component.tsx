'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import type SwiperType from 'swiper'

import type { IndustriesBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  className?: string
} & IndustriesBlock

export const IndustriesBlockComponent: React.FC<Props> = ({
  className,
  heading,
  description,
  slides,
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div className={`bg-blue-100 ${className || ''}`}>
      <div className="container max-w-screen-2xl py-16 lg:py-24">
        {/* Header Section */}
        <div className="mb-12 lg:mb-16">
          {heading && (
            <h2 className="pl-4 pb-2 border-blue-600 border-l-4 mb-6 text-4xl lg:text-5xl font-bold text-blue-600">
              {heading}
            </h2>
          )}

          {description && (
            <div className="max-w-4xl text-lg text-gray-700">
              <RichText
                enableGutter={false}
                content={description}
                enableProse={false}
                className="text-lg md:text-xl lg:text-2xl"
              />
            </div>
          )}
        </div>

        {/* Slider Section */}
        <div className="relative overflow-hidden rounded-3xl">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={setSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !w-4 !h-4 bg-gray-300 !opacity-100',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-600 !scale-150',
              el: '.industries-pagination',
            }}
            className="!overflow-hidden rounded-3xl"
          >
            {slides?.map((slide, index) => (
              <SwiperSlide key={`${slide.industry}-${index}`}>
                <div className="grid lg:grid-cols-2 min-h-[400px] lg:min-h-[600px]">
                  {/* Image Section - First on mobile, left on desktop */}
                  <div className="order-1 lg:order-1 relative overflow-hidden">
                    {slide?.image && (
                      <Media
                        resource={slide.image}
                        className="w-full h-full object-cover"
                        imgClassName="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content Section - Second on mobile, right on desktop */}
                  <div className="order-2 lg:order-2 bg-blue-600 text-white p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-4 md:space-y-6">
                      {slide?.industry && (
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide text-green-400">
                          {slide.industry}
                        </h3>
                      )}

                      {slide?.tagline && (
                        <div className="border-t border-green-400 py-4">
                          <p className="md:text-lg lg:text-xl font-medium">{slide.tagline}</p>
                        </div>
                      )}

                      {slide?.description && (
                        <p className="text-base lg:text-lg leading-relaxed">{slide.description}</p>
                      )}

                      {slide?.link && (
                        <div className="pt-4">
                          <CMSLink
                            {...slide.link}
                            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Dot Navigation */}
        <div className="industries-pagination flex justify-center mt-8 space-x-3"></div>
      </div>
    </div>
  )
}
