'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const SpecialHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div data-theme="light">
      <div className="sm:px-10 lg:mx-24 inset-0 flex flex-col justify-end items-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-8 justify-between sm:items-end items-start bg-white px-0 mb-[2em] min-h-[20vh]">
            {richText && (
              <RichText
                className="text-4xl font-normal"
                content={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="relative w-full h-[40vh] md:h-[40vh] shadow-md bg-center rounded-t-[3em] overflow-hidden">
          {media && typeof media === 'object' && (
            <Media
              fill
              imgClassName="-z-10 object-cover"
              priority={false}
              loading="lazy"
              resource={media}
            />
          )}
        </div>
      </div>
    </div>
  )
}
