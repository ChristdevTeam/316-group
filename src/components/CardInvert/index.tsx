import type { Media as MediaProps } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'

interface CardInvertProps {
  cardTitle: string
  cardDescription: string
  cardImage: MediaProps
}

const CardInvert: React.FC<CardInvertProps> = ({ cardTitle, cardDescription, cardImage }) => {
  return (
    <div className="flex flex-col md:flex-col-reverse bg-white rounded-t-[2em] md:rounded-[2em] shadow-md hover:shadow-xl transition-all duration-300 w-full">
      <div className="p-8 lg:p-12">
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800"
          dangerouslySetInnerHTML={{ __html: cardTitle }}
        />
        <p className="mt-4 text-lg" dangerouslySetInnerHTML={{ __html: cardDescription }} />
      </div>
      <div className="rounded-t-[2em] overflow-hidden">
        <Media
          resource={cardImage}
          alt={cardImage.alt ? cardImage.alt : 'Card Image'}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default CardInvert
