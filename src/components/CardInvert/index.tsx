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
    <div className="flex flex-col md:flex-col-reverse bg-white rounded-t-[1.9em] md:rounded-[1.9em] shadow-md hover:shadow-xl transition-all duration-300 w-full">
      <div className="p-8 lg:p-12">
        <h2
          className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold md:font-semibold text-gray-800"
          dangerouslySetInnerHTML={{ __html: cardTitle }}
        />
        <p
          className="mt-4 md:mt-8 lg:mt-12 text-lg leading-8"
          dangerouslySetInnerHTML={{ __html: cardDescription }}
        />
      </div>
      <div className="rounded-t-[1.9em] overflow-hidden">
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
