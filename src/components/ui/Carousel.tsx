import { CarouselBlock } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import { cn } from '@/utilities/cn'
// import { Media } from './Media' // Import the Media component
// import type { CarouselBlock } from 'payload-types' // Import the CarouselBlock type from payload-types

// Omit the blockType field from the CarouselBlock interface
type CarouselProps = Omit<CarouselBlock, 'blockType'>

const Carousel: React.FC<CarouselProps> = ({ imageColumns, images, id, blockName }) => {
  // Default column values
  const mobileColumns = imageColumns?.mobile || 1
  const tabletColumns = imageColumns?.tablet || 2
  const desktopColumns = imageColumns?.desktop || 4

  return (
    <div className="container mx-auto py-16" id={id || undefined}>
      {blockName && <h2 className="text-center text-2xl font-bold mb-4">{blockName}</h2>}
      <div
        className={cn(
          'grid justify-items-center',
          mobileColumns === 2 ? 'grid-cols-2' : 'grid-cols-1',
          tabletColumns === 2 && 'md:grid-cols-2',
          tabletColumns === 3 && 'md:grid-cols-3',
          tabletColumns === 4 && 'md:grid-cols-4',
          desktopColumns === 3 && 'lg:grid-cols-3',
          desktopColumns === 4 && 'lg:grid-cols-4',
          desktopColumns === 5 && 'lg:grid-cols-5',
          desktopColumns === 6 && 'lg:grid-cols-6',
          'gap-12',
        )}
      >
        {images?.map((image, index) => (
          <div key={image.id || index} className="flex flex-col justify-center relative">
            {image.image && (
              <a
                href={image.partnerUrl ? image.partnerUrl : '#'}
                className="p-2 lg:p-4 xl:p-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Media resource={image.image} className="w-full rounded-lg" />{' '}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
