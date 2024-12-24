import { cn } from '@/utilities/cn'
import Image from 'next/image'

export const ImageComponent = ({
  src,
  alt,
  className,
  width,
  height,
  isProductSlider,
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  isProductSlider?: boolean
}) => {
  if (isProductSlider === true) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          className={cn('object-fit', className, 'transition-opacity duration-300 ease-in-out')}
          width={width}
          height={height}
        />
      </div>
    )
  }
  return (
    <div className="relative h-full w-full">
      <Image src={src} alt={alt} className={cn('object-cover', className)} fill />
    </div>
  )
}
