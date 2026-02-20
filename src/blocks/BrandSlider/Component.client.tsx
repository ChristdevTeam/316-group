'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { MoveLeft, MoveRight, ArrowUpRight } from 'lucide-react'
import type { BrandSliderBlock as BrandSliderBlockProps, Brand } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'

type Props = BrandSliderBlockProps & {
  brands: Brand[]
}

export const BrandSliderClient: React.FC<Props> = ({
  heading,
  headingClasses,
  autoplayDelay,
  speed,
  brands,
}) => {
  const [swiper, setSwiper] = useState<any>(null)

  const goNext = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev()
    }
  }

  if (!brands || brands.length === 0) return null

  return (
    <div className="bg-black text-white py-24 overflow-hidden">
      <div className="container max-w-screen-2xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6">
          <h2 className={cn(headingClasses)}>{heading}</h2>

          <div className="flex gap-4">
            <button onClick={goPrev} className="text-white hover:text-gray-300 transition-colors">
              <MoveLeft size={32} />
            </button>
            <button onClick={goNext} className="text-white hover:text-gray-300 transition-colors">
              <MoveRight size={32} />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={setSwiper}
          spaceBetween={20}
          slidesPerView={1.1} // About 1.1 slides on mobile
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1280: {
              slidesPerView: 3.5, // Auto mode in large screens (fit as many as reasonable)
            },
          }}
          loop={true}
          speed={speed || 1000}
          autoplay={{
            delay: autoplayDelay || 5000,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="w-full !overflow-visible"
        >
          {brands.map((brand, index) => {
            const BrandImage = brand.meta?.image || brand.heroImage
            const number = (index + 1).toString().padStart(2, '0')

            return (
              <SwiperSlide key={brand.id} className="h-auto">
                <div className="flex flex-col h-full group">
                  <div className="text-4xl md:text-5xl font-light mb-4 md:mb-8 text-white/50 group-hover:text-white transition-colors duration-300">
                    {number}
                  </div>

                  {/* Square Image Ratio 1:1 */}
                  <div className="relative aspect-square w-full bg-gray-900 overflow-hidden">
                    {BrandImage && typeof BrandImage !== 'string' && (
                      <Media
                        resource={BrandImage}
                        fill
                        imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="bg-white text-black p-6 md:p-8 flex-grow flex flex-col justify-between min-h-[300px]">
                    <div>
                      <h3 className="text-2xl font-bold uppercase mb-4">{brand.title}</h3>
                      <p className="text-gray-600 line-clamp-4 mb-6">
                        {brand.meta?.description || 'Explore our premium brand collection.'}
                      </p>
                    </div>

                    <Link
                      href={`/brands/${brand.slug}`}
                      className="inline-flex items-center text-lg font-medium border-b border-black pb-1 hover:border-gray-500 transition-colors w-fit"
                    >
                      Explore brand <ArrowUpRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
