'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { cn } from '@/utilities/cn'
import 'swiper/css'

type Props = {
  pillars: { word: string; id?: string | null }[]
}

export const BrandPillars: React.FC<Props> = ({ pillars }) => {
  if (!pillars || pillars.length === 0) return null

  // Duplicate pillars to ensure enough slides for infinite loop without empty spaces
  // We need enough duplicates to fill the screen multiple times for the loop to work correctly
  // especially with auto width slides.
  const displayPillars = [...pillars, ...pillars, ...pillars, ...pillars, ...pillars, ...pillars]

  const handlePillarClick = (index: number) => {
    const targets = ['brand-split', 'brand-fullscreen', 'brand-mixed', 'brand-final']
    // Use modulo to map duplicated pillars back to the original target sequence
    if (targets.length > 0) {
      const targetId = targets[index % pillars.length] // Use pillars.length not targets.length to match the clicked item to its original index (though currently targets and pillars might be sync, but pillars.length is the cycle)
      // Actually the user said "first four pillars... link to".
      // If pillar 5 (index 4) links to... ?
      // If pillars has 4 items. Index 0->Split, 1->Full, 2->Mixed, 3->Final.
      // Index 4 is copy of Index 0. So it should link to Split.
      // So index % pillars.length is correct to find the "original index".
      // Then we check if that original index is < targets.length.

      // But wait, the previous code used `index % targets.length` which wraps around targets.
      // If pillars has 5 items, and targets has 4.
      // Item 4 (5th) would map to targets[0]? Or should it have no link?
      // User said "first four pillars added will link...".
      // It implies specific pillars map to specific sections.
      // If I have 4 pillars provided, then loop 0..3 works.
      // If I click the 5th item (which is a clone of pillar 0), it should act like pillar 0.
      // So `const originalIndex = index % pillars.length;`
      // `if (originalIndex < targets.length) ...`

      const originalIndex = index % pillars.length
      if (originalIndex < targets.length) {
        const targetId = targets[originalIndex]
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <div className="py-12 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container max-w-screen-2xl">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={'auto'} // Use auto because slides have !w-auto
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={600}
          breakpoints={{
            640: {
              spaceBetween: 48,
            },
            768: {
              spaceBetween: 64,
            },
            1024: {
              spaceBetween: 64,
            },
          }}
          className="w-full"
        >
          {displayPillars.map((pillar, index) => (
            <SwiperSlide key={index} className="!w-auto">
              {({ isActive }) => (
                <div
                  onClick={() => handlePillarClick(index)}
                  className={cn(
                    'transition-all duration-500 text-xl md:text-3xl font-medium cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'text-black opacity-100 scale-110 font-bold'
                      : 'text-gray-300 opacity-60',
                  )}
                >
                  {pillar.word}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
