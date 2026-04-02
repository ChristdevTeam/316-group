'use client'

import { CarouselBlock } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import { cn } from '@/utilities/cn'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

// import { Media } from './Media' // Import the Media component
// import type { CarouselBlock } from 'payload-types' // Import the CarouselBlock type from payload-types

// Omit the blockType field from the CarouselBlock interface
type CarouselProps = Omit<CarouselBlock, 'blockType'>

const Carousel: React.FC<CarouselProps> = ({ sliderMode, imageColumns, images, id, blockName }) => {
  // Default column values
  const mobileColumns = imageColumns?.mobile || 1
  const tabletColumns = imageColumns?.tablet || 2
  const desktopColumns = imageColumns?.desktop || 4

  if (sliderMode) {
    return (
      <div
        className="py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        id={id || undefined}
      >
        {blockName && (
          <h2 className="text-center text-2xl font-bold mb-12 container">{blockName}</h2>
        )}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={48}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="!overflow-visible w-full"
        >
          {images?.map((image, index) => (
            <SwiperSlide
              key={image.id || index}
              className="!w-32 md:!w-48 lg:!w-56 flex self-center items-center justify-center"
            >
              {image.image && (
                <a
                  href={image.partnerUrl ? image.partnerUrl : '#'}
                  className="p-4 transition-transform hover:scale-105 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Media resource={image.image} className="w-full h-auto object-contain" />
                </a>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }

  return (
    <div className="container py-16" id={id || undefined}>
      {blockName && <h2 className="text-center text-2xl font-bold mb-4">{blockName}</h2>}
      <div
        className={cn(
          'grid justify-items-center items-center',
          mobileColumns === 2 ? 'grid-cols-2' : 'grid-cols-1',
          tabletColumns === 2 && 'md:grid-cols-2',
          tabletColumns === 3 && 'md:grid-cols-3',
          tabletColumns === 4 && 'md:grid-cols-4',
          desktopColumns === 3 && 'lg:grid-cols-3',
          desktopColumns === 4 && 'lg:grid-cols-4',
          desktopColumns === 5 && 'lg:grid-cols-5',
          desktopColumns === 6 && 'lg:grid-cols-6',
          'gap-12 md:gap-16 xl:gap-28',
        )}
      >
        {images?.map((image, index) => (
          <div key={image.id || index} className="flex flex-col justify-center relative">
            {image.image && (
              <a
                href={image.partnerUrl ? image.partnerUrl : '#'}
                className="p-2 lg:p-6 xl:p-14"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Media resource={image.image} className="w-full rounded-lg object-contain" />{' '}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
