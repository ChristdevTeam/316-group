import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'

type Props = {
  data: NonNullable<Brand['content']>['fullscreenSection']
}

export const BrandFullscreen: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { title, titleClassName, description, descriptionClassName, image } = data

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {image && typeof image !== 'string' && (
          <Media resource={image} fill imgClassName="object-cover w-full h-full" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        {title && <h2 className={cn('mb-6', titleClassName)}>{title}</h2>}
        {description && <p className={cn('max-w-3xl', descriptionClassName)}>{description}</p>}
      </div>
    </section>
  )
}
