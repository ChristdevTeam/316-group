'use client'

import { Media } from '@/components/Media'
import { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

interface AutoScrollSliderProps {
  images:
    | {
        image: string | MediaType
        id?: string | null
      }[]
    | null
    | undefined
  dimensionClasses?: string[]
  speed?: number
}

export const AutoScrollSlider: React.FC<AutoScrollSliderProps> = ({
  images,
  dimensionClasses,
  speed = 5000,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 z-10 h-full w-[20%] bg-gradient-to-r from-white via-white/50 to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-[20%] bg-gradient-to-l from-white via-white/50 to-transparent" />

      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={24}
        loop={true}
        speed={speed} // Use speed prop for slide transition duration
        autoplay={{
          delay: 0, // No delay between transitions
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
          reverseDirection: false,
        }}
        className="!overflow-visible smooth-scroll"
      >
        {images?.map((item, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <div className={cn('relative overflow-hidden rounded-xl', dimensionClasses)}>
              <Media resource={item.image} className="h-full w-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
