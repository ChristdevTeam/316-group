'use client'
import { useState } from 'react'
import type { BusinessSliderBlock as BusinessSliderBlockProps } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ArrowRightIcon, MoveRight, MoveLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/navigation'
import { cn } from '@/utilities/cn'

type Props = {
  className?: string
} & BusinessSliderBlockProps

const getHref = (link: BusinessSliderBlockProps['sliderItems'][0]['link']) => {
  if (link?.type === 'reference' && typeof link.reference?.value === 'object') {
    return `${
      link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    }/${link.reference.value.slug}`
  }
  return link?.url || ''
}

export const BusinessSliderBlock: React.FC<Props> = ({
  className,
  sliderItems,
  paddingType,
  sliderTitle,
  sliderTitleClasses,
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
        'overflow-hidden min-h-[300px] bg-white',
        className,
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
      <div className="container relative px-4 py-12 max-w-screen-2xl">
        {sliderTitle && <h2 className={cn(sliderTitleClasses)}>{sliderTitle}</h2>}

        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-medium">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
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
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.3,
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
                <div className="group h-[300px] md:h-[380px] 2xl:aspect-square p-8 rounded-2xl transition-all duration-300 hover:bg-[#7FFFD4] border border-gray-300 hover:border-[#7FFFD4]">
                  <div className="h-full flex flex-col">
                    <h3 className="text-xl md:text-2xl xl:text-3xl font-medium mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mb-8 flex-grow text-base md:text-xl">
                      {item.description}
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full w-fit group-hover:border-none"
                      asChild
                    >
                      <a href={href} target={item.link?.newTab ? '_blank' : undefined}>
                        Learn more
                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
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
