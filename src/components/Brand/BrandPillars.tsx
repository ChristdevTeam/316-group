'use client'
import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/cn'

type Props = {
  pillars: { word: string; id?: string | null }[]
}

export const BrandPillars: React.FC<Props> = ({ pillars }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!pillars || pillars.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pillars.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [pillars])

  if (!pillars || pillars.length === 0) return null

  return (
    <div className="py-12 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container max-w-screen-2xl flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={cn(
                'transition-all duration-500 text-xl md:text-3xl font-medium',
                index === activeIndex
                  ? 'text-black opacity-100 scale-110 font-bold'
                  : 'text-gray-300 opacity-60',
              )}
            >
              {pillar.word}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
