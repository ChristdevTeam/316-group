import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'

type Props = {
  data: NonNullable<Brand['content']>['mixedSection']
}

export const BrandMixed: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { title, titleClassName, description, descriptionClassName, gallery, richText } = data

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          {title && <h2 className={cn('text-3xl font-bold mb-4', titleClassName)}>{title}</h2>}
          {description && (
            <p className={cn('text-lg text-gray-600 max-w-4xl mx-auto', descriptionClassName)}>
              {description}
            </p>
          )}
        </div>

        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {gallery.map((item, index) => {
              if (typeof item !== 'string') {
                return (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                    <Media resource={item} fill imgClassName="object-cover w-full h-full" />
                  </div>
                )
              }
              return null
            })}
          </div>
        )}

        {richText && (
          <div className="max-w-4xl mx-auto">
            <RichText content={richText} />
          </div>
        )}
      </div>
    </section>
  )
}
