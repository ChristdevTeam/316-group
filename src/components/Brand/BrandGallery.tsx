'use client'

import React, { useRef } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'

type Props = {
  data: NonNullable<Brand['content']>['gallerySection']
}

export const BrandGallery: React.FC<Props> = ({ data }) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  if (!data) return null
  const { description, descriptionClassName, gallery } = data

  const validGallery = gallery?.filter((item) => typeof item !== 'string') || []

  return (
    <section className="py-16 bg-gray-50 overflow-clip">
      <div className="container max-w-screen-2xl space-y-12">
        {validGallery.length > 0 && (
          <div className="relative group">
            <Swiper
              modules={[Navigation, Autoplay]}
              onBeforeInit={(swiper) => {
                // @ts-expect-error navigation
                swiper.params.navigation.prevEl = prevRef.current
                // @ts-expect-error navigation
                swiper.params.navigation.nextEl = nextRef.current
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              speed={600}
              slidesPerView={1.1}
              centeredSlides={true}
              breakpoints={{
                640: {
                  slidesPerView: 2.1,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 3.1,
                  centeredSlides: false,
                },
                1280: {
                  slidesPerView: 4,
                  centeredSlides: false,
                },
              }}
              className="w-full !overflow-visible"
            >
              {validGallery.map((item, index) => (
                <SwiperSlide key={index} className="!h-auto">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg group/img w-full h-full">
                    <Media
                      resource={item}
                      fill
                      imgClassName="object-cover w-full h-full transition-transform duration-700 group-hover/img:scale-110"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button
              ref={prevRef}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              ref={nextRef}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        {description && (
          <div className={cn('mb-12', descriptionClassName)}>
            <RichText content={description} enableGutter={false} enableProse={false} />
          </div>
        )}
      </div>
    </section>
  )
}
