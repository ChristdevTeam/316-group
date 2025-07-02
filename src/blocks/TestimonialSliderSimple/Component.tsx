'use client'

import React from 'react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { TestimonialSliderSimpleBlock as TestimonialSliderSimpleBlockProps } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export const TestimonialSliderSimpleBlock: React.FC<TestimonialSliderSimpleBlockProps> = ({
  heading,
  headingClasses,
  testimonialTextClasses,
  authorInfoClasses,
  testimonials,
  backgroundClasses,
  autoplayDelay,
  speed,
  paddingType,
}) => {
  return (
    <div
      className={cn(
        'overflow-hidden',
        backgroundClasses,
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
      )}
    >
      <div className="container max-w-screen-2xl">
        <div className="flex flex-col items-center text-center mb-12">
          {heading && (
            <h2 className={cn(headingClasses)} dangerouslySetInnerHTML={{ __html: heading }} />
          )}
        </div>

        {/* Testimonials Slider */}
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
          }}
          loop={true}
          speed={speed || 1000}
          autoplay={{
            delay: autoplayDelay || 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              'swiper-pagination-bullet !w-16 !h-2 !rounded-full bg-slate-100 !opacity-100 !mx-1',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-600',
            el: '.testimonial-slider-simple-pagination',
          }}
          grabCursor={true}
          modules={[Autoplay, Pagination]}
          className="w-full testimonial-slider-simple"
        >
          {testimonials?.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-blue-600 dark:bg-slate-800 text-white rounded-xl p-8 shadow-lg h-full flex flex-col justify-between min-h-[300px]">
                {/* Icon */}
                {testimonial.icon && (
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <Media resource={testimonial.icon} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                {/* Testimonial Text */}
                <div className="flex-grow">
                  <p className={cn(testimonialTextClasses, 'text-center mb-6')}>
                    &ldquo;{testimonial.testimonialText}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="text-center">
                  <span className={cn(authorInfoClasses, 'font-semibold')}>
                    {testimonial.authorName}
                  </span>
                  {testimonial.authorPosition && (
                    <span className="text-base mt-1"> | {testimonial.authorPosition}</span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {testimonials && testimonials.length > 1 && (
          <div className="testimonial-slider-simple-pagination mt-8 flex justify-center"></div>
        )}

        {/* Custom styles for pagination */}
        {/* <style jsx>{`
          .testimonial-slider-simple .swiper-pagination {
            position: relative !important;
            margin-top: 4rem !important;
            bottom: auto !important;
          }
        `}</style> */}
      </div>
    </div>
  )
}
