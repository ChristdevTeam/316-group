'use client'
import { CaseStudy } from '@/payload-types'
import React, { useRef, useState, useEffect } from 'react'
import RichText from '../RichText'
import { Media } from '../Media'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const SolutionAndOutcome: React.FC<{ data: CaseStudy['solutionAndOutcome'] }> = ({ data }) => {
  const { content, slider } = data || {}
  const navigationPrevRef = useRef<HTMLDivElement>(null)
  const navigationNextRef = useRef<HTMLDivElement>(null)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  return (
    <div className="container py-16 max-w-screen-2xl lg:py-24">
      <h2 className="mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl lg:mb-8">
        Solution and outcome
      </h2>
      {content && (
        <RichText
          className="mb-12 text-lg md:text-xl lg:mb-16"
          enableGutter={false}
          content={content}
        />
      )}

      {slider && slider.length > 0 && (
        <div className="relative">
          <Swiper
            modules={[Navigation, EffectCoverflow, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={700}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 60,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            onSwiper={setSwiper}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            className="overflow-hidden w-full bg-blue-50 rounded-xl"
          >
            <div className="absolute right-0 bottom-0 left-0 h-1/5 bg-blue-700"></div>
            {slider.map((slide, index) => (
              <SwiperSlide key={slide.id || index} className="">
                {/* <div className="absolute right-0 bottom-0 left-0 h-1/5 bg-blue-700"></div> */}
                <div className="grid grid-cols-1 gap-8 h-full md:grid-cols-2">
                  <div className="order-2 md:order-none relative h-[350px] md:h-full mb-8 pt-0 md:pt-8">
                    {slide.image && (
                      <Media
                        resource={slide.image}
                        imgClassName="max-h-[100%] object-contain object-left px-16 md:px-auto"
                        className="h-[350px] md:h-[600px] object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-none">
                    {slide.title && (
                      <h3
                        className="mb-4 text-xl font-semibold md:text-2xl lg:text-3xl"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      ></h3>
                    )}
                    {slide.description && (
                      <p className="text-base md:text-lg">{slide.description}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex absolute right-8 bottom-8 z-10 gap-4 lg:right-24 slider-navigation">
            <div
              ref={navigationPrevRef}
              className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md transition-colors cursor-pointer hover:bg-gray-100 nav-prev"
              onClick={() => swiper?.slidePrev()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </div>
            <div
              ref={navigationNextRef}
              className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md transition-colors cursor-pointer hover:bg-gray-100 nav-next"
              onClick={() => swiper?.slideNext()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolutionAndOutcome
