import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    layout = 'default',
    borderRadius = 'default',
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  const radiusClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    default: 'rounded',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }[borderRadius || 'default']

  return (
    <div
      className={cn(
        '',
        {
          'container max-w-screen-2xl': enableGutter && layout === 'default',
          'w-full': layout === 'fullWidth',
        },
        className,
      )}
    >
      <Media
        imgClassName={cn('border border-border', radiusClass, imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer && layout === 'default',
              'px-4': layout === 'fullWidth',
            },
            captionClassName,
          )}
        >
          <RichText content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
