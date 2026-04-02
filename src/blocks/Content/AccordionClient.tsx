'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import { Plus, Minus } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

interface AccordionItem {
  title: string
  content?: any
  media?: any
  links?: any[] | null
}

interface AccordionProps {
  accordion?: {
    titleClasses?: string[] | null
    contentClasses?: string[] | null
    items?: AccordionItem[] | null
  }
}

export const AccordionClient: React.FC<AccordionProps> = ({ accordion }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  if (!accordion || !accordion.items || accordion.items.length === 0) {
    return null
  }

  const { titleClasses, contentClasses, items } = accordion
  const activeItem = items[activeIndex]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 w-full">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={index}
              className={cn(
                'flex flex-col border-b border-gray-200 pb-8 lg:pb-12 mb-4 lg:mb-10',
                index === items.length - 1 && 'border-b-0',
              )}
            >
              <button
                className="flex items-center justify-between w-full text-left pb-4 md:pb-10"
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={cn(
                    titleClasses,
                    // apply bold, uppercase, text-2xl as base styles per requirements if absent
                    'font-bold uppercase text-2xl duration-200',
                    isActive ? 'text-teal-500' : 'text-foreground',
                  )}
                >
                  {item.title}
                </span>
                <div className="ml-4 flex-shrink-0">
                  {isActive ? (
                    <Minus className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <Plus className="w-6 h-6 text-foreground" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div className={cn('flex flex-col gap-4', contentClasses)}>
                    {item.content && <RichText content={item.content} enableGutter={false} />}
                    {item.links && item.links.length > 0 && (
                      <div className="flex gap-4 mt-2">
                        {item.links.map(({ link, buttonClasses }: any, i: number) => (
                          <CMSLink key={i} size="lg" {...link} className={cn(buttonClasses)} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hidden md:block w-full">
        {activeItem && activeItem.media && (
          <div className="sticky top-24 w-full h-auto overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center min-h-[300px]">
            <Media
              resource={activeItem.media}
              className="w-full h-auto rounded-xl object-contain object-center"
            />
          </div>
        )}
      </div>
    </div>
  )
}
