import { cn } from '@/utilities/cn'
import Image from 'next/image'

export const ImageComponent = ({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}) => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        className={cn('object-fit h-full', className)}
        width={width}
        height={height}
      />
    </div>
  )
}
