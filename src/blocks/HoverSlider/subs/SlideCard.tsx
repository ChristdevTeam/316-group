import React, { useEffect, useState } from 'react'
import type { Slide } from '../Component'
// import { Media } from '@/components/Media'
import { HoverSliderBlock, Media } from '@/payload-types'
import VideoComponent from './VideoComponent'
import { ImageComponent } from './ImageComponent'

interface SlideCardProps {
  slide: HoverSliderBlock['sliderItems'][0]
}

const SlideCard = ({ slide }: SlideCardProps) => {
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    // Reset and reapply animation on slide change
    setAnimationClass('') // Clear existing animation
    const timer = setTimeout(() => {
      setAnimationClass('animate__fadeInDown animate__faster') // Apply new animation
    }, 50) // Short delay ensures class reapplication is noticed by the DOM

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

  return (
    <div
      className={`${slide.bgColor} rounded-[2em] aspect-square md:aspect-[1.2/1] p-8 flex flex-col items-start justify-center w-full`}
    >
      <div className="w-full aspect-square rounded-[2em] overflow-hidden relative flex justify-center align-center items-center">
        {isVideo
          ? typeof slide.mediaFile === 'object' && <VideoComponent url={getUrl(slide.mediaFile)} />
          : typeof slide.mediaFile === 'object' && (
              <ImageComponent src={getUrl(slide.mediaFile)} alt={slide.title} />
            )}
      </div>
      <p className={`mt-6 text-lg text-left max-w-md animate__animated ${animationClass}`}>
        {slide.description}
      </p>
      <button
        className={`mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-left animate__animated ${animationClass}`}
      >
        Get started →
      </button>
    </div>
  )
}

export default SlideCard
