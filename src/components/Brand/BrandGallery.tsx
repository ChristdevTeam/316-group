'use client'

import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

type Props = {
  data: NonNullable<Brand['content']>['gallerySection']
}

export const BrandGallery: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { description, descriptionClassName, gallery } = data

  const validGallery = gallery?.filter((item) => typeof item !== 'string') || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-screen-2xl space-y-12">
        {validGallery.length > 0 && (
          <Swiper
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            speed={600}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="w-full"
          >
            {validGallery.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg group">
                  <Media
                    resource={item}
                    fill
                    imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
