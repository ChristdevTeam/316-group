import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'

type Props = {
  data: NonNullable<Brand['content']>['gallerySection']
}

export const BrandGallery: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { description, descriptionClassName, gallery } = data

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        {description && (
          <div className={cn('mb-12', descriptionClassName)}>
            <RichText content={description} />
          </div>
        )}

        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => {
              if (typeof item !== 'string') {
                return (
                  <div
                    key={index}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <Media
                      resource={item}
                      fill
                      imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )
              }
              return null
            })}
          </div>
        )}
      </div>
    </section>
  )
}
