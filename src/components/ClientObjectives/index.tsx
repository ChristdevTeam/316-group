import { CaseStudy } from '@/payload-types'
import React from 'react'
import RichText from '../RichText'

const ClientObjectives: React.FC<{ objectives: CaseStudy['objectives'] }> = ({ objectives }) => {
  const { intro, list } = objectives || {}
  return (
    <div className="py-16 lg:py-24">
      <div className="container max-w-screen-2xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 lg:mb-8 font-semibold">
          Client Objectives
        </h2>
        {intro && (
          <RichText
            className="max-w-none text-lg md:text-xl lg:text-2xl mb-4 lg:mb-8 pb-12"
            enableGutter={false}
            content={intro}
          />
        )}
        {list &&
          list.map((item, index) => (
            <div
              className="flex items-start lg:items-end gap-4 pl-4 md:pl-8 lg:pl-16 text-lg md:text-xl lg:text-2xl mb-4 lg:mb-8 xl:mb-10 font-semibold"
              key={index}
            >
              <span className="text-2xl md:text-3xl lg:text-4xl text-blue-700">0{index + 1}</span>{' '}
              <span>{item.title}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ClientObjectives
