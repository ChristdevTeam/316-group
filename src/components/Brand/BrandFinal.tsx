import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'

type Props = {
  data: NonNullable<Brand['content']>['finalSection']
}

export const BrandFinal: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { title, titleClassName, description, descriptionClassName, image } = data

  return (
    <section className="py-16 md:py-24">
      <div className="container mb-12 text-center">
        {title && <h2 className={cn('text-3xl font-bold mb-4', titleClassName)}>{title}</h2>}
        {description && (
          <p className={cn('text-lg text-gray-600 max-w-4xl mx-auto', descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
      <div className="w-full h-[50vh] relative">
        {image && typeof image !== 'string' && (
          <Media resource={image} fill imgClassName="object-cover w-full h-full" />
        )}
      </div>
    </section>
  )
}
