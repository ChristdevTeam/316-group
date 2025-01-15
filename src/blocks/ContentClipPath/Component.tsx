import React from 'react'
import { ContentClipPath as ContentClipPathProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const ContentClipPathBlock: React.FC<ContentClipPathProps> = (props) => {
  const {
    title,
    titleClasses,
    heading,
    headingClasses,
    description,
    descriptionClasses,
    links,
    media,
    bgColor,
  } = props

  function transformBgToFrom(className: string): string {
    if (className.startsWith('bg-')) {
      return className.replace('bg-', 'from-')
    }
    return className
  }

  return (
    <React.Fragment>
      {title && (
        <div className="max-w-screen-2xl container py-8 md:py-16">
          <h1 className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }}></h1>{' '}
        </div>
      )}

      <div
        className={cn(
          'relative bg-gradient-to-r',
          bgColor ? transformBgToFrom(bgColor) : 'from-blue-100',
          'via-transparent to-transparent',
        )}
      >
        <div
          className={cn('absolute inset-0 hidden md:block', bgColor)}
          style={{ clipPath: 'polygon(0% 0%, 70% 0%, 80% 100%, 0% 100%)' }}
        ></div>
        <div className={cn('absolute inset-0 md:hidden', bgColor)}></div>
        <div className="relative max-w-screen-2xl container py-12 md:flex items-center gap-8">
          <div className="md:w-2/3">
            {heading && (
              <h1 className={cn(headingClasses)} dangerouslySetInnerHTML={{ __html: heading }}></h1>
            )}
            {description && (
              <RichText
                enableProse={false}
                enableGutter={false}
                content={description}
                className={cn(descriptionClasses)}
              />
            )}

            {links && links.length > 0 && (
              <div className="flex justify-start content-center gap-4">
                {links.map(({ link, buttonClasses }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      className={cn(buttonClasses, 'text-xl')}
                      size={'lg'}
                    />
                  )
                })}
              </div>
            )}
          </div>

          <div className="md:w-1/3 pt-8 md:pt-0 flex justify-center">
            <div className="w-full bg-blue-600 rounded-lg shadow-lg flex flex-col justify-center items-center text-white rounded-2xl overflow-hidden">
              {media && <Media resource={media} />}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
