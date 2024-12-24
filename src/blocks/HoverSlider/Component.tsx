'use client'
import React, { useState } from 'react'
import { MoveLeft, MoveRight } from 'lucide-react'
import SlideTitle from './subs/SlideTitle'
import SlideCard from './subs/SlideCard'
import { Media } from '@/payload-types'
import { Link } from '@/Header/menu/types'
import type { HoverSliderBlock as HoverSliderBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

export interface Slide {
  id: number
  title: string
  description: string
  mediaFile: Media
  bgColor: string
  link: Link
}

type Props = {
  className?: string
} & HoverSliderBlockProps

export const HoverSlider: React.FC<Props> = ({
  className,
  sliderItems,
  sliderTitle,
  sliderTitleClasses,
  paddingType,
  isProductSlider,
}) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = sliderItems?.length || 0
  if (totalSlides === 0) return null

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const getHref = (link: HoverSliderBlockProps['sliderItems'][0]['link']) => {
    if (link?.type === 'reference' && typeof link.reference?.value === 'object') {
      return `${
        link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
      }/${link.reference.value.slug}`
    }
    return link?.url || ''
  }

  return (
    <div
      className={cn(
        'container max-w-screen-2xl',
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
      {/* Mobile Navigation */}
      <h3 className={cn('md:hidden', sliderTitleClasses)}>{sliderTitle} </h3>
      <div className="flex justify-between items-center mb-3 md:hidden">
        <div className="text-xl font-medium">
          {String(activeSlide + 1).padStart(2, '0')}{' '}
          <span className="text-gray-400"> — {String(totalSlides).padStart(2, '0')}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlePrevSlide}
            className="p-2 transition-colors duration-300 hover:text-teal-500"
          >
            <MoveLeft className="w-6 h-6 transition-transform duration-300 hover:-translate-x-1" />
          </button>
          <button
            onClick={handleNextSlide}
            className="p-2 transition-colors duration-300 hover:text-teal-500"
          >
            <MoveRight className="w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between gap-20">
        <div className="w-[47%]">
          <h3 className={cn(sliderTitleClasses)}>{sliderTitle} </h3>
          <div className="text-3xl font-medium mb-6">
            {String(activeSlide + 1).padStart(2, '0')}{' '}
            <span className="text-gray-400"> — {String(totalSlides).padStart(2, '0')}</span>
          </div>
          <div className="space-y-12">
            {sliderItems?.map((slide, index) => (
              <a
                key={index}
                href={getHref(slide.link)}
                target={slide.link?.newTab ? '_blank' : '_self'}
              >
                <SlideTitle
                  title={slide.title}
                  isActive={index === activeSlide}
                  onHover={() => setActiveSlide(index)}
                />
              </a>
            ))}
          </div>
        </div>
        <a
          href={getHref(sliderItems[activeSlide]?.link)}
          target={sliderItems[activeSlide].link?.newTab ? '_blank' : '_self'}
          className="w-1/2 flex justify-center"
        >
          <SlideCard
            slide={sliderItems[activeSlide]}
            isProductSlider={isProductSlider ? isProductSlider : false}
          />
        </a>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <a
          href={getHref(sliderItems[activeSlide].link)}
          target={sliderItems[activeSlide].link?.newTab ? '_blank' : '_self'}
          className="mb-6"
        >
          <SlideTitle title={sliderItems[activeSlide]?.title} isActive={true} />
        </a>
        <a
          href={getHref(sliderItems[activeSlide].link)}
          target={sliderItems[activeSlide].link?.newTab ? '_blank' : '_self'}
          className="mb-6"
        >
          <SlideCard
            slide={sliderItems[activeSlide]}
            isProductSlider={isProductSlider ? isProductSlider : false}
          />
        </a>
      </div>
    </div>
  )
}
