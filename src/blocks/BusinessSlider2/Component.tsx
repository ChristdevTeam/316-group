'use client'
import { useState } from 'react'
import type { BusinessSliderBlock2 as BusinessSlider2BlockProps } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ArrowRightIcon, MoveRight, MoveLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import 'swiper/css'
import 'swiper/css/navigation'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { paddingGenerator } from '@/utilities/paddingGenerator'

type Props = {
  className?: string
} & BusinessSlider2BlockProps

const getHref = (link: BusinessSlider2BlockProps['sliderItems'][0]['link']) => {
  if (link?.type === 'reference' && typeof link.reference?.value === 'object') {
    return `${
      link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    }/${link.reference.value.slug}`
  }
  return link?.url || ''
}

export const BusinessSliderBlock2: React.FC<Props> = ({
  className,
  sliderItems,
  paddingType,
  sliderTitle,
  sliderTitleClasses,
  bgColor,
  sliderDescription,
  sliderDescriptionClasses,
  cardStyles,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<any>(null)

  // console.log(`activeIndex: ${activeIndex}`)

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
        'overflow-hidden min-h-[300px]',
        bgColor || 'bg-white',
        className,
        paddingGenerator(paddingType),
      )}
    >
      <div className="container relative px-4 py-12 max-w-screen-2xl">
        <div className="mb-8">
          {sliderTitle && <h2 className={cn(sliderTitleClasses)}>{sliderTitle}</h2>}
          {sliderDescription && (
            <div className={cn(sliderDescriptionClasses)}>
              <RichText content={sliderDescription} enableGutter={false} enableProse={false} />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-medium">
            <span className={cn(bgColor && 'text-gray-200')}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-2 text-gray-400">—</span>
            <span className="text-gray-400">{String(sliderItems.length).padStart(2, '0')}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={goPrev}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <MoveLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={goNext}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <MoveRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.6,
            },
            840: {
              slidesPerView: 2.1,
            },
            1024: {
              slidesPerView: 2.8,
            },
            1280: {
              slidesPerView: 3.8,
            },
          }}
          className="!overflow-visible"
        >
          {sliderItems.map((item, index) => {
            const href = getHref(item.link)
            return (
              <SwiperSlide key={index}>
                <div
                  className={cn(
                    'group sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[5/6] p-8 rounded-2xl transition-all duration-300 border',
                    cardStyles?.cardBgColor || 'bg-white',
                    cardStyles?.cardHoverBgColor
                      ? `hover:${cardStyles.cardHoverBgColor}`
                      : 'hover:bg-[#7FFFD4]',
                    'border-gray-300',
                    cardStyles?.cardHoverBgColor
                      ? `hover:border-${cardStyles.cardHoverBgColor.replace('bg-', '')}`
                      : 'hover:border-[#7FFFD4]',
                  )}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3
                        className={cn(
                          'text-xl md:text-2xl font-medium mb-4',
                          cardStyles?.cardTitleClasses,
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          'mb-8 flex-grow text-base md:text-lg',
                          cardStyles?.cardDescriptionClasses || 'text-gray-500',
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                    {item.image && (
                      <div className="w-[35%]">
                        <Media resource={item.image} className="w-full"></Media>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
