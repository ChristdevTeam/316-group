import React from 'react'
import { Media } from '@/components/Media'
import type { Brand } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  data: Pick<Brand, 'title' | 'titleClassName' | 'subtitle' | 'subtitleClassName' | 'heroImage'>
}

export const BrandHero: React.FC<Props> = ({ data }) => {
  const { title, titleClassName, subtitle, subtitleClassName, heroImage } = data

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImage && typeof heroImage !== 'string' && (
          <Media resource={heroImage} fill priority imgClassName="object-cover w-full h-full" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className={cn('max-w-4xl', titleClassName)}>{title}</h1>
        {subtitle && <p className={cn('mt-4 max-w-2xl', subtitleClassName)}>{subtitle}</p>}
      </div>
    </section>
  )
}
