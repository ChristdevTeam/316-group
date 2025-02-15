import type { NumbersBlock as NumbersBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'

export const NumbersBlock: React.FC<NumbersBlockProps> = ({ items }) => {
  return (
    <div className="container max-w-screen-2xl py-16">
      <div className="grid grid-cols-1">
        {items?.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-4 md:grid-cols-12 items-end border-b-2 border-slate-300 py-8 md:py-16"
          >
            <div className="flex flex-row-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-20 xl:gap-32 justify-between md:justify-start col-span-4 md:col-span-6">
              <p className={cn(item.numberClasses)}>{item.number}</p>
              <h3 className={cn(item.titleClasses)}>{item.title}</h3>
            </div>

            <p className={cn(item.descriptionClasses, 'pt-8 md:pt-0 col-span-4 md:col-span-6')}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
