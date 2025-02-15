'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { MoveLeft, MoveRight } from 'lucide-react'
import type { InteractiveMediaGridBlock } from '@/payload-types'

export const InteractiveMediaGrid: React.FC<InteractiveMediaGridBlock> = ({
  heading,
  headingClasses,
  cards,
  activeCardBgColor,
  paddingType,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <div
      className={cn(
        'container max-w-screen-2xl',
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
      )}
    >
      <div className="flex flex-col lg:flex-row md:gap-16 gap-4">
        {/* Left Column - Cards */}
        <div className="lg:w-1/2">
          <h2 className={cn(headingClasses)} dangerouslySetInnerHTML={{ __html: heading }} />
          {/* Mobile Navigation */}
          <div className="flex justify-end gap-4  lg:!hidden">
            <button
              onClick={prevCard}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Previous card"
            >
              <MoveLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={nextCard}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Next card"
            >
              <MoveRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 rounded-xl cursor-pointer transition-colors',
                  index === activeIndex && activeCardBgColor,
                )}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {typeof card.icon === 'object' && (
                  <div className="w-8 h-8 mb-4">
                    <Media resource={card.icon} className="w-full h-full object-contain" />
                  </div>
                )}
                <h3 className={cn(card.cardTitleClasses)}>{card.cardTitle}</h3>
                <p className={cn(card.cardDescriptionClasses)}>{card.cardDescription}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Media */}
        <div className="lg:w-1/2">
          {cards[activeIndex] && typeof cards[activeIndex].media === 'object' && (
            <div
              className={cn(
                'rounded-2xl p-8 overflow-hidden transition-colors',
                cards[activeIndex].mediaContainerBgColor,
              )}
            >
              <Media
                resource={cards[activeIndex].media}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
      {/* Mobile Active Card */}
      <div className="lg:hidden gap-8 mt-6">
        {cards[activeIndex] && (
          <div className={cn('p-6 rounded-xl')}>
            {typeof cards[activeIndex].icon === 'object' && (
              <div className="w-8 h-8 mb-4">
                <Media
                  resource={cards[activeIndex].icon}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <h3 className={cn(cards[activeIndex].cardTitleClasses)}>
              {cards[activeIndex].cardTitle}
            </h3>
            <p className={cn(cards[activeIndex].cardDescriptionClasses)}>
              {cards[activeIndex].cardDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
