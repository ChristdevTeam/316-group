'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

interface CaseStudySliderProps {
  caseStudySlider?: {
    title?: string
    titleClasses?: string[] | null
    cards?: any[] | null
  }
}

export const CaseStudySliderClient: React.FC<CaseStudySliderProps> = ({ caseStudySlider }) => {
  if (!caseStudySlider) return null

  const { title, titleClasses, cards } = caseStudySlider

  const bgColors: Record<string, string> = {
    red: 'bg-red-600',
    orange: 'bg-orange-600',
    amber: 'bg-amber-600',
    yellow: 'bg-yellow-600',
    lime: 'bg-lime-600',
    green: 'bg-green-600',
    emerald: 'bg-emerald-600',
    teal: 'bg-teal-600',
    cyan: 'bg-cyan-600',
    sky: 'bg-sky-600',
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
    violet: 'bg-violet-600',
    purple: 'bg-purple-600',
    fuchsia: 'bg-fuchsia-600',
    pink: 'bg-pink-600',
    rose: 'bg-rose-600',
    slate: 'bg-slate-600',
    gray: 'bg-gray-600',
    zinc: 'bg-zinc-600',
    neutral: 'bg-neutral-600',
    stone: 'bg-stone-600',
  }

  return (
    <div className="w-full flex flex-col items-start">
      {title && (
        <h2
          className={cn('mb-8 md:mb-12 lg:mb-16', titleClasses)}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {cards && cards.length > 0 && (
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.case-study-pagination' }}
            className="w-full"
            loop={true}
          >
            {cards.map((card, index) => {
              const bgClass = bgColors[card.cardBgColor as string] || 'bg-slate-600'

              return (
                <SwiperSlide key={index}>
                  <div className={cn('w-full rounded-[32px] p-6 lg:p-12 text-white', bgClass)}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
                      <div className="md:col-span-5 w-full">
                        {card.image && (
                          <div className="aspect-square relative w-full overflow-hidden rounded-3xl">
                            <Media
                              resource={card.image}
                              className="object-cover w-full h-full"
                              fill
                            />
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-7 flex flex-col justify-center h-full">
                        {card.industries && card.industries.length > 0 && (
                          <div className="text-white/80 text-sm md:text-base mb-6 font-medium tracking-wide">
                            {card.industries.map((ind: any) => ind.text).join(' | ')}
                          </div>
                        )}

                        {card.content && (
                          <p className="text-xl lg:text-3xl font-semibold leading-snug mb-12">
                            {card.content}
                          </p>
                        )}

                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          {card.person && (
                            <div className="flex flex-col">
                              {card.person.name && (
                                <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                                  {card.person.name}
                                </span>
                              )}
                              {card.person.position && (
                                <span className="text-white/80 text-base md:text-lg lg:text-xl mt-1">
                                  {card.person.position}
                                </span>
                              )}
                            </div>
                          )}

                          {card.links && card.links.length > 0 && (
                            <div>
                              {card.links.map(({ link }: any, i: number) => (
                                <CMSLink
                                  key={i}
                                  {...link}
                                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-6 py-3 font-semibold transition inline-block text-center"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="mt-10 flex justify-center case-study-pagination items-center gap-3 relative z-10 w-full" />
        </div>
      )}

      {/* Custom Styles for Swiper Pagination Bubbles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .case-study-pagination .swiper-pagination-bullet {
          width: 14px !important;
          height: 14px !important;
          background: transparent !important;
          border: 1px solid #3b82f6 !important; /* blue-500 */
          opacity: 1 !important;
          margin: 0 !important;
        }
        .case-study-pagination .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
      `,
        }}
      />
    </div>
  )
}
