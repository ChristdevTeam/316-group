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
    <div>
      <div>
        <h2 className="text-3xl font-bold text-center text-primary">{title}</h2>
        <p className="text-center text-primary py-4">{description}</p>
      </div>
      {card && typeof cardData === 'object' && (
        <div className="w-full">
          {cardType === 'Post' && <Card doc={cardData as Post} {...cardData} />}
          {cardType === 'EbooksAndGuide' && (
            <Card doc={cardData as EbooksAndGuide} relationTo="ebooks-and-guides" {...cardData} />
          )}
          {cardType === 'CaseStudy' && <CaseStudyCard doc={cardData as CaseStudy} {...cardData} />}
        </div>
      )}
    </div>
  )
}

export default SpecialConfirmation
