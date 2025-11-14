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
      <div className="px-0 2xl:mx-14 inset-0 flex flex-col justify-end items-center pt-16">
        <div className="container max-w-screen-2xl ">
          <div className="flex flex-col sm:flex-row gap-8 justify-end sm:justify-between sm:items-end items-start  px-0 mb-[2em] min-h-[30vh] md:min-h-[47vh]">
            {richText && (
              <RichText
                className="font-normal text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-start"
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
        <div className="w-full hidden md:block">
          {media && typeof media === 'object' && (
            <div className="relative rounded-t-[3em] h-[60vh] overflow-hidden">
              <Media
                fill
                imgClassName="-z-10 object-cover inset-0 w-full h-full"
                videoClassName="-z-10 absolute object-cover inset-0 w-full max-h-[100%]"
                priority={false}
                loading="lazy"
                resource={media}
                className="rounded-t-[3em]"
              />
            </div>
          )}
        </div>
        <div className="w-[100%]  block md:hidden">
          {media && typeof media === 'object' && (
            <div className="relative rounded-t-[3em] h-[50vh] overflow-hidden">
              <Media
                fill
                imgClassName="-z-10 object-cover inset-0 w-full h-full"
                videoClassName="-z-10 absolute object-cover inset-0 w-full h-full"
                priority={false}
                loading="lazy"
                resource={media}
                className="rounded-t-[3em]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
