import { Plus } from 'lucide-react'
import { cn } from '@/utilities/cn'
import type { GlobalAccountsBlock as GlobalAccountsBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import React from 'react'
import { Media } from '@/components/Media'
import { paddingGenerator } from '@/utilities/paddingGenerator'

type Props = {
  className?: string
} & GlobalAccountsBlockProps

export const GlobalAccounts: React.FC<Props> = ({
  className,
  title,
  titleClasses,
  subHeading,
  subHeadingClasses,
  features,
  media,
  ctaText,
  ctaLink,
  description,
  descriptionClasses,
  paddingType,
  styles,
  ctaTextClasses,
}) => {
  return (
    <div
      className={cn('container max-w-screen-2xl mx-auto', paddingGenerator(paddingType), className)}
    >
      <div className="bg-slate-100 rounded-2xl px-4 md:px-8 lg:px-16 py-16 md:py-24 shadow-lg">
        <h1 className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }} />

        <div className="flex flex-col lg:flex-row gap-12 items-center py-16">
          <div className="space-y-8 xl:space-y-10 w-full lg:w-1/2">
            <div className="space-y-4 xl:space-y-10">
              {subHeading && (
                <h2
                  className={cn(subHeadingClasses)}
                  dangerouslySetInnerHTML={{ __html: subHeading }}
                />
              )}

              <p className={cn(descriptionClasses)}>{description}</p>
            </div>
            <div className="space-y-3 lg:space-y-6">
              {features &&
                features.length > 0 &&
                features.map((item, index) => (
                  <p key={index} className="flex items-center gap-2 md:gap-4">
                    <div className="h-6 w-6">
                      <Plus strokeWidth={3} className={cn('w-6 h-6', styles?.accentColour)} />
                    </div>
                    <span className="text-lg md:text-xl xl:text-2xl">{item.feature}</span>
                  </p>
                ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full lg:w-1/2 bg-red-500">
            {media && typeof media !== 'string' && <Media resource={media} size="33vw" />}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <div className={cn('w-full py-20', styles?.ctaBackground)}>
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className={cn(ctaTextClasses)} dangerouslySetInnerHTML={{ __html: ctaText }} />
              <div className="flex items-center justify-center">
                {ctaLink &&
                  ctaLink.map(({ link, buttonClasses, size }, i) => {
                    return (
                      <div key={i} className="flex">
                        <CMSLink
                          size={size ? size : 'lg'}
                          {...link}
                          className={cn(
                            'rounded-xl bg-transparent border-slate-950',
                            buttonClasses,
                          )}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
