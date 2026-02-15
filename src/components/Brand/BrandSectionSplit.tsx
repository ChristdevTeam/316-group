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
  const {
    title,
    titleClassName,
    description,
    descriptionClassName,
    link,
    image,
    bgColor,
    imageHeight = 60,
  } = data

  const imageHeightClassName = `h-[${imageHeight}vh] min-h-[500px]`

  return (
    <section className={cn('py-16 md:py-24', bgColor)}>
      <div className="container max-w-screen-2xl">
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
          <div className={cn(imageHeightClassName, 'relative')}>
            {image && typeof image !== 'string' && (
              <Media resource={image} imgClassName={cn('w-full object-cover rounded-lg')} fill />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
