import { ArrowRight, Plus } from 'lucide-react'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import type { GlobalAccountsBlock as GlobalAccountsBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import React from 'react'
import { Media } from '@/components/Media'

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
}) => {
  return (
    <div
      className={cn(
        'container max-w-screen-2xl mx-auto',
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
        className,
      )}
    >
      <div className="bg-slate-100 rounded-2xl p-8 md:p-16 shadow-sm">
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
                    <Plus strokeWidth={3} className="w-6 h-6 text-green-600" />
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
          <div className="w-full py-20 bg-gradient-to-br from-blue-100 to-violet-100">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2
                className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-6"
                dangerouslySetInnerHTML={{ __html: ctaText }}
              />
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
