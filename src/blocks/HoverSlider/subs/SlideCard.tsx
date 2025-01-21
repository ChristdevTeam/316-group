import React, { useEffect, useState } from 'react'
// import type { Slide } from '../Component'
// import { Media } from '@/components/Media'
import { HoverSliderBlock, Media } from '@/payload-types'
import VideoComponent from './VideoComponent'
import { ImageComponent } from './ImageComponent'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

interface SlideCardProps {
  isProductSlider?: boolean
  slide: HoverSliderBlock['sliderItems'][0]
}

const SlideCard = ({ slide, isProductSlider }: SlideCardProps) => {
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    // Reset and reapply animation on slide change
    setAnimationClass('') // Clear existing animation
    const timer = setTimeout(() => {
      setAnimationClass('animate__fadeInDown animate__faster') // Apply new animation
    }, 50) // Short delay ensures class reapplication is noticed by the DOM
    // console.log('transition applied')
    return () => clearTimeout(timer) // Cleanup timeout
  }, [slide.id])

  const isVideo =
    typeof slide.mediaFile === 'object' && slide.mediaFile?.mimeType?.includes('video')

  const getUrl = (media: Media) => {
    if (isVideo) {
      return `/media/${media.filename}`
    }
    if (media.url) return `${process.env.NEXT_PUBLIC_SERVER_URL}${media.url}`
    return '#'
  }

  if (isProductSlider === true) {
    // console.log('Product Slider is enabled')
    return (
      <div
        className={`${slide.bgColor} rounded-[2em] flex flex-col items-start justify-between w-full aspect-[1/1] overflow-hidden`}
      >
        <div className=" text-lg text-left p-8 animate__animated">
          <RichText
            content={slide.description}
            enableGutter={false}
            enableProse={false}
            className={cn(slide.descriptionClasses)}
          ></RichText>
        </div>
        <div className="w-full overflow-hidden relative flex justify-center align-center items-center max-h-[80%] px-8">
          {isVideo
            ? typeof slide.mediaFile === 'object' && (
                <VideoComponent url={getUrl(slide.mediaFile)} />
              )
            : typeof slide.mediaFile === 'object' && (
                <ImageComponent
                  isProductSlider
                  src={getUrl(slide.mediaFile)}
                  alt={slide.title}
                  width={slide.mediaFile.width || 500}
                  height={slide.mediaFile.height || 500}
                  className="object-fit m-auto"
                />
              )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${slide.bgColor} rounded-[2em] p-8 flex flex-col items-start justify-center w-full`}
    >
      <div className="w-full aspect-[4/3] rounded-[2em] overflow-hidden relative flex justify-center align-center items-center">
        {isVideo
          ? typeof slide.mediaFile === 'object' && <VideoComponent url={getUrl(slide.mediaFile)} />
          : typeof slide.mediaFile === 'object' && (
              <ImageComponent src={getUrl(slide.mediaFile)} alt={slide.title} />
            )}
      </div>
      <RichText
        className={`mt-8 md:mt-16 text-lg text-left animate__animated ${animationClass}`}
        content={slide.description}
        enableGutter={false}
        enableProse={false}
      ></RichText>
      <button
        className={`mt-6 bg-cyan-200 text-black px-6 py-2 rounded-full hover:bg-slate-900 hover:text-white transition-colors text-left animate__animated ${animationClass}`}
      >
        Learn More →
      </button>
    </div>
  )
}

export default SlideCard
