'use client'
import { CaseStudy } from '@/payload-types'
import React, { useRef } from 'react'
import RichText from '../RichText'
import { Media } from '../Media'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const SolutionAndOutcome: React.FC<{ data: CaseStudy['solutionAndOutcome'] }> = ({ data }) => {
  const { content, slider } = data || {}
  const navigationPrevRef = useRef<HTMLDivElement>(null)
  const navigationNextRef = useRef<HTMLDivElement>(null)

  return (
    <div className="container max-w-screen-2xl py-16 lg:py-24">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 lg:mb-8">
        Solution and outcome
      </h2>
      {content && (
        <RichText
          className="text-lg md:text-xl lg:text-2xl mb-12"
          enableGutter={false}
          content={content}
        />
      )}

      {slider && slider.length > 0 && (
        <div className="relative mt-8">
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
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            className="w-full bg-blue-50 rounded-xl overflow-hidden"
          >
            <div className="bg-blue-700 absolute bottom-0 left-0 right-0 h-1/5"></div>
            {slider.map((slide, index) => (
              <SwiperSlide key={slide.id || index} className="">
                {/* <div className="bg-blue-700 absolute bottom-0 left-0 right-0 h-1/5"></div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  <div className="order-2 md:order-none relative h-[350px] md:h-full mb-8 pt-0 md:pt-8">
                    {slide.image && (
                      <Media
                        resource={slide.image}
                        imgClassName="max-h-[100%] object-contain object-left px-16 md:px-auto"
                        className="h-[350px] md:h-[600px] object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-12 md:p-none">
                    {slide.title && (
                      <h3
                        className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4"
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

          <div className="flex gap-4 absolute bottom-8 right-8 lg:right-24 z-10 slider-navigation">
            <div
              ref={navigationPrevRef}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition-colors nav-prev"
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
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition-colors nav-next"
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
