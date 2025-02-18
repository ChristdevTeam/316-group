'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { Star, MoveLeft, MoveRight } from 'lucide-react'
import type { TestimonialSliderBlock as TestimonialSliderBlockProps } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCreative } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/autoplay'

export const TestimonialSliderBlock: React.FC<TestimonialSliderBlockProps> = ({
  heading,
  headingClasses,
  companyNameClasses,
  testimonialTextClasses,
  authorInfoClasses,
  testimonials,
  gradient,
  autoplayDelay,
  speed,
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

  return (
    <div
      className={cn(
        gradient?.type,
        gradient?.fromColor,
        gradient?.viaColor,
        gradient?.toColor,
        'overflow-hidden',
      )}
    >
      <div className="container max-w-screen-2xl py-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="flex gap-2 justify-center items-center md:justify-start mb-6">
              <Star className="w-8 h-8 text-white" fill="white" />
              <Star className="w-8 h-8 text-white" fill="white" />
              <Star className="w-8 h-8 text-white/60" fill="currentColor" />
            </div>

            <h2 className={cn(headingClasses)} dangerouslySetInnerHTML={{ __html: heading }} />

            <div className="gap-4 hidden lg:flex">
              <MoveLeft
                onClick={goPrev}
                size={100}
                className="text-white"
                absoluteStrokeWidth={true}
                strokeWidth={3}
              />

              <MoveRight
                onClick={goNext}
                size={100}
                className="text-white"
                absoluteStrokeWidth={true}
                strokeWidth={3}
              />
            </div>
            <div className="gap-4 w-full flex-row-reverse flex lg:!hidden">
              <MoveRight
                onClick={goNext}
                size={40}
                className="text-white"
                absoluteStrokeWidth={true}
                strokeWidth={3}
              />
              <MoveLeft
                onClick={goPrev}
                size={40}
                className="text-white"
                absoluteStrokeWidth={true}
                strokeWidth={3}
              />
            </div>
          </div>

          {/* Right Column - Swiper */}
          <div className="lg:w-1/2">
            <Swiper
              onSwiper={setSwiper}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1.2,
                },
              }}
              spaceBetween={30}
              effect={'creative'}
              centeredSlides={false}
              loop={true}
              speed={speed || 1000}
              autoplay={{
                delay: autoplayDelay || 5000,
                pauseOnMouseEnter: true,
              }}
              grabCursor={true}
              creativeEffect={{
                prev: {
                  shadow: true,
                  origin: 'left center',
                  translate: ['-10%', 0, -200], // Adjust translate to account for spaceBetween
                  rotate: [0, 100, 0],
                },
                next: {
                  translate: ['110%', 0, 0], // Adjust translate to account for spaceBetween
                },
              }}
              modules={[EffectCreative, Autoplay]}
              className="w-full"
              style={{ overflow: 'visible' }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="rounded-2xl">
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg space-y-8 lg:space-y-12">
                    <h2 className="flex justify-between items-center mb-6">
                      <span className={cn(companyNameClasses)}>{testimonial.companyName}</span>
                      <div className="flex -space-x-2">
                        {testimonial.platformIcons?.map(
                          (icon, iconIndex) =>
                            typeof icon.icon === 'object' && (
                              <div
                                key={iconIndex}
                                className="w-8 h-8 rounded-full overflow-hidden relative"
                              >
                                <Media
                                  resource={icon.icon}
                                  className="w-full h-full rounded-full object-contain"
                                />
                              </div>
                            ),
                        )}
                      </div>
                    </h2>

                    <p className={cn(testimonialTextClasses)}>{testimonial.testimonialText}</p>

                    <h4 className={cn(authorInfoClasses)}>
                      {testimonial.author} | {testimonial.position}
                    </h4>
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
