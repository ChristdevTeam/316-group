import { CaseStudy, EbooksAndGuide, Post } from '@/payload-types'
import React from 'react'
import { Card } from '../Card'
import CaseStudyCard from '../CaseStudyCard'
export interface SpecialConfirmationProps {
  title?: string | null
  description?: string | null
  card?: boolean | null
  cardType?: 'Post' | 'EbooksAndGuide' | 'CaseStudy' | null
  cardData?: Post | EbooksAndGuide | CaseStudy | false | string
}

const SpecialConfirmation = ({
  title,
  description,
  card,
  cardType,
  cardData,
}: SpecialConfirmationProps) => {
  // console.log('Card Data', cardData)
  return (
    <div className="py-8">
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-primary">
          {title}
        </h2>
        <p className="md:text-lg lg:text-2xl text-center text-primary py-4">{description}</p>
      </div>
      {card && typeof cardData === 'object' && (
        <div className="mt-8">
          {cardType === 'Post' && (
            <Card doc={cardData as Post} {...cardData} className="m-auto max-w-lg" />
          )}
          {cardType === 'EbooksAndGuide' && (
            <Card
              doc={cardData as EbooksAndGuide}
              relationTo="ebooks-and-guides"
              {...cardData}
              className="m-auto max-w-lg shadow-none border-none bg-slate-50"
            />
          )}
          {cardType === 'CaseStudy' && <CaseStudyCard doc={cardData as CaseStudy} {...cardData} />}
        </div>
      )}
    </div>
  )
}

export default SpecialConfirmation
