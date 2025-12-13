'use client'

import React from 'react'
import { ContentWithFormBlock } from '@/payload-types'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { FormBlock } from '@/blocks/Form/Component'
import RichText from '@/components/RichText'
import { SpecialConfirmationProps } from '@/components/SpacialConfirmationMessage'
import { paddingGenerator } from '@/utilities/paddingGenerator'

export const ContentWithFormComponent: React.FC<ContentWithFormBlock> = ({
  leftColumnItems,
  formBlock,
  leftColumnAlignment = 'center',
  formOverflowAmount = 'medium',
  backgroundGradient,
  paddingType = 'default',
}) => {
  const overflowClasses = {
    small: 'mb-[-8rem]',
    medium: 'mb-[-16rem]',
    large: 'mb-[-24rem]',
  }

  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }

  // Construct gradient classes
  const gradientClasses = backgroundGradient
    ? `${backgroundGradient.type || 'bg-gradient-to-b'} ${backgroundGradient.fromColor || 'from-blue-800'} ${backgroundGradient.toColor || 'to-blue-600'}`
    : 'bg-gradient-to-b from-blue-800 to-blue-600'

  // Prepare special confirmation data
  const specialConfirmationData: SpecialConfirmationProps | undefined =
    formBlock?.enableSpecialConfirmation
      ? {
          title: formBlock.specialConfirmationTitle,
          description: formBlock.specialConfirmationDescription,
          card: formBlock.enableConfirmationCard,
          cardType: formBlock.confirmationCardType as 'Post' | 'EbooksAndGuide' | 'CaseStudy',
          cardData:
            typeof formBlock.confirmationCardData === 'object' &&
            formBlock.confirmationCardData?.value,
        }
      : undefined

  return (
    <section className={cn('relative', gradientClasses, paddingGenerator(paddingType))}>
      <div className="container max-w-screen-2xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div
            className={cn('flex flex-col h-full text-white', alignmentClasses[leftColumnAlignment])}
          >
            {leftColumnItems?.map((item, index) => {
              const { itemType, text, textStyle, links, logoImages } = item

              if (itemType === 'text') {
                return (
                  <div key={index} className="mb-8 last:mb-0">
                    {/* Text Content */}
                    {item.text && (
                      <div
                        className={cn('mb-4', typeof textStyle === 'object' && textStyle?.classes)}
                      >
                        <p dangerouslySetInnerHTML={{ __html: item.text }} />
                      </div>
                    )}
                  </div>
                )
              } else if (itemType === 'buttons') {
                return (
                  <div key={index} className="flex gap-8 flex-wrap">
                    {/* Links */}
                    {links && links.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {links.map((linkItem, linkIndex) => (
                          <CMSLink
                            key={linkIndex}
                            {...linkItem.link}
                            className={cn(linkItem.buttonClasses)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              } else if (itemType === 'logos') {
                return (
                  <div key={index} className="flex flex-wrap items-center gap-6 mb-6">
                    {/* Logo Images */}
                    {logoImages && logoImages.length > 0 && (
                      <div className="flex flex-wrap items-center gap-6">
                        {logoImages.map((logo, logoIndex) => (
                          <div key={logoIndex} className="flex-shrink-0 h-8 ">
                            <Media resource={logo} imgClassName="max-h-16 w-auto object-contain" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              } else {
                return null
              }
            })}
          </div>

          {/* Right Column - Form */}
          <div className={cn('relative z-10', overflowClasses[formOverflowAmount])}>
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              {formBlock?.form && typeof formBlock.form !== 'string' && (
                <FormBlock
                  enableIntro={false}
                  form={formBlock.form as FormType}
                  introContent={formBlock.introContent}
                  className=""
                  submitClasses="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  specialConfirmation={formBlock.enableSpecialConfirmation}
                  specialConfirmationData={specialConfirmationData}
                  disappearingIntroOnSubmit={formBlock.disappearingIntroOnSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
