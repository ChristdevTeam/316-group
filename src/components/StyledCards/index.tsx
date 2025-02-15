'use client'

import { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { Media } from '../Media'

interface StyledCardsProps {
  cards?:
    | {
        image: string | MediaType
        title: string
        description: string
        id?: string | null
      }[]
    | null
  imageClasses?: string[] | null
  gapClasses?: string | null
  titleClasses?: string[] | null
  descriptionClasses?: string[] | null
  shadowClasses?: string[] | null
  cardBgColor?: string | null
  cardHoverBgColor?: string | null
  borderClasses?: string[] | null
}

export const StyledCards: React.FC<StyledCardsProps> = ({
  cards,
  imageClasses,
  gapClasses = 'gap-6',
  titleClasses,
  descriptionClasses,
  shadowClasses,
  cardBgColor = 'bg-white',
  cardHoverBgColor,
  borderClasses,
}) => {
  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', gapClasses)}
    >
      {cards?.map((card, i) => (
        <div
          key={i}
          className={cn(
            'rounded-xl p-6 transition-all duration-300',
            cardBgColor,
            cardHoverBgColor && `hover:${cardHoverBgColor}`,
            shadowClasses,
            borderClasses,
          )}
        >
          <div className="flex flex-col items-start gap-4">
            <div className={cn('relative overflow-hidden rounded-lg', imageClasses)}>
              <Media resource={card.image} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className={cn(titleClasses)}>{card.title}</h3>
              <p className={cn(descriptionClasses)}>{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
