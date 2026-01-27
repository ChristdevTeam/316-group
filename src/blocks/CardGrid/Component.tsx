'use client'
import React from 'react'
import { cn } from '@/utilities/cn'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Media } from '@/components/Media'
import { Icon } from '@/components/Icon'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

type Props = {
  className?: string
  titleTextClasses?: string[]
  descriptionTextClasses?: string[]
  displayStyle?: 'grid' | 'swiper'
} & CardGridBlockProps

const colorThemes: Record<string, string> = {
  blue: 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800',
  purple: 'bg-gradient-to-br from-purple-600 via-purple-700 to-fuchsia-800',
  orange: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-700',
  pink: 'bg-gradient-to-br from-pink-500 via-pink-600 to-rose-700',
  green: 'bg-gradient-to-br from-green-500 via-green-600 to-emerald-700',
  sky: 'bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-700',
  teal: 'bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700',
  indigo: 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800',
  rose: 'bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700',
  amber: 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700',
  emerald: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700',
  fuchsia: 'bg-gradient-to-br from-fuchsia-600 via-fuchsia-700 to-purple-800',
  cyan: 'bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-700',
  lime: 'bg-gradient-to-br from-lime-500 via-lime-600 to-green-700',
  grey: 'bg-gradient-to-br from-slate-600 via-slate-700 to-gray-800',
}

const SwiperNavButtons = () => {
  const swiper = useSwiper()

  return (
    <>
      <button
        onClick={() => swiper.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-slate-800 hover:bg-white/50 transition-all shadow-lg md:-ml-6"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-slate-800 hover:bg-white/50 transition-all shadow-lg md:-mr-6"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  )
}

export const CardGridBlock: React.FC<Props> = ({
  className,
  title,
  description,
  cards,
  titleTextClasses,
  descriptionTextClasses,
  displayStyle = 'grid',
}) => {
  const CardItem = ({ card, index }: { card: any; index: number }) => {
    const themeClass = colorThemes[card.colorTheme] || colorThemes.blue
    const href = card.link?.url || (card.link?.reference?.value as any)?.slug || '#'

    return (
      <div
        key={index}
        className={cn(
          'relative overflow-hidden rounded-3xl text-white flex flex-col transition-transform hover:-translate-y-1 duration-300 h-full',
          themeClass,
        )}
      >
        <div className="px-8 pt-8 flex flex-col h-full z-10 relative">
          <div className="flex items-center justify-center gap-4 p-0 mb-4">
            <Icon name={card.icon} className="w-8 h-8 text-white" />
            <h3 className="text-lg xl:text-2xl font-bold font-sans">{card.title}</h3>
          </div>

          <p className="text-white/90 text-base leading-relaxed mb-6 text-center">
            {card.description}
          </p>

          <div className="mb-4 justify-center flex">
            <Link
              href={href}
              className="inline-flex items-center text-sm font-semibold hover:gap-2 transition-all"
            >
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="mt-auto relative aspect-[4/3] lg:aspect-square translate-y-2">
            {card.image && typeof card.image === 'object' && (
              <Media
                resource={card.image}
                alt={card.image.alt || card.title}
                className="object-fit object-top"
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('py-16 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          {title && (
            <h2
              className={cn(
                'text-3xl md:text-5xl font-semibold mb-6 text-slate-900',
                titleTextClasses,
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className={cn('text-lg text-slate-600 leading-relaxed', descriptionTextClasses)}>
              {description}
            </p>
          )}
        </div>

        {displayStyle === 'swiper' ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full pb-12 [&_.swiper-pagination-bullet]:bg-slate-300 [&_.swiper-pagination-bullet-active]:bg-primary overflow-visible"
          >
            {cards?.map((card, index) => (
              <SwiperSlide key={index} className="h-auto">
                <CardItem card={card} index={index} />
              </SwiperSlide>
            ))}
            <SwiperNavButtons />
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards?.map((card, index) => <CardItem key={index} card={card} index={index} />)}
          </div>
        )}
      </div>
    </div>
  )
}
