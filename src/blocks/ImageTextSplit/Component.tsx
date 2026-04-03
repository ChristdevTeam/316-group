import React from 'react'

import type { ImageTextSplitBlock as ImageTextSplitProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'
import { getBestContrastTextColor } from '@/utilities/getBestContrastTextColor'

export const ImageTextSplitBlock: React.FC<ImageTextSplitProps> = ({
  layout,
  image,
  content,
  bgColor,
  fromColor,
  viaColor,
  toColor,
}) => {
  const isImageRight = layout === 'imageRight'
  const hasGradient = Boolean(fromColor || viaColor || toColor)
  
  const containerStyle = cn(
    'w-full flex flex-col md:flex-row relative min-h-[60vh]',
    bgColor,
    hasGradient && 'bg-gradient-to-r',
    fromColor,
    viaColor,
    toColor,
    !hasGradient && bgColor && getBestContrastTextColor(bgColor)
  )

  return (
    <section className={containerStyle}>
      <div 
        className={cn(
          'w-full md:w-1/2 relative min-h-[40vh] md:min-h-[60vh] h-auto flex', 
          isImageRight ? 'order-1 md:order-2' : 'order-1'
        )}
      >
        {typeof image === 'object' && image && (
          <Media
            resource={image}
            imgClassName="absolute inset-0 w-full h-full object-cover"
            fill
          />
        )}
      </div>

      <div 
        className={cn(
          'w-full md:w-1/2 flex flex-col justify-center py-16', 
          isImageRight ? 'order-2 md:order-1' : 'order-2'
        )}
      >
        <div 
          className={cn(
            'w-full max-w-[768px] px-6 md:px-12 xl:px-16 flex flex-col', 
            isImageRight ? 'ml-auto mr-0' : 'mr-auto ml-0'
          )}
        >
          {content?.subtitle && (
            <p 
              className={cn(content.subtitleClasses)} 
              dangerouslySetInnerHTML={{ __html: content.subtitle }} 
            />
          )}
          
          {content?.title && (
            <h2 
              className={cn(content.titleClasses, 'mb-6')} 
              dangerouslySetInnerHTML={{ __html: content.title }} 
            />
          )}

          {content?.description && (
            <div className="mb-8">
              <RichText
                content={content.description}
                enableGutter={false}
              />
            </div>
          )}

          {content?.links && content.links.length > 0 && (
            <div className="flex gap-4 flex-wrap mt-2">
              {content.links.map(({ link, buttonClasses, size }, i) => (
                 <CMSLink 
                   key={i} 
                   size={size ? size : "lg"} 
                   {...link} 
                   className={cn(buttonClasses)} 
                 />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
