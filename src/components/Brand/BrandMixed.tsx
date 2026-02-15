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
  data: NonNullable<Brand['content']>['mixedSection']
}

export const BrandMixed: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { title, titleClassName, description, descriptionClassName, gallery, richText } = data

  const validGallery = gallery?.filter((item) => typeof item !== 'string') || []

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-screen-2xl">
        <div className="text-center mb-12">
          {title && <h2 className={cn('text-3xl font-bold mb-4', titleClassName)}>{title}</h2>}
          {description && (
            <p className={cn('text-lg text-gray-600 max-w-6xl mx-auto', descriptionClassName)}>
              {description}
            </p>
          )}
        </div>

        {validGallery.length > 0 && (
          <div className="mb-12">
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              speed={600}
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
          </div>
        )}

        {richText && (
          <div>
            <RichText
              enableGutter={false}
              enableProse={false}
              content={richText}
              className="text-lg text-gray-600"
            />
          </div>
        )}
      </div>
    </section>
  )
}
