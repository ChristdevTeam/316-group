'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import type { Media as MediaType } from '@/payload-types'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface SwiperProps {
  images: (string | MediaType)[]
}
export const SwiperElement: React.FC<SwiperProps> = ({ images }) => {
  return (
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
            resource={media}
            className="object-cover w-full h-full rounded-2xl"
            imgClassName="object-cover w-full h-full rounded-2xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
