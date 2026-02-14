import React from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import type { Brand } from '@/payload-types'

type Props = {
  data: NonNullable<Brand['content']>['splitSection']
}

export const BrandSectionSplit: React.FC<Props> = ({ data }) => {
  if (!data) return null
  const { title, titleClassName, description, descriptionClassName, link, image } = data

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {title && <h2 className={cn('text-3xl font-bold mb-6', titleClassName)}>{title}</h2>}
            {description && (
              <p className={cn('text-lg text-gray-600 mb-8', descriptionClassName)}>
                {description}
              </p>
            )}
            {link && <CMSLink {...link} />}
          </div>
          <div>
            {image && typeof image !== 'string' && (
              <Media resource={image} imgClassName="w-full h-auto object-cover rounded-lg" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
